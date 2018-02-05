var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var routes = require('./routes/routes.js');

var app = express();

var db = require('./models');

//mongoose
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongo-scraper';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


//middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//port
var PORT = process.env.PORT || 3000;

//static
app.use(express.static('public'));

//routes
app.use(routes);
//404
app.use((req, res, next) => {
	res.status(404).redirect('/');
});

//actually start it
app.listen(PORT, () => {
    console.log(`Mongo-scraper listening on PORT ${PORT}`);
});



