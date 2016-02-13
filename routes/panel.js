var express = require('express');
var router = express.Router();
var db = require('../database/db');
var accounts = require('../database/dbAccounts.js');


/***** Main Log In Page *****/
router.get('/', function(req, res) {
	// check credentials
	if (req.cookies.username == undefined || req.cookies.pass == undefined) {
		res.render('panel/login', {title: 'Log In'});
	}
	else {
		accounts.autoLogin(req.cookies.username, req.cookies.pass, function(o) {
			if (o != null) {
				req.session.user = o;

				res.redirect('/panel/home');
				
			}
			else {
				res.render('panel/login', {title: 'Log In'});
			}
		});
	}
});

router.post('/', function(req, res) {
	accounts.manualLogin(req.body['username'], req.body['pass'], function(err, o) {
		if (!o) {
			res.status(400).send(err);
		}
		else {
			req.session.user = o;
			if (req.body['remember-me'] == 'true') {
				res.cookie('username', o.username, {maxAge: 900000});
				res.cookie('pass', o.pass, {maxAge: 900000});
			}
			res.status(200).send(o);
		}
	});
});


/***** User Home Page *****/

router.get('/home', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		var path = require('path');
		res.sendFile(path.resolve('public/panel/home.html'));
	}
});

router.get('/logout', function(req, res) {
	if (req.session.user) {
		res.clearCookie('user');
		res.clearCookie('pass');
		req.session.destroy();
	}
	res.redirect('/panel');
});

/***** New Accounts *****/

router.get('/signup', function(req, res) {
	res.render('panel/signup', {title: 'Signup'});
});

router.post('/signup', function(req, res) {
	accounts.addNewAccount(req.body['username'], req.body['pass'], req.body['email'], req.body['djName'], function(e) {
		if (e) {
			res.status(400).send(e);
		}
		else {
			res.redirect('/panel');
		}
	});
});


/***** Account Info *****/

router.get('/api/user', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		var user = req.session.user;
		var userData = {"username": user.username, "djName": user.djName, "email": user.email, "phone": user.phone};
		res.json(userData);
		//res.json({"username": "senor danger", "djName": "Tommy", "email": "danger@example.com"});
	}
});

router.post('/api/updateUser', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		if (req.session.user.username != req.body.username) {
			res.status(400).send(e);
		}
		else {
			// update user info
			var callback = function(err, user) {
				if (err) { console.log("failed to update user: ", err); }
				else {
					var userData = {"username": user.username, "djName": user.djName, "email": user.email, "phone": user.phone};
					res.json(userData);
				}
			};
			accounts.updateAccount(req.body.username, req.body.email, req.body.djName, req.body.phone, callback);
		}
	}
});


/***** Show Info *****/

router.get('/api/shows', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		// return list of shows belonging to current user
		var callback = function(err, shows) {
			if (err) { console.log("failed to retrieve shows for user: ", err); }
			else {
				res.json(shows);
			}
		}
		accounts.getShowsForUser(req.session.user.username, callback);
	}
});

// update details for one show 
router.post('/api/show', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		accounts.userHasAccessToShow(req.session.user.username, req.body.id, function(hasAccess) {
			// user doesn't have access to this show
			if (!hasAccess) {
				console.log("user requested invalid show");
				res.status(400).send();
				return;
			}

			var djs = JSON.parse(req.body.djs);

			var newData = {
				"title": req.body.title,
				"day": req.body.day,
				"time": req.body.time,
				"djs": djs,
				"genre": req.body.genre,
				"blurb": req.body.blurb,
				"picture": req.body.picture,
				"thumbnail": req.body.thumbnail,
				"pages": req.body.pages,
				"episodes": req.body.episodes
			};
			// return show with id belonging to logged in user
			var callback = function(err, show) {
				if (err) { console.log("error updating show: ", err); }
				if (show) { res.json("success"); }
				else { res.status(400).send(); }
			}
			accounts.updateShow(req.body.id, newData, callback);
		});
	}
});

router.post('/api/addShow', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		var callback = function(err, saved) {
			if (err) { console.log("failed to add show for user: ", err); }

			if (saved) {
				// return full list of shows
				res.redirect('/panel/api/shows');
			}
			else { res.status(400).send(); }
		}
		// addNewShow = function(title, day, time, djs, callback) {
		accounts.addNewShow(req.body.title, req.body.day, req.body.time, [req.session.user.username], callback);
	}
});


module.exports = router;
