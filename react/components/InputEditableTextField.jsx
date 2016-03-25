// InputEditableTextField.jsx

var React = require('react');
var ReactDOM = require('react-dom');

// Bootstrap elements
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Input = require('react-bootstrap').Input;
var FormControls = require('react-bootstrap').FormControls;
var Glyphicon = require('react-bootstrap').Glyphicon;

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
*  @prop verified: should show indicator that the value was successfully... whatever
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
    e.preventDefault();
    var value = this.state.value.trim();
    this.props.onSubmit(value)
    this.setState({value: '', editable: false});
  },
  componentDidUpdate: function(e) {
    if (this.state.editable && this.state.currentlyEditing) {
      ReactDOM.findDOMNode(this.refs.input.getInputDOMNode()).select();
    }
  },
  render: function() {
    var editButton = <a onClick={this.toggleEditableField}>Edit</a>;
    // var cancelButton = <Button className="cancelLink" onClick={this.toggleEditableField}>Cancel</Button>;
    var actionButton = <span>
                        <a onClick={this.handleSubmit}>{this.props.buttonTitle || "Update"}</a>
                        &emsp;|&emsp;<a className="cancelLink" onClick={this.toggleEditableField}>Cancel</a>
                       </span>
    return (
      <div className="inputEditableTextField">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          { this.state.editable ?
            <Input
              type={this.props.multiline ? "textarea" :"text"}
              value={this.state.value}
              placeholder={this.props.placeholder}
              label={this.props.title}
              ref="input"
              groupClassName="group-class"
              addonAfter={actionButton}
              labelClassName="col-xs-3"
              wrapperClassName="col-xs-9"
              onChange={this.handleChange} />
          :
          // locked to user input
          <FormControls.Static label={this.props.title} labelClassName="col-xs-3"
          wrapperClassName="inputEditWrapper col-xs-9" addonAfter={editButton}>
            { this.props.currentValue ?
              <span>{this.props.currentValue} {this.props.verified ? <Glyphicon className="verifiedGlyph" glyph="ok" /> : ''}</span>
              :
              <span className="placeholder">{this.props.placeholder}</span>
            }
          </FormControls.Static>
          }
        </form>
      </div>
    );
  }
});


module.exports = InputEditableTextField;
