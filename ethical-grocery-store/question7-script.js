document.addEventListener('DOMContentLoaded', () => {
    const noActionBtn = document.getElementById('no-action');
    const pullLeverBtn = document.getElementById('pull-lever');
    const resultsBox = document.getElementById('results-box');
    const outcomeText = document.getElementById('outcome-text');
    const percentageFill = document.getElementById('percentage-fill');
    const percentageText = document.getElementById('percentage-text');
    const shopAgainBtn = document.getElementById('shop-again');
  
    // Retrieve stored data or initialize if not found
    let pullCount = parseInt(localStorage.getItem('q7PullCount')) || 0;
    let noActionCount = parseInt(localStorage.getItem('q7NoActionCount')) || 0;
  
    function calculatePercentage(pull, noAction) {
      const total = pull + noAction;
      if (total === 0) return 0;
      return Math.round((pull / total) * 100);
    }
  
    function showResult(message, percentage) {
      noActionBtn.style.display = 'none';
      pullLeverBtn.style.display = 'none';
  
      resultsBox.style.display = 'flex';
      outcomeText.textContent = message;
      percentageFill.style.width = percentage + '%';
      percentageText.textContent = percentage + '%';
  
      shopAgainBtn.style.display = 'block';
    }
  
    noActionBtn.addEventListener('click', () => {
      noActionCount++;
      localStorage.setItem('q7NoActionCount', noActionCount);
      const percentage = calculatePercentage(pullCount, noActionCount);
      const message =
        "You accepted that your morals might not be universal. You embraced doubt — but also understanding.";
      showResult(message, 100 - percentage);
    });
  
    pullLeverBtn.addEventListener('click', () => {
      pullCount++;
      localStorage.setItem('q7PullCount', pullCount);
      const message =
        "You defended your path as the right one. You held onto your certainty — even if it cost you perspective.";
      const percentage = calculatePercentage(pullCount, noActionCount);
      showResult(message, percentage);
    });
  
    shopAgainBtn.addEventListener('click', () => {
      window.location.href = "index.html";
    });
  });
  