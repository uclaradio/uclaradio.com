const express = require('express');

const router = express.Router();
let currentListeners = 0;

router.get('/', (req, res) => {
  res.render('analytics', { currentListeners });
});

router.get('/getCount', (req, res) => {
  res.json(currentListeners);
});

router.get('/increment', (req, res) => {
  currentListeners += 1;
  console.log(`increment: ${currentListeners}`);
  res.json(currentListeners);
});

router.get('/decrement', (req, res) => {
  currentListeners -= 1;
  console.log(`decrement: ${currentListeners}`);
  if (currentListeners < 0) {
    currentListeners = 0;
  }
  res.json(currentListeners);
});

module.exports = router;
