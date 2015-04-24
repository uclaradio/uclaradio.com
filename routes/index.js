var express = require('express');
var router = express.Router();
var db = require('../database/db');

router.get('/', function(req, res) {
	var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var date = new Date();

	var day = days[date.getDay()];
	var time = date.getHours();

	//Change the time into the format our db is expecting
	//AKA 12pm, 10am, 1pm: hour followed by am or pm
	if (time === 0) {
		time = '12am';
	} else if (time < 12) {
		time += 'am';
	} else if (time == 12) {
		time = '12pm';
	} else {
		time -= 12;
		time += 'pm';
	}
	
	db.getBlurbByTimeslotAndDay(time, day, function(err, blurb) {
		res.render('index', blurb);
	});
});

module.exports = router;
