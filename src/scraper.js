// scraper.js
const axios = require('axios');
const cheerio = require('cheerio');

const scrapeAmazon = async (keyword) => {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    try {
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      };
      const response = await axios.get(url, { headers });
      const $ = cheerio.load(response.data);
      const products = [];
  
      $('div.s-result-list div.s-result-item').each((index, element) => {
        const titleElement = $(element).find('h2 .a-link-normal');
        const ratingElement = $(element).find('.a-icon-alt');
        const numReviewsElement = $(element).find('.a-size-small .a-size-base');
        const imageElement = $(element).find('.s-image');
  
        const title = titleElement.text() ? titleElement.text().trim() : null;
        const rating = ratingElement.text() ? ratingElement.text().trim().split(' ')[0] : null;
        const numReviews = numReviewsElement.text() ? numReviewsElement.text().trim().replace(/,/g, '') : null;
        const imageUrl = imageElement.attr('src') ? imageElement.attr('src').trim() : null;
  
        if (title && rating && numReviews && imageUrl) {
          products.push({
            title,
            rating,
            numReviews,
            imageUrl
          });
        }
      });
  
      return products;
    } catch (error) {
      console.error('Error occurred during scraping:', error);
      throw error;
    }
  };  

module.exports = scrapeAmazon;
