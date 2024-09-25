document.addEventListener('keydown', function(event) { 
    browser.storage.sync.get(['enabled', 'onlyPersian']).then(function(result) {
        if (result.enabled !== false) {
            const persianKeys = /^[آ-ی]$/;
            const englishKeys = /^[a-zA-Z]$/;

            let textarea = document.getElementById('prompt-textarea');
            let paragraph = document.querySelector('#prompt-textarea p');

            if (textarea && paragraph) {
                if (result.onlyPersian === true) {
                    textarea.style.direction = "rtl";
                    textarea.style.textAlign = "right";
                    paragraph.style.direction = "rtl";
                    paragraph.style.textAlign = "right";

                    if (englishKeys.test(event.key)) {
                        event.preventDefault();
                    }
                } else {
                    if (persianKeys.test(event.key)) {
                        textarea.style.direction = "rtl";
                        textarea.style.textAlign = "right";
                        paragraph.style.direction = "rtl";
                        paragraph.style.textAlign = "right";
                    } else if (englishKeys.test(event.key)) {
                        textarea.style.direction = "ltr";
                        textarea.style.textAlign = "left";
                        paragraph.style.direction = "ltr";
                        paragraph.style.textAlign = "left";
                    }
                }
            }
        }
    });
});

browser.storage.sync.get('hoverRtlPopup').then(function(result) {
  if (result.hoverRtlPopup) {
    let responses = document.querySelectorAll('.markdown');

    responses.forEach(function(response) {
      response.addEventListener('mouseenter', function() {
        if (isPersian(response.innerText) && window.getComputedStyle(response).direction !== 'rtl') {
          showRtlPopup(response.innerText, event.pageX, event.pageY);
        }
      });

      response.addEventListener('mouseleave', function() {
        removeRtlPopup();
      });
    });
  }
});

function showRtlPopup(text, x, y) {
  let popup = document.createElement('div');
  popup.id = 'rtl-popup';
  popup.style.position = 'absolute';
  popup.style.left = `${x + 10}px`;
  popup.style.top = `${y + 10}px`;
  popup.style.backgroundColor = '#333';
  popup.style.color = '#fff';
  popup.style.padding = '10px';
  popup.style.borderRadius = '5px';
  popup.style.direction = 'rtl';
  popup.style.textAlign = 'right';
  popup.innerText = text;
  document.body.appendChild(popup);
}

function removeRtlPopup() {
  let popup = document.getElementById('rtl-popup');
  if (popup) {
    popup.remove();
  }
}

function isPersian(text) {
  let persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(text);
}
