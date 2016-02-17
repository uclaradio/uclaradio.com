var express = require('express');
var router = express.Router();
var db = require('../database/db');
var accounts = require('../database/dbAccounts');
var helper_funcs = require('./helper_funcs.js')


//return all shows
router.get('/', function(req, res) {


	accounts.getAllShows(function(err, shows) {
		//assign order
		shows = helper_funcs.AppendValueSoSort(shows);

		//make sure shows are unique for 2 hour shows (djs have to input twice)
		shows = helper_funcs.getUniqueBlurbs(shows);

		//sort by order assigned
		shows.sort(helper_funcs.sort_by('order', false, false));

		var urls = [];

		//so we can populate each slide in the page that shows all the shows
		var showsByDay = {"Sun":[], "Mon":[], "Tue":[], "Wed":[], "Thu":[], "Fri":[], "Sat":[] };
		
		for(var i = 0; i < shows.length; i++) {
			

			//get rid of unsafe url characters
			shows[i].url = helper_funcs.encode_safe_url(shows[i].title);

			//shorten show name to fit within the width of the profpic in the catslider
			shows[i].title = helper_funcs.truncateName(shows[i].title, 22);

			//get day of week
			dayOfweek = shows[i].day;

			//each ul in content slider list which represent day of week in thedjs.jade will use showsByDAy
			showsByDay[dayOfweek].push(shows[i]);
		}

		shows.sort(helper_funcs.sort_by('title', false, function(a){ return a.toUpperCase()}));

		res.render('allShowsPage', {shows: shows, urls: urls, showsByDay: showsByDay})
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