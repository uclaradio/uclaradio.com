const express = require('express');
const router = express.Router();
const blogposts = require('../database/blogposts');

router.post('/addPost', (req, res) => {
  blogposts.addPost(req, function(result) {
    if (result) {
      res.send(result);
    }
  });
});

module.exports = router;
