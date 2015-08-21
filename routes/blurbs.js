var express = require('express');
var router = express.Router();
var db = require('../database/db');

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
router.get('/', function(req, res) {

	db.getAllBlurbs(function(err, blurbs) {
		blurbs.sort(sort_by('showName', false, function(a){return a.toUpperCase()}));
		var urls = [];
		for(var i = 0; i < blurbs.length; i++) {
			//since urls will need underscores instead of spaces
			blurbs[i].url = blurbs[i].showName.split(' ').join('_');
		}
		res.render('thedjs', {blurbs: blurbs, urls: urls})
	});

});


router.get('/:show', function (req, res) {
	var params = req.params;
	var show = req.params.show;
	//since database contains spaces rather than underscores present in url
	show = show.split('_').join(' ');
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