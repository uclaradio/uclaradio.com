// ChatBox.jsx

import React from 'react';
import cookie from 'react-cookie';
import { Grid, Col } from 'react-bootstrap';
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
const ChatBox = React.createClass({
  getInitialState() {
    return {
      user: '',
      messages: [],
      text: '',
    };
  },
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
  },
  componentDidMount() {
    this.getNext(null, 10);
    scrollToBottom();
  },
  getNext(id, volume) {
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

        const first = messages.peek();
        if (first) {
          this.setState({ message_db_cursor: first.id });
        }
      }
    );
  },
  messageReceived(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
    scrollToBottom();
  },
  setUsername(username) {
    // save username in cookie
    const d = new Date();
    d.setDate(d.getDate() + 2 * 365);
    cookie.save('username', username, { path: '/', expires: d });
    this.setState({ user: username });
  },
  handleMessageSubmit(message) {
    socket.emit('new message', message);
  },
  retrieveOlderMessages() {
    this.getNext(this.state.message_db_cursor, 10);
  },
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
                        onClick={this.retrieveOlderMessages}>
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
  },
});

/**
Message component displaying a message object

@prop messageID: id of message represented
@prop text: text of message
@prop user: username associated with message
@prop viewing_user: username associated with viewing user
@prop date: timestamp of message
* */
const Message = React.createClass({
  getInitialState() {
    return {};
  },
  reportMessage() {
    $.post(
      ReportMessageURL,
      {
        id: this.props.messageID,
      },
      result => {
        if (result.success) {
          this.setState({ reported: true });
        }
      }
    );
  },
  render() {
    const date = new Date(this.props.date);
    const Month = date.getMonth() + 1;
    const Day = date.getDay() + 1;
    const Hour = date.getHours();
    const Minute = date.getMinutes();
    const Second = date.getSeconds();
    return (
      <div className="message">
        <div
          className={
            this.props.user != this.props.viewing_user ? (
              'their-message'
            ) : (
              'my-message'
            )
          }>
          {/* Message Body */}
          <div className="message-body-tag">
            {// if it's an image, display the image
            this.props.text.split(' ').map(word => {
              if (word.length > 4 && word.substring(0, 4) == 'http') {
                return (
                  <span>
                    <br />
                    <a href={word} target="_blank">
                      {imageURL(word) ? <img src={word} /> : ''}
                      <br />
                      {word}
                    </a>
                    <br />
                  </span>
                );
              }
              // otherwise just display the text
              return `${word} `;
            })}{' '}
            {/* Report Message */
            this.props.user != this.props.viewing_user && (
              <button className="report-message" onClick={this.reportMessage}>
                {this.state.reported ? 'GOT IT' : 'REPORT'}
              </button>
            )}
          </div>
        </div>
        <br />
        <div
          id="message-username-tag"
          style={
            this.props.user == this.props.viewing_user ? (
              { float: 'right' }
            ) : (
              { float: 'left' }
            )
          }>
          <span className="message-username-tag-username">
            {this.props.user}
          </span>
          {` ${/* + Month + "/" + Day + " " */

          Hour}:${Minute}:${Second}`}
        </div>
      </div>
    );
  },
});

/**
Form to submit new message

@prop user: username associated with viewing user
@prop onMessageSubmit: callback to execute with new message data
* */
const MessageForm = React.createClass({
  getInitialState() {
    return { text: '' };
  },
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.trim() != '') {
      const message = {
        user: this.props.user,
        text: this.state.text,
        date: new Date(),
      };
      this.props.onMessageSubmit(message);
      this.setState({ text: '' });
    }
  },
  changeHandler(e) {
    this.setState({ text: e.target.value });
  },
  render() {
    return (
      <span>
        <div className="message_form">
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.changeHandler}
              value={this.state.text}
              placeholder="Write a Message"
            />
            <br />
            <br />
            <div id="load_more_wrapper">
              <center>
                <input type="submit" value="SEND" id="load_more" />
              </center>
            </div>
          </form>
        </div>
      </span>
    );
  },
});

export default ChatBox;
