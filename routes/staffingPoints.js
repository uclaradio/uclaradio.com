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
		return res.end("Incorrect Password.");	

	// Adds the proposed show to the database.
	db.addStaffingPoints(req.body, function(err, staffingPointsSaved) {
		console.log('adding staffing points');

		if (err) {
			console.log(err);
			console.log(staffingPointsSaved);
		}

		if (staffingPointsSaved)
			res.send('Points successfully submitted!');
		else
			res.send('Try again! Something went wrong :^(');
	});
});

router.get('/view', function(req, res) {
	res.render('staffingPointsView');
});

router.post('/view/update', function(req, res, next) {
	if (req.body.password !== passwords.managerapprovalpassword) {
		res.end('incorrect password');
	} else {
		db.updateStaffingPointStatus(req.body.userId, req.body.status, req.body.managerNotes, function(err, success) {
			if (err) {
				res.end(err);
				console.log(err);
			}
			else
				res.end('point status updated!');
		});
	}
});

router.get('/points', function(req, res, next) {
	db.getStaffingPoints(function(err, points) {
		res.send(points);
	});
});

module.exports = router;
