let timer = null;
let remainingTime = 0;
let timerFinished = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.clear();
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['timer', 'remainingTime'], (result) => {
    if (result.timer) {
      startBackgroundTimer(result.remainingTime);
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
    remainingTime = request.duration;
    timerFinished = false;
    startBackgroundTimer(remainingTime);
  } else if (request.action === 'getRemainingTime') {
    sendResponse({ remainingTime });
  } else if (request.action === 'timerFinished') {
    enableInvoiceNo2Button();
  }
});

function startBackgroundTimer(duration) {
  if (timer) {
    clearInterval(timer);
  }
  remainingTime = duration;
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      chrome.storage.local.remove(['timer', 'remainingTime']);
      enableInvoiceNo2Button();
    } else {
      remainingTime -= 1;
      chrome.storage.local.set({ remainingTime });
    }
  }, 1000);
  chrome.storage.local.set({ timer: true, remainingTime });
}

function enableInvoiceNo2Button() {
  if (timerFinished) return; // Prevent multiple alerts
  timerFinished = true;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const button2 = document.getElementById('invoice_no_2');
          if (button2)
          alert("타이머가 완료되었습니다");
        ;
        }
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else if (!results || !results[0]) {
          console.error('Failed to enable invoice_no_2 button');
        }
      });
    }
  });
}
