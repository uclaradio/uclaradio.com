// chat.js
// chat test run
module.exports = function(io) {
	var express = require('express');
	var router = express.Router();
    var Set = require("collections/set");
    var accounts = require('../database/accounts');

    /*
        Since guest's session will last only as long as the browser, 
        I think it's acceptable to store in memory here.
    */
    var guests = new Set();

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
            var username;
            do {
                username = "Guest-" + getRandomInt(0, 1000) + '-' + getRandomInt(0, 10000);
            } while(guests.has(username));
            guests.add(username);
            socket.username = username;
            socket.emit('assign username', username);
            var ugh = io.sockets.sockets;
            for(var key in ugh) {
                console.log(ugh[key]["username"]);
                if(key == "username") {
                    console.log(ugh[key]);
                }
            }
            guests[ugh[key]]
            // console.log(ugh);
    	});

    	//automatically disconnects user
    	socket.on('disconnect', function(){
            guests.delete(socket.username);
            console.log(guests);
    		// console.log(socket.user + " has left.");
    		// var message = socket.user + 'has left the conversation'
    		// socket.broadcast.emit('new message', {
    		// 	event: 'disconnected',
    		// 	user: socket.user
    		// });
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