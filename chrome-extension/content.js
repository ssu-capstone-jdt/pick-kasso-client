console.log('Content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request);
  if (request.action === 'startTimer') {
    let timerElement = document.createElement('div');
    timerElement.id = 'three-minute-timer';
    timerElement.innerHTML = '3:00';
    timerElement.style.position = 'fixed';
    timerElement.style.top = '10px';
    timerElement.style.right = '10px';
    timerElement.style.backgroundColor = '#fff';
    timerElement.style.padding = '10px';
    timerElement.style.border = '1px solid #000';
    timerElement.style.zIndex = '9999';
    document.body.appendChild(timerElement);

    let totalSeconds = 180;
    const interval = setInterval(() => {
      totalSeconds--;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      timerElement.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      if (totalSeconds <= 0) {
        clearInterval(interval);
        timerElement.innerHTML = 'Time\'s up!';
      }
    }, 1000);
  }
  sendResponse({ status: 'timer started' });
});
