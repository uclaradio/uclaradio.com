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
		res.render('panel/home', {
			title: 'Panel',
			udata: req.session.user
		});
	}
});


/***** New Accounts *****/

router.get('/signup', function(req, res) {
	res.render('signup', {title: 'Signup'});
});

//router.post('/signup', function(req, res))

module.exports = router;
