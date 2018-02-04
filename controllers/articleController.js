var request = require('request');
var cheerio = require('cheerio');

exports.scrape = (req, res) => {
    request("http://www.kusports.com", function(error, response, html) {
      var $ = cheerio.load(html);
  
      $("div.headlines ul li").each(function(i, element) {
  
        var link = $(element).children().attr("href");
        var title = $(element).children().text();
    
        // Save these results in an object that we'll push into the results array we defined earlier
        db.scrapedData.insert({
          "title": title,
          "link": link
        });
      });
    });
    res.send("Success");
};