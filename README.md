# captureSystemAudio
Capture system audio (["What-U-Hear"](https://wiki.archlinux.org/index.php/PulseAudio/Examples#ALSA_monitor_source)) 

> To be able to record from a monitor source (a.k.a. "What-U-Hear", "Stereo Mix"), use `pactl` list to find out the name of the source in PulseAudio (e.g. `alsa_output.pci-0000_00_1b.0.analog-stereo.monitor`). 

<h5>Background</h5>

Based on the results of testing default implementation and experiments with different approaches to get access to the device within the scope of API's shipped with the browser it is not possible to select `Monitor of <device>` at Chromium at Linux, which is not exposed at `getUserMedia()` UI prompt or at `enumerateDevices()` after permission to capture audio is granted, without manually setting the device to `Monitor of <device>` _during_ recording a `MediaStream` from `getUserMedia({audio: true})` at PulseAudio sound settings GUI `Recording` tab. Once that user action is performed outside of the browser at the OS the setting becomes persistent where subsequent calls to `getUserMedia({audio: true})`. To capture microphone input after manually setting the `Monitor of <device>` at PulseAudio sound settings GUI the user must perform the procedure in reverse by recording a `MediaStream` and setting the device back to the default `Built-in <device>` _during_ capture of a `MediaStream` from `getUserMedia({audio: true})`.

Firefox supports selection of `Monitor of <device>` at `getUserMedia()` at Linux at the UI prompt by selecting the device from `enumerateDevices()` after permission is granted for media capture at first `getUserMedia()` and  `getUserMedia()` is executed a second time with the `deviceId` of `Monitor of <device>` from `MediaDeviceInfo` object constraint set `{audio:{deviceId:{exact:device.deviceId}}}`. 

Firefox and Chromium do not support system or application capture of system audio at `getDisplayMedia({video: true, audio: true})` at Linux.

Chrome on Windows evidently does to support the user selecting audio capture at `getDisplayMedia({video: true, audio: true})` UI prompt.

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

Create a local folder in `/home/user/localscripts` containing the files in this repository, run the command

`$HOME/notify.sh & chromium-browser --enable-experimental-web-platform-features && killall -q -9 inotifywait`

to start `inotifywait` watching two `.txt` files in the directory for open events and launches Chromium.

To start system audio capture at the browser open the local file `captureSystemAudio.txt`, to stop capture by open the local file `stopSystemAudioCapture.txt`, where each file contains one space character, then get the captured audio from local filesystem using `<input type="file">` or where implemented Native File System `showDirectoryPicker()`.

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

at JavaScript use `HTMLMediaElement`, `MediaSource` to capture `timeSlice` seconds, minutes, hours, or, given unlimited computational resources, an infinite stream of system audio output

```
  captureSystemAudio()
  .then(async requestNativeScript => {
    const audio = new Audio();
    let mediaStream, mediaRecorder;
    audio.controls = audio.autoplay = audio.muted = true;
    audio.onloadedmetadata = _ => {
      console.log(audio.duration, ms.duration);
      mediaStream = audio.captureStream();
      mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitrateMode: 'cbr'
      });
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
            return reader
              .read()
              .then(processFileStream)
              .catch(e => {
                throw e;
              });
          });
      }
      while (true) {
        try {
          const output = await requestNativeScript
            .get('dir')
            .getFile('output.webm', { create: false });
          const file = await output.getFile();
          const slice = file.slice(offset, file.size);
          // native application could already be writing file
          // file can be 669 bytes before written to local filesystem by ffmpeg
          // wait until File.size > 0
          if (slice.size > 0) {
            slice.stream().pipeTo(writable, { preventClose: stop === false });
          }
          offset = file.size;
          if (!start) {
            start = true;
            // do stuff with fileBits
            readFileStream().catch(e => {
              throw e;
            });
          }
          yield;
        } catch (e) {
          // handle DOMException:
          // A requested file or directory could not be found at the time an operation was processed.
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
  
<h5>Launch pavucontrol to select audio device</h5>

Where it is currently not possible to select `"Monitor of Built-in Audio Analog Stereo"` at Chromium implementation of media capture by default, launch [`pavucontrol`](https://gitlab.freedesktop.org/pulseaudio/pavucontrol) `Recording` tab using `pavucontrol -t 2` after `getUserMedia({audio: true})` for capability to change the audio device being captured dynamically, e.g., from default microphone `"Built-in Audio Analog Stereo"` to `"Monitor of Built-in Audio Analog Stereo"` ("What-U-Hear") 

<img src="./pavucontrol.png" alt="pavucontrol audio device selection">

```
async function chromiumLinuxSetAudioCaptureDevice() {
  try {
    const requestNativeScript = new Map();
    const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
    requestNativeScript.set(
      'wait',
      (ms = 50) => new Promise(resolve => setTimeout(resolve, ms))
    );
    requestNativeScript.set(
      'dir',
      await self.showDirectoryPicker()
    );
    requestNativeScript.set(
      'status',
      await requestNativeScript.get('dir').requestPermission({ writable: true })
    );
    requestNativeScript.set(
      'start',
      await (
        await requestNativeScript
          .get('dir')
          .getFile('openpavucontrol.txt', { create: false })
      ).getFile()
    );
    requestNativeScript.set(
      'stop',
      await (
        await requestNativeScript
          .get('dir')
          .getFile('closepavucontrol.txt', { create: false })
      ).getFile()
    );
    
    const executeNativeScript = await requestNativeScript
      .get('start')
      .arrayBuffer();
    return {requestNativeScript, mediaStream};
  } catch (e) {
    throw e;
  }
}
chromiumLinuxSetAudioCaptureDevice()
.then(({
  requestNativeScript, mediaStream
}) => {
  // do stuff with MediaStream, MediaStreamTrack
  // after selecting specific device at pavucontrol Recording tab
  console.log(mediaStream, requestNativeScript);
  const recorder = new MediaRecorder(mediaStream);
  recorder.start();
  recorder.ondataavailable = e => console.log(URL.createObjectURL(e.data));
  setTimeout(_ => recorder.stop(), 30000);
});
```

<h5>Native Messaging</h5>

<h6>launch_pavucontrol</h6>

To launch `pavucontrol` or `pavucontrol-qt` using Native Messaging open a terminal, `cd` to `native_messaging/host` folder, open `launch_pavucontrol.json` and substitute aboslute path to `launch_pavucontrol.sh` for `"HOST_PATH"`, then run the commands

```
$ cp launch_pavucontrol.json ~/.config/chromium/NativeMessagingHosts # Chromium, Chrome user configuration folder at Linux
$ chmod u+x launch_pavucontrol.sh
```

navigate to `chrome://extensions`, set `Developer mode` to on, click `Load unpacked` and select `app` folder.

Pin the app badge to the extension toolbar (it might be necessary to enable Extentions Toolbar Menu at `chrome://flags/#extensions-toolbar-menu`). When the  browser action of clicking the icon occurs `pavucontrol` (or, if installed and set in `launch_pavucontrol.sh`, `pavucontrol-qt`) will be launched. When no audio  device is being captured the `Recording` tab will be empty. When `navigator.getUserMedia({audio: true})` is executed a list populate the `Recording` tab where the user can check a device that will be dynamically set as the device being captured by  `getUserMedia({audio: true})`, using `pavucontrol-qt`

<img src="./launch_pavucontrol_native_messaging.png" alt="launch pavucontrol">

<img src="./launch_pavucontrol_native_messaging_1.png" alt="pavucontrol before getUserMedia({audio: true})">

<img src="./launch_pavucontrol_native_messaging_2.png" alt="pavucontrol after getUserMedia({audio: true}), dynamic audio device capture selection">

<h6>file_stream</h6>

Set permissions for `.js`, `.sh` files in `host` folder to executable. 

Set `"HOST_PATH"` in `host/native_messaging_file_stream.json` to absolute path to `host/native_messaging_file_stream.js`.

Copy `native_messaging_file_stream.json` to `~/.config/chromium/NativeMessagingHosts`. 

Click `Load unpacked` at `chrome://extensions`, select `app` folder. 

To set permission to communicate with Native Messaging on a web page run `app/set_externally_connectable.js` at `console`, select `app` directory to update `app/manifest.json`, then reload `background.js` at extensions tab GUI or using `chrom.runtime.reload()` at DevTools chrome-extension URL.


<b>Usage</b>

Select `app` directory at Native File System prompts for read and write access to local filesystem where raw PCM of system audio output is written to a file using  `parec` while reading the file during the write using Native File System, storing the data in shared memory, parsing input data in `AudioWorklet` connected to `MediaStreamTrack` outputting the captured system audio. 

```
onclick = async _ => {
  onclick = null;
  // pass seconds, capture 9 minutes of system audio output
  captureSystemAudio(60 * 9);
  // do stuff with MediaStreamTrack of system audio capture
    .then(async track => {
      const stream = new MediaStream([track]);
      const recorder = new MediaRecorder(stream);
      recorder.start();
      recorder.onstart = recorder.onstop = e => console.log(e);
      stream.oninactive = stream.onactive = e => console.log(e);
      track.onmute = track.onunmute = track.onended = e => console.log(e);
      console.log(recorder, stream, track);
      recorder.ondataavailable = async e => {
        console.log(e.data);
      };
    })
    .catch(console.error);
};
```

<h6>Web Accessible Resources, Transferable Streams, Media Capture Transform ("Breakout Box")</h6>

Utilize Chromium extension with `"web_accessible_resources"` set to an HTML file that we load as an `<iframe>` in Web pages listed in `"matches"`. Stream from Native Messaging host to `<iframe>`, enqueue data in a `ReadableStream` then transfer the stream to `parent` with `postMessage()`, read the stream in "real-time", write values to a `MediaStreamTrackGenerator`.

Download the directory [capture_system_audio](https://github.com/guest271314/captureSystemAudio/tree/master/native_messaging/capture_system_audio), set "Developer mode" to on at `chrome://extensions`, click "Load unpacked". Use `background_transferable.js`.

Note the generated extension ID and substitute that value for `<id>` in `capture_system_audio.json`.
  
Set `.py`, or `.js` Native Messaging host file to executable `chmod u+x <host>`. Compile C and C++ versions. 

Hosts should each produce the same result. Kindly file an issue if you find they do not.

- C [capture_system_audio.c](https://github.com/guest271314/captureSystemAudio/blob/master/native_messaging/capture_system_audio/capture_system_audio.c)
- C++ [capture_system_audio.cpp](https://github.com/guest271314/captureSystemAudio/blob/master/native_messaging/capture_system_audio/capture_system_audio.cpp)
- Python3 [capture_system_audio.py](https://github.com/guest271314/captureSystemAudio/blob/master/native_messaging/capture_system_audio/capture_system_audio.py)
- JavaScript (Node.js) [capture_system_audio_node.js](https://github.com/guest271314/captureSystemAudio/blob/master/native_messaging/capture_system_audio/capture_system_audio_node.js)
- JavaScript (QuickJS) [capture_system_audio.js](https://github.com/guest271314/captureSystemAudio/blob/master/native_messaging/capture_system_audio/capture_system_audio.js)

Adjust `"path"` in `capture_system_audio.json` to location of (compiled) executable.

Copy Native Messaging manifest to Chromium 
or Chrome configuration folder

`cp capture_system_audio.json ~/.config/chromium/NativeMessagingHosts`

or

`cp capture_system_audio.json ~/.config/google-chrome-unstable/NativeMessagingHosts`

At `console` or Sources -> Snippets at origins set in `"matches"` in `manifest.json`.

```
var audioStream = new AudioStream(
  'parec -d @DEFAULT_MONITOR@', 'audio/webm;codecs=opus' // 'audio/mp3'
);
// audioStream.mediaStream: live MediaStream
audioStream
  .start()
  .then((ab) => {
    // ab: ArrayBuffer representation of WebM file from MediaRecorder
    console.log(
      URL.createObjectURL(
        new Blob([ab], {
          type: 'audio/webm;codecs=opus',
        })
      )
    );
  })
  .catch(console.error);
// stop capturing system audio output
audioStream.stop();
```

Alternatively, click extension icon to start/stop system audio output capture.

<h6>Dynamically set and use "externally_connectable", Media Capture Transform ("Breakout Box")</h6>

Set `capture_system_audio.js` and `set_externally_connectable.js` executable. Follow same steps in [Web Accessible Resources, Transferable Streams, Media Capture Transform ("Breakout Box")](https://github.com/guest271314/captureSystemAudio#web-accessible-resources-transferable-streams-media-capture-transform-breakout-box) to set `"path"` in `capture_system_audio.json` and `set_externally_connectable.json` and copy the files to Chrome/Chromium configuration directory.

On click of action icon the current origin will be stored in a variable and the `manifest.json` will be overwritten with current origin pushed to `"matches"` array in `"externally_connectable"`.

To unset origins, pass empty array or array containing origins expected to be set in `manifest.json` in a copy of `manifest.json` to `chrome.runtime.sendNativeMessage('set_externally_connectable', manifest)`.


<h5>PulseAudio module-remap-source</h5>

This article [Virtual microphone using GStreamer and PulseAudio](https://aweirdimagination.net/2020/07/19/virtual-microphone-using-gstreamer-and-pulseaudio/) describes a workaround Chrome and Chromium browsers' refusal to list or capture monitor devices on Linux

> <b>Remap source</b>
>
> While the null sink automatically includes a "monitor" source, many programs know to exclude monitors when listing microphones. To work around that, the [module-remap-source](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/#module-remap-source) module lets us clone that source to another one not labeled as being a monitor:
>
> ```
> pactl load-module module-remap-source \ 
>     master=virtmic.monitor source_name=virtmic \ 
>     source_properties=device.description=Virtual_Microphone
> ```

we can run

```
pactl load-module module-remap-source \
  master=@DEFAULT_MONITOR@ \
  source_name=virtmic source_properties=device.description=Virtual_Microphone
```

and then at Chromium and Chrome run

```
var recorder;
const devices = await navigator.mediaDevices.enumerateDevices();
const device = devices.find(({label})=>label === 'Virtual_Microphone');
const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: {
              exact: device.deviceId
            },
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
            channelCount: 2,
          },
        });
const [track] = stream.getAudioTracks();
console.log(devices, track.label, track.getSettings(), await track.getConstraints());
// do stuff with rempapped monitor device
recorder = new MediaRecorder(stream);
recorder.ondataavailable = e => console.log(URL.createObjectURL(e.data));
recorder.onstop = () => recorder.stream.getAudioTracks()[0].stop();
recorder.start();
setTimeout(()=>recorder.stop(), 10000);
```

to first get permission to read labels of devices, find the device we want to capture, capture the virtual microphone device, in this case a monitor device, see https://bugs.chromium.org/p/chromium/issues/detail?id=931749#c6.

When no microphone input devices are connected to the machine the remapped monitor device will be the default device `"Virtual_Microphone"` when `navigator.mediaDevices.getUserMedia({audio: true})` is executed the first time, negating the need to call `MediaStreamTrack.stop()` to stop capture of a microphone device just to get device access permission, then use `navigator.mediaDevices.enumerateDevices()` to get `deviceId` of monitor device, create a constraints object `{deviceId: {exact: device.deviceId}}` and call `navigator.mediaDevices.getUserMedia({audio: constraints})` a second time.

To set the default source programmatically to the virtual microphone `"virtmic"` `set-default-source` can be utilized
```
pactl set-default-source virtmic
```
if running, closing then restarting Chrome, Chromium, or Firefox, the device selected by `navigator,mediaDevices.getUserMedia({audio: true})`, unless changed by selection or other setting, will be the remapped monitor device `"Virtual_Microphone"`.

When `echoCancellation` is set to true and `channelCount` is not explicitly set to `2`, respectively, `channelCount` of audio `MediaStreamTrack` will always be `1`.

Related: When `channelCount` is set to `2` and `echoCancellation` is set to `true`, only silence is captured by `MediaRecorder`.

Explicitly set `channelCount` to `2`, `echoCancellation` to `false` in audio constraints to capture 2 channels, when available.

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
- https://gitlab.freedesktop.org/pulseaudio/pavucontrol/-/issues/82
- https://github.com/WebAudio/web-audio-api-v2/issues/97
- https://gist.github.com/guest271314/04a539c00926e15905b86d05138c113c
- https://github.com/guest271314/setUserMediaAudioSource
- https://gist.github.com/guest271314/53e00c6765aa256362fb52c08e82d189#file-capture_monitor_devices_at_chromium_and_chrome_on_linux-md
- https://www.freedesktop.org/wiki/Software/PulseAudio/FAQ/
- https://bugs.chromium.org/p/chromium/issues/detail?id=453876
