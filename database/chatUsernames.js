// connect to database
require('./db');

var mongoose = require('mongoose');
var chatUsernames = {};

var ChatUsernamesSchema = new mongoose.Schema({
  	username: String,
});

var ChatUsernamesModel = mongoose.model('chatUsernames', ChatUsernamesSchema);

chatUsernames.saveUsername = function(username) {
	var username = new ChatUsernamesModel({
		username: username
	})
	username.save();
}

chatUsernames.generateUniqueUsername = function(call_threshold, nCalls, number_of_RandomInt_calls, callback) {
	var username = generateUsername(number_of_RandomInt_calls);
	ChatUsernamesModel.count({username: username}, function(err, count) {
		if(count == 0) {
			return callback(username);
		} else if(nCalls > call_threshold) {
			nCalls = 1;
			return chatUsernames.generateUniqueUsername(callback, nCalls+1, number_of_RandomInt_calls+1);
		} else {
			return chatUsernames.generateUniqueUsername(callback, nCalls+1, number_of_RandomInt_calls);
		}
	})
}

chatUsernames.exists = function(user, callback) {
	ChatUsernamesModel.count({username: user}, function(err, c) {
		//console.log('count is ' + c);
		var username_exists = c > 0;
		callback(username_exists);
	})
}

function generateUsername(number_of_RandomInt_calls) {
	var username = "Guest";
	while(number_of_RandomInt_calls > 0) {
		username = username + getRandomInt(0, 1000);
		number_of_RandomInt_calls = number_of_RandomInt_calls - 1;
	}
	return username;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = chatUsernames;
