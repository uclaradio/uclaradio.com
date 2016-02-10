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


/***** New Accounts *****/

router.get('/api/updateUser', function(req, res) {
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


module.exports = router;
