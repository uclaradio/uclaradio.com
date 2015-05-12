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
    
    console.log(req.body);
    console.log(req.body.djName);    

	// Get the form data after it is submitted
	var djName 	    = req.body.djName,
	    showName 	= req.body.showName,
	    genre 	    = req.body.genre,
	    link	    = req.body.link,
	    day	    	= req.body.day,
	    timeslot	= req.body.timeslot,
	    description	= req.body.description,
	    password	= req.body.password;

    console.log(req.files);

	if (password != passwords.secretpassword)
	{
		console.log("Incorrect password. No blurb updated.");
	    res.end("Incorrect Password.");	
        return;

	}

	// Adds the blurb to the database.
	console.log(db.addBlurb(djName, showName, genre, description, link, timeslot, day));
    res.redirect('/');
});

module.exports = router;
