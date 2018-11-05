// db.js
// Set up Mongo database connection

const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/uclaradio',
  {
    useMongoClient: true,
  }
);

const db = {};

/** *** Last Ids **** */

db.showIdKey = 'show'; // ids for Show table
db.messageIdKey = 'message'; // ids for messages table
db.blogpostIdKey = 'blogpost'; // ids for blogposts table

// Contains last distributed id for a table, in order to provide a unique id for each show, etc.
const LastIdSchema = new mongoose.Schema({
  key: String, // name of table
  lastId: Number, // greatest id of objects created (should increment when creating new ones)
});
const LastIdModel = mongoose.model('lastIds', LastIdSchema);

db.getNextAvailableId = function(key, callback) {
  LastIdModel.findOne({ key }, (err, o) => {
    if (o) {
      callback(o.lastId + 1);
    } else {
      callback(1);
    }
  });
};

db.setLastTakenId = function(key, lastId, callback) {
  newData = { key, lastId };
  LastIdModel.findOneAndUpdate(
    { key },
    newData,
    { upsert: true, new: true },
    (err, o) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }
  );
};

module.exports = db;
