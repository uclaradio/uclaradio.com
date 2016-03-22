// UserEditableTextField.js

var React = require('react');
var ReactDOM = require('react-dom');

/**
*  Show current saved value for a text field and let user update the field and submit changes
*
*  @prop name: field being edited: 'Title'
*  @prop currentValue: current saved value of the field: 'Some Show'
*  @prop multiline: should allow user to enter multiple lines of text
*  @prop onTextSubmit -> function(text): parent's function to be called if 'Submit' is hit
*
*  @state text: current value being entered
*  @state editable: should let the user edit the field
*  @state currentlyEditing: user has begun editing the text field by typing at least 1 character (used to select text on first edit)
*/
var UserEditableTextField = React.createClass({
  getInitialState: function() {
    return {text: '', editable: false, currentlyEditing: false};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value, currentlyEditing: false});
  },
  toggleEditableField: function(e) {
    this.setState({text: this.props.currentValue, editable: !this.state.editable, currentlyEditing: true})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onTextSubmit(text)
    this.setState({text: '', editable: false});
  },
  componentDidUpdate: function(e) {
    if (this.state.editable && this.state.currentlyEditing) {
      ReactDOM.findDOMNode(this.refs.valueInput).select();
    }
  },
  render: function() {
    var textEdit = this.props.multiline ? 
        ( <textarea
          ref="valueInput"
          placeholder={this.props.name}
          value={this.state.text}
          onChange={this.handleTextChange}
        /> )
        :
        (
        <input
          type="text"
          ref="valueInput"
          placeholder={this.props.name}
          value={this.state.text}
          onChange={this.handleTextChange}
        /> );
    return (
      <div className="userEditableTextField">
      { this.state.editable ?
        <form onSubmit={this.handleSubmit}>
        
        {textEdit}

        &ensp;<input type="submit" value="Update" />
        &ensp;<a onClick={this.toggleEditableField}>Cancel</a>
        </form>
      :
      // locked to user input
      <p>{this.props.name}: <span className="savedData">{this.props.currentValue}</span> <a onClick={this.toggleEditableField}>Edit</a></p>
    }
    </div>
    );
  }
});

module.exports = UserEditableTextField;