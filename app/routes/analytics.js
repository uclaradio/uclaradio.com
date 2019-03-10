// analytics.js
// Endpoints and helper functions for generating and viewing site analytics

const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const shows = require('../database/shows');

const statsFilePath = path.join(process.cwd(), 'stats.json');

const platforms = ['site', 'android', 'ios'];
var stats = fs.existsSync(statsFilePath)
  ? require(statsFilePath)
  : {
      visitors: { site: 0, android: 0, ios: 0 },
      listeners: { site: 0, android: 0, ios: 0 },
      currentShow: {},
    };

var userListening = false;

console.log(stats);

// accessors

function totalVisitors() {
  const count = 0;
  for (platform in platforms) count += stats.visitors[platform];

  return count;
}

function totalListeners() {
  const count = 0;
  for (platform in platforms) count += stats.listeners[platform];

  return count;
}

function isUserListening() {
  return userListening;
}

// mutators

function addVisitor(platform) {
  stats.visitors[platform]++;
  console.log(`New ${platform} visitor`);
  writeStatsToFile();
}

function subVisitor(platform) {
  if (stats.visitors[platform] > 0) stats.visitors[platform]--;
  console.log(`Lost ${platform} visitor`);
  writeStatsToFile();
}

function addListener(platform) {
  stats.listeners[platform]++;
  console.log(`New ${platform} listener`);
  writeStatsToFile();
}

function subListener(platform) {
  if (stats.listeners[platform] > 0) stats.listeners[platform]--;
  console.log(`Lost ${platform} listener`);
  writeStatsToFile();
}

function updateStats() {
  readStatsFromFile();

  const info = getTimeAndDay();
  shows.getShowByTimeslotAndDay(info.time, info.day, (err, blurb) => {
    if (err) {
      console.error(err);
      return;
    }

    if (blurb && blurb.public) {
      stats.currentShow = blurb;
    } else {
      stats.currentShow = {};
    }
  });
}

// routes

router.get('/currentStats', (_, res) => {
  updateStats();
  res.send(stats);
});

router.post('/visitors', (req, res) => {
  const quantity = req.body.quantity;
  const platform = req.body.platform;

  if (!platforms.includes(platform)) {
    console.log('Invalid platform');
    res.status(400).send({ error: 'Invalid platform.' });
  }

  // only add/subtract 1 at a time
  if (quantity > 0) addVisitor(platform);
  else if (quantity < 0) subVisitor(platform);
  res.send({ success: 'Success!' });
});

router.post('/listeners', (req, res) => {
  const quantity = req.body.quantity;
  const platform = req.body.platform;

  if (!platforms.includes(platform)) {
    console.log('Invalid platform');
    res.status(400).send({ error: 'Invalid platform.' });
  }

  // only add/subtract 1 at a time
  if (quantity > 0) {
    addListener(platform);
    userListening = true;
  } else if (quantity < 0) {
    subListener(platform);
    userListening = false;
  }
  res.send({ success: 'Success!' });
});

// helper functions

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

function writeStatsToFile() {
  try {
    fs.writeFileSync(statsFilePath, JSON.stringify(stats));
  } catch (ex) {
    console.error(ex);
  }
}

function readStatsFromFile() {
  try {
    stats = JSON.parse(fs.readFileSync(statsFilePath, 'utf8'));
  } catch (ex) {
    if (ex.code == 'ENOENT') writeStatsToFile();
    else console.error(ex);
  }
}

module.exports = {
  router,
  addVisitor,
  subVisitor,
  subListener,
  isUserListening,
};
