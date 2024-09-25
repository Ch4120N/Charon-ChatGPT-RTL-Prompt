document.addEventListener('DOMContentLoaded', function () { 
  let toggleExtension = document.getElementById('toggle-extension');
  let onlyPersian = document.getElementById('only-persian');
  let hoverRtlPopup = document.getElementById('hover-rtl-popup');
  let resetButton = document.getElementById('reset-settings');

  // بارگذاری تنظیمات از storage
  browser.storage.sync.get(['enabled', 'onlyPersian', 'hoverRtlPopup']).then(function(result) {
    toggleExtension.checked = result.enabled !== false;
    onlyPersian.checked = result.onlyPersian === true;
    hoverRtlPopup.checked = result.hoverRtlPopup === true;
  });

  // فعال/غیرفعال کردن افزونه
  toggleExtension.addEventListener('change', function() {
    browser.storage.sync.set({ enabled: toggleExtension.checked });
  });

  // فعال/غیرفعال کردن حالت "فقط فارسی"
  onlyPersian.addEventListener('change', function() {
    browser.storage.sync.set({ onlyPersian: onlyPersian.checked });
  });

  // فعال/غیرفعال کردن پاپ‌آپ RTL در هاور
  hoverRtlPopup.addEventListener('change', function() {
    browser.storage.sync.set({ hoverRtlPopup: hoverRtlPopup.checked });
  });

  // تنظیمات به حالت پیش‌فرض برگردانید
  resetButton.addEventListener('click', function() {
    browser.storage.sync.set({ enabled: true, onlyPersian: false, hoverRtlPopup: false });
    toggleExtension.checked = true;
    onlyPersian.checked = false;
    hoverRtlPopup.checked = false;
  });
});
