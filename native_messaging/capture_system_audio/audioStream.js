class AudioStream {
  constructor(stdin) {
    this.stopped = false;
    this.stdin = stdin;
    this.readOffset = 0;
    this.duration = 0;
    this.src = 'chrome-extension://<id>/transferableStream.html';
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
    this.abortable = new AbortController();
    const { signal } = this.abortable;
    this.signal = signal;
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
    this.audioReadableAbortable = new AbortController();
    const { signal: audioReadableSignal } = this.audioReadableAbortable;
    this.audioReadableSignal = audioReadableSignal;
    this.audioReadableSignal.onabort = (e) => console.log(e.type);
    this.audioWriter = this.writable.getWriter();
    this.mediaStream = new MediaStream([this.generator]);
    this.resolve = void 0;
    this.promise = new Promise((_) => (this.resolve = _));
    this.osc.connect(this.msd);
    this.osc.start();
    this.track.onmute = this.track.onunmute = this.track.onended = (e) =>
      console.log(e);
    this.recorder = new MediaRecorder(this.mediaStream);
    this.recorder.ondataavailable = async ({ data }) =>
      this.resolve((await injectMetadata(data)).arrayBuffer());
    this.signal.onabort = async (e) => {
      console.log(e.type);
      try {
        this.recorder.stop();
        this.audioReadableAbortable.abort();
        this.msd.disconnect();
        this.osc.disconnect();
        this.track.stop();
        await this.audioWriter.close();
        await this.audioWriter.closed;
        this.inputController.close();
        await this.inputReader.cancel();
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
    };
  }
  async start() {
    return this.nativeMessageStream();
  }
  async stop() {
    this.stopped = true;
    try {
      this.abortable.abort();
    } catch (err) {
      console.error(err.message);
    }
  }
  async nativeMessageStream() {
    return new Promise((resolve) => {
      onmessage = (e) => {
        this.source = e.source;
        if (typeof e.data === 'string') {
          if (e.data === 'Ready.') {
            this.source.postMessage(
              { type: 'start', message: this.stdin },
              '*'
            );
          }
          if (e.data === 'Done.') {
            document.querySelectorAll(`[src="${this.src}"]`).forEach((f) => {
              document.body.removeChild(f);
            });
          }
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
    this.recorder.start();
    let channelData = [];
    try {
      await Promise.allSettled([
        this.stdout.pipeTo(
          new WritableStream({
            write: async (value, c) => {
              let i = 0;
              for (; i < value.buffer.byteLength; i++, this.readOffset++) {
                if (channelData.length === 440 * 4) {
                  this.inputController.enqueue([...channelData]);
                  channelData.length = 0;
                }
                channelData.push(value[i]);
              }
            },
            abort(e) {
              console.err(e.message);
            },
            close: () => {
              console.log('Done writing input stream.');
              if (channelData.length) {
                this.inputController.enqueue(channelData);
              }
              this.inputController.close();
            },
          }),
          {
            signal: this.signal,
          }
        ),
        this.audioReadable.pipeTo(
          new WritableStream({
            abort(e) {
              console.err(e.message);
            },
            write: async ({ timestamp }) => {
              const uint8 = new Int8Array(440 * 4);
              const { value, done } = await this.inputReader.read();
              if (!done) uint8.set(new Int8Array(value));
              const uint16 = new Uint16Array(uint8.buffer);
              // https://stackoverflow.com/a/35248852
              const channels = [new Float32Array(440), new Float32Array(440)];
              for (let i = 0, j = 0, n = 1; i < uint16.length; i++) {
                const int = uint16[i];
                // If the high bit is on, then it is a negative number, and actually counts backwards.
                const float =
                  int >= 0x8000 ? -(0x10000 - int) / 0x8000 : int / 0x7fff;
                // interleave
                channels[(n = ++n % 2)][!n ? j++ : j - 1] = float;
              }
              const data = new Float32Array(
                channels.reduce((a, b) => [...a, ...b], [])
              );
              const frame = new AudioData({
                timestamp,
                data,
                sampleRate: 44100,
                format: 'f32-planar',
                numberOfChannels: 2,
                numberOfFrames: 440,
              });
              this.duration += frame.duration;
              await this.audioWriter.write(frame);
            },
            close() {
              console.log('Done reading input stream.');
            },
          }),
          {
            signal: this.audioReadableSignal,
          }
        ),
        this.ac.resume(),
      ]);
      return this.promise;
    } catch (err) {
      console.error(err);
    }
  }
}
