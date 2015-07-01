var express = require('express');
var bodyParser = require('body-parser'); 
var app = express();

var router = express.Router();

router.get('/', function(req, res) {
	res.render('schedule');
});

module.exports = router;
