// connect to database
require('./db');

var mongoose = require('mongoose');
var messages = {};

var MessageSchema = new mongoose.Schema({
	text: String,
  	user: String,
  	date: { type: Date, default: Date.now }
});

var MessageModel = mongoose.model('messages', MessageSchema);

messages.saveMessage = function(data) {
	var message = new MessageModel(
	{
		text: data.text,
		user: data.user
	})
	message.save();
};

module.exports = messages;
