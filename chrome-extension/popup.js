document.addEventListener('DOMContentLoaded', function() {
  const timerButton = document.getElementById('timerButton');
  const timerDiv = document.querySelector('body > div');

  chrome.storage.local.get(['textContent', 'remainingTime'], (result) => {
    if (result.textContent) {
      timerDiv.textContent = result.textContent;
    }
    if (result.remainingTime > 0) {
      updateButtonWithRemainingTime(result.remainingTime);
    } else {
      timerButton.textContent = "타이머 완료";
      timerButton.classList.remove('large-number');
      timerButton.disabled = true;
    }
  });

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
          if (chrome.runtime.lastError) {
            timerDiv.textContent = "완료";
          } else if (results && results[0] && results[0].result) {
            const { value, text } = results[0].result;
            timerDiv.textContent = text;
            chrome.storage.local.set({ textContent: text });
            if (parseInt(value, 10) > 0) {
              timerButton.textContent = formatTime(parseInt(value, 10));
              timerButton.classList.add('large-number');
              timerButton.disabled = false;
              timerButton.addEventListener('click', () => startTimer(parseInt(value, 10)));
            } else {
              timerButton.textContent = "타이머 완료";
              timerButton.classList.remove('large-number');
              timerButton.disabled = true;
            }
          } else {
            timerDiv.textContent = "완료";
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
    timerButton.classList.add('large-number');
    timerButton.disabled = true;
  }

  function startTimer(duration) {
    let timer = duration;
    timerButton.disabled = true;

    const interval = setInterval(() => {
      if (timer <= 0) {
        clearInterval(interval);
        chrome.runtime.sendMessage({ action: 'timerFinished' });
        timerButton.textContent = "타이머 완료";
        timerButton.classList.remove('large-number');
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
