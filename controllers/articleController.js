var request = require('request');
var cheerio = require('cheerio');

var db = require('../models');

exports.index = (req, res) => {
  db.Article
    .find({})
    .then(function(articles) {
      console.log(articles.length);
      res.render('index', {data: articles});
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.scrape = (req, res) => {
    request("http://www.kusports.com/news/mens_basketball/", function(error, response, html) {
      var $ = cheerio.load(html);
  
      $('div.item').each(function(i, element) {
  
        var url = $(element).children('a').attr("href");
        var title = $(element).children('h4').text();
        var summary = $(element).children('p').text();
    
        db.Article
          .create({
            "title": title,
            "url": 'http://www.kusports.com' + url,
            "summary": summary
          })
          .then(function(dbArticle) {
            console.log(`Scraped an article, id: ${dbArticle._id}`);
            res.send('Success');
          })
          .catch(function(err) {
            console.log(err);
            res.json(err);
          });
      });
    });
};