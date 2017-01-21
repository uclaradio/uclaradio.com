// connect to database
var db = require('./db');

var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var messages = {};

var MessageSchema = new mongoose.Schema({
	id: { type: Number, index: true },
	text: String,
  	user: { type: String, index: true },
  	reported: {type: Boolean, default: false},
  	date: { type: Date, default: Date.now }
});

var MessageModel = mongoose.model('messages', MessageSchema);

// create a new message object with given text, username, and a unique id
messages.saveMessage = function(data, callback) {
	db.getNextAvailableId(db.messageIdKey, function(nextId) {
		var message = new MessageModel({
			id: nextId,
			text: data.text,
			user: data.user
		})
		message.save();

		db.setLastTakenId(db.messageIdKey, nextId, function(err) {
			if (err) { console.log("error setting next id for messages: ", err); }
        });

        callback(message);
	})
};

// list messages flagged by users as offensive
messages.getReportedMessages = function(callback) {
	MessageModel.find({reported: true}, function(err, data) {
		callback(data);
	});
}

// mark a message as offensive
messages.report = function(messageID, callback) {
	console.log(messageID);
	MessageModel.update({id: messageID}, {
		reported: true
	}, callback);
}

// remove mark indicating message is offensive
messages.free = function(messageID, callback) {
	MessageModel.update({id: messageID}, {
		reported: false
	}, callback);
}

// delete message
messages.delete = function(messageID, callback) {
	MessageModel.remove({id: messageID}, function(){
		callback();
	});
}

// list [volume] messages after message with ID
messages.next = function(messageID, volume, callback) {
	var param = messageID ? {id:{"$lt": messageID}} : null;
	var promise = MessageModel.find(param).limit(parseInt(volume)).sort({"_id":-1}); 
	promise.then(function(data){
		callback(data);
	})
}

// supply a (hopefully unique) username
messages.generateUsername = function(callback) {
	attemptUniqueUsername(10, callback);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomUsername() {
	return "Guest" + getRandomInt(0, 99999);
}

// try and get a random username by checking that no identical user exists in database.
// after some number of attempts, give up and reuse a username
function attemptUniqueUsername(iterations, callback) {
	var random = randomUsername();
	if (iterations < 1) {
		callback(random);
		return;
	}
	MessageModel.findOne({user: random}, function(err, data) {
		if (data) {
			// username taken, try again
			attemptUniqueUsername(iterations-1, callback);
		} else {
			// found unique username
			callback(random);
		}
	});
}

module.exports = messages;
