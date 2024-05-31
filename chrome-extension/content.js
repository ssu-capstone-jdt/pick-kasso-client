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
      startTimerFromInvoice(timerButton);
    });
  } else {
    console.error('Timer button not found');
  }

  const btn01 = document.querySelector('#btn');
  if (btn01) {
    btn01.addEventListener("click", assa);
    btn01.addEventListener("click", assa1);
  } else {
    console.error('btn01 not found');
  }

  getbutton();
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

function startTimerFromInvoice(buttonElement) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTabId = tabs[0].id;

    chrome.scripting.executeScript(
      {
        target: { tabId: activeTabId },
        func: () => document.querySelector('#invoice_no_1').value,
      },
      (results) => {
        if (results && results[0]) {
          const invoiceValue = results[0].result;
          alert('Invoice No: ' + invoiceValue);

          chrome.runtime.sendMessage({ action: 'startTimer', value: invoiceValue }, (response) => {
            if (response.status === 'timer started') {
              updateTimerDisplay(buttonElement);
            }
          });
        }
      }
    );
  });
}

function assa(e) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTabId = tabs[0].id;

    chrome.scripting.executeScript(
      {
        target: { tabId: activeTabId },
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
  startTimerFromInvoice(document.getElementById('timer-button'));
}

function getbutton() {
  const button = document.querySelector('#buttonid');
  if (button) {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener('click', () => {
      alert("Pick카소 타이머 사용 가능!" + num);
    });
    console.log("이벤트 리스너가 버튼에 추가되었습니다.");
  } else {
    console.log("버튼을 찾을 수 없습니다.");
  }
}

// 실행 시점에 getbutton 호출
getbutton();
