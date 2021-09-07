onload = async () => {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const port = chrome.runtime.connectNative(
    'capture_system_audio'
  );
  await writer.ready;
  port.onDisconnect.addListener(async (e) => {
    console.log(e);
  });
  port.onMessage.addListener(async ({ value, done }) => {
    try {
      await writer.write(new Uint8Array(base64ToBytesArr(value)));
    } catch (e) {
      parent.postMessage('Done.', name);
      port.disconnect();
      console.log(e.message);
      close();
    }
  });
  onmessage = async (e) => {
    const { type, message } = e.data;
    if (type === 'start') {
      port.postMessage({
        message,
      });
      parent.postMessage(readable, name, [readable]);
    }
  };
  parent.postMessage('Ready.', name);
};
