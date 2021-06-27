chrome.action.onClicked.addListener(() => 
  chrome.runtime.sendNativeMessage('capture_system_audio'
  , {}, (nativeMessage) => console.log({nativeMessage}))
);
