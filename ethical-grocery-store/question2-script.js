document.addEventListener('DOMContentLoaded', () => {
    const noActionBtn = document.getElementById('no-action');
    const pullLeverBtn = document.getElementById('pull-lever');
    const resultsBox = document.getElementById('results-box');
    const outcomeText = document.getElementById('outcome-text');
    const percentageFill = document.getElementById('percentage-fill');
    const percentageText = document.getElementById('percentage-text');
    const shopAgainBtn = document.getElementById('shop-again');

    // Retrieve stored data or initialize if not found
    let pullCount = parseInt(localStorage.getItem('q2PullCount')) || 0;
    let noActionCount = parseInt(localStorage.getItem('q2NoActionCount')) || 0;

    // Utility function to calculate the percentage of pulls
    function calculatePercentage(pull, noAction) {
        const total = pull + noAction;
        if (total === 0) return 0;
        return Math.round((pull / total) * 100);
    }

    // Function to update and display the result
    function showResult(message, percentage) {
        // Hide buttons
        noActionBtn.style.display = 'none';
        pullLeverBtn.style.display = 'none';

        // Show results
        resultsBox.style.display = 'flex';
        outcomeText.textContent = message;
        percentageFill.style.width = percentage + "%";
        percentageText.textContent = percentage + "%";

        // Show shop again button
        shopAgainBtn.style.display = 'block';
    }

    // Handle "No Action" button click
    noActionBtn.addEventListener('click', () => {
        noActionCount++;
        localStorage.setItem('q2NoActionCount', noActionCount);
        const percentage = calculatePercentage(pullCount, noActionCount);
        const message = "You did nothing. The train ran over the five workers, resulting in their deaths.";
        showResult(message, 100 - percentage);
    });

    // Handle "Pull Lever" button click
    pullLeverBtn.addEventListener('click', () => {
        pullCount++;
        localStorage.setItem('q2PullCount', pullCount);
        const message = "You pulled the lever, sacrificing the promoted worker to save five others.";
        const percentage = calculatePercentage(pullCount, noActionCount);
        showResult(message, percentage);
    });

    // Reset counts and go back to the main page
    shopAgainBtn.addEventListener('click', () => {
        window.location.href = "index.html";
    });
});
