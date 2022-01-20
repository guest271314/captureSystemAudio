onload = () => {
  const { readable, writable } = new TransformStream({
    transform(value, c) {
      c.enqueue(value);
    }, 
    flush() {
      console.log('Flush.');
    }
  });
  const writer = writable.getWriter();
  const id = 'capture_system_audio';
  let port = chrome.runtime.connectNative(id);
  let handleMessage = async (value) => {   
    try {
      if (writable.locked) {
        await writer.ready;
        await writer.write(new Uint8Array(JSON.parse(value)));
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
    }
    return true;
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
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  parent.postMessage(1, name);
};
