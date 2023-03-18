async function _audioStream(src) {
  if (globalThis.audioStream) {
    // Stop capturing system audio output
    audioStream.stop();
  } else {
    class AudioStream {
      constructor(stdin, mimeType) {
        this.stdin = stdin;
        this.mimeType = mimeType;
        this.readOffset = 0;
        this.duration = 0;
        this.src = new URL(src);
        this.ac = new AudioContext({
          sampleRate: 44100,
          latencyHint: 0,
        });
        this.ac.suspend();
        this.msd = new MediaStreamAudioDestinationNode(this.ac, {
          channelCount: 2,
        });
        this.inputController = void 0;
        this.inputStream = new ReadableStream({
          start: (_) => {
            return (this.inputController = _);
          },
        });
        this.inputReader = this.inputStream.getReader();
        const { stream } = this.msd;
        this.stream = stream;
        const [track] = stream.getAudioTracks();
        this.track = track;
        this.osc = new OscillatorNode(this.ac, {
          frequency: 0,
        });
        this.processor = new MediaStreamTrackProcessor({
          track,
        });
        this.generator = new MediaStreamTrackGenerator({
          kind: 'audio',
        });
        const { writable: audioWritable } = this.generator;
        this.audioWritable = audioWritable;
        const { readable: audioReadable } = this.processor;
        this.audioReadable = audioReadable;
        this.audioWriter = this.audioWritable.getWriter();
        this.mediaStream = new MediaStream([this.generator]);
        this.resolve = void 0;
        this.promise = new Promise((_) => (this.resolve = _));
        this.portDisconnectedResolve = void 0;
        this.portDisconnectedPromise = new Promise(
          (_) => (this.portDisconnectedResolve = _)
        );
        this.osc.connect(this.msd);
        this.osc.start();
        this.track.onmute = this.track.onunmute = this.track.onended = (e) =>
          console.log(e);
        if (this.mimeType.includes('opus')) {
          this.recorder = new MediaRecorder(this.mediaStream, {
            audioBitrateMode: 'constant',
          });
          this.recorder.onstop = async (e) => {};
          this.recorder.ondataavailable = async ({ data }) => {
            this.resolve(this.injectMetadata(data));
          };
        }
        this.importEncoderPromise = this.importEncoder();
      }
      async importEncoder() {
        if (this.mimeType.includes('mp3')) {
          const { lamejs } = await import(`${this.src.origin}/lame.min.js`);
          this.mp3encoder = new lamejs.Mp3Encoder(2, 44100, 256);
          this.mp3controller = void 0;
          return this.mp3stream = new ReadableStream({
            start: (_) => {
              return (this.mp3controller = _);
            },
          });
        } else if (this.mimeType.includes('opus')) {
          const {
            Decoder,
            Encoder,
            tools,
            Reader,
            injectMetadata,
          } = await import(`${this.src.origin}/ts-ebml.min.js`);
          return Object.assign(this, {
            Decoder,
            Encoder,
            tools,
            Reader,
            injectMetadata,
          });
        }
      }
      async start() {
        console.log(this);
        await this.importEncoderPromise;
        return this.nativeMessageStream();
      }
      async stop() {
        try {
          this.port.postMessage('disconnect');
          await this.portDisconnectedPromise;
          await this.writer.close();
          await this.writer.closed;
        } catch (err) {
          console.error(err.message);
        }
      }
      async nativeMessageStream() {
        return new Promise((resolve) => {
          this.port = chrome.runtime.connect(this.src.hostname);
          const { readable, writable } = new TransformStream();
          this.stdout = readable;
          this.writer = writable.getWriter();
          this.port.onMessage.addListener(async (value) => {
            try {
              await this.writer.ready;
              await this.writer.write(new Uint8Array(value));
            } catch (e) {
              console.log(e.message);
            } finally {
              return true;
            }
          });
          this.port.onDisconnect.addListener(this.portDisconnectedResolve);
          this.port.postMessage(this.stdin);
          resolve(this.captureSystemAudio());
        }).catch((err) => {
          throw err;
        });
      }
      async captureSystemAudio() {
        if (this.mimeType.includes('opus')) {
          this.recorder.start();
        }
        let channelData = [];
        try {
          await Promise.allSettled([
            this.stdout
              .pipeTo(
                new WritableStream({
                  write: async (value, c) => {
                    let i = 0;
                    for (
                      ;
                      i < value.buffer.byteLength;
                      i++, this.readOffset++
                    ) {
                      if (channelData.length === 441 * 4) {
                        this.inputController.enqueue([...channelData]);
                        channelData.length = 0;
                      }
                      channelData.push(value[i]);
                    }
                  },
                  abort(e) {
                    console.error(e.message);
                  },
                  close: async () => {
                    if (channelData.length) {
                      this.inputController.enqueue(channelData);
                    }
                    while (this.inputController.desiredSize <= 1) {
                      await scheduler.postTask(() => {});
                      if (this.inputController.desiredSize === 1) {
                        break;
                      }
                    }
                    this.inputController.close();
                    while (this.audioWriter.desiredSize <= 1) {
                      await scheduler.postTask(() => {});
                      if (this.audioWriter.desiredSize === 1) {
                        break;
                      }
                    }
                    await this.audioWriter.close();
                    await this.audioWriter.closed;
                    this.msd.disconnect();
                    this.osc.disconnect();
                    this.track.stop();
                    this.generator.stop();
                    await this.ac.close();
                    console.log('Done writing input stream.');
                  },
                })
              )
              .catch(console.warn),
            this.audioReadable
              .pipeTo(
                new WritableStream({
                  abort(e) {
                    console.error(e.message);
                  },
                  write: async ({ timestamp }) => {
                    const int8 = new Int8Array(441 * 4);
                    const { value, done } = await this.inputReader.read();
                    if (!done) {
                      int8.set(new Int8Array(value));
                    } else {
                      console.log({ done });
                      return this.audioWriter.closed;
                    }
                    const int16 = new Int16Array(int8.buffer);
                    // https://stackoverflow.com/a/35248852
                    const channels = [
                      new Float32Array(441),
                      new Float32Array(441),
                    ];
                    for (let i = 0, j = 0, n = 1; i < int16.length; i++) {
                      const int = int16[i];
                      // If the high bit is on, then it is a negative number, and actually counts backwards.
                      const float =
                        int >= 0x8000
                          ? -(0x10000 - int) / 0x8000
                          : int / 0x7fff;
                      // Deinterleave
                      channels[(n = ++n % 2)][!n ? j++ : j - 1] = float;
                    }
                    // https://github.com/zhuker/lamejs/commit/e18447fefc4b581e33a89bd6a51a4fbf1b3e1660
                    const left = channels.shift();
                    const right = channels.shift();
                    let leftChannel, rightChannel;
                    if (this.mimeType.includes('mp3')) {
                      const sampleBlockSize = 441;
                      leftChannel = new Int32Array(left.length);
                      rightChannel = new Int32Array(right.length);
                      for (let i = 0; i < left.length; i++) {
                        leftChannel[i] =
                          left[i] < 0 ? left[i] * 32768 : left[i] * 32767;
                        rightChannel[i] =
                          right[i] < 0 ? right[i] * 32768 : right[i] * 32767;
                      }
                    }
                    const frame = new AudioData({
                      timestamp,
                      data: int16,
                      sampleRate: 44100,
                      format: 's16',
                      numberOfChannels: 2,
                      numberOfFrames: 441,
                    });
                    this.duration += frame.duration;
                    await this.audioWriter.ready;
                    await this.audioWriter.write(frame);
                    if (this.mimeType.includes('mp3')) {
                      const mp3buf = this.mp3encoder.encodeBuffer(
                        leftChannel,
                        rightChannel
                      );
                      if (mp3buf.length > 0) {
                        this.mp3controller.enqueue(new Uint8Array(mp3buf));
                      }
                    }
                  },
                  close: () => {
                    console.log('Done reading input stream.');
                  },
                })
              )
              .catch((e) => {
                console.error(e);
              }),
            this.ac.resume(),
          ]);
          try {
            if (this.mimeType.includes('opus')) {
              this.recorder.stop();
            }
            if (this.mimeType.includes('mp3')) {
              // Finish writing MP3
              const mp3buf = this.mp3encoder.flush();
              if (mp3buf.length > 0) {
                this.mp3controller.enqueue(new Uint8Array(mp3buf));
                this.mp3controller.close();
              }
              this.resolve(new Response(this.mp3stream).arrayBuffer());
            }
          } catch (err) {
            console.error(err);
          } finally {
            console.log(
              `readOffset:${this.readOffset}, duration:${this.duration}, ac.currentTime:${this.ac.currentTime}`,
              `generator.readyState:${this.generator.readyState}, audioWriter.desiredSize:${this.audioWriter.desiredSize}`,
              `inputController.desiredSize:${this.inputController.desiredSize}, ac.state:${this.ac.state}`
            );
          }
          return this.promise;
        } catch (err) {
          console.error(err);
        }
      }
    }

    audioStream = new AudioStream('parec -d @DEFAULT_MONITOR@', 'audio/mp3');
    // audioStream.mediaStream: live MediaStream
    audioStream
      .start()
      .then(async (ab) => {
        // ab: ArrayBuffer representation of WebM file from MediaRecorder
        console.log(audioStream);
        const {
          src: { origin },
          mimeType,
        } = audioStream;
        const blob = new Blob([ab], { type: mimeType });
        console.log(
          URL.createObjectURL(blob),
          `recording${new Date().getTime()}${
            mimeType.includes('opus') ? '.webm' : '.mp3'
          }`
        );

        globalThis.audioStream = AudioStream = null;
        let permission = await navigator.permissions.query({
          name: 'notifications',
        });
        if (permission.state !== 'granted') {
          permission = await Notification.requestPermission();
        }
        if (permission.state === 'granted' || permission === 'granted') {
          const saveFileNotification = new Notification('Save file?', {
            body: `Click "Activate" to download captured system audio recording.`,
            icon: `${origin}/download_music_icon.png`,
          });
          saveFileNotification.onclick = async (e) => {
            try {
              const handle = await showSaveFilePicker({
                startIn: 'music',
                suggestedName: `recording${new Date().getTime()}${
                  mimeType.includes('opus') ? '.webm' : '.mp3'
                }`,
              });
              console.log(handle);
              const writable = await handle.createWritable();
              const writer = writable.getWriter();
              await writer.write(blob);
              await writer.close();
            } catch (err) {
              console.error(err);
            }
          };
        }
      })
      .catch(console.error);
  }
}

async function executeScript(id) {
  chrome.scripting.executeScript({
    target: {
      tabId: id,
    },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: _audioStream,
  });
  if ((await chrome.action.getTitle({})) === 'Capture system audio') {
    await chrome.action.setIcon({
      path: './media-playback-stop-1-32x32.png',
    });
    await chrome.action.setTitle({ title: 'Capturing system audio' });
  } else {
    await chrome.action.setIcon({ path: './media-record-1-32x32.png' });
    await chrome.action.setTitle({ title: 'Capture system audio' });
  }
  return true;
}

async function handleClick(tab) {
  if (!(await chrome.storage.local.get('tabId')).tabId) {
    await chrome.storage.local.set({ tabId: tab.id });
  } else {
    if (
      (await chrome.storage.local.get('tabId')).tabId &&
      (await chrome.action.getTitle({})) === 'Capturing system audio'
    ) {
      await executeScript(+(await chrome.storage.local.get('tabId')).tabId);
      await chrome.storage.local.clear();
      return true;
    }
  }
  let dir;
  if (!tab.url.startsWith('chrome:')) {
    const url = new URL(tab.url);
    const { matches } = chrome.runtime.getManifest().externally_connectable;
    const match = matches.find((m) => new URL(m).hostname === url.hostname);
    if (match === undefined) {
      const request = await fetch('manifest.json');
      const json = await request.json();
      json.externally_connectable.matches = [
        ...new Set([`${url.origin}/*`, ...json.externally_connectable.matches]),
      ];
      const message = await chrome.runtime.sendNativeMessage(
        'set_externally_connectable',
        json
      );
      console.log(message);
      dir = await navigator.storage.getDirectory();
      let handle = await dir.getFileHandle('tabId.txt', { create: true });
      await new Blob([tab.id]).stream().pipeTo(await handle.createWritable());
      handle = await dir.getFileHandle('update.txt', { create: true });
      await new Blob([]).stream().pipeTo(await handle.createWritable());
      chrome.runtime.reload();
    }
  }

  await executeScript(
    dir
      ? +(await (await (await dir.getFileHandle('tabId.txt')).getFile()).text())
      : tab.id
  );
  if (dir) {
    await dir.removeEntry('tabId.txt');
  }
}

chrome.runtime.onConnectExternal.addListener((p) => {
  globalThis.name = chrome.runtime.getManifest().short_name;
  globalThis.port = chrome.runtime.connectNative(globalThis.name);
  port.onMessage.addListener((message) => {
    p.postMessage(message);
  });
  port.onDisconnect.addListener((p) => {
    console.log(p);
  });
  p.onMessage.addListener(async (message) => {
    if (message === 'disconnect') {
      port.disconnect();
      p.disconnect();
      return;
    }
    port.postMessage(message);
  });
  p.onDisconnect.addListener(async (e) => {
    console.log(e);
    port.disconnect();
    return;
  });
});

chrome.runtime.onInstalled.addListener(async (reason) => {
  const dir = await navigator.storage.getDirectory();
  const keys = [];
  for await (const key of dir.keys()) {
    keys.push(key);
  }
  let handle;
  try {
    handle = await dir.getFileHandle('tabId.txt', { create: false });
    handle = +(await (await handle.getFile()).text());
  } catch (e) {
    console.log(e.message);
  }
  const tab = keys.includes('tabId.txt')
    ? await chrome.tabs.get(handle).catch((e) => {
        return null;
      })
    : (await chrome.tabs.query({ active: true, lastFocusedWindow: true }))[0];
  if (keys.includes('update.txt')) {
    await dir.removeEntry('update.txt');
    if (tab) await handleClick(tab);
  }
});

chrome.action.onClicked.addListener(handleClick);
