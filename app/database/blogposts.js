// connect to database
const db = require('./db');

const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;
const blogposts = {};

const BlogSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  title: String,
  content: String,
  user: { type: String, index: true },
  date: { type: Date, default: Date.now },
});

const BlogModel = mongoose.model('blogposts', BlogSchema);

// create a new blogpost object with given text, username, and a unique id
blogposts.addPost = function(req, callback) {
  console.log("I'm in blog post");
  db.getNextAvailableId(db.blogpostIdKey, nextId => {
    const blogpost = new BlogModel({
      id: nextId,
      title: req.body.title,
      content: req.body.content,
    });
    blogpost.save();

    db.setLastTakenId(db.blogpostIdKey, nextId, err => {
      if (err) {
        console.log('error setting id for blogpsts', err);
      }
    });
    callback(blogpost);
  });
};

// delete blogpost
blogposts.delete = function(blogpostID, callback) {
  BlogModel.remove({ id: blogpostID }, () => {
    callback();
  });
};

module.exports = blogposts;
