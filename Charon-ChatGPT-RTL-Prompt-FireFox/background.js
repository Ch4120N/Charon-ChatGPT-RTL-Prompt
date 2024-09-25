browser.runtime.onInstalled.addListener(() => { 
  browser.storage.sync.set({ enabled: true });
  
  browser.tabs.query({ url: "*://chatgpt.com/*" }).then((tabs) => {
    tabs.forEach((tab) => {
      browser.tabs.reload(tab.id);
    });
  });
});
