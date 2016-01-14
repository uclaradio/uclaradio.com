var express = require('express');
var bodyParser = require('body-parser'); 
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
var router = express.Router();
var db = require('../database/db');
var passwords = require('../passwords.json');

router.get('/', function(req, res) {
	res.render('staffingPointsForm', {status: ''});
});

router.post('/', function(req, res, next) {
    
	if (req.body.password != passwords.secretpassword)
		res.end("Incorrect Password.");	

	// Adds the proposed show to the database.
	db.addStaffingPoints(req.body, function(err, staffingPointsSaved) {
		console.log('adding staffing points');
		if (err) console.log(err);
		if (staffingPointsSaved)
			res.send('Points successfully submitted!');
		else
			res.send('Try again! Something went wrong :^(');
	});
});

module.exports = router;
