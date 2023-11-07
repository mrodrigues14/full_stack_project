// app.js
const express = require('express');
const scrapeAmazon = require('./scraper'); 

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/scrape', async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).send('Keyword is required');
    }
    try {
      const products = await scrapeAmazon(keyword);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error occurred while scraping', error: error.toString() });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
