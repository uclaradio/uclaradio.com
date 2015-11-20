var express = require('express');
var router = express.Router();
var db = require('../database/db');
var helper_funcs = require('./helper_funcs.js');

router.get('/', function(req, res) {
	db.dropManagers();
	var callback = function(err, managerSaved){console.log("error occurred inserting manager");}
	db.addManager("Matteo", "Web", "Thursday", "7:00pm", "Studio", "picture", "thumbnail", callback);
	db.addManager("Eddie", "Art and Design", "Thursday", "6:30pm", "Eddie's Apartment", "picture", "thumbnail", callback);
	db.addManager("Scott Gee", "Events", "Tuesday", "5:00pm", "Studio", "picture", "thumbnail", callback);
	db.addManager("Taylor", "Marketing", "Wednesday", "12:15pm", "Studio", "picture", "thumbnail", callback);

	db.getAllManagers(function(err, managers) {

		var rowsPerColumn = 3;

		// sort by department name
		managers.sort(helper_funcs.sort_by('department', false, false));

		var managerRows = [];
		
		// sort so that department managers are shown in columns, 3 to a row
		for(var i = 0; i < managers.length; i++) {
			if (i % rowsPerColumn === 0) {
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
