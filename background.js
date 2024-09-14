chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: true });
  // جستجو در تب‌های باز برای یافتن تب‌هایی با آدرس ChatGPT
  chrome.tabs.query({ url: "*://chatgpt.com/*" }, function(tabs) {
    tabs.forEach((tab) => {
      // رفرش کردن تب پیدا شده
      chrome.tabs.reload(tab.id);
    });
  });
});
