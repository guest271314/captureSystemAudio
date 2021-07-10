onload = async () => {
  chrome.runtime.sendNativeMessage(
    'capture_system_audio',
    {},
    async (nativeMessage) => {
      parent.postMessage(nativeMessage, name);
      await new Promise((resolve) => setTimeout(resolve, 20));
      parent.postMessage('Ready.', name);
      const controller = new AbortController();
      const { signal } = controller;
      signal.onabort = (e) => console.log(e);
      onmessage = async (e) => {
        if (e.data instanceof ReadableStream) {
          try {
            const { value: file, done } = await e.data.getReader().read();
            const fd = new FormData();
            const stdin = await file.text();
            fd.append(file.name, stdin);
            const { body } = await fetch('http://localhost:8000', {
              method: 'post',
              body: fd,
              cache: 'no-store',
              signal,
            });
            parent.postMessage(body, name, [body]);
          } catch (err) {
            console.error(err);
          }
        }
        if (e.data === 'Abort.') {
          controller.abort();
          chrome.runtime.sendNativeMessage(
            'capture_system_audio',
            {},
            (nativeMessage) => {
              parent.postMessage(nativeMessage, name);
            }
          );
        }
      };
    }
  );
};
