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

messages.next = function(id, volume, callback) {
	var param = id != "" ? {_id:{"$lt": mongoose.Types.ObjectId(id)}} : null;
	var promise = MessageModel.find(param).limit(volume).sort({"_id":-1}); 
	promise.then(function(data){
		callback(data);
	})
}

module.exports = messages;
