onload = () => {
  const { readable, writable } = new TransformStream({
    transform(value, controller) {
      controller.enqueue(value);
    },
    flush() {
      console.log('Flush.');
    },
  });
  const writer = writable.getWriter();
  const id = 'capture_system_audio';
  const port = chrome.runtime.connectNative(id);
  port.name = id;
  async function handleMessage(value, port) {
    if (!Array.isArray(value)) {
      value = JSON.parse(value);
    }
    try {
      await writer.ready;
      await writer.write(new Uint8Array(value));
    } catch (e) {
      console.error(e.message);
    }
    return true;
  }
  port.onDisconnect.addListener(async (e) => {
    console.log(e.message);
    await chrome.storage.local.clear();
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
        port.disconnect(id);
        console.log(writer.desiredSize, message);
        while (writer.desiredSize < 1) {
          await scheduler.postTask(() => {});
        }
        await writer.close();
        await writer.closed;
        console.log(writer.desiredSize);
        parent.postMessage(0, name);
        onmessage = null;
        await chrome.storage.local.clear();
      } catch (err) {
        console.error(err.message);
      }
    }
  };
  parent.postMessage(1, name);
};
