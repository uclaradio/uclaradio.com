import React from 'react';
//import './ChatBox.scss';

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
              maxLength={11}
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

export default MessageForm;
