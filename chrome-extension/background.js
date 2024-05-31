let timerInterval;
let totalSeconds = 180;
let invoiceValue; 

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
    const value = request.value || 180; // request로부터 initialValue를 가져옴
    startTimer(value);
    sendResponse({ status: 'timer started' });
  } else if (request.action === 'getTimer') {
    sendResponse({ totalSeconds, firstSecond });
  }
});

function startTimer(initialValue) {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  totalSeconds = initialValue || 180; // 초기값 설정, 기본값은 180초
  firstSecond = totalSeconds;

  timerInterval = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      totalSeconds = 0;
    }
  }, 1000);
}
