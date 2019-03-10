// analytics.js
// Endpoints and helper functions for generating and viewing site analytics

const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const statsFilePath = path.join(process.cwd(), 'stats.json');

const platforms = ['site', 'android', 'ios'];
const stats = fs.existsSync(statsFilePath)
  ? require(statsFilePath)
  : {
      visitors: { site: 0, android: 0, ios: 0 },
      listeners: { site: 0, android: 0, ios: 0 },
    };

var userListening = false;

console.log(stats);

function writeStatsToFile() {
  try {
    fs.writeFileSync(statsFilePath, JSON.stringify(stats));
  } catch (ex) {
    console.error(ex);
  }
}

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

router.get('/currentStats', (_, res) => {
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

module.exports = {
  router,
  addVisitor,
  subVisitor,
  subListener,
  isUserListening,
};
