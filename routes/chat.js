// chat.js
// Handles chatroom on frontpage stream bar

module.exports = function(io) {
	var express = require('express');
	var router = express.Router();

	var messages = require('../database/messages');

    // deliver more message history after a given message
	router.post('/getNext', function(req, res) {
        // id might be null if no message history available yet
		var id = req.body.id;
		var volume = req.body.volume;
		messages.next(id, volume, function(data) {
			res.send(data);
		});
	});

    // report a message for being innappropriate (can be kept or deleted in manager's panel)
	router.post('/report', function(req, res) {
		var messageID = req.body.id;
        console.log(req.body);
		messages.report(messageID, function() {
            console.log("reported it")
		});
	});

    // deliver list of reported messages
	router.get('/reportedMessages', function(req, res){
		messages.getReportedMessages(function(data) {
			res.send(data);
		});
	});

    // handle socket event
	io.on('connection', function(socket) {
		// new user joined
		socket.on('add user', function() {
            var username = messages.generateUsername();
			socket.username = username;
            socket.emit('assign username', username);
			console.log(username, "joined chatroom.");
		});

        socket.on('set user', function(data) {
            socket.username = data.username;
            socket.emit('assign username', data.username);
            console.log(data.username, "joined chatroom.")
        });

		// user disconnected
		socket.on('disconnect', function(){
			console.log(socket.username, "left chatroom.");
		});

		// new message sent
		socket.on('new message', function (data) {
			messages.saveMessage(data, function(message) {
                io.sockets.emit('new message', {
                    id: message.id,
                    text: message.text,
                    user: message.user,
                    date: message.date
                });
                console.log("chat -", message.user + ":", message.text);
            });
		});
	});

	return router;
};
