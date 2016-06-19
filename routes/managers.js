// managers.js
// List all public managers

var express = require('express');
var router = express.Router();
var helper_funcs = require('./helper_funcs');
var accounts = require('../database/accounts');

router.get('/', function(req, res) {
	
	accounts.allManagers(function(err, managers) {

    managers = managers.filter(function(manager) {
      return manager.public;
    });

		// sort by position name
		managers.sort(helper_funcs.sort_by('position', false, false));

		res.render('managers', {managers: managers});
	});
});

module.exports = router;
