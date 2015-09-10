var express = require('express');
var bodyParser = require('body-parser'); 
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
var router = express.Router();
var db = require('../database/db');
var passwords = require('../passwords.json');

router.get('/', function(req, res) {
	db.getProposedShows(function(err, proposedShows) {
		if (err) next(err);
		res.render('proposedShows', {shows: proposedShows});
	});
});

module.exports = router;
