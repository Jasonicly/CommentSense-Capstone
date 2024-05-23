// background.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'startScrape') {
        // Perform the scraping action here
        fetch('http://localhost:3000/scrape')
            .then(response => response.json())
            .then(data => {
                sendResponse({ success: true, data: data });
            })
            .catch(error => {
                sendResponse({ success: false, error: error.toString() });
            });
        return true; // keep the messaging channel open for the response
    }
});
