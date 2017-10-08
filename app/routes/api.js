// api.js
// User-Facing API for public data

const accounts = require('../database/accounts');
const shows = require('../database/shows');

const express = require('express');

const router = express.Router();

function checkPublic(show) {
  return show.public;
}

router.get('/show/:id', (req, res) => {
  shows.getShowById(req.params.id, (err, o) => {
    if (o && o.public) {
      res.json(o);
    } else {
      res.status(400).send(err);
    }
  });
});

router.get('/schedule', (req, res) => {
  shows.getAllShows((err, o) => {
    if (o) {
      res.json({ shows: o.filter(checkPublic) });
    } else {
      res.status(400).send(err);
    }
  });
});

router.get('/nowplaying', (req, res) => {
  const info = getTimeAndDay();

  shows.getShowByTimeslotAndDay(info.time, info.day, (err, blurb) => {
    if (blurb && blurb.public) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(blurb));
    } else {
      res.send(JSON.stringify({ status: 'no show playing' }));
    }
  });
});

router.get('/djs/:djName', (req, res) => {
  accounts.getDJByDJName(req.params.djName, (err, o) => {
    if (o) {
      res.json(o);
    } else {
      res.status(400).send(err);
    }
  });
});

router.get('/djs', (req, res) => {
  accounts.getAllUsers((err, o) => {
    if (o) {
      res.json({ djs: o });
    } else {
      res.status(400).send(err);
    }
  });
});

// router.get('/events', function(req, res) {
//   res.json({events: events});
// });

// static data
router.get('/giveawayDescription', (req, res) => {
  res.json({
    info:
      'We give a lot of tickets away to our listeners.. Tune in and follow us on Facebook and Instagram for your chance to see these shows!',
  });
});

// static data
router.get('/streamURL', (req, res) => {
  res.json({ url: 'http://uclaradio.com:8000/;' });
});

/* Helper Functions */

function getTimeAndDay() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date();

  const day = days[date.getDay()];
  let time = date.getHours();

  // Change the time into the format our db is expecting
  // AKA 12pm, 10am, 1pm: hour followed by am or pm
  if (time === 0) {
    time = '12am';
  } else if (time < 12) {
    time += 'am';
  } else if (time == 12) {
    time = '12pm';
  } else {
    time -= 12;
    time += 'pm';
  }

  return {
    day,
    time,
  };
}

module.exports = router;
