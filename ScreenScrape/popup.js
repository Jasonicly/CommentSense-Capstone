// popup.js
document.getElementById('startScrape').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'startScrape' }, function(response) {
        if (response.success) {
            console.log('Scraping started:', response.data);
        } else {
            console.error('Error starting scrape:', response.error);
        }
    });
});
