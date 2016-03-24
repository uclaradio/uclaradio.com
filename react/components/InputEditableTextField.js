// UserEditableTextField.js

var React = require('react');
var ReactDOM = require('react-dom');

// Bootstrap elements
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

/**
*  Show current saved value for a text field and let user update the field and submit changes
*
*  @prop title: field being edited: 'Title'
*  @prop placeholder: placeholder to show in field
*  @prop buttonTitle: title for action button
*  @prop currentValue: current saved value of the field: 'Some Show'
*  @prop multiline: should allow user to enter multiple lines of text
*  @prop onTextSubmit -> function(text): parent's function to be called if 'Submit' is hit
*
*  @state value: current value being entered
*  @state editable: should let the user edit the field
*  @state currentlyEditing: user has begun editing the text field by typing at least 1 character (used to select text on first edit)
*/
var UserEditableTextField = React.createClass({
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
    if (!value) {
      return;
    }
    this.props.onTextSubmit(value)
    this.setState({value: '', editable: false});
  },
  componentDidUpdate: function(e) {
    if (this.state.editable && this.state.currentlyEditing) {
      ReactDOM.findDOMNode(this.refs.input).select();
    }
  },
  render: function() {
    // var textEdit = this.props.multiline ? 
    //     ( <textarea
    //       ref="valueInput"
    //       placeholder={this.props.title}
    //       value={this.state.text}
    //       onChange={this.handleTextChange}
    //     /> )
    //     :
    //     (
    //     <input
    //       type="text"
    //       ref="valueInput"
    //       placeholder={this.props.title}
    //       value={this.state.text}
    //       onChange={this.handleTextChange}
    //     /> );
    var cancelButton = <Button className="cancelButton" onClick={this.toggleEditableField}>Cancel</Button>;
    var actionButton = <Button>{this.props.buttonTitle}</Button>;
    return (
      <div className="userEditableTextField">
      { this.state.editable ?
        <Input
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          label={this.props.title}
          ref="input"
          groupClassName="group-class"
          buttonBefore={cancelButton}
          buttonAfter={actionButton}
          labelClassName="col-xs-2"
          wrapperClassName="col-xs-10"
          onChange={this.handleChange} />
      :
      // locked to user input
      <p>{this.props.title}: <span className="savedData">{this.props.currentValue}</span> <a onClick={this.toggleEditableField}>Edit</a></p>
    }
    </div>
    );
  }
});



// var UserEditableTextField = React.createClass({
//   getInitialState: function() {
//     return {text: '', editable: false, currentlyEditing: false};
//   },
//   handleTextChange: function(e) {
//     this.setState({text: e.target.value, currentlyEditing: false});
//   },
//   toggleEditableField: function(e) {
//     this.setState({text: this.props.currentValue, editable: !this.state.editable, currentlyEditing: true})
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var text = this.state.text.trim();
//     if (!text) {
//       return;
//     }
//     this.props.onTextSubmit(text)
//     this.setState({text: '', editable: false});
//   },
//   componentDidUpdate: function(e) {
//     if (this.state.editable && this.state.currentlyEditing) {
//       ReactDOM.findDOMNode(this.refs.valueInput).select();
//     }
//   },
//   render: function() {
//     var textEdit = this.props.multiline ? 
//         ( <textarea
//           ref="valueInput"
//           placeholder={this.props.title}
//           value={this.state.text}
//           onChange={this.handleTextChange}
//         /> )
//         :
//         (
//         <input
//           type="text"
//           ref="valueInput"
//           placeholder={this.props.title}
//           value={this.state.text}
//           onChange={this.handleTextChange}
//         /> );
//     return (
//       <div className="userEditableTextField">
//       { this.state.editable ?
//         <form onSubmit={this.handleSubmit}>
        
//         {textEdit}

//         &ensp;<input type="submit" value="Update" />
//         &ensp;<a onClick={this.toggleEditableField}>Cancel</a>
//         </form>
//       :
//       // locked to user input
//       <p>{this.props.title}: <span className="savedData">{this.props.currentValue}</span> <a onClick={this.toggleEditableField}>Edit</a></p>
//     }
//     </div>
//     );
//   }
// });

module.exports = UserEditableTextField;