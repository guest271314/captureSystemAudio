onload = () => {
  const { readable, writable } = new TransformStream(
    {
      transform(value, c) {
        c.enqueue(value);
      },
      flush() {
        console.log('Flush.');
      },
    },
    {
      highWaterMark: 1,
      size(chunk) {
        return chunk.length;
      },
    },
    {
      highWaterMark: 1,
      size(chunk) {
        return chunk.length;
      },
    }
  );
  const writer = writable.getWriter();
  const id = 'capture_system_audio';
  let port = chrome.runtime.connectNative(id);
  async function handleMessage (value) {
    try {
      await writer.ready;
      await writer.write(new Uint8Array(JSON.parse(value)));
    } catch (e) {
      console.log(e);
    }
    return true;
  };
  port.onDisconnect.addListener((e) => {
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
        port.onMessage.removeListener(handleMessage);
        port.disconnect(id);
        port = null;
        while (writer.desiredSize < 0) {
          await scheduler.postTask(() => {});
        }
        await writer.close();
        await writer.closed;
        writer.releaseLock();
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
