const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.render('notFound');
});

module.exports = router;
