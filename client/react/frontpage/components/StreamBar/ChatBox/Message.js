import React from 'react';
//import './ChatBox.scss';

const ReportMessageURL = '/chat/report';

/** Helper functions * */

const imageURL = url => url.match(/\.(jpeg|jpg|gif|png)$/) != null;

/**
Message component displaying a message object

@prop messageID: id of message represented
@prop text: text of message
@prop user: username associated with message
@prop viewing_user: username associated with viewing user
@prop date: timestamp of message
* */
class Message extends React.Component {
  state = {};

  reportMessage = () => {
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
  };

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
            this.props.user != this.props.viewing_user
              ? 'their-message'
              : 'my-message'
          }
        >
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
            this.props.user == this.props.viewing_user
              ? { float: 'right' }
              : { float: 'left' }
          }
        >
          <span className="message-username-tag-username">
            {this.props.user}
          </span>
          {` ${
            /* + Month + "/" + Day + " " */

            Hour
          }:${Minute}:${Second}`}
        </div>
      </div>
    );
  }
}

export default Message;
