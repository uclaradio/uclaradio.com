var express = require('express');
var bodyParser = require('body-parser'); 
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
var router = express.Router();
var db = require('../database/db');
var passwords = require('../passwords.json');

router.get('/', function(req, res) {
	res.render('newShow', {status: ''});
});

router.post('/', function(req, res, next) {
    
	if (req.body.password != passwords.secretpassword)
		return res.end("Incorrect Password. You can find it in the Staff Lounge!");	

	// Adds the proposed show to the database.
	db.addProposedShow(req.body, function(err, proposedShowSaved) {
		if (err) console.log(err);
		if (proposedShowSaved)
			res.render('newShow', {status: 'Show successfully submitted!'});
		else
			res.render('newShow', {status: err || 'Try again! Something went wrong :^('});
	});
});

module.exports = router;
