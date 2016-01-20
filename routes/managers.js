var express = require('express');
var router = express.Router();
var db = require('../database/db');
var helper_funcs = require('./helper_funcs.js');

router.get('/', function(req, res) {
	
	db.getAllManagers(function(err, managers) {

		// sort by department name
		managers.sort(helper_funcs.sort_by('department', false, false));

		res.render('managers', {managers: managers});
	});
});

module.exports = router;
