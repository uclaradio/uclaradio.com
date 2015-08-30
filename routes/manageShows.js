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

function encode_safe_url(showName){
	var safe_url;
	safe_url = showName.split('?').join('(question_mark)');
	safe_url = safe_url.split('$').join('(dollar)');
	safe_url = safe_url.split('&').join('(amperstamp)');
	safe_url = safe_url.split('+').join('(plus)');
	safe_url = safe_url.split(',').join('(comma)');
	safe_url = safe_url.split('/').join('(forward_slash)');
	safe_url = safe_url.split(':').join('(colon)');
	safe_url = safe_url.split('=').join('(equals)');
	safe_url = safe_url.split('@').join('(at)');
	safe_url = safe_url.split('"').join('(quote)');
	safe_url = safe_url.split('<').join('(less_than)');
	safe_url = safe_url.split('>').join('(greater_than)');
	safe_url = safe_url.split('#').join('(hashtag)');
	safe_url = safe_url.split('%').join('(percent)');
	safe_url = safe_url.split('{').join('(open_brace)');	
	safe_url = safe_url.split('}').join('(close_brace)');
	safe_url = safe_url.split('|').join('(vertical_bar)');
	safe_url = safe_url.split('^').join('(carrot)');
	safe_url = safe_url.split('~').join('(tilde)');
	safe_url = safe_url.split('[').join('(open_bracket)');
	safe_url = safe_url.split(']').join('(close_bracket)');
	safe_url = safe_url.split('`').join('(grave_accent)');
	safe_url = safe_url.split(' ').join('_');

	return safe_url;
}

function decode_safe_url(url){
	var showName;
	showName = url.split('(question_mark)').join('?');
	showName = showName.split('(dollar)').join('$');
	showName = showName.split('(amperstamp)').join('&');
	showName = showName.split('(plus)').join('+');
	showName = showName.split('(comma)').join(',');
	showName = showName.split('(forward_slash)').join('/');
	showName = showName.split('(colon)').join(':');
	showName = showName.split('(equals)').join('=');
	showName = showName.split('(at)').join('@');
	showName = showName.split('(quote)').join('"');
	showName = showName.split('(less_than)').join('<');
	showName = showName.split('(greater_than)').join('>');
	showName = showName.split('(hashtag)').join('<');
	showName = showName.split('(percent)').join('%');
	showName = showName.split('(open_brace)').join('{');	
	showName = showName.split('(close_brace)').join('}');
	showName = showName.split('(vertical_bar)').join('|');
	showName = showName.split('(carrot)').join('^');
	showName = showName.split('(tilde)').join('~');
	showName = showName.split('(open_bracket)').join('[');
	showName = showName.split('(close_bracket)').join(']');
	showName = showName.split('(grave_accent)').join('`');
	showName = showName.split('_').join(' ');

	return showName;
}
//return all blurbs
router.get('/', function(req, res) {

	db.getAllBlurbs(function(err, blurbs) {
		//sort blurbs alpha by showName
		blurbs.sort(sort_by('showName', false, function(a){return a.toUpperCase()}));
		var urls = [];

		//so we can populate each slide in the page that shows all the blurbs
		var showsByDay = {"Sun":[], "Mon":[], "Tue":[], "Wed":[], "Thu":[], "Fri":[], "Sat":[] };
		
		for(var i = 0; i < blurbs.length; i++) {
			
			//get rid of unsafe url characters
			blurbs[i].url = encode_safe_url(blurbs[i].showName);
			
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


router.delete('/:show', function (req, res) {
	var params = req.params;
	var show = req.params.show;
	//since database contains spaces rather than underscores present in url
	
	//UNSAFE characters
	show = decode_safe_url(show);
	console.log("UGH THE SHOW IS :" + show);

	db.deleteBlurbByShowTitle(show, function(err) {
		if(err == null){
			res.redirect('/');
		} else {
			res.send(400, error);
		}
		//res.redirect('/');
		//console.log(blurb.djName);
		// if(err == null) {
		// 	res.redirect('/');
		// }
		// else{
		// 	res
		// 	//res.render('showPage', {blurb: blurb});
		// 	//res.send('<html><body><h1>Hello World ' + blurb.djName[0] + '</h1></body></html>');
		// }
	});
});


module.exports = router;

