chrome.action.onClicked.addListener(async (tab) => {
  if (!(await chrome.storage.local.get('tabId')).tabId) {
    await chrome.storage.local.set({ tabId: tab.id });
  }
  chrome.scripting.executeScript({
    target: {
      tabId: (await chrome.storage.local.get('tabId')).tabId,
    },
    world: 'MAIN',
    files: ['./audioStream.js'],
  });
  if ((await chrome.action.getTitle({})) === 'Capture system audio') {
    await chrome.action.setIcon({ path: './media-playback-stop-1-32x32.png' });
    await chrome.action.setTitle({ title: 'Capturing system audio' });
  } else {
    await chrome.action.setIcon({ path: './media-record-1-32x32.png' });
    await chrome.action.setTitle({ title: 'Capture system audio' });
  }
});
