// InputEditableTextField.js

var React = require('react');
var ReactDOM = require('react-dom');

// Bootstrap elements
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var FormControls = require('react-bootstrap').FormControls;

/**
*  Show current saved value for a text field and let user update the field and submit changes
*
*  note: this element should be wrapped in a form tag for proper display
*    <form className="form-horizontal">...<InputEditableTextField />...</form
*
*  @prop title: field being edited: 'Title'
*  @prop placeholder: placeholder to show in field
*  @prop buttonTitle: title for action button
*  @prop currentValue: current saved value of the field: 'Some Show'
*  @prop multiline: should allow user to enter multiple lines of text
*  @prop onSubmit -> function(text): parent's function to be called if 'Submit' is hit
*
*  @state value: current value being entered
*  @state editable: should let the user edit the field
*  @state currentlyEditing: user has begun editing the text field by typing at least 1 character (used to select text on first edit)
*/
var InputEditableTextField = React.createClass({
  getInitialState: function() {
    return {value: '', editable: false, currentlyEditing: false};
  },
  handleChange: function(e) {
    this.setState({value: e.target.value, currentlyEditing: false});
  },
  toggleEditableField: function(e) {
    this.setState({value: this.props.currentValue, editable: !this.state.editable, currentlyEditing: true})
  },
  handleSubmit: function(e) {
    var value = this.state.value.trim();
    if (value) {
      this.props.onSubmit(value)
      this.setState({value: '', editable: false});
    }
  },
  componentDidUpdate: function(e) {
    if (this.state.editable && this.state.currentlyEditing) {
      ReactDOM.findDOMNode(this.refs.input.getInputDOMNode()).select();
    }
  },
  render: function() {
    var editButton = <a onClick={this.toggleEditableField}>Edit</a>;
    var cancelButton = <a className="cancelLink" onClick={this.toggleEditableField}>Cancel</a>;
    var actionButton = <Button onClick={this.handleSubmit}>{this.props.buttonTitle || "Update"}</Button>;
    return (
      <div className="inputEditableTextField">
      { this.state.editable ?
        <div>
          <Input
            type={this.props.multiline ? "textarea" :"text"}
            value={this.state.value}
            placeholder={this.props.placeholder}
            label={this.props.title}
            ref="input"
            groupClassName="group-class"
            buttonAfter={actionButton}
            addonAfter={cancelButton}
            labelClassName="col-xs-3"
            wrapperClassName="col-xs-9"
            onChange={this.handleChange} />
        </div>
      :
      // locked to user input
      <FormControls.Static label={this.props.title} labelClassName="col-xs-3"
      wrapperClassName="inputEditWrapper col-xs-9" addonAfter={editButton}>
        {this.props.currentValue}
      </FormControls.Static>
    }
    </div>
    );
  }
});


module.exports = InputEditableTextField;
