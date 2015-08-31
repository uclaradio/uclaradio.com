var express = require('express');
var router = express.Router();
var db = require('../database/db');
var helper_funcs = require('./helper_funcs.js')

//return all blurbs
router.get('/', function(req, res) {

	db.getAllBlurbs(function(err, blurbs) {
		//sort blurbs alpha by showName
		blurbs.sort(helper_funcs.sort_by('showName', false, function(a){return a.toUpperCase()}));
		var urls = [];

		//so we can populate each slide in the page that shows all the blurbs
		var showsByDay = {"Sun":[], "Mon":[], "Tue":[], "Wed":[], "Thu":[], "Fri":[], "Sat":[] };
		
		for(var i = 0; i < blurbs.length; i++) {
			
			//get rid of unsafe url characters
			blurbs[i].url = helper_funcs.encode_safe_url(blurbs[i].showName);
			
			dayOfweek = blurbs[i].day;

			//each ul in content slider list which represent day of week in thedjs.jade will use showsByDAy
			showsByDay[dayOfweek].push(blurbs[i]);
		}

		for(var day in showsByDay) {
			console.log(showsByDay[day].showName);
		};

		res.render('manageShows', {blurbs: blurbs, urls: urls, showsByDay: showsByDay})
	});

});

////////
//curl -H "Content-Type: application/json" -X DELETE  http://localhost:3000/manageShows/{name}
////////
router.delete('/:show', function (req, res) {
	var params = req.params;
	var show = req.params.show;
	
	//UNSAFE characters
	show = helper_funcs.decode_safe_url(show);
	console.log("UGH THE SHOW IS :" + show);

	db.deleteBlurbByShowTitle(show, function(err) {
		if(err == null){
			res.redirect('/');
		} else {
			res.send(400, error);
		}
	});
});


module.exports = router;

