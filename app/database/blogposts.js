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
  platform: String,
  date: { type: Date, default: Date.now },
  tags: [String],
});
BlogSchema.index({ id: 1 });

const BlogModel = mongoose.model('blogposts', BlogSchema);

blogposts.webSafeBlogPost = function(blogpost) {
  return {
    id: blogpost.id,
    title: blogpost.title,
    content: blogpost.content,
    platform: blogpost.platform,
    date: blogpost.date,
    tags: blogpost.tags,
  };
};

// create a new blogpost object with given text, username, and a unique id
blogposts.addPost = function(
  id,
  title,
  content,
  platform,
  created_time,
  tags,
  callback
) {
  db.getNextAvailableId(db.blogpostIdKey, nextId => {
    const blogpost = new BlogModel({
      id: id,
      title: title,
      content: content,
      platform: platform,
      date: created_time,
      tags: tags,
    });
    blogpost.save();
    db.setLastTakenId(db.blogpostIdKey, nextId, err => {
      if (err) {
        console.log('Error setting id for blogpsts: ', err);
      }
    });
    callback(null, blogpost);
  });
};

// get all blogposts
blogposts.getAllPosts = function(callback) {
  BlogModel.find({})
    .sort('-date')
    .exec(function(err, res) {
      if (err) {
      } else {
        const posts = [];
        for (let i = 0; i < res.length; i++) {
          posts.push(blogposts.webSafeBlogPost(res[i]));
        }
        callback(null, posts);
      }
    });
};

// get blogpost by id
blogposts.getPostByID = function(blogpostID, callback) {
  BlogModel.findOne({ id: blogpostID }, (err, o) => {
    if (err || o == null) {
      callback(err, null);
      return;
    }
    const post = blogposts.webSafeBlogPost(o);
    callback(err, post);
  });
};

// delete blogpost by id
blogposts.delete = function(blogpostID, callback) {
  BlogModel.remove({ id: blogpostID }, () => {
    callback();
  });
};

module.exports = blogposts;
