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
		if (blurb)
			blurb.djName = blurb.djName.join(',');

		res.render('index', {blurb: blurb});
	});

});


var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

//return all blurbs
router.get('/blurbs', function(req, res) {

	db.getAllBlurbs(function(err, blurbs) {
		blurbs.sort(sort_by('showName', false, function(a){return a.toUpperCase()}));
		res.render('thedjs', {blurbs: blurbs})
	});

});


router.get('/pledgedrive', function(req, res, next) {
	res.render('pledgedrive');
});

module.exports = router;
