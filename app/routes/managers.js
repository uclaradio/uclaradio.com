// managers.js
// List all public managers

const express = require('express');

const router = express.Router();
const accounts = require('../database/accounts');

router.get('/', (req, res) => {
  accounts.allManagers((err, managers) => {
    const publicManagers = managers.filter(manager => manager.public);

    // sort alphabetically by name
    publicManagers.sort((a, b) => {
      const positionA = a.position.toUpperCase();
      const positionB = b.position.toUpperCase();
      if (positionA < positionB) {
        return -1;
      } else if (positionA > positionB) {
        return 1;
      }
      return 0;
    });

    res.render('managers', { managers: { ...publicManagers } });
  });
});

module.exports = router;
