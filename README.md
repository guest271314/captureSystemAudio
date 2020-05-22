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

<h5>Synopsis</h5>

Capture audio monitor device with PulseAudio at Linux, stop the capture, then save audio locally, when local files watched by `inotifywait` are accessed or opened using File API and, or Native File System.

<h5>Dependencies</h5>

`pacat`, `inotify-tools`.

<h6>Optional</h6>

`opus-tools`, `mkvtoolnix`, `ffmpeg` to convert WAV to Opus or different codec and write track to Matroska, WebM, or other media container supported at the system.

<h5>Usage</h5>

`$ ./notify.sh & chromium-browser --enable-experimental-web-platform-features && killall -q -9 inotifywait`

At the browser capture system audio, e.g., from `window.speechSynthesis.speak()` or `ffplay blade_runner.web` or `<video>` playing in an HTML document, et al., stop capture, then get the captured audio from local filesystem.

```
async function captureSystemAudio() {
  try {
    const requestNativeScript = new Map();
    requestNativeScript.set('dir', await self.chooseFileSystemEntries({type:'openDirectory'}));
    requestNativeScript.set('status', await requestNativeScript.get('dir').requestPermission({writable:true}));
    // inotifywait does not fire events for file with no content, add space character to text file
    // FileSystemFileHandle.getFile() does not open file https://bugs.chromium.org/p/chromium/issues/detail?id=1084840
    // inotifywait does not fire access or open events
    requestNativeScript.set('start', await (await requestNativeScript.get('dir').getFile('captureSystemAudio.txt',{create:false})).getFile());
    requestNativeScript.set('stop', await (await requestNativeScript.get('dir').getFile('stopSystemAudioCapture.txt',{create:false})).getFile());
    // Execute File.arrayBuffer() to read file for inotifywait to fire access or open event
    // alternatively <input type="file">.click() does fire inotifywait open event 
    const executeNativeScript = await requestNativeScript.get('start').arrayBuffer(); 
    return requestNativeScript;
  } catch (e) {
    throw e;
  }
}
captureSystemAudio()
.then(async requestNativeScript => {
  await new Promise(resolve => setTimeout(resolve, 10000));
  await requestNativeScript.get('stop').arrayBuffer(); 
  const output = await requestNativeScript.get('dir').getFile('output.webm',{create:false})
  const file = await output.getFile(); // result
  // pass file.arrayBuffer() to new Blob to open underlying data in file
  // do stuff with captured system audio as WAV, Opus, Opus in WebM, any container or codec the native system supports
  console.log(output, file, URL.createObjectURL(new Blob([await file.arrayBuffer()], {type:file.type})));
})
```





