var express = require('express');
var bodyParser = require('body-parser'); 
var app = express();
var lwip = require('lwip')

app.use(bodyParser.urlencoded({ extended: false }));
var router = express.Router();
var db = require('../database/db');
var passwords = require('../passwords.json');

router.get('/', function(req, res) {
	res.render('newBlurb', {status: ''});
});

router.post('/', function(req, res, next) {
    
	// Get the form data after it is submitted
	var djName 	    = req.body.djName.split(','),
	    showOfTheMonth = false,
	    showName 	= req.body.showName,
	    genre 	    = req.body.genre,
	    link	    = req.body.link,
	    day	    	= req.body.day,
	    timeslot	= req.body.timeslot,
	    description	= req.body.description,
	    password	= req.body.password;
		picture     = req.files.picture.path.replace('public/', '');

	console.log("picutre being uploaded here: " + req.files.picture.path);

	if (link.indexOf('http') !== 0)
		link = 'http://' + link;

	if (password != passwords.secretpassword)
		res.end("Incorrect Password.");	

	lwip.open(req.files.picture.path, function(err, image) {
	  if (err) throw err;
	});

// lwip.open('lena.jpg', function(err, image) {
//     if (err) return console.log(err);
//     image.writeFile('lena_low_quality.jpg', {
//         quality: 10
//     }, function(err) {
//         if (err) return console.log(err);
//         console.log('done');
//     });
// });
	
	db.addBlurb(djName, showName, genre, description, link, timeslot, day, picture, function(err, blurbSaved) {
		if (err) next(err);
		if (blurbSaved)
			res.render('newBlurb', {status: 'Blurb successfully submitted!'});
		else
			res.render('newBlurb', {status: 'Try again! Something went wrong :^('});
	});

});

module.exports = router;
