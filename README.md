# captureSystemAudio
Capture system audio ("What U Hear") initiated from the browser using inotify-tools, File API, Native File System

<h5>Background</h5>

- https://lists.w3.org/Archives/Public/public-speech-api/2017Jun/0000.html
- https://github.com/whatwg/html/issues/2823
- https://github.com/guest271314/SpeechSynthesisRecorder/issues/14
- https://github.com/WICG/native-file-system/issues/97
- https://github.com/w3c/mediacapture-main/issues/629
- https://github.com/WICG/speech-api/issues/69
- https://github.com/web-platform-tests/wpt/issues/23084
- https://github.com/w3c/mediacapture-main/issues/650
- https://github.com/w3c/mediacapture-main/issues/654
- https://gist.github.com/guest271314/59406ad47a622d19b26f8a8c1e1bdfd5
- https://github.com/guest271314/requestNativeScripts

<h5>Synopsis</h5>

Capture audio monitor device with PulseAudio at Linux, stop the capture, then save audio locally, when local files watched by `inotifywait` are accessed or opened using File API and, or Native File System.

<h5>Dependencies</h5>

`pacat`, `inotify-tools`.

<h6>Optional</h6>

`opus-tools`, `mkvtoolnix`, `ffmpeg` to convert WAV to Opus or different codec and write track to Matroska, WebM, or other media container supported at the system.

<h5>Usage</h5>

`$ ./notify.sh & chromium-browser --enable-experimental-web-platform-features && killall -q -9 inotifywait`

At the browser capture system audio, e.g., from `window.speechSynthesis.speak()` or `ffplay blade_runner.web` or `<video>` playing in an HTML document, et al., by opening the local file `captureSystemAudio.txt`, stop capture by opening the local file `stopSystemAudioCapture.txt`, where each file contains one space character, then get the captured audio from local filesystem using `<input type="file">` or where implemented `chooseFileSystemEntries()`.

```
captureSystemAudio()
.then(async requestNativeScript => {
  // await 10 seconds
  await new Promise(resolve => setTimeout(resolve, 10000));
  // stop system audio capture
  await requestNativeScript.get('stop').arrayBuffer(); 
  const output = await requestNativeScript.get('dir').getFile('output.webm',{create:false});
  // resulting File object
  const file = await output.getFile(); 
  // pass file.arrayBuffer() to new Blob to open underlying data in file
  // do stuff with captured system audio as WAV, Opus, other codec and container the native system supports
  console.log(output, file, URL.createObjectURL(new Blob([await file.arrayBuffer()], {type:file.type})));
})
.catch(e => console.error(e));
```





