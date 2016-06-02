var express = require('express');
var router = express.Router();
var db = require('../database/dbAccounts');
var helper_funcs = require('./helper_funcs.js');

router.get('/', function(req, res) {
	
	db.allManagers(function(err, managers) {

		// sort by position name
		managers.sort(helper_funcs.sort_by('position', false, false));

		res.render('managers', {managers: managers});
	});
});

module.exports = router;
