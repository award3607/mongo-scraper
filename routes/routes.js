var express = require('express');

var articleController = require('../controllers/articleController.js');
var noteController = require('../controllers/noteController.js');

var router = express.Router();

router.get('/', articleController.index);
router.get('/saved', articleController.saved);

router.get('/articles/scrape', articleController.scrape);
router.get('/articles/clear', articleController.clear);
router.get('/articles/:id', articleController.getArticle);
router.put('/articles/save/:id', articleController.saveArticle);
router.put('/articles/unsave/:id', articleController.unSaveArticle);
router.post('/articles/:id', articleController.addNote);

router.delete('/articles/:articleId/notes/:noteId', articleController.deleteNote);

module.exports = router;