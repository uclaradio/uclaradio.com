var React = require('react');
var socket = io();

//disconnect or connected users
// var Event = React.createClass({
//   render: function() {
//       return (
//           <div className="message">
//               <strong>{this.props.user} has {this.props.event}</strong>
//           </div>
//       );
//   }
// });

var Message = React.createClass({
  render: function() {
      return (
        <div className="message-bubble" style={ (this.props.user == this.props.viewing_user) ? {float: "right"} : null}> {
          ( this.props.user != this.props.viewing_user &&
          	<div className="message">
              <strong>{this.props.user}: </strong> 
              <span>{this.props.text}</span>        
          	</div> )||
          ( <div className="my-message">
          	<strong>me: </strong>
          	<span>{this.props.text}</span>
          	</div>
          )
        }
        </div>

      );
  }
});

var MessageList = React.createClass({
  render: function() {
  	var viewing_user = this.props.user;
      return (
          <div className='messages'>
              <h2> Conversation: </h2>
              {
                  this.props.messages.map(function(message, i) {
                      return (
                          //(
                          //   message.event && 
                          // 	<Event
                          // 	 event={message.event}
                          // 	 user={message.user}
                          // 	/>)
                          // ||
                          <span> {
                            !message.event && 
                            <Message
                              key={i}
                              user={message.user}
                              text={message.text}
                              viewing_user={viewing_user}
                          	/> }
                            <br />
                          </span>
                      );
                  })
              }
          </div>
      );
  }
});


var MessageForm = React.createClass({
  getInitialState: function() {
      return {text: ''};
  },
  handleSubmit: function(e) {
      e.preventDefault();
      var message = {
          user : this.props.user,
          text : this.state.text
      }
      this.props.onMessageSubmit(message); 
      this.setState({ text: '' });
  },
  //fill in form field as user types with what is specified in value=
  changeHandler: function(e) {
      this.setState({ text : e.target.value });
  },
  render: function() {
      return(
          <div className='message_form'>
              <h3>Write New Message</h3>
              <form onSubmit={this.handleSubmit}>
                  <input
                      onChange={this.changeHandler}
                      value={this.state.text}
                  />
              </form>
          </div>
      );
  }
});


var ChatBox = React.createClass({
  getInitialState: function() {
  	socket.emit('add user');
    return {user: '', messages:[], text: ''};
  },
  componentDidMount: function() {
	   socket.on('new message', this.messageRecieve);
     socket.on('assign username', this.setUsername);
  },
  messageRecieve: function(message) {
      var messages = this.state.messages;
      messages.push(message);
      this.setState({messages: messages});
  },
  setUsername: function(username) {
      console.log(username);
      this.setState({user:username});
  },
  handleMessageSubmit: function(message) {
      socket.emit('new message', message);
      this.messageRecieve(message);
  },
  render: function() {
    return (
      <div className='chat-box'>
		<MessageList
			messages={this.state.messages}
			user={this.state.user}
		/>
		<MessageForm
                  onMessageSubmit={this.handleMessageSubmit}
                  user={this.state.user}
              />
      </div>
    );
  }
})


module.exports = ChatBox;
