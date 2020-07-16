chrome.browserAction.setBadgeText({text:'pavucontrol'});
chrome.browserAction.onClicked.addListener(tab => {
  const port = chrome.runtime.connectNative('launch_pavucontrol');
  console.log(tab, port);
  port.onMessage.addListener(_ => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message)
    };
  });
  port.onDisconnect.addListener(_ => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message)
    };
  });
  port.postMessage({});
});
