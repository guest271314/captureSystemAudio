class AudioStream {
  constructor(stdin) {
    this.stopped = false;
    this.stdin = stdin;
    this.readOffset = 0;
    this.duration = 0;
    this.src =
      'chrome-extension://<id>/transferableStream.html';
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
      { highWaterMark: 1 }
    );
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
    const { writable } = this.generator;
    this.writable = writable;
    const { readable: audioReadable } = this.processor;
    this.audioReadable = audioReadable;
    this.audioWriter = this.writable.getWriter();
    this.mediaStream = new MediaStream([this.generator]);
    this.resolve = void 0;
    this.promise = new Promise((_) => (this.resolve = _));
    this.osc.connect(this.msd);
    this.osc.start();
    this.track.onmute = this.track.onunmute = this.track.onended = (e) =>
      console.log(e);
    this.outputStreamController = void 0;
    this.outputStream = new ReadableStream(
      {
        start: async (_) => {
          return (this.outputStreamController = _);
        },
      },
      { highWaterMark: 1 }
    ).pipeThrough(
      new TransformStream({
        async transform(blob, c) {
          try {
            c.enqueue(new Uint8Array(await blob.arrayBuffer()));
          } catch (err) {
            console.warn(err.message);
          }
        },
        flush() {
          console.log('Flush.');
        },
      })
    );
    this.recorder = new MediaRecorder(this.mediaStream, {
      audioBitrateMode: 'constant',
    });
    this.recorder.onstop = async (e) => {
      try {
        this.outputStreamController.close();
      } catch (err) {
        console.warn(err.message);
      }
      this.resolve(
        new Response(this.outputStream).blob()
      );
    };
    this.recorder.ondataavailable = async ({ data }) => {
      if (data.size > 0) {
        this.outputStreamController.enqueue(data);
      }
    };
  }
  async start() {
    return this.nativeMessageStream();
  }
  async stop() {
    console.log(this.inputController.desiredSize);
    this.stopped = true;
    try {
      this.source.postMessage({ type: 'stop', message: null }, '*');
    } catch (err) {
      console.error(err.message);
    }
  }
  async nativeMessageStream() {
    return new Promise((resolve) => {
      onmessage = (e) => {
        if (!this.source) {
          this.source = e.source;
        }
        if (e.data === 1) {
          this.source.postMessage({ type: 'start', message: this.stdin }, '*');
        }
        if (e.data === 0) {
          document.querySelectorAll(`[src="${this.src}"]`).forEach((f) => {
            document.body.removeChild(f);
          });
          onmessage = null;
        }
        if (e.data instanceof ReadableStream) {
          this.stdout = e.data;
          resolve(this.captureSystemAudio());
        }
      };
      this.transferableWindow = document.createElement('iframe');
      this.transferableWindow.style.display = 'none';
      this.transferableWindow.name = location.href;
      this.transferableWindow.src = this.src;
      document.body.appendChild(this.transferableWindow);
    }).catch((err) => {
      throw err;
    });
  }
  async captureSystemAudio() {
    this.recorder.start(1);
    let channelData = [];
    try {
      await Promise.allSettled([
        this.stdout
          .pipeTo(
            new WritableStream({
              write: async (value, c) => {
                let i = 0;
                for (; i < value.buffer.byteLength; i++, this.readOffset++) {
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
                console.log('Done writing input stream.');
                try {
                  this.recorder.requestData();
                  this.recorder.stop();
                  this.msd.disconnect();
                  this.osc.disconnect();
                  this.track.stop();
                  await this.audioWriter.close();
                  await this.audioWriter.closed;
                  this.generator.stop();
                  await this.ac.close();
                } catch (err) {
                  console.error(err);
                } finally {
                  console.log(
                    `readOffset:${this.readOffset}, duration:${this.duration}, ac.currentTime:${this.ac.currentTime}`,
                    `generator.readyState:${this.generator.readyState}, audioWriter.desiredSize:${this.audioWriter.desiredSize}`,
                    `inputController.desiredSize:${this.inputController.desiredSize}, ac.state:${this.ac.state}`
                  );
                }
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
                const uint8 = new Int8Array(441 * 4);
                const { value, done } = await this.inputReader.read();
                if (!done) uint8.set(new Int8Array(value));
                const uint16 = new Uint16Array(uint8.buffer);
                // https://stackoverflow.com/a/35248852
                const channels = [new Float32Array(441), new Float32Array(441)];
                for (let i = 0, j = 0, n = 1; i < uint16.length; i++) {
                  const int = uint16[i];
                  // If the high bit is on, then it is a negative number, and actually counts backwards.
                  const float =
                    int >= 0x8000 ? -(0x10000 - int) / 0x8000 : int / 0x7fff;
                  // deinterleave
                  channels[(n = ++n % 2)][!n ? j++ : j - 1] = float;
                }
                const data = new Float32Array(882);
                data.set(channels.shift(), 0);
                data.set(channels.shift(), 441);
                const frame = new AudioData({
                  timestamp,
                  data,
                  sampleRate: 44100,
                  format: 'f32-planar',
                  numberOfChannels: 2,
                  numberOfFrames: 441,
                });
                this.duration += frame.duration;
                await this.audioWriter.write(frame);
              },
              close: () => {
                console.log('Done reading input stream.');
              },
            })
          )
          .catch(console.warn),
        this.ac.resume(),
      ]);
      return this.promise;
    } catch (err) {
      console.error(err);
    }
  }
}
