document.addEventListener('DOMContentLoaded', () => {
    const noActionBtn = document.getElementById('no-action');
    const pullLeverBtn = document.getElementById('pull-lever');
    const resultsBox = document.getElementById('results-box');
    const outcomeText = document.getElementById('outcome-text');
    const percentageFill = document.getElementById('percentage-fill');
    const percentageText = document.getElementById('percentage-text');
    const shopAgainBtn = document.getElementById('shop-again');

    // Retrieve stored data or initialize if not found
    let pullCount = parseInt(localStorage.getItem('q6PullCount')) || 0;
    let noActionCount = parseInt(localStorage.getItem('q6NoActionCount')) || 0;

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

    // Handle "No Action" button click (Release the AI)
    noActionBtn.addEventListener('click', () => {
        noActionCount++;
        localStorage.setItem('q6NoActionCount', noActionCount);
        const percentage = calculatePercentage(pullCount, noActionCount);
        const message = "You released the AI, eradicating hunger but causing mass unemployment and global upheaval.";
        showResult(message, 100 - percentage);
    });

    // Handle "Pull Lever" button click (Withhold the AI)
    pullLeverBtn.addEventListener('click', () => {
        pullCount++;
        localStorage.setItem('q6PullCount', pullCount);
        const message = "You withheld the AI, preserving jobs but allowing ongoing suffering and inequality.";
        const percentage = calculatePercentage(pullCount, noActionCount);
        showResult(message, percentage);
    });

    // Reset counts and go back to the main page
    shopAgainBtn.addEventListener('click', () => {
        window.location.href = "index.html";
    });
});
