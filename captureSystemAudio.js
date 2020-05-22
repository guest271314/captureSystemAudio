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
