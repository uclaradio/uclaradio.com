// ChatBox.js

import React from 'react';
import cookie from 'react-cookie';
import { Grid, Col } from 'react-bootstrap';
import Message from './Message';
import MessageForm from './MessageForm';
import './ChatBox.scss';

const socket = io();

const GetPreviousMessagesURL = '/chat/getNext';
const ReportMessageURL = '/chat/report';

/** Helper functions * */

const imageURL = url => url.match(/\.(jpeg|jpg|gif|png)$/) != null;

const scrollToBottom = () => {
  const objDiv = document.getElementById('chatbox');
  objDiv.scrollTop = objDiv.scrollHeight;
};

/**
Chatroom component allowing users to post messages to our server socket
* */
class ChatBox extends React.Component {
  state = {
    user: '',
    messages: [],
    text: '',
  };

  componentWillMount() {
    socket.on('new message', this.messageReceived);
    socket.on('assign username', this.setUsername);

    const username = cookie.load('username');
    if (username) {
      // join as existing user
      socket.emit('set user', { username });
    } else {
      // join as new user
      socket.emit('add user');
    }
  }

  componentDidMount() {
    this.getNext(null, 10);
    scrollToBottom();
  }

  getNext = (id, volume) => {
    $.post(
      GetPreviousMessagesURL,
      {
        id,
        volume,
      },
      previousMessages => {
        const messages = this.state.messages;
        previousMessages.map(message => {
          messages.unshift(message);
        });
        this.setState({ messages });

        const first = messages[0];
        if (first) {
          this.setState({ message_db_cursor: first.id });
        }
      }
    );
  };

  messageReceived = message => {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
    scrollToBottom();
  };

  setUsername = username => {
    // save username in cookie
    const d = new Date();
    d.setDate(d.getDate() + 2 * 365);
    cookie.save('username', username, { path: '/', expires: d });
    this.setState({ user: username });
  };

  handleMessageSubmit = message => {
    socket.emit('new message', message);
  };

  retrieveOlderMessages = () => {
    this.getNext(this.state.message_db_cursor, 10);
  };

  render() {
    const viewing_user = this.state.user;
    return (
      <span>
        <Grid>
          <Col xs={12} md={8}>
            <div className="chat-box-fade-top">
              <div className="chat-box-fade-bottom">
                <div id="chatbox">
                  <div id="load_more_wrapper">
                    <center>
                      <button
                        id="load_more"
                        onClick={this.retrieveOlderMessages}
                      >
                        MORE
                      </button>
                    </center>
                  </div>
                  <div id="messages" className="messages">
                    {this.state.messages.map(message => (
                      <span key={message.id}>
                        {' '}
                        {!message.event && (
                          <Message
                            user={message.user}
                            text={message.text}
                            date={message.date}
                            messageID={message.id}
                            viewing_user={viewing_user}
                          />
                        )}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <MessageForm
              onMessageSubmit={this.handleMessageSubmit}
              user={this.state.user}
            />
          </Col>
        </Grid>
      </span>
    );
  }
}

export default ChatBox;
