// index.js
// Front page

var express = require('express');
var router = express.Router();
var async = require('async');
var shows = require('../database/shows');
var passwords = require('../passwords');
var requestify = require('requestify');

var numberOfFBPosts = 7;
var numberOfTUMBLRPosts = 3;
var FB = "https://graph.facebook.com/uclaradio?fields=posts.limit("+numberOfFBPosts+"){full_picture,message,created_time,link}&access_token=" + passwords["FB_API_KEY"];
var TUMBLR = "https://api.tumblr.com/v2/blog/uclaradio.tumblr.com/posts/text?api_key="+passwords["TUMBLR_API_KEY"]+"&limit="+numberOfTUMBLRPosts;
var socialMediaURLs = [FB, TUMBLR];

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


router.get('/getSocialMedia', function(req, res) {
	async.map(socialMediaURLs, function(url, callback) {
	    requestify.get(url).then(function (response) {
	    	var data = response.getBody();
	    	switch(url) {
	    		case FB:
	    			data['posts']['data'].forEach(function(post){
	    				post['platform'] = 'FB';
	    				post['created_time'] = new Date(post['created_time']);
	    			});
	    			callback(null, data['posts']['data']);
	    			break;
	    		case TUMBLR:
	    			data['response']['posts'].forEach(function(post){
	    				post['platform'] = 'TUMBLR';
	    				post['created_time'] = new Date(post['date']);
	    			});
	    			callback(null, data['response']['posts']);
	    			break;
	    	}
	    }).fail(function(response){
	    	callback(true, null);
	    });
	}, function(err, allSocialMediaPosts) {
	    if (!err) {
	    	allSocialMediaPosts = [].concat.apply([], allSocialMediaPosts).sort(function(postA, postB) {
	    		return postA['created_time'] > postB['created_time'];
	    	});
	    	//console.log(results);
	    	res.send(allSocialMediaPosts);
	    } else {
	        res.send(404);
	    }
	});

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
