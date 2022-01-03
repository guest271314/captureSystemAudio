onload = () => {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const id = 'capture_system_audio';
  let port = chrome.runtime.connectNative(id);
  let handleMessage = async (value) => {
    try {
      if (writable.locked) {
        await writer.ready;
        await writer.write(new Uint8Array(JSON.parse(value)));
      }
    } catch (e) {
      console.warn(e.message);
    }
  };
  port.onDisconnect.addListener(async (e) => {
    console.warn(e.message);
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
      try {
        await writer.close();
        await writer.closed;
        console.log('Writer closed.');
        writer.releaseLock();
        port.onMessage.removeListener(handleMessage);
        port.disconnect(id);
        port = null;
        parent.postMessage(0, name);
        onmessage = null;
        await chrome.storage.local.clear();
      } catch (err) {
        console.warn(err.message);
      }
    }
  };
  parent.postMessage(1, name);
};
