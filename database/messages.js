// connect to database
var db = require('./db');

var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var messages = {};

var MessageSchema = new mongoose.Schema({
	id: Number,
	text: String,
  	user: String,
  	reported: {type: Boolean, default: false},
  	date: { type: Date, default: Date.now }
});
MessageSchema.index({ id: 1});

var MessageModel = mongoose.model('messages', MessageSchema);

messages.saveMessage = function(data, callback) {
	db.getNextAvailableId(db.messageIdKey, function(nextId) {
		// create a new message object with given data and a unique id
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

messages.getReportedMessages = function(callback) {
	MessageModel.find({reported: true}, function(err, data) {
		callback(data);
	});
}

messages.report = function(messageID, callback) {
	MessageModel.update({id: messageID}, {
		reported: true
	}, function() {
		callback();
	});
}

messages.free = function(messageID, callback) {
	MessageModel.update({id: messageID}, {
		reported: false
	}, function(){
		callback();
	});
}

messages.delete = function(messageID, callback) {
	//all distasteful messages regardless of user should be deleted
	MessageModel.remove({id: messageID}, function(){
		callback();
	});
}

messages.next = function(messageID, volume, callback) {
	var param = messageID ? {id:{"$lt": messageID}} : null;
	var promise = MessageModel.find(param).limit(parseInt(volume)).sort({"_id":-1}); 
	promise.then(function(data){
		callback(data);
	})
}

messages.generateUsername = function() {
	return "Guest" + getRandomInt(0, 99999);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = messages;
