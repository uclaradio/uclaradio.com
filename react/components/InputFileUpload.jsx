// InputFileUpload.jsx

var React = require('react');
var ReactDOM = require('react-dom');

// Bootstrap elements
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

/**
*  Input file upload element
*
*  @prop title: title of the input
*  @prop onSubmit -> function(img): function to call on file submit
*  @prop details: help details
*  @prop verified: should indicate input data was... whatever
*/
var InputFileUpload = React.createClass({
  getInitialState: function() {
    return {disabled: true};
  },
  handleChange: function(e) {
    if (e.target.files.length > 0) {
      this.setState({file: e.target.files[0], disabled: false})
    }
    else {
      this.setState({disabled: true});
    }
  },
  handleSubmit: function() {
    if (this.state.file && !this.state.disabled) {
      this.props.onSubmit(this.state.file);
      ReactDOM.findDOMNode(this.refs.input.getInputDOMNode()).value = '';
      this.setState({disabled: true});
    }
  },
  render: function() {
    var submitButton = <a onClick={this.handleSubmit} className={this.state.disabled ? 'disabled' : ''}>Submit</a>;
    return (
      <form className="inputFileUpload form-horizontal">
        <Input label={this.props.title} labelClassName="col-xs-3" wrapperClassName="col-xs-9">
          <span>{this.props.verified ? <Glyphicon className="verifiedGlyph fileUpload" glyph="ok" /> : ''}<Input type="file" ref="input" onChange={this.handleChange} addonAfter={submitButton} wrapperClassName="fileUpload" /></span>
        </Input>
      </form>
    );
  }
});

module.exports = InputFileUpload;
