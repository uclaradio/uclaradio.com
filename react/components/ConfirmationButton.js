// UserEditableDateTimeField.js

var React = require('react');

/**
*  Allows user to confirm a button submission
*
*  @prop confirm: text to display on button when confirming
*  @prop submit: text to display on button when submitting
*  @prop onSubmit -> function(): parent's function to call when submitting
*/
var ConfirmationButton = React.createClass({
  getInitialState: function() {
    return {unlock: false};
  },
  toggleUnlock: function() {
    this.setState({unlock: !this.state.unlock});
  },
  render: function() {
    return (
      <div className="confirmationButton">
      { this.state.unlock ? 
        <div><button className="confirm-btn2" onClick={this.props.onSubmit}>{this.props.submit}</button>
        <button className="confirm-cancel" onClick={this.toggleUnlock}>Cancel</button></div>
        :
        <button className="confirm-btn1" onClick={this.toggleUnlock}>{this.props.confirm}</button>
      }
      </div>
    );
  }
});

module.exports = ConfirmationButton;
