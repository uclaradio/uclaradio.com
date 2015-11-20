var express = require('express');
var router = express.Router();
var db = require('../database/db');
var helper_funcs = require('./helper_funcs.js');

router.get('/', function(req, res) {
	db.getAllManagers(function(err, managers) {

		var rowsPerColumn = 3;

		// sort by department name
		managers.sort(helper_funcs.sort_by('department', false, false));

		var managerRows = [];
		
		// sort so that department managers are shown in columns, 3 to a row
		for(var i = 0; i < managers.length; i++) {
			if (i % rowsPerColumn == 0) {
				var row = [];
				row.push(managers[i]);
				managerRows.push(row);
			}
			else {
				var row = managerRows[managerRows.length-1];
				row.push(managers[i]);
			}
		}

		res.render('managers', {managerRows: managerRows});
	});
});

module.exports = router;
