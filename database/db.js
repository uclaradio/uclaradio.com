// db.js
// Set up Mongo database connection

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/uclaradio');

var db = {};

/***** Last Ids *****/

db.showIdKey = "show"; // ids for Show table
db.messageIdKey = "message"; // ids for messages table

// Contains last distributed id for a table, in order to provide a unique id for each show, etc.
var LastIdSchema = new mongoose.Schema({
  key: String, // name of table
  lastId: Number // greatest id of objects created (should increment when creating new ones)
});
var LastIdModel = mongoose.model('lastIds', LastIdSchema);

db.getNextAvailableId = function(key, callback) {
  LastIdModel.findOne({key: key}, function(err, o) {
    if (o) {
      callback(o.lastId + 1);
    }
    else {
      callback(1);
    }
  });
};

db.setLastTakenId = function(key, lastId, callback) {
  newData = {key: key, lastId: lastId};
  LastIdModel.findOneAndUpdate({key: key}, newData, {upsert: true, new:true}, function(err, o) {
    if (err) { callback(err); }
    else { callback(null); }
  });
};

module.exports = db;
