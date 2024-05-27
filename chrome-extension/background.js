let timerInterval;
let totalSeconds = 180;

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
    startTimer();
    sendResponse({ status: 'timer started' });
  } else if (request.action === 'getTimer') {
    sendResponse({ totalSeconds });
  }
});

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  totalSeconds = 180;

  timerInterval = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      totalSeconds = 0;
    }
  }, 1000);
}
