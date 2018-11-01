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

// number of times script should attempt and check to confirm a unique username, per round
const uniqueCheckIterations = 10;

// create a new message object with given text, username, and a unique id
blogposts.addPost = function(data, callback) {
  db.getNextAvailableId(db.messageIdKey, nextId => {
    const blogpost = new BlogModel({
      id: nextId,
      title: data.title,
      content: data.content,
      user: data.user,
    });
    blogpost.save();

    db.setLastTakenId(db.messageIdKey, nextId, err => {
      if (err) {
        console.log('error setting next id for messages: ', err);
      }
    });

    callback(blogpost);
  });
};

// delete message
blogposts.delete = function(messageID, callback) {
  BlogModel.remove({ id: messageID }, () => {
    callback();
  });
};

// list [volume] messages after message with ID
blogposts.next = function(messageID, volume, callback) {
  const param = messageID ? { id: { $lt: messageID } } : null;
  const promise = BlogModel.find(param)
    .limit(parseInt(volume))
    .sort({ _id: -1 });
  promise.then(data => {
    callback(data);
  });
};

// supply a username

// generate a random username with some max number of digits
// example: digits <= 5: "Guest430" or "Guest47988" could be generated

// try and get a random username by checking that no identical user exists in database.
// after some number of attempts, give up and reuse a username

module.exports = blogposts;
