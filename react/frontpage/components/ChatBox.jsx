// ChatBox.jsx

var React = require('react');
var List = require("collections/list");
var cookie = require('react-cookie');

import { Grid, Col, Row } from 'react-bootstrap';

var socket = io();

require('./ChatBox.scss');

const GetPreviousMessagesURL = "/chat/getNext";
const ReportMessageURL = "/chat/report";

/** Helper functions **/

const imageURL = (url) => {
	return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

const scrollToBottom = () => {
  var objDiv = document.getElementById("chatbox");
  objDiv.scrollTop = objDiv.scrollHeight;
};

/**
Chatroom component allowing users to post messages to our server socket
**/
var ChatBox = React.createClass({
	getInitialState: function() {
		return {
			user: "",
			messages: [],
			text: ''
		};
	},
	componentWillMount: function() {
		socket.on('new message', this.messageReceived);
		socket.on('assign username', this.setUsername);

		var username = cookie.load('username');
		if (username) {
			// join as existing user
			socket.emit('set user', {username: username});
		} else {
			// join as new user
			socket.emit('add user');
		}
	},
	componentDidMount: function() {
		this.getNext(null, 10);
		scrollToBottom();
	},
	getNext: function(id, volume) {
		$.post(GetPreviousMessagesURL, {
			id: id,
			volume: volume,
		}, function(previousMessages) {
			var messages = this.state.messages;
			previousMessages.map(function(message) {
				messages.unshift(message);
			});
			this.setState({messages: messages});

			var first = messages.peek();
			if (first) {
				this.setState({message_db_cursor: first.id});
			}
		}.bind(this));
	},
	messageReceived: function(message) {
		var messages = this.state.messages;
		messages.push(message);
		this.setState({messages: messages});
		scrollToBottom();
	},
	setUsername: function(username) {
		// save username in cookie
		var d = new Date();
		d.setDate(d.getDate()+(2*365));
		cookie.save('username', username, {path: '/', expires:d});
		this.setState({user:username});
	},
	handleMessageSubmit: function(message) {
		socket.emit('new message', message);
	},
	retrieveOlderMessages: function() {
		this.getNext(this.state.message_db_cursor, 10);
	},
	render: function() {
		var viewing_user = this.state.user;
		return (
			<span>
			<Grid>
			<Col xs={12} md={8}>
				<div className='chat-box-fade-top'>
					<div className='chat-box-fade-bottom'>
						<div id='chatbox'>
							<div id="load_more_wrapper">
							<center>
								<button id="load_more" onClick={this.retrieveOlderMessages}>
									MORE
								</button>
							</center>
							</div>
							<div id='messages' className='messages'>
							{ this.state.messages.map(function(message) {
									return (
										<span key={message.id}> {
											!message.event && 
											<Message
												user={message.user}
												text={message.text}
												date={message.date}
												messageID={message.id}
												viewing_user={viewing_user}
											/> }
										<br />
										</span>
									);
								})
							}
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
});

/**
Message component displaying a message object

@prop messageID: id of message represented
@prop text: text of message
@prop user: username associated with message
@prop viewing_user: username associated with viewing user
@prop date: timestamp of message
**/
var Message = React.createClass({
	getInitialState: function() {
		return {};
	},
	reportMessage: function() {
		$.post(ReportMessageURL, {
			id: this.props.messageID
		});
	 this.setState({reported: true});
	},
	render: function() {
		var date = new Date(this.props.date);
		var Month = date.getMonth() + 1;
		var Day = date.getDay() + 1;
		var Hour = date.getHours();
		var Minute = date.getMinutes();
		var Second = date.getSeconds();
		return (
			<div className="message"> 
				<div className={(this.props.user != this.props.viewing_user) ? "their-message" : "my-message"}>
					{ /* Message Body */ }
					<div className="message-body-tag">
					{
						//if it's an image, display the image
						this.props.text.split(' ').map(function(word) {
							if (word.length > 4 && word.substring(0,4) == "http") {
								return (
									<span>
										<br />
										<a href={word} target="_blank">
											{ imageURL(word) ? <img src={word} /> : ""}
											<br />
											{word}
										</a>
										<br />
									</span>
								);
							}
							//otherwise just display the text
							return word + " ";
						})
					} { /* Report Message */
						this.props.user != this.props.viewing_user &&
						<button className="report-message" onClick={this.reportMessage}>
							{this.state.reported ? "GOT IT" : "REPORT"}
						</button>
					}
					</div>
					<br />
					<span id="message-username-tag" 
						style={ (this.props.user == this.props.viewing_user) ? {float: "right"} : {float: "left"}}>
						<span className="message-username-tag-username">
							{this.props.user}
						</span>
						{" " /*+ Month + "/" + Day + " "*/ + Hour + ":" + Minute + ":" + Second}
					</span>	
				</div>
			</div>
		);
	}
});

/**
Form to submit new message

@prop user: username associated with viewing user
@prop onMessageSubmit: callback to execute with new message data
**/
var MessageForm = React.createClass({
	getInitialState: function() {
		return {text: ''};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		if (this.state.text.trim() != '') {
			var message = {
				user : this.props.user,
				text : this.state.text,
				date : new Date()
			}
			this.props.onMessageSubmit(message); 
			this.setState({ text: '' });
		}
	},
	changeHandler: function(e) {
		this.setState({ text : e.target.value });
	},
	render: function() {
		return (
			<span>
				<div className='message_form'>
					<form onSubmit={this.handleSubmit}>
						<input
							onChange={this.changeHandler}
							value={this.state.text}
							placeholder="Write a Message"
						/>
						<br /><br />
						<div id="load_more_wrapper">
						<center>
							<input type="submit" value="SEND" id="load_more">
							</input>
						</center>
						</div>
					</form>
				</div>
			</span>
		);
	}
});

module.exports = ChatBox;
