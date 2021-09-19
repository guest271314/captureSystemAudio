onload = async () => {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const id = 'capture_system_audio';
  let port = chrome.runtime.connectNative(id);
  let done = false;
  // Chromium 96: onMessage event handler dispatched after disconnect()
  const handleMessage = ({ value }) => {
    return writer
      .write(new Uint8Array(base64ToBytesArr(value)))
      .catch((err) => {
        console.log(err.message, performance.now());
        parent.postMessage('Done.', name);
        if ('gc' in globalThis) gc();
        return false;
      });
  };
  await writer.ready;
  port.onDisconnect.addListener(async (e) => {
    console.log(e);
  });
  port.onMessage.addListener(handleMessage);
  onmessage = async (e) => {
    const { type, message } = e.data;
    if (type === 'start') {
      port.postMessage({
        message,
      });
      parent.postMessage(readable, name, [readable]);
    }
    if (type === 'stop') {
      console.log(type, message, port);
      if (port) {
        port.disconnect(id);
      }
    }
  };
  parent.postMessage('Ready.', name);
};
