# captureSystemAudio
Capture system audio (["What-U-Hear"](https://wiki.archlinux.org/index.php/PulseAudio/Examples#ALSA_monitor_source)) 

> To be able to record from a monitor source (a.k.a. "What-U-Hear", "Stereo Mix"), use `pactl` list to find out the name of the source in PulseAudio (e.g.  alsa_output.pci-0000_00_1b.0.analog-stereo.monitor`). 
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
- https://github.com/web-platform-tests/wpt/issues/23084
- https://github.com/w3c/mediacapture-screen-share/issues/140

<h5>Synopsis</h5>

Open local files watched by `inotifywait` from [inotify-tools](https://github.com/inotify-tools/inotify-tools) to capture audio monitor device at Linux, pipe output to a local file, stop audio capture, and get the resulting file.

<h5>Dependencies</h5>

`pacat`, `inotify-tools`.

<h6>Optional</h6>

`opus-tools`, `mkvtoolnix`, `ffmpeg` or other native code application or to convert WAV to Opus or different codec and write track to Matroska, WebM, or other media container supported at the system.

<h5>Usage</h5>

`$ ./notify.sh & chromium-browser --enable-experimental-web-platform-features && killall -q -9 inotifywait`

At the browser capture system audio, e.g., from `window.speechSynthesis.speak()` or `ffplay blade_runner.web` or `<video>` playing in an HTML document, et al., by opening the local file `captureSystemAudio.txt`, stop capture by opening the local file `stopSystemAudioCapture.txt`, where each file contains one space character, then get the captured audio from local filesystem using `<input type="file">` or where implemented Native File System `chooseFileSystemEntries()`.

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
  // do stuff with captured system audio as WAV, Opus, other codec and container the system supports
  console.log(output, file, URL.createObjectURL(new Blob([await file.arrayBuffer()], {type:file.type})));
})
.catch(e => console.error(e));
```





