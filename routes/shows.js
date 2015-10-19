var express = require('express');
var router = express.Router();
var db = require('../database/db');
var helper_funcs = require('./helper_funcs.js')


//return all blurbs
router.get('/', function(req, res) {


	db.getAllBlurbs(function(err, blurbs) {
		//assign order
		blurbs = helper_funcs.AppendValueSoSort(blurbs);

		//make sure blurbs are unique for 2 hour shows (djs have to input twice)
		blurbs = helper_funcs.getUniqueBlurbs(blurbs);

		//sort by order assigned
		blurbs.sort(helper_funcs.sort_by('order', false, false));

		var urls = [];

		//so we can populate each slide in the page that shows all the blurbs
		var showsByDay = {"Sun":[], "Mon":[], "Tue":[], "Wed":[], "Thu":[], "Fri":[], "Sat":[] };
		
		for(var i = 0; i < blurbs.length; i++) {
			

			//get rid of unsafe url characters
			blurbs[i].url = helper_funcs.encode_safe_url(blurbs[i].showName);

			//shorten show name to fit within the width of the profpic in the catslider
			blurbs[i].showName = helper_funcs.truncateName(blurbs[i].showName, 22);

			//get day of week
			dayOfweek = blurbs[i].day;

			//each ul in content slider list which represent day of week in thedjs.jade will use showsByDAy
			showsByDay[dayOfweek].push(blurbs[i]);
		}

		blurbs.sort(helper_funcs.sort_by('showName', false, function(a){ return a.toUpperCase()}));

		res.render('allShowsPage', {blurbs: blurbs, urls: urls, showsByDay: showsByDay})
	});

});


router.get('/:show', function (req, res) {
	var params = req.params;
	console.log(params);
	var show = req.params.show;
	//since database contains spaces rather than underscores present in url
	
	//UNSAFE characters
	show = helper_funcs.decode_safe_url(show);

	db.getBlurbByShowTitle(show, function(err, blurb) {
		//console.log(blurb.djName);
		if(blurb == null) {
			res.redirect('/');
		}
		else{
			res.render('showPage', {blurb: blurb});
			//res.send('<html><body><h1>Hello World ' + blurb.djName[0] + '</h1></body></html>');
		}
	});
});

module.exports = router;