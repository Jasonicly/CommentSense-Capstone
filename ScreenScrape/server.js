const express = require('express');
const scrapeReviews = require('./scrapeReviews');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json()); // Ensure you're parsing JSON request bodies

app.get('/', (req, res) => {
    res.send('Welcome to the Review Scraper!');
});

app.post('/scrape', async (req, res) => {
    try {
        const url = req.body.url; // Make sure you're reading the URL from the POST body
        console.log('Received URL for scraping:', url);
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const reviews = await scrapeReviews(url);
        const filePath = path.join(__dirname, 'reviews.json');

        fs.writeFile(filePath, JSON.stringify(reviews, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file: ' + err.message);
            }
            console.log('Reviews saved to', filePath);
            res.json(reviews);
        });
    } catch (error) {
        console.error("Error during scraping:", error);
        res.status(500).send('Error during scraping: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
