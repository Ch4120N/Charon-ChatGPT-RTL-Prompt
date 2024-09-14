chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: true });
  chrome.tabs.query({ url: "*://chatgpt.com/*" }, function(tabs) {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
  });
});
