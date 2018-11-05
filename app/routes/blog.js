const express = require('express');
const router = express.Router();
const blogposts = require('../database/blogposts');

router.post('/addPost', (req, res) => {
  console.log('Hi i am in blogpost');
  var title = req.body.title;
  var content = req.body.content;
  blogposts.addPost(title, content, function(result) {
    res.send(result);
  });
});

module.exports = router;
