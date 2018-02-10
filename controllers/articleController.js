var request = require('request');
var cheerio = require('cheerio');

var db = require('../models');

exports.index = (req, res) => {
  db.Article
    .find({saved: false})
    .then(function(articles) {
      console.log(`Found ${articles.length} articles`);
      res.render('index', {data: articles});
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.saved = (req, res) => {
  db.Article
    .find({saved: true})
    .populate('notes')
    .then(function(articles) {
      console.log(`Found ${articles.length} articles`);
      res.render('index', {data: articles});
    })
    .catch(function(err) {
      res.send(err);
    });
};

exports.scrape = (req, res) => {
    request("http://www.kusports.com/news/mens_basketball/", function(error, response, html) {
      var $ = cheerio.load(html);
  
      let articles = [];

      $('div.item').each(function(i, element) {
        let article = {};
        article.url = 'http://www.kusports.com' + $(element).children('a').attr("href");
        article.title = $(element).children('h4').text();
        article.summary = $(element).children('p').text();
        articles.push(article);
      });

      db.Article
          .create(articles)
          .then(function(dbArticles) {
            console.log(dbArticles);
            // console.log(`Scraped ${dbArticles.length} articles.`);
            res.send('Success');
          })
          .catch(function(err) {
            console.log(err);
            res.send(err);
          });
    });
};

exports.clear = (req, res) => {
  db.Article.remove({})
    .then(function() {
      res.send('Removed all articles');
    })
    .catch(function(err) {
      console.log(err);
      res.send(err);
    });
};

exports.getArticle = (req, res) => {
  db.Article.findById(req.params.id)
    .populate('notes')
    .then(function(article) {
      console.log(article);
      res.render('index', {data: article});
    })
    .catch(function(err) {
      console.log(err);
      res.send(err);
    });
};

exports.saveArticle = (req, res) => {
  db.Article.findByIdAndUpdate(req.params.id, { $set: { saved: true }}, {new: true})
    .then(function(article) {
      res.send('Saved article');
    })
    .catch(function(err) {
      console.log(err);
      res.send(err);
    });
};

exports.unSaveArticle = (req, res) => {
  db.Article.findByIdAndUpdate(req.params.id, { $set: { saved: false }}, {new: true})
    .then(function(article) {
      res.send('Unsaved article');
    })
    .catch(function(err) {
      console.log(err);
      res.send(err);
    });
};

exports.addNote = (req, res) => {
  console.log(req.body);
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findByIdAndUpdate(req.params.id, { $push: { notes: dbNote._id }}, { new: true });
    })
    .then(function(dbArticle) {
      res.send('Added note');
    })
    .catch(function(err) {
      console.log(err);
      res.send(err);
    });
};

exports.deleteNote = (req, res) => {
  console.log('Note id: ' + req.params.noteId);
  db.Article.findByIdAndUpdate(req.params.articleId, { $pull: { notes: { _id: req.params.noteId } }}, { new: true })
  .then(function(dbArticle) {
    return db.Note.findByIdAndRemove(req.params.noteId);
  })
  .then(function(dbNote) {
      res.send('Deleted note');
  })
  .catch(function(err) {
    console.log(err);
    res.send(err);
  });
};