// chat.js
// chat test run
module.exports = function(io) {
	var express = require('express');
	var router = express.Router();

	router.get('/', function(req, res) {
		var path = require('path');
		res.sendFile(path.resolve('public/frontpage.html'));
	});

    io.on('connection', function(socket) { 
        console.log('connected to chat');
		socket.on('new message', function (data) {
		// we tell the client to execute 'new message'
			socket.broadcast.emit('new message', {
			  //username: socket.username,
			  message: 'server sending data to client'
			});
			console.log(data);
		});
    });

    return router;
};
