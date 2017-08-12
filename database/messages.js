// connect to database
const db = require('./db');

const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;
const messages = {};

const MessageSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  text: String,
  user: { type: String, index: true },
  reported: { type: Boolean, default: false, index: true },
  date: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model('messages', MessageSchema);

// number of times script should attempt and check to confirm a unique username, per round
const uniqueCheckIterations = 10;

// create a new message object with given text, username, and a unique id
messages.saveMessage = function(data, callback) {
  db.getNextAvailableId(db.messageIdKey, nextId => {
    const message = new MessageModel({
      id: nextId,
      text: data.text,
      user: data.user,
    });
    message.save();

    db.setLastTakenId(db.messageIdKey, nextId, err => {
      if (err) {
        console.log('error setting next id for messages: ', err);
      }
    });

    callback(message);
  });
};

// list messages flagged by users as offensive
messages.getReportedMessages = function(callback) {
  MessageModel.find({ reported: true }, (err, data) => {
    callback(data);
  });
};

// mark a message as offensive
messages.report = function(messageID, callback) {
  console.log(messageID);
  MessageModel.update(
    { id: messageID },
    {
      reported: true,
    },
    callback
  );
};

// remove mark indicating message is offensive
messages.free = function(messageID, callback) {
  MessageModel.update(
    { id: messageID },
    {
      reported: false,
    },
    callback
  );
};

// delete message
messages.delete = function(messageID, callback) {
  MessageModel.remove({ id: messageID }, () => {
    callback();
  });
};

// list [volume] messages after message with ID
messages.next = function(messageID, volume, callback) {
  const param = messageID ? { id: { $lt: messageID } } : null;
  const promise = MessageModel.find(param)
    .limit(parseInt(volume))
    .sort({ _id: -1 });
  promise.then(data => {
    callback(data);
  });
};

// supply a username
messages.generateUsername = function(callback) {
  // generate a unique with >3 digits: "Guest479"
  attemptUniqueUsername(uniqueCheckIterations, 3, callback);
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate a random username with some max number of digits
// example: digits <= 5: "Guest430" or "Guest47988" could be generated
function randomUsername(digits) {
  const maxInt = Math.pow(10, digits) - 1;
  return `Guest${getRandomInt(0, maxInt)}`;
}

// try and get a random username by checking that no identical user exists in database.
// after some number of attempts, give up and reuse a username
function attemptUniqueUsername(iterations, digits, callback) {
  const random = randomUsername(digits);
  if (iterations < 1) {
    attemptUniqueUsername(uniqueCheckIterations, digits + 1, callback);
    return;
  }
  MessageModel.findOne({ user: random }, (err, data) => {
    if (data) {
      // username taken, try again
      attemptUniqueUsername(iterations - 1, digits, callback);
    } else {
      // found unique username
      callback(random);
    }
  });
}

module.exports = messages;
