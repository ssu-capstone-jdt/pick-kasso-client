document.addEventListener('DOMContentLoaded', function() {
  const timerButton = document.getElementById('timerButton');
  const timerDiv = document.querySelector('body > div');

  chrome.runtime.sendMessage({ action: 'getRemainingTime' }, (response) => {
    if (response.remainingTime > 0) {
      updateButtonWithRemainingTime(response.remainingTime);
      startTimer(response.remainingTime);
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            const invoiceElement = document.getElementById('invoice_no_1');
            return {
              value: invoiceElement?.value,
              text: invoiceElement?.getAttribute('data-explanation')
            };
          }
        }, (results) => {
          if (results && results[0] && results[0].result) {
            const { value, text } = results[0].result;
            timerDiv.textContent = text;
            timerButton.textContent = formatTime(parseInt(value, 10));
            timerButton.disabled = false;
            timerButton.addEventListener('click', () => startTimer(parseInt(value, 10)));
          }
        });
      });
    }
  });

  function formatTime(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function updateButtonWithRemainingTime(duration) {
    timerButton.textContent = formatTime(duration);
    timerButton.disabled = true;
  }

  function startTimer(duration) {
    let timer = duration;
    timerButton.disabled = true;

    const interval = setInterval(() => {
      if (timer <= 0) {
        clearInterval(interval);
        chrome.runtime.sendMessage({ action: 'timerFinished' });
      } else {
        chrome.runtime.sendMessage({ action: 'getRemainingTime' }, (response) => {
          timer = response.remainingTime;
          timerButton.textContent = formatTime(timer);
        });
      }
    }, 1000);

    chrome.runtime.sendMessage({ action: 'startTimer', duration: timer });
  }
});
