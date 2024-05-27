document.addEventListener('DOMContentLoaded', () => {
  const timerButton = document.getElementById('timer-button');

  if (timerButton) {
    // Initial display
    chrome.runtime.sendMessage({ action: 'getTimer' }, (response) => {
      if (response.totalSeconds < 180) {
        updateTimerDisplay(timerButton);
      } else {
        timerButton.innerHTML = 'Start Timer';
      }
    });

    timerButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'startTimer' }, (response) => {
        console.log('Response from background script:', response);
        if (response.status === 'timer started') {
          updateTimerDisplay(timerButton);
        }
      });
    });
  } else {
    console.error('Timer button not found');
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
