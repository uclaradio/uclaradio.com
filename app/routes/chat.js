// chat.js
// Handles chatroom on frontpage stream bar

const express = require('express');

const router = express.Router();

const messages = require('../database/messages');

module.exports = io => {
  // deliver more message history after a given message
  router.post('/getNext', (req, res) => {
    // id might be null if no message history available yet
    const { id, volume } = req.body;
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
    });

    // new message sent
    socket.on('new message', data => {
      messages.saveMessage(data, message => {
        io.sockets.emit('new message', {
          id: message.id,
          text: message.text,
          user: message.user,
          date: message.date,
        });
        console.log('chat -', `${message.user}:`, message.text);
      });
    });
  });

  return router;
};
