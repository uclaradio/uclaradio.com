var express = require('express');
var router = express.Router();
var db = require('../database/db');
var accounts = require('../database/dbAccounts.js');
var lwip = require('lwip');

function checkPublic(show) {
	return show.public;
};

router.get('/show/:id', function(req, res) {
	accounts.getShowById(req.params.id, function(err, o) {
		if (o && o.public) {
			res.json(o);
		}
		else {
			res.status(400).send(err);
		}
	});
});

router.get('/schedule', function(req, res) {
	accounts.getAllShows(function(err, o) {
		if (o) {
			res.json({shows: o.filter(checkPublic)});
		}
		else {
			res.status(400).send(err);
		}
	});
});

// router.get('/dj/:id', function(req, res) {
// 	accounts.getShowById(req.params.id, function(err, o) {
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

module.exports = router;
