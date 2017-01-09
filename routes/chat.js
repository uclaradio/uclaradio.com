// chat.js
// chat test run
module.exports = function(io) {
	var express = require('express');
	var router = express.Router();

    //DB
    var messages = require('../database/messages');
    var chatUsernames = require('../database/chatUsernames');

    //local vars
    var nCalls = 1;
    var number_of_RandomInt_calls = 2;
    var call_threshold = 2;

	router.get('/', function(req, res) {
		var path = require('path');
		res.sendFile(path.resolve('public/frontpage.html'));
	});

    router.post('/getNext', function(req, res) {
        var id = req.body.id;
        var volume = req.body.volume;
        messages.next(id, volume, function(data) {
            res.send(data);
        })
    });

    io.on('connection', function(socket) {
    	//new user joined
    	socket.on('add user', function() {
            chatUsernames.generateUniqueUsername(call_threshold, nCalls, number_of_RandomInt_calls, function(username){
                chatUsernames.saveUsername(username);
                socket.username = username;
                socket.emit('assign username', username);
            });
    	});

        //if the DB reset, this will be important
        socket.on('check if username exists', function(username) {
            chatUsernames.exists(username, function(username_exists){
                if(username_exists) {
                    socket.username = username;
                } else {
                    socket.emit('username not found');
                }
            })
        });

    	//automatically disconnects user
    	socket.on('disconnect', function(){
            console.log(socket.username + " disconnected.");
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
		});
    });

    return router;
};