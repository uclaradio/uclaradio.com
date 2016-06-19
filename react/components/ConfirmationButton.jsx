// UserEditableDateTimeField.js

var React = require('react');

// Bootstrap elements
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;

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
      <div className="confirmationButton centered">
      { this.state.unlock ? 
        <ButtonGroup>
          <Button className="delete" onClick={this.props.onSubmit}>{this.props.submit}</Button>
          <Button onClick={this.toggleUnlock}>Cancel</Button>
        </ButtonGroup>
        :
        <Button className="delete" onClick={this.toggleUnlock}>{this.props.confirm}</Button>
      }
      </div>
    );
  }
});

module.exports = ConfirmationButton;
