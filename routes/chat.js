// chat.js
// chat test run
module.exports = function(io) {
	var express = require('express');
	var router = express.Router();

    //Data Structures
    var Set = require("collections/set");
    var Map = require("collections/map");

    //DB
    var accounts = require('../database/accounts');
    var messages = require('../database/messages');

    var guests = new Map();

	router.get('/', function(req, res) {
		var path = require('path');
		res.sendFile(path.resolve('public/frontpage.html'));
	});

    router.get('/getNext', function(req, res) {
        messages.next(null, 10, function(data) {
            res.send(data);
        })
    });

    router.post('/getNext', function(req, res) {
        var id = req.body.id;
        var volume = req.body.volume;
        messages.next(id, volume, function(data) {
            console.log(data);
            res.send(data);
        })
    });

    io.on('connection', function(socket) {
    	//new user joined
    	socket.on('add user', function() {
            var username = generateUsername();
            if(username in guests) {
                guests[username] = guests[username] + 1;
            } else {
                guests[username] = 1;
            }
            username = username + '-' + guests[username];
            socket.username = username;
            socket.emit('assign username', username);
    	});

        //if the DB reset, this will be important
        socket.on('check if username exists', function(username) {
            if(username == null) {
                socket.emit('username not found');
            } else {
                username = username.split('-')[0];
                if(!(username in guests)) {
                    socket.emit('username not found');
                }
            };
        });

    	//automatically disconnects user
    	socket.on('disconnect', function(){
            guests.delete(socket.username);
            console.log(socket.username + " deleted.");
    	});

    	//new message sent
		socket.on('new message', function (data) {
		// we tell the client to execute 'new message'
			socket.broadcast.emit('new message', {
			  text: data.text,
			  user: data.user,
              date: new Date()
			});
            messages.saveMessage(data);
			console.log(data);
		});
    });

    return router;
};

function generateUsername() {
  return "Guest" + getRandomInt(0, 1000) + getRandomInt(0, 1000) + getRandomInt(0, 1000);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}