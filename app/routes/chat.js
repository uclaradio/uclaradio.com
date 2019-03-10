// chat.js
// Handles chatroom on frontpage stream bar

module.exports = function(io) {
  const express = require('express');
  const router = express.Router();

  const messages = require('../database/messages');
  const analytics = require('./analytics');

  // deliver more message history after a given message
  router.post('/getNext', (req, res) => {
    // id might be null if no message history available yet
    const id = req.body.id;
    const volume = req.body.volume;
    messages.next(id, volume, data => {
      res.send(data);
    });
  });

  // report a message for being innappropriate (can be kept or deleted in manager's panel)
  router.post('/report', (req, res) => {
    const messageID = req.body.id;
    messages.report(messageID, () => {
      res.json({ success: true });
    });
  });

  // deliver list of reported messages
  router.get('/reportedMessages', (req, res) => {
    messages.getReportedMessages(data => {
      res.send(data);
    });
  });

  // handle socket event
  io.on('connection', socket => {
    analytics.addVisitor('site');
    // new user joined
    socket.on('add user', () => {
      messages.generateUsername(username => {
        socket.username = username;
        socket.emit('assign username', username);
        console.log(username, 'joined chatroom.');
      });
    });

    socket.on('set user', data => {
      socket.username = data.username;
      socket.emit('assign username', data.username);
      console.log(data.username, 'joined chatroom.');
    });

    // user disconnected
    socket.on('disconnect', () => {
      console.log(socket.username, 'left chatroom.');
      analytics.subVisitor('site');
      if (analytics.isUserListening) analytics.subListener('site');
    });

    // new message sent
    socket.on('new message', data => {
      if (data.user && data.text) {
        messages.saveMessage(data, message => {
          io.sockets.emit('new message', {
            id: message.id,
            text: message.text,
            user: message.user,
            date: message.date,
          });
          console.log('chat -', `${message.user}:`, message.text);
        });
      }
    });
  });

  return router;
};
