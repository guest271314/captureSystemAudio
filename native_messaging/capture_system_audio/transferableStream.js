onload = async () => {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const id = 'capture_system_audio';
  const port = chrome.runtime.connectNative(id);
  const disconnect = async () => {
    if (port.onMessage.hasListener(handleMessage)) {
      port.onMessage.removeListener(handleMessage);
      parent.postMessage('Done.', name);
      onmessage = null;
      await writer.abort();
    }
    return port.disconnect(id);
  };
  const handleMessage = async (value) => {
    try {
      await writer.ready;
      await writer.write(new Uint8Array(JSON.parse(value)));
    } catch (err) {
      console.warn(err.message);
      try {
        await disconnect();
      } catch (e) {
        console.warn(e.message);
      }
    }
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
      console.log(type);
      return await disconnect();
    }
  };
  parent.postMessage('Ready.', name);
};
