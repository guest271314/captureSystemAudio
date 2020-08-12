async function captureSystemAudio(captureTimeInSeconds) {
  return new Promise(async (resolve, reject) => {
    const nativeMessagingExtensionId = 'lmkllhfhgnmbcmhdagfhejkpicehnida';
    let port;
    // Uint8Array(512) => Uint16Array(256) => Float32Array(128) (channel 0), Float32Array(128) (channel 1)
    const code = {
      start: `parec --raw -d alsa_output.pci-0000_00_1b.0.analog-stereo.monitor ../app/output`,
      stop: `killall -9 parec`,
    };
    // select app/data folder in extension directory
    const dir = await showDirectoryPicker();
    // set mode to readwrite for app/data directory
    const status = await dir.requestPermission({ mode: 'readwrite' });
    console.log(dir, status);
    // port to app/background.js where messages are sent to, received from Native Messaging host host/script.js
    port = chrome.runtime.connect(nativeMessagingExtensionId);
    console.log(port);
    // boolean to set, evaluate
    let done = false;
    // handle messages from externally_connectable extension sends, receives messages from Native Messaging host
    const handleNativeMessage = async message => {
      if (typeof message === 'object') {
        if (message.done) {
          done = message.done;
          console.log(message);
        } else {
          // TODO dynamically grow memory
          const memory = new WebAssembly.Memory({
            initial: (65536 * 3 * 60 * (captureTimeInSeconds / 60)) / 65536, // 1 minute
            maximum: (65536 * 3 * 60 * 60) / 65536, // 1 hour
            shared: true,
          });
          const uint8_sab = memory.buffer;
          let readOffset = 0;
          let writeOffset = 0;
          class AudioWorkletProcessor {}
          class AudioWorkletNativeFileStream extends AudioWorkletProcessor {
            constructor(options) {
              super(options);
              Object.assign(this, options.processorOptions);
              this.port.onmessage = e => {
                if (e.data instanceof SharedArrayBuffer) {
                  this.uint8_sab = e.data;
                }
              };
            }
            endOfStream() {
              this.port.postMessage({
                ended: true,
                currentTime,
                currentFrame,
                offset: this.offset,
                length: this.length,
              });
            }
            process(inputs, outputs) {
              const channels = outputs.flat();
              if (this.offset === this.length) {
                console.log(this);
                this.port.postMessage('audio-worklet-native-file-stream done');
                return false;
              }
              const uint8 = new Uint8Array(512);
              const uint8_0 = new Uint8Array(this.uint8_sab, this.offset, 512);
              for (let i = 0; i < 512; i++, this.offset++) {
                if (this.offset === this.length) {
                  break;
                }
                uint8[i] = uint8_0[i];
              }
              const uint16 = new Uint16Array(uint8.buffer);
              // based on int16ToFloat32 function at https://stackoverflow.com/a/35248852
              for (let i = 0, j = 0, n = 1; i < uint16.length; i++) {
                const int = uint16[i];
                // If the high bit is on, then it is a negative number, and actually counts backwards.
                const float =
                  int >= 0x8000 ? -(0x10000 - int) / 0x8000 : int / 0x7fff;
                // interleave
                channels[(n = ++n % 2)][!n ? j++ : j - 1] = float;
              }
              return true;
            }
          }
          // register processor in AudioWorkletGlobalScope
          function registerProcessor(name, processorCtor) {
            return `${processorCtor};\nregisterProcessor('${name}', ${processorCtor.name});`;
          }
          const worklet = URL.createObjectURL(
            new Blob(
              [
                registerProcessor(
                  'audio-worklet-native-file-stream',
                  AudioWorkletNativeFileStream
                ),
              ],
              { type: 'text/javascript' }
            )
          );
          const ac = new AudioContext({
            latencyHint: 1,
            sampleRate: 44100,
            numberOfChannels: 2,
          });
          ac.onstatechange = e => console.log(ac.state);
          if (ac.state === 'running') {
            await ac.suspend();
          }
          await ac.audioWorklet.addModule(worklet);
          const aw = new AudioWorkletNode(
            ac,
            'audio-worklet-native-file-stream',
            {
              numberOfInputs: 1,
              numberOfOutputs: 2,
              channelCount: 2,
              processorOptions: {
                offset: 0,
                // AudioWorkletProcessor.process() executes 344-384 per 1 second
                length: 512 * 346 * 60 * (captureTimeInSeconds / 60),
                done: false,
              },
            }
          );
          aw.onprocessorerror = e => {
            console.error(e);
            console.trace();
          };
          // comment MediaStream, MediaStreamTrack creation
          const msd = new MediaStreamAudioDestinationNode(ac);
          const { stream } = msd;
          const [track] = stream.getAudioTracks();
          aw.connect(msd);
          resolve(track);
          aw.port.onmessage = async e => {
            console.log(e.data);
            if (ac.state === 'suspended') {
              await ac.resume();
            } else {
              track.stop();
              aw.disconnect();
              msd.disconnect();
              console.log(e, await dir.removeEntry('output'), await ac.close());
              console.log(track);
              gc();
            }
          };
          // post SharedArrayBuffer to AudioWorkletProcessor.port
          aw.port.postMessage(uint8_sab);
          setTimeout(
            _ => port.postMessage(code.stop),
            captureTimeInSeconds * 1000
          );
          async function* fileStream() {
            while (true) {
              let fileHandle, fileBit, buffer;
                // if exception not thrown slice file from readOffset, handle exceptions
                // https://bugs.chromium.org/p/chromium/issues/detail?id=1084880
                // TODO: stream file being written at local filesystem
                // without reading entire file at each iteration before slice
                fileHandle = await dir.getFileHandle('output', {
                  create: false,
                });
                fileBit = await fileHandle.getFile();
                if (fileBit) {
                  const slice = fileBit.slice(readOffset);
                  if (slice.size === 0 && done) {
                    break;
                  }
                  if (slice.size > 0) {
                    buffer = await slice.arrayBuffer();
                    readOffset = readOffset + slice.size;
                    const u8_sab_view = new Uint8Array(memory.buffer);
                    const u8_file_view = new Uint8Array(buffer);
                    u8_sab_view.set(u8_file_view, writeOffset);
                    // accumulate  512 * 346 * 2 of data
                    if (
                      writeOffset > 512 * 346 * 2 &&
                      ac.state === 'suspended'
                    ) {
                      await ac.resume();
                    }
                    writeOffset = readOffset;
                  }
                }
              } catch (err) {
                // handle DOMException
                // : A requested file or directory could not be found at the time an operation was processed.
                // : The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.
                if (
                  err instanceof DOMException ||
                  err instanceof TypeError ||
                  err
                ) {
                  console.warn(err);
                }
              } finally {
                yield;
              }
            }
          }
          for await (const _ of fileStream()) {
            if (done) break;
          }
          console.log(memory.buffer.byteLength, readOffset, writeOffset);
        }
      }
    };
    port.onMessage.addListener(handleNativeMessage);
    port.postMessage(code.start);
  }).catch(e => {
    throw e;
  });
}
