// popup.js
document.getElementById('startScrape').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        if (currentTab) {
            // Send the current tab URL to the server for scraping
            fetch('http://localhost:3000/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: currentTab.url })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Scraping started:', data);
            })
            .catch(error => {
                console.error('Error starting scrape:', error);
            });
            alert('Scraping started!');
        }
    });
});

