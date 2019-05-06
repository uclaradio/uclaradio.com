import React from 'react';
//import './ChatBox.scss';

/**
Form to submit new message

@prop user: username associated with viewing user
@prop onMessageSubmit: callback to execute with new message data
* */

const maxChars = 255;

const charsRemainingStyle = {
  fontSize: '85%',
  position: 'absolute',
  top: '10px',
  right: '10px',
};

const MessageForm = React.createClass({
  getInitialState() {
    return { text: '', charsLeft: maxChars };
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
    const input = e.target.value;
    this.setState({ text: input, charsLeft: maxChars - input.length });
  },
  render() {
    return (
      <span>
        <div className="message_form">
          <form onSubmit={this.handleSubmit}>
            <div
              className="container_for_message_to_send"
              style={{ position: 'relative' }}
            >
              <input
                className="message_to_send"
                onChange={this.changeHandler}
                value={this.state.text}
                placeholder="Write a Message"
                maxLength={255}
              />
              <div className="chars_remaining" style={charsRemainingStyle}>
                {this.state.charsLeft}
              </div>
            </div>
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

export default MessageForm;
