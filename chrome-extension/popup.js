let invoiceValue;

document.addEventListener('DOMContentLoaded', () => {
  const timerButton = document.getElementById('timer-button');

  if (timerButton) {
    // Initial display
    chrome.runtime.sendMessage({ action: 'getTimer' }, (response) => {
      if (response.totalSeconds < response.firstSecond) {
        updateTimerDisplay(timerButton);
      } else {
        timerButton.innerHTML = 'Start Timer';
      }
    });

    timerButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'startTimer', value: invoiceValue }, (response) => {
        console.log('Response from background script:', response);
        if (response.status === 'timer started') {
          updateTimerDisplay(timerButton);
        }
      });
    });
  } else {
    console.error('Timer button not found');
  }

  var btn01 = document.querySelector('#btn');
  if (btn01) {
    btn01.addEventListener("click", assa);
    btn01.addEventListener("click", assa1);
  } else {
    console.error('btn01 not found');
  }
});

function updateTimerDisplay(buttonElement) {
  chrome.runtime.sendMessage({ action: 'getTimer' }, (response) => {
    if (response.totalSeconds >= 0) {
      const minutes = Math.floor(response.totalSeconds / 60);
      const seconds = response.totalSeconds % 60;
      buttonElement.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      
      if (response.totalSeconds > 0) {
        setTimeout(() => updateTimerDisplay(buttonElement), 1000);
      } else {
        buttonElement.innerHTML = 'Time\'s up!';
      }
    }
  });
}

function assa(e){
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const activeTabId = tabs[0].id;
    
    chrome.scripting.executeScript(
      {
        target: {tabId: activeTabId},
        func: () => {
          document.querySelector('#invoice_no_0').value = '123123';
        }
      },
      (results) => {
        console.log('Script executed.');
      }
    );
  });
}

function assa1(e) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTabId = tabs[0].id;

    chrome.scripting.executeScript(
      {
        target: { tabId: activeTabId },
        func: () => {
          return document.querySelector('#invoice_no_1').value;
        }
      },
      (results) => {
        if (results && results[0]) {
          invoiceValue = results[0].result;
          alert('Invoice No: ' + invoiceValue);

          // Start the timer with the value obtained
          chrome.runtime.sendMessage({ action: 'startTimer', value: invoiceValue }, (response) => {
            console.log('Response from background script:', response);
            if (response.status === 'timer started') {
              updateTimerDisplay(document.getElementById('timer-button'));
            }
          });
        }
      }
    );
  });
}
