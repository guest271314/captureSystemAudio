onload = () => {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const id = 'capture_system_audio';
  const port = chrome.runtime.connectNative(id);
  // Chromium 96: onMessage event handler dispatched after disconnect()
  const handleMessage = ({ value, done }, p) => {
    return writer.write(new Uint8Array(base64ToBytesArr(value)))
      .catch((err) => {
        console.log(err.message, performance.now());
        parent.postMessage('Done.', name);
        port.disconnect(id);
        if ('gc' in globalThis) gc();
        return false;
      });
  };
  port.onDisconnect.addListener((e) => {
    console.log(e);
  });
  port.onMessage.addListener(handleMessage);
  onmessage = (e) => {
    const { type, message } = e.data;
    if (type === 'start') {
      port.postMessage({
        message,
      });
      parent.postMessage(readable, name, [readable]);
    }
    if (type === 'stop') {
      console.log(type, message, port);
      port.disconnect(id);
    }
  };
  parent.postMessage('Ready.', name);
};
