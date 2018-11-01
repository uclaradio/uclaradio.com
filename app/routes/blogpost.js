const express = require('express');
const router = express.Router();
const post = require('../database/blogposts');

router.post('/addPost', (req, res) => {
  var title = req.body.title;
  var content = req.body.content;
  post.addPost(title, content, function(result) {
    res.send(result);
  });
});

module.exports = router;
