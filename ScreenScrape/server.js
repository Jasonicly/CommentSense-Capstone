const express = require('express');
const scrapeReviews = require('./scrapeReviews');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Review Scraper!');
});

app.get('/scrape', async (req, res) => {
    try {
        const url = 'https://www.amazon.sg/Kleenex-Ultra-Tissue-200ct-packaging/dp/B072DY4R96/ref=cm_cr_arp_d_product_top?ie=UTF8';
        const reviews = await scrapeReviews(url);

        // Save to a JSON file
        const filePath = path.join(__dirname, 'reviews.json');
        fs.writeFile(filePath, JSON.stringify(reviews, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file: ' + err.message);
            }
            console.log('Reviews saved to', filePath);

            // Respond with the reviews JSON data
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
