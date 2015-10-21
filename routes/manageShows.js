var express = require('express');
var router = express.Router();
var db = require('../database/db');
var helper_funcs = require('./helper_funcs.js')

//return all blurbs
router.get('/', function(req, res) {

	db.getAllBlurbs(function(err, blurbs) {
		//sort blurbs alpha by showName
		blurbs.sort(helper_funcs.sort_by('showName', false, function(a){return a.toUpperCase()}));

		
		for(var i = 0; i < blurbs.length; i++) {
			
			//get rid of unsafe url characters
			blurbs[i].url = helper_funcs.encode_safe_url(blurbs[i].showName);
			
		}

		res.render('manageShows', {blurbs: blurbs})
	});

});

//new show of the month

////////
//DELETE via command line:
//curl -H "Content-Type: application/json" -X DELETE  http://localhost:3000/manageShows/{name}
////////
router.get('/delete/:show', function (req, res) {
	var params = req.params;
	var show = req.params.show;
	
	//UNSAFE characters
	show = helper_funcs.decode_safe_url(show);

	db.deleteBlurbByShowTitle(show, function(err) {
		if(err == null){
			res.redirect('/manageShows');
		} else {
			res.send(400, error);
		}
	});
});

router.get('/makeShowOfMonth/:show', function (req, res) {
	var params = req.params;
	var show = req.params.show;
	
	//UNSAFE characters
	show = helper_funcs.decode_safe_url(show);

	db.makeShowOfMonth(show, function(err){
		if(err == null){
			res.redirect('/manageShows');
		} else {
			res.send(400, error);
		}
	});

});

router.get('/makeShowOfMonth/:show', function (req, res) {
	var params = req.params;
	var show = req.params.show;
	
	//UNSAFE characters
	show = helper_funcs.decode_safe_url(show);

	db.makeShowOfMonth(show, function(err){
		if(err == null){
			res.redirect('/manageShows');
		} else {
			res.send(400, error);
		}
	});

});

//modify a show
// router.get('/modify/:show', function(req, res){
// 	var params = req.params;
// 	var show = req.params.show;
	
// 	//UNSAFE characters
// 	show = helper_funcs.decode_safe_url(show);

// });


module.exports = router;

