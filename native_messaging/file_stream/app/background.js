const id = 'native_messaging_file_stream';
const port = chrome.runtime.connectNative(id);
console.log(port);
chrome.runtime.onConnectExternal.addListener(externalPort => {
  const handleMessage = message => {
    externalPort.postMessage(message);
    if (message.done) {
      chrome.runtime.reload();
    }
  };
  port.onMessage.addListener(handleMessage);
  externalPort.onMessage.addListener(nativeMessage => {
    console.log({ nativeMessage });
    port.postMessage(nativeMessage);
  });
});
