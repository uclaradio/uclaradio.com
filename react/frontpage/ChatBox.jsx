var React = require('react');
var List = require("collections/list");

var Bootstrap = require('react-bootstrap');
var Grid = Bootstrap.Grid;
var Col = Bootstrap.Col;
var socket = io();

var Message = React.createClass({
  render: function() {
      return (
        <div className="message"> 
        {
            <div className={(this.props.user != this.props.viewing_user) ? "their-message" : "my-message"}
            style={ (this.props.user == this.props.viewing_user) ? {float: "right"} : {float: "left"}}>
          	  <div id="message-body-tag">
                {
                  this.props.text.split(' ').map(function(word){
                    if(word.length > 4 && word.substring(0,4) == "http") {
                      return (
                        <span>
                          <br />
                          <a href={word} target="_blank">
                            {imageURL(word) ? <img src={word} /> : ""}
                            <br />
                            {word} 
                          </a>
                          <br />
                        </span>
                      )
                    }
                    return word + " ";
                  })
                }
              </div>
              <br />
              <span id="message-username-tag" 
              style={ (this.props.user == this.props.viewing_user) ? {float: "right"} : {float: "left"}}>
                {this.props.user}
              </span>  
          	</div>
        }
        </div>
      );
  }
});

var MessageList = React.createClass({
  componentDidUpdate: function() {
    scrollToBottom();
  },
  render: function() {
  	var viewing_user = this.props.user;
      return (
          <div className='messages'>
              {
                  this.props.messages.map(function(message, i) {
                      return (
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
      var str = this.state.text.replace(/\s/g, '');
      console.log(str);
      if(str != '') {
        var message = {
            user : this.props.user,
            text : this.state.text
        }
        this.props.onMessageSubmit(message); 
        this.setState({ text: '' });
      }
  },
  //fill in form field as user types with what is specified in value=
  changeHandler: function(e) {
      this.setState({ text : e.target.value });
  },
  render: function() {
      return(
          <div className='message_form'>
              <form onSubmit={this.handleSubmit}>
                  <input
                      onChange={this.changeHandler}
                      value={this.state.text}
                      placeholder="Write a Message"
                  />
              </form>
          </div>
      );
  }
});


var ChatBox = React.createClass({
  getInitialState: function() {
  	socket.emit('add user');
    var messages = new List();
    return {user: '', messages:messages, text: ''};
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
      <span>
      <Grid>
        <Col xs={12} md={9}>
          <div className='chat-box-fade-top'>
            <div className='chat-box-fade-bottom'>
              <div id='chat-box'>
              		<MessageList
              			messages={this.state.messages}
              			user={this.state.user}
              		/>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} md={3}>
              <MessageForm
                  onMessageSubmit={this.handleMessageSubmit}
                  user={this.state.user}
              />
        </Col>
      </Grid>
      </span>
    );
  }
})

function scrollToBottom() {
    var objDiv = document.getElementById("chat-box");
    objDiv.scrollTop = objDiv.scrollHeight;
    console.log('scrolled to bottom');
}

function imageURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

module.exports = ChatBox;
