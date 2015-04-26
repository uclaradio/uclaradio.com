var express = require('express');
var router = express.Router();
var db = require('../database/db');

router.get('/', function(req, res) {
	//res.render('index');
	res.render('index');
});


router.get('/blurb', function(req, res) {
	//res.render('index');
	res.render('blurb');
});

module.exports = router;
