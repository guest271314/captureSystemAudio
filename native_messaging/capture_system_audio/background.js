const start = new Date();

async function _audioStream(src) {
  if (globalThis.audioStream) {
    // stop capturing system audio output
    audioStream.stop();
  } else {
    class AudioStream {
      constructor(stdin, mimeType) {
        this.stdin = stdin;
        this.mimeType = mimeType;
        this.readOffset = 0;
        this.duration = 0;
        this.src = new URL(src);
        document.querySelectorAll(`[src="${this.src.href}"]`)
        .forEach((iframe) => {
          document.body.removeChild(iframe);
        });
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
        this.importEncoder();
      }
      async importEncoder() {
        if (this.mimeType.includes('mp3')) {
          const { lamejs } = await import(`${this.src.origin}/lame.min.js`);
          this.mp3encoder = new lamejs.Mp3Encoder(2, 44100, 128);
          this.mp3Data = [];
        } else if (this.mimeType.includes('opus')) {
          const {
            Decoder,
            Encoder,
            tools,
            Reader,
            injectMetadata,
          } = await import(`${this.src.origin}/ts-ebml.min.js`);
          Object.assign(this, {
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
        return this.nativeMessageStream();
      }
      async stop() {
        // console.log(this.inputController.desiredSize);
        try {
          this.source.postMessage(
            { type: 'stop', message: this.inputController.desiredSize },
            '*'
          );
        } catch (err) {
          console.error(err.message);
        }
      }
      async nativeMessageStream() {
        return new Promise((resolve) => {
          onmessage = (e) => {
            if (e.origin === this.src.origin) {
              // console.log(e.data);
              if (!this.source) {
                this.source = e.source;
              }
              if (e.data === 1) {
                this.source.postMessage(
                  { type: 'start', message: this.stdin },
                  '*'
                );
              }
              if (e.data === 0) {
                document.querySelectorAll(`[src="${this.src.href}"]`)
                .forEach((iframe) => {
                  document.body.removeChild(iframe);
                });
                onmessage = null;
              }
              if (e.data instanceof ReadableStream) {
                this.stdout = e.data;
                resolve(this.captureSystemAudio());
              }
            }
          };
          this.transferableWindow = document.createElement('iframe');
          this.transferableWindow.style.display = 'none';
          this.transferableWindow.name = location.href;
          this.transferableWindow.src = this.src.href;
          document.body.appendChild(this.transferableWindow);
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
                    while (this.inputController.desiredSize < 0) {
                      await scheduler.postTask(() => {});
                    }
                    this.inputController.close();
                    while (this.audioWriter.desiredSize < 0) {
                      await scheduler.postTask(() => {});
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
                      console.log({done});
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
                      // deinterleave
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
                    const data = new Float32Array(882);
                    data.set(left, 0);
                    data.set(right, 441);
                    const frame = new AudioData({
                      timestamp,
                      data,
                      sampleRate: 44100,
                      format: 'f32-planar',
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
                        this.mp3Data.push(mp3buf);
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
              const mp3buf = this.mp3encoder.flush(); //finish writing mp3
              if (mp3buf.length > 0) {
                this.mp3Data.push(new Int8Array(mp3buf));
              }
              this.resolve(new Blob(this.mp3Data, { type: this.mimeType }));
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

    audioStream = new AudioStream('parec -d @DEFAULT_MONITOR@', 'audio/webm;codecs=opus');
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

          saveFileNotification.onshow = async (e) => {
            await new Promise((resolve) => setTimeout(resolve, 1000 * 60));
            e.target.close();
          };
        }
      })
      .catch(console.error);
  }
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!(await chrome.storage.local.get('tabId')).tabId) {
    chrome.storage.local.clear();
    await chrome.storage.local.set({ tabId: tab.id });
  }
  chrome.scripting.executeScript({
    target: {
      tabId: (await chrome.storage.local.get('tabId')).tabId,
    },
    world: 'MAIN',
    args: [`${chrome.runtime.getURL('')}transferableStream.html`],
    func: _audioStream,
  });
  if ((await chrome.action.getTitle({})) === 'Capture system audio') {
    await chrome.action.setIcon({ path: './media-playback-stop-1-32x32.png' });
    await chrome.action.setTitle({ title: 'Capturing system audio' });
  } else {
    await chrome.action.setIcon({ path: './media-record-1-32x32.png' });
    await chrome.action.setTitle({ title: 'Capture system audio' });
  }
});

onfetch = (e) => {console.log(e);};
onmessage = (e) => {console.log(e);};
