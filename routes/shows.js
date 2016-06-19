// shows.js
// List of shows and show details pages

var express = require('express');
var router = express.Router();
var accounts = require('../database/accounts');
var shows = require('../database/shows');
var helper_funcs = require('./helper_funcs');

//return all shows
router.get('/', function(req, res) {


	shows.getAllShows(function(err, shows) {
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
	show = helper_funcs.decode_safe_url(req.params.show);

	shows.getShowByTitle(show, function(err, show) {
		if (show == null) {
			console.log("no show");
			res.redirect('/');
		}
		else {
			// get dj names for djs (saved as username)
			// getUserById = function(id, callback) {
			accounts.getDJNamesFromUsernames(show.djs, function(err, o) {
				if (err) { console.log("could not get djNames for users:", err); }
				else {
					show.djNames = o;
				}
				res.render('showPage', {show: show});
			});
		}
	});
});

module.exports = router;