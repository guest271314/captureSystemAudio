# captureSystemAudio
Capture system audio (["What-U-Hear"](https://wiki.archlinux.org/index.php/PulseAudio/Examples#ALSA_monitor_source)) 

> To be able to record from a monitor source (a.k.a. "What-U-Hear", "Stereo Mix"), use `pactl` list to find out the name of the source in PulseAudio (e.g. `alsa_output.pci-0000_00_1b.0.analog-stereo.monitor`). 

<h5>Background</h5>

Based on the results of testing default implementation and experimental approaches within the scope of API's shipped with the browser it does not appear to be possible to select `Monitor of <device>` capture system audio at Chromium at Linux without manually setting the device to `Monitor of <device>` _during_ recording a `MediaStream` from `getUserMedia({audio: true})` at PulseAudio sound settings GUI `Recording` tab. Once that user action is performed outside of the browser at the OS the setting becomes persistent where subsequent calls to `getUserMedia({audio: true})`. To capture microphone input after manually setting the `Monitor of <device>` at PulseAudio sound settings GUI the user must perform the procedure in reverse by recording a `MediaStream` and setting the device back to the default `Built-in <device>` _during_ recording a `MediaStream` from `getUserMedia({audio: true})` with `MediaRecorder`.

Firefox supports selection of `Monitor of <device>` at `getUserMedia()` at Linux at the UI prompt, not by selecting the device from `enumerateDevices()` after permission is granted for media capture at `getUserMedia()` and `getUserMedia({audio:{exact:{deviceId}}})` is executed with the `Monitor of <device>` `deviceId`. 

Firefox and Chromium do not support system or application capture of system audio at `getDisplayMedia({video: true, audio: true})` at Linux.

Chrome on Windows does to support the user selecting audio capture at `getDisplayMedia({video: true, audio: true})` UI prompt.

`getUserMedia()` and `getDisplayMedia()` specifications do not explicitly state the user agent "MUST" provide the user with the option to capture application or system audio. From Screen Capture https://w3c.github.io/mediacapture-screen-share/ 

> In the case of audio, the user agent MAY present the end-user with audio sources to share. Which choices are available to choose from is up to the user agent, and the audio source(s) are not necessarily the same as the video source(s). An audio source may be a particular application, window, browser, the entire system audio or any combination thereof. Unlike mediadevices.getUserMedia() with regards to audio+video, the user agent is allowed not to return audio even if the audio constraint is present. If the user agent knows no audio will be shared for the lifetime of the stream it MUST NOT include an audio track in the resulting stream. The user agent MAY accept a request for audio and video by only returning a video track in the resulting stream, or it MAY accept the request by returning both an audio track and a video track in the resulting stream. The user agent MUST reject audio-only requests. 

_"MAY"_ being the key term in the language at _"the user agent MAY"_, indicating that implementation of capturing audio from _"a particular application, window, browser, the entire system audio or any combination thereof"_ is solely an individual choice of the _"user agent"_ to implement or not and thus can be considered null and void as to being a requirement for conformance with the specification if the _"user agent"_ decides to omit audio capture from the implementation of the specification. 

Audio capture is described in broad context as to potential applicable coverage in general in that specification where the description of potential coverage can be narrowly interpreted by the term _"MAY"_ to mean not required to implement for conformance and thus not applicable solely at the _"user agent"_ discretion.

<h5>Motivation</h5>

Specify and implement web compatible system audio capture.

The origin of and primary requirement is to capture output of `window.speechSynthesis.speak()`.

The code can also be used to capture playback of media at native applications where the container and codec being played are not be supported at the browser by default, not supported as a video document when directly navigated to, or output from a native application supporting features not implemented at the browser, for example, `mpv output.amr sound.caf` ([Playing audio files in unsupported codecs through <audio> tag](https://stackoverflow.com/q/61502237)), `ffplay blade_runner.mkv` ([[Rethink] Support mkv|matroska|video/x-matroska in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1422891), [Navigating to a Matroska file (.mkv) prompts user to download the file instead of loading the file at an HTML document and playing the file at HTML <video> element](https://bugs.chromium.org/p/chromium/issues/detail?id=999580)), `paplay output.wav` ([Navigating to audio/wav file prompts to open native application or save, plays file at HTMLMediaElement](https://bugzilla.mozilla.org/show_bug.cgi?id=1633647)), `espeak-ng -m '<p>A paragraph.</p><break time="2s"><s>A sentence<s>'`([Implement SSML parsing at SpeechSynthesisUtterance](https://bugs.chromium.org/p/chromium/issues/detail?id=795371), [Implement SSML parsing at SpeechSynthesisUtterance](https://bugzilla.mozilla.org/show_bug.cgi?id=1425523)).

<h5>Synopsis</h5>

Open local files watched by `inotifywait` from [inotify-tools](https://github.com/inotify-tools/inotify-tools) to capture system audio monitor device at Linux, write output to a local file, stop system audio capture, get the resulting local file in the browser.

<h5>Dependencies</h5>

`pacat`, `inotify-tools`.

<h6>Optional</h6>

`opus-tools`, `mkvtoolnix`, `ffmpeg` or other native code application or to convert WAV to Opus or different codec and write track to Matroska, WebM, or other media container supported at the system. `opus-tools`, `mkvtoolnix` are included in the code by default to reduce resulting file size of captured stream by converting to Opus codec from audio from WAV, written to WebM container for usage with `MediaSource`.

<h5>Usage</h5>

<h6>Command line, Chromium launcher</h6>

Create a local folder in `/home/user/`, `localscripts` containing the files in this repository, `cd` to the folder and, or create executable to run the command

`$HOME/notify.sh & chromium-browser --enable-experimental-web-platform-features <Chromium flags> && killall -q -9 inotifywait`

To start system audio capture at the browser open the local file `captureSystemAudio.txt`, to stop capture by open the local file `stopSystemAudioCapture.txt`, where each file contains one space character, then get the captured audio from local filesystem using `<input type="file">` or where implemented Native File System `chooseFileSystemEntries()`.

```
captureSystemAudio()
.then(async requestNativeScript => {
  // system audio is being captured, wait 10 seconds
  await requestNativeScript.get('wait')(10000);
  // stop system audio capture
  await requestNativeScript.get('stop').arrayBuffer(); 
  // avoid Native File System ERR_UPLOAD_FILE_CHANGED error
  let output;
  // can be executed thousands of times
  FILE_EXISTS: do {
    try {
      if (output = await requestNativeScript.get('dir').getFile('output.webm', {create:false})) {
        // wait 50 milliseconds again here to avoid File size 0 reference collision 
        // where getFile() executed exactly at creation, open of file at native code
        await requestNativeScript.get('wait')();
        break FILE_EXISTS;
      };
      // function returning a Promise after default parameter 50, passed to setTimeout()
      requestNativeScript.get('wait')();
      // handle DOMException: 
      // A requested file or directory could not be found at the time an operation was processed.
    } catch (e) {
      console.error(e);
    }
  } while (!output);
  // resulting File object
  // potentially only file metadata reference, not reference to underlying content of file now
  const file = await output.getFile(); 
  const type = file.type;
  // read file to get underlying content instead of file metadata reference
  // store file as ArrayBuffer in memory, alternatively use file.stream() read/write File then remove
  const ab = await file.arrayBuffer();
  // remove file containing captured audio from local filesystem
  await requestNativeScript.get('dir').removeEntry('output.webm');
  // do stuff with captured system audio as WAV, Opus, other codec and container the system supports
  console.log(output, file, URL.createObjectURL(new Blob([ab], {type})));
})
.catch(e => console.error(e));
```


<h5>References</h5>

- https://lists.w3.org/Archives/Public/public-speech-api/2017Jun/0000.html
- https://github.com/whatwg/html/issues/2823
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
- https://bugs.chromium.org/p/chromium/issues/detail?id=1074529
- https://github.com/w3c/mediacapture-main/issues
- https://github.com/w3c/mediacapture-screen-share/issues/140

