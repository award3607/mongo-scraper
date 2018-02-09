var express = require('express');

var articleController = require('../controllers/articleController.js');
var noteController = require('../controllers/noteController.js');

var router = express.Router();

router.get('/', articleController.index);

router.get("/api/scrape", articleController.scrape);

module.exports = router;