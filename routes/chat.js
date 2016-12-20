// chat.js
// chat test run
module.exports = function(io) {
	var express = require('express');
	var router = express.Router();
    var accounts = require('../database/accounts');

	router.get('/', function(req, res) {
		var path = require('path');
		res.sendFile(path.resolve('public/frontpage.html'));
	});

    io.on('connection', function(socket) {
    	//new user joined
    	socket.on('add user', function() {
			// we store the username in the socket session for this client
    		// socket.user = username;
    		// var message = username + ' has joined the conversation.';
    		// socket.broadcast.emit('new message', {
    		// 	event: 'connected',
    		// 	user: socket.user
    		// });
            var username = "User " + getRandomInt(0, 1000);
            socket.emit('assign username', username);
    	});

    	//automatically disconnects user
    	socket.on('disconnect', function(){
    		console.log(socket.user + " has left.");
    		var message = socket.user + 'has left the conversation'
    		socket.broadcast.emit('new message', {
    			event: 'disconnected',
    			user: socket.user
    		});
    	});

    	//new message sent
		socket.on('new message', function (data) {
		// we tell the client to execute 'new message'
			socket.broadcast.emit('new message', {
			  text: data.text,
			  user: data.user
			});
			console.log(data);
		});
    });

    return router;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}