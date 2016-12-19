// api.js
// User-Facing API for public data

var accounts = require('../database/accounts');
var shows = require('../database/shows');

var express = require('express');
var router = express.Router();

function checkPublic(show) {
	return show.public;
};

router.get('/show/:id', function(req, res) {
	shows.getShowById(req.params.id, function(err, o) {
		if (o && o.public) {
			res.json(o);
		}
		else {
			res.status(400).send(err);
		}
	});
});

router.get('/schedule', function(req, res) {
	shows.getAllShows(function(err, o) {
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

	shows.getShowByTimeslotAndDay(info.time, info.day, function(err, blurb) {
		if (blurb && blurb.public) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(blurb));
		}
		else {
			res.send(JSON.stringify({status: "no show playing"}));
		}
	});
});

// router.get('/dj/:id', function(req, res) {
// 	shows.getShowById(req.params.id, function(err, o) {
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

var events = [{"month":"October","arr":[{"image":"https://yt3.ggpht.com/-EYEkqI4sC60/AAAAAAAAAAI/AAAAAAAAAAA/Bei-cowPJvs/s900-c-k-no-mo-rj-c0xffffff/photo.jpg","type":"Giveaway","start":"2016-10-27T07:00:00.000Z","end":"2016-10-28T07:00:00.000Z","status":"CONFIRMED","summary":"GoodCharlotte@TheNovo","description":"","location":"","id":"52ghriau6f6u2h6e8tu38rtlfc@google.com"},{"image":"http://images2.mtv.com/uri/mgid:uma:artist:mtv.com:1694056?width=1200&height=900","type":"Campus Event","start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"M83@TheGreekTheater","description":"","location":"","id":"i8eqp5uhrbenehl4qrirm6fcqk@google.com"},{"image":"http://www.meetfactory.cz/media/images/giraffage-940x660.jpg","type":"UCLA Radio Presents","start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"Giraffage@TheNovo","description":"","location":"","id":"1rr546mob8ak34179o8jgcpfbg@google.com"},{"image":"http://www.windishagency.com/assets/19873/SweaterBeats_2.jpg","type":"Giveaway","start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"SweaterBeats@ElRey","description":"","location":"","id":"84loghf68ca49otkefg81b9rk0@google.com"},{"image":"https://pbs.twimg.com/profile_images/753224710805000192/Fywv-qRJ.jpg","type":"Local Event","start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"Preoccupations@TheRoxy","description":"","location":"","id":"aou5sshkdndcohmt1j9kp6ue54@google.com"},{"image":"http://festivalsupreme.com/wp-content/uploads/2016/08/festivalsupreme16INSTAGRAM-e1470736721555.jpg","type":"UCLA Radio Presents","start":"2016-10-29T07:00:00.000Z","end":"2016-10-30T07:00:00.000Z","status":"CONFIRMED","summary":"FestivalSupreme@ShrineExpoHall&Grounds","description":"","location":"","id":"mho6d3paff5kp9e9vmn8lamb48@google.com"}]},{"month":"November","arr":[{"image":"http://cdn.shopify.com/s/files/1/0336/8929/products/KingKhanBBQreissue_mini300_large.jpg?v=1389935099","type":"Giveaway","start":"2016-11-01T07:00:00.000Z","end":"2016-11-02T07:00:00.000Z","status":"CONFIRMED","summary":"TheKingKhan+BBQShow@ElRey","description":"","location":"","id":"4s9gmna6aptgnm1uj4n5obugcc@google.com"},{"image":"http://lpr.com/wp-content/uploads/2013/06/Goldroom.jpg","type":"Local Event","start":"2016-11-03T07:00:00.000Z","end":"2016-11-04T07:00:00.000Z","status":"CONFIRMED","summary":"Goldroom&Autograf@TheNovo","description":"","location":"","id":"i1glinrsnp2kaekf5ulvnnsf24@google.com"},{"image":"http://a3.files.fashionista.com/image/upload/c_fit,cs_srgb,dpr_1.0,q_80,w_620/MTI5NjUyMjE2NDE5MDk1ODI2.jpg","type":"Campus Event","start":"2016-11-05T07:00:00.000Z","end":"2016-11-06T07:00:00.000Z","status":"CONFIRMED","summary":"Wet@Fonda","description":"","location":"","id":"3it0juu1t1dc7hqn3qbd3g43rg@google.com"},{"image":"http://goindeepmusic.com/wp-content/uploads/2014/03/STRFKR_by_Rachel_Hubbard.jpg","type":"UCLA Radio Presents","start":"2016-11-11T08:00:00.000Z","end":"2016-11-12T08:00:00.000Z","status":"CONFIRMED","summary":"STRFKR@ElRey","description":"","location":"","id":"pcjg77als3orr1p4t6rbgtsc10@google.com"},{"image":"http://goindeepmusic.com/wp-content/uploads/2014/03/STRFKR_by_Rachel_Hubbard.jpg","type":"Giveaway","start":"2016-11-12T08:00:00.000Z","end":"2016-11-13T08:00:00.000Z","status":"CONFIRMED","summary":"STRFKR@ElRey","description":"","location":"","id":"un8mllsuaj355fppkcsm1if7tk@google.com"},{"image":"http://images.sxsw.com/lTdwxTBmlaSCHEsfnfn-Rx9Q90U=/414x293:3968x2832/700x/images.sxsw.com/3/c66bb059-b4f8-4139-8914-431fe20bc26e/artist-9669","type":"UCLA Radio Presents","start":"2016-11-14T08:00:00.000Z","end":"2016-11-15T08:00:00.000Z","status":"CONFIRMED","summary":"RaeSremmurd@Novo","description":"","location":"","id":"rdhn7nuj1bdnjntrd186h6nr6o@google.com"},{"image":"https://i.scdn.co/image/0ca2a157ab546237f19ea092372ea30514246004","type":"Giveaway","start":"2016-11-14T08:00:00.000Z","end":"2016-11-15T08:00:00.000Z","status":"CONFIRMED","summary":"TheNakedandFamous@FoxTheaterPomona","description":"","location":"","id":"l545b4bu3e0q4o8kpr11c4120k@google.com"},{"image":"https://cbsradionews.files.wordpress.com/2016/03/lapsley.jpg?w=640&h=360&crop=1","type":"Local Event","start":"2016-11-16T08:00:00.000Z","end":"2016-11-17T08:00:00.000Z","status":"CONFIRMED","summary":"Lapsley@Mayan","description":"","location":"","id":"24k1fnktohds9f054fhh3ot414@google.com"},{"image":"http://cdn-images.deezer.com/images/artist/3254f22e186654c3f4b32f3760b64e89/200x200-000000-80-0-0.jpg","type":"Giveaway","start":"2016-11-16T08:00:00.000Z","end":"2016-11-17T08:00:00.000Z","status":"CONFIRMED","summary":"CleanBandit@ElRey","description":"","location":"","id":"07lrbf9mhp1cl82ek1ivnde928@google.com"},{"image":"https://pbs.twimg.com/profile_images/722521973436260352/s1OrZ5yI.jpg","type":"Campus Event","start":"2016-11-17T08:00:00.000Z","end":"2016-11-18T08:00:00.000Z","status":"CONFIRMED","summary":"Hopsin@TheNovo","description":"","location":"","id":"spocu2onqh2lemr7a4vljrraa8@google.com"},{"image":"http://www.capitalcitiesmusic.com/files/2016/09/8a93a04785e94e4cb4b4f50a446e54a0.jpg","type":"UCLA Radio Presents","start":"2016-11-23T08:00:00.000Z","end":"2016-11-24T08:00:00.000Z","status":"CONFIRMED","summary":"CapitalCities@Fonda","description":"","location":"","id":"tkq7qk2a3s3ftlld5is5182ua0@google.com"},{"image":"http://images.sk-static.com/images/media/profile_images/artists/8041093/huge_avatar","type":"Giveaway","start":"2016-11-26T08:00:00.000Z","end":"2016-11-27T08:00:00.000Z","status":"CONFIRMED","summary":"JaiWolf@TheNovo","description":"","location":"","id":"gi69id1ti4luactfaef68jb2js@google.com"}]},{"month":"December","arr":[{"image":"http://www.smashtheclub.com/wp-content/uploads/2015/07/mrcarmack.jpg","type":"Giveaway","start":"2016-12-02T08:00:00.000Z","end":"2016-12-03T08:00:00.000Z","status":"CONFIRMED","summary":"Mr.Carmack@TheNovo","description":"","location":"","id":"fje2ccuvd8o8sqondv87o45j68@google.com"}]}];

router.get('/events', function(req, res) {
	res.json({events: events});
});

// static data
router.get('/giveawayDescription', function(req, res) {
	res.json({info: "We give a lot of tickets away to our listeners.. Tune in and follow us on Facebook and Instagram for your chance to see these shows!"});
});

// static data
router.get('/streamURL', function(req, res) {
	res.json({url: "http://uclaradio.com:8000/;"});
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
