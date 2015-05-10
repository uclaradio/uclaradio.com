var express = require('express');
var bodyParser = require('body-parser'); 
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
var router = express.Router();
var db = require('../database/db');
var passwords = require('../passwords.json');

router.get('/', function(req, res) {
	res.render('newBlurb');
});

router.post('/', function(req,res) {
	
	// Get the form data after it is submitted
	var djName 	= req.body.dj-name,
	    showName 	= req.body.show-name,
	    genre 	= req.body.genre,
	    link	= req.body.link,
	    day		= req.body.day,
	    timeslot	= req.body.timeslot,
	    description	= req.body.description,
	    picture	= req.body.picture, 
	    password	= req.body.password;
	
	if (password != passwords.secretpassword)
	{
		console.log("Incorrect password. No blurb updated.");
		return;
	}

	// Adds the blurb to the database.
	db.addBlurb(djName, showName, genre, description, link, timeslot, day);

});

module.exports = router;
