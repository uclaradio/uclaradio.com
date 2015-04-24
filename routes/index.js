var express = require('express');
var router = express.Router();
var db = require('../database/db');

router.get('/', function(req, res) {
	console.log(db.getAllBlurbs());
	res.render('index');
});

module.exports = router;
