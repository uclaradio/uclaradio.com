// index.js
// Front page

var express = require('express');
var router = express.Router();
var shows = require('../database/shows');

router.get('/', function(req, res) {
	var info = getTimeAndDay();

	shows.getShowByTimeslotAndDay(info.time, info.day, function(err, blurb) {
		if (blurb != null) {
			var combined = "";
			var comma = false;
			if (blurb.djs != null) {
				for (user in blurb.djs) {
					if (comma) { combined += ", "; }
					else { comma = true; }

					if (blurb.djs[user]) {
						combined += blurb.djs[user];
					}
				}
			}
			blurb.djName = combined;
		}

		res.render('index', {blurb: blurb});
	});

});

router.get('/blurbinfo', function(req, res, next) {
	var info = getTimeAndDay();

	shows.getShowByTimeslotAndDay(info.time, info.day, function(err, blurb) {
		if (blurb)
			blurb.djName = blurb.djName.join(',');

		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(blurb));
	});

});

router.get('/beta', function(req, res) {
	var path = require('path');
	res.sendFile(path.resolve('public/frontpage.html'));
});


router.get('/pledgedrive', function(req, res, next) {
	res.render('pledgedrive');
});

function getTimeAndDay() {
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

	return {
		day: day,
		time: time
	};
}



module.exports = router;
