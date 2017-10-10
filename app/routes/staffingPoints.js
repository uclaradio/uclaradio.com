const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
const router = express.Router();
const passwords = require('../../passwords.json');

const points = require('../database/points');

router.get('/', (req, res) => {
  res.render('staffingPointsForm', { status: '' });
});

router.post('/', (req, res, next) => {
  if (req.body.password !== passwords.secretpassword)
    return res.end('Incorrect Password.');

  points.addStaffingPoints(req.body, (err, staffingPointsSaved) => {
    console.log('adding staffing points');

    if (err) {
      console.log(err);
      console.log(staffingPointsSaved);
    }

    if (staffingPointsSaved) res.send('Points successfully submitted!');
    else res.send('Try again! Something went wrong :^(');
  });
});

router.get('/view', (req, res) => {
  res.render('staffingPointsView');
});

router.post('/view/update', (req, res, next) => {
  if (req.body.password !== passwords.managerapprovalpassword) {
    res.end('incorrect password');
  } else {
    points.updateStaffingPointStatus(
      req.body.userId,
      req.body.status,
      req.body.managerNotes,
      (err, success) => {
        if (err) {
          res.end(err);
          console.log(err);
        } else res.end('point status updated!');
      }
    );
  }
});

router.get('/points', (req, res, next) => {
  points.getStaffingPoints((err, points) => {
    res.send(points);
  });
});

module.exports = router;
