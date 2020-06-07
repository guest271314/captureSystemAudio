# captureSystemAudio
Capture system audio (["What-U-Hear"](https://wiki.archlinux.org/index.php/PulseAudio/Examples#ALSA_monitor_source)) 

> To be able to record from a monitor source (a.k.a. "What-U-Hear", "Stereo Mix"), use `pactl` list to find out the name of the source in PulseAudio (e.g. `alsa_output.pci-0000_00_1b.0.analog-stereo.monitor`). 

<h5>Background</h5>

Based on the results of testing default implementation and experiments with different approaches to get access to the device within the scope of API's shipped with the browser it is not possible to select `Monitor of <device>` at Chromium at Linux, which is not exposed at `getUserMedia()` UI prompt or at `enumerateDevices()` after permission to capture audio is granted, without manually setting the device to `Monitor of <device>` _during_ recording a `MediaStream` from `getUserMedia({audio: true})` at PulseAudio sound settings GUI `Recording` tab. Once that user action is performed outside of the browser at the OS the setting becomes persistent where subsequent calls to `getUserMedia({audio: true})`. To capture microphone input after manually setting the `Monitor of <device>` at PulseAudio sound settings GUI the user must perform the procedure in reverse by recording a `MediaStream` and setting the device back to the default `Built-in <device>` _during_ capture of a `MediaStream` from `getUserMedia({audio: true})`.

Firefox supports selection of `Monitor of <device>` at `getUserMedia()` at Linux at the UI prompt by selecting the device from `enumerateDevices()` after permission is granted for media capture at first `getUserMedia()` and  `getUserMedia()` is executed a second time with the `deviceId` of `Monitor of <device>` from `MediaDeviceInfo` object constraint set `{audio:{deviceId:{exact:device.deviceId}}}`. 

Firefox and Chromium do not support system or application capture of system audio at `getDisplayMedia({video: true, audio: true})` at Linux.

Chrome on Windows does to support the user selecting audio capture at `getDisplayMedia({video: true, audio: true})` UI prompt.

`getUserMedia()` and `getDisplayMedia()` specifications do not explicitly state the user agent "MUST" provide the user with the option to capture application or system audio. From Screen Capture https://w3c.github.io/mediacapture-screen-share/ 

> In the case of audio, the user agent MAY present the end-user with audio sources to share. Which choices are available to choose from is up to the user agent, and the audio source(s) are not necessarily the same as the video source(s). An audio source may be a particular application, window, browser, the entire system audio or any combination thereof. Unlike mediadevices.getUserMedia() with regards to audio+video, the user agent is allowed not to return audio even if the audio constraint is present. If the user agent knows no audio will be shared for the lifetime of the stream it MUST NOT include an audio track in the resulting stream. The user agent MAY accept a request for audio and video by only returning a video track in the resulting stream, or it MAY accept the request by returning both an audio track and a video track in the resulting stream. The user agent MUST reject audio-only requests. 

_"MAY"_ being the key term in the language at _"the user agent MAY"_, indicating that implementation of capturing audio from _"a particular application, window, browser, the entire system audio or any combination thereof"_ is solely an individual choice of the _"user agent"_ to implement or not and thus can be considered null and void as to being a requirement for conformance with the specification if the _"user agent"_ decides to omit audio capture from the implementation of the specification. 

Audio capture is described in broad context as to potential applicable coverage in general in the Screen Capture specification where that same description of potential coverage can be narrowly interpreted by the term _"MAY"_ to mean not required to implement for conformance and thus not applicable solely at the _"user agent"_ discretion.

<h5>Motivation</h5>

Specify and implement web compatible system audio capture.

The origin of and primary requirement is to capture output of `window.speechSynthesis.speak()`.

The code can also be used to capture playback of media at native applications where the container and codec being played are not be supported at the browser by default, not supported as a video document when directly navigated to, or output from a native application supporting features not implemented at the browser, for example, `mpv output.amr sound.caf`, `ffplay blade_runner.mkv`, `paplay output.wav`, `espeak-ng -m '<p>A paragraph.</p><break time="2s"><s>A sentence<s>'`.

<h5>Synopsis</h5>

Open local files watched by `inotifywait` from [inotify-tools](https://github.com/inotify-tools/inotify-tools) to capture system audio monitor device at Linux, write output to a local file, stop system audio capture, get the resulting local file in the browser.

<h5>Dependencies</h5>

`pacat`, `inotify-tools`.

<h6>Optional</h6>

`opus-tools`, `mkvtoolnix`, both used by default to convert WAV to Opus and write Opus to WebM container to decrease resulting file size and encoded and write track to Matroska, WebM, or other media container supported at the system. `opus-tools`, `mkvtoolnix` are included in the code by default to reduce resulting file size of captured stream by converting to Opus codec from audio from WAV. `ffmpeg` is used to write WebM file to local filesystem piped from `parec` and `opusenc` in "real-time", where `MediaSource` can be used to stream the captured audio in "real-time" (`ffmpeg` does not write WebM to local filesystem until 669 bytes are accumulated).

<h5>Usage</h5>

<h6>Command line, Chromium launcher</h6>

Create a local folder in `/home/user/`, `localscripts` containing the files in this repository, run the command

`$HOME/notify.sh & chromium-browser --enable-experimental-web-platform-features && killall -q -9 inotifywait`

to start `inotifywait` watching two `.txt` files in the directory for open events and launches Chromium.

To start system audio capture at the browser open the local file `captureSystemAudio.txt`, to stop capture by open the local file `stopSystemAudioCapture.txt`, where each file contains one space character, then get the captured audio from local filesystem using `<input type="file">` or where implemented Native File System `chooseFileSystemEntries()`.

<h5>Capture 50 minutes of audio to file</h5>

```
captureSystemAudio()
.then(async requestNativeScript => {
  // system audio is being captured, wait 50 minutes
  await requestNativeScript.get('wait')(60 * 1000 * 50);
  // stop system audio capture
  await requestNativeScript.get('stop').arrayBuffer(); 
  // avoid Native File System ERR_UPLOAD_FILE_CHANGED error
  await requestNativeScript.get('wait')(100);
  try {
    const output = await requestNativeScript.get('dir').getFile('output.webm', {create:false});
    // resulting File object
    const file = await output.getFile(); 
    // do stuff with captured system audio as WAV, Opus, other codec and container the system supports
    console.log(output, file, URL.createObjectURL(file));
  } catch (e) {
      throw e;
  }
})
.catch(e => {
  console.error(e);
  console.trace();
});
```

<h5>Stream file being written at local filesystem to MediaSource, capture as MediaStream, record with MediaRecorder in "real-time"</h5>

Adjust shell script `captureSystemAudio.sh` to pipe `opusenc` to `ffmpeg` to write file while reading file at browser

```
#!/bin/bash
captureSystemAudio() {
  parec -v --raw -d alsa_output.pci-0000_00_1b.0.analog-stereo.monitor | opusenc --raw-rate 44100 - - \
    | ffmpeg -y -i - -c:a copy $HOME/localscripts/output.webm
}
captureSystemAudio
```

at JavaScript use `HTMLMediaElement`, `MediaSource` to capture `timeSlice` seconds, minutes, hours of audio

```
  captureSystemAudio()
  .then(async requestNativeScript => {
    const audio = new Audio();
    let mediaStream, mediaRecorder;
    audio.controls = audio.autoplay = audio.muted = true;
    audio.onloadedmetadata = _ => {
      console.log(audio.duration, ms.duration);
      mediaStream = audio.captureStream();
      mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.start();
      mediaRecorder.ondataavailable = e => {
        console.log(URL.createObjectURL(e.data));
      };
    };
    audio.onended = _ => {
      mediaRecorder.stop();
    };
    document.body.appendChild(audio);
    let ms = new MediaSource();
    let sourceBuffer;
    let domExceptionsCaught = 0;
    ms.onsourceopen = e => {
      sourceBuffer = ms.addSourceBuffer('audio/webm;codecs=opus');
    };
    audio.src = URL.createObjectURL(ms);
    async function* fileStream(timeSlice = 5) {
      const { readable, writable } = new TransformStream();
      // do stuff with readable: ReadableStream, e.g., transfer; export 
      const reader = readable.getReader();
      let offset = 0;
      let start = false;
      let stop = false;
      audio.ontimeupdate = _ => {
        if (audio.currentTime >= timeSlice) {
          stop = true;
          audio.ontimeupdate = null;
        }
        console.log(audio.currentTime);
      };
      function readFileStream() {
        return reader
          .read()
          .then(async function processFileStream({ value, done }) {
            if (done) {
              console.log(done);
              ms.endOfStream();
              return reader.closed;
            }
            await new Promise(resolve => {
              sourceBuffer.addEventListener('updateend', resolve, {
                once: true,
              });
              console.log(value);
              sourceBuffer.appendBuffer(value);
            });
            return reader.read().then(processFileStream).catch(e => {throw e;});
          });
      }
      while (true) {
        try {
          const output = await requestNativeScript
            .get('dir')
            .getFile('output.webm', { create: false });
          const file = await output.getFile();
          const slice = file.slice(offset, file.size);
          // native application can have already bean writing file
          // ffmpeg does not write file to filesystem until WebM file is 669 bytes
          // wait until File.size > 0
          if (slice.size > 0) {
            slice.stream().pipeTo(writable, { preventClose: stop === false });
          }
          offset = file.size;
          if (!start) {
            start = true;
            // do stuff with fileBits
            readFileStream()
            .catch(e => {throw e;});
          }
          yield;
        } catch (e) {
          // handle DOMException: 
          // A requested file or directory could not be found at the time an operation was processed.
          // thousands of exceptions can be caught here before ffmpeg writes 669 bytes to local file
          ++domExceptionsCaught;
          console.error(e);
          console.trace();
        } finally {
          if (stop === true) {
            break;
          }
        }
      }
      try {
        await requestNativeScript.get('stop').arrayBuffer();
        await writable.close();
      } catch (e) {
        console.error(e);
      }
    }
    // capture 2 minutes of system audio output
    for await (const fileBits of fileStream(60 * 2));
    await requestNativeScript.get('dir').removeEntry('output.webm');
    console.log('done streaming file', { domExceptionsCaught });
  })
  .catch(e => {
    console.error(e);
    console.trace();
  });
  ```


<h5>References</h5>

- https://lists.w3.org/Archives/Public/public-speech-api/2017Jun/0000.html
- https://github.com/whatwg/html/issues/2823
- https://github.com/whatwg/html/issues/3443
- https://github.com/guest271314/SpeechSynthesisRecorder/issues/14
- https://github.com/WICG/native-file-system/issues/72
- https://github.com/WICG/native-file-system/issues/97
- https://github.com/w3c/mediacapture-main/issues/629
- https://github.com/WICG/speech-api/issues/69
- https://github.com/web-platform-tests/wpt/issues/23084
- https://github.com/w3c/mediacapture-main/issues/650
- https://github.com/w3c/mediacapture-main/issues/654
- https://gist.github.com/guest271314/59406ad47a622d19b26f8a8c1e1bdfd5
- https://github.com/guest271314/requestNativeScripts
- https://github.com/web-platform-tests/wpt/issues/23084
- https://bugs.chromium.org/p/chromium/issues/detail?id=1013881
- https://bugs.chromium.org/p/chromium/issues/detail?id=1032815
- https://bugs.chromium.org/p/chromium/issues/detail?id=1074529
- https://bugs.chromium.org/p/chromium/issues/detail?id=865799
- https://github.com/w3c/mediacapture-screen-share/issues/140
- https://stackoverflow.com/q/61502237
- https://bugzilla.mozilla.org/show_bug.cgi?id=1422891
- https://bugs.chromium.org/p/chromium/issues/detail?id=999580
- https://bugs.chromium.org/p/chromium/issues/detail?id=795371
- https://bugzilla.mozilla.org/show_bug.cgi?id=1425523
