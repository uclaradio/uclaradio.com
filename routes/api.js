// api.js
// User-Facing API for public data

var express = require('express');
var router = express.Router();

function checkPublic(show) {
	return show.public;
};

router.get('/show/:id', function(req, res) {
	accounts.getShowById(req.params.id, function(err, o) {
		if (o && o.public) {
			res.json(o);
		}
		else {
			res.status(400).send(err);
		}
	});
});

router.get('/schedule', function(req, res) {
	accounts.getAllShows(function(err, o) {
		if (o) {
			res.json({shows: o.filter(checkPublic)});
		}
		else {
			res.status(400).send(err);
		}
	});
});



router.get('/nowplaying', function(req, res) {
	var info = getTimeAndDay();

	accounts.getBlurbByTimeslotAndDay(info.time, info.day, function(err, blurb) {
		if (blurb && blurb.public) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(blurb));
		}
		else {
			res.status(400).send(err);
		}
	});
});

// router.get('/dj/:id', function(req, res) {
// 	accounts.getShowById(req.params.id, function(err, o) {
// 		if (o) {
// 			res.json(o);
// 		}
// 		else {
// 			res.status(400).send(err);
// 		}
// 	});
// });

router.get('/djs', function(req, res) {
	accounts.getAllUsers(function(err, o) {
		if (o) {
			res.json({djs: o});
		}
		else {
			res.status(400).send(err);
		}
	});
});

/* Helper Functions */

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
