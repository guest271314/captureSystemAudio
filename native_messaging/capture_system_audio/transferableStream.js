onload = async () => {
  chrome.runtime.sendNativeMessage(
    'capture_system_audio',
    {},
    async (nativeMessage) => {
      parent.postMessage(nativeMessage, name);
      await new Promise((resolve) => setTimeout(resolve, 20));
      parent.postMessage('Ready.', name);
      onmessage = async (e) => {
        if (e.data instanceof ReadableStream) {
          const { value: file, done } = await e.data.getReader().read();
          const fd = new FormData();
          const stdin = await file.text();
          fd.append(file.name, stdin);
          const { body } = await fetch('http://localhost:8000', {
            method: 'post',
            body: fd,
            cache: 'no-store',
          });
          parent.postMessage(body, name, [body]);
        }

        if (e.data === 'Abort.') {
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
