// managers.js
// List all public managers

const express = require('express');

const router = express.Router();
const helper_funcs = require('./helper_funcs');
const accounts = require('../database/accounts');

router.get('/', (req, res) => {
  accounts.allManagers((err, managers) => {
    managers = managers.filter(manager => manager.public);

    // sort by position name
    managers.sort(helper_funcs.sort_by('position', false, false));

    res.render('managers', { managers });
  });
});

module.exports = router;
