// InputFileUpload.jsx

const React = require('react');
const ReactDOM = require('react-dom');

// Bootstrap elements
const Input = require('react-bootstrap').Input;
const Glyphicon = require('react-bootstrap').Glyphicon;

/**
*  Input file upload element
*
*  @prop title: title of the input
*  @prop accept: file types that should be accepted
*  @prop onSubmit -> function(img): function to call on file submit
*  @prop details: help details
*  @prop verified: should indicate input data was... whatever
*/
const InputFileUpload = React.createClass({
  getInitialState() {
    return { disabled: true };
  },
  handleChange(e) {
    if (e.target.files.length > 0) {
      this.setState({ file: e.target.files[0], disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  },
  handleSubmit() {
    if (this.state.file && !this.state.disabled) {
      this.props.onSubmit(this.state.file);
      ReactDOM.findDOMNode(this.refs.input.getInputDOMNode()).value = '';
      this.setState({ disabled: true });
    }
  },
  render() {
    const submitButton = (
      <a
        onClick={this.handleSubmit}
        className={this.state.disabled ? 'disabled' : ''}>
        Submit
      </a>
    );
    return (
      <form className="inputFileUpload form-horizontal">
        <Input
          label={this.props.title}
          labelClassName="col-xs-3"
          wrapperClassName="col-xs-9">
          <span>
            {this.props.verified ? (
              <Glyphicon className="verifiedGlyph fileUpload" glyph="ok" />
            ) : (
              ''
            )}
            <Input
              type="file"
              ref="input"
              accept={this.props.accept}
              onChange={this.handleChange}
              addonAfter={submitButton}
              wrapperClassName="fileUpload"
            />
          </span>
        </Input>
      </form>
    );
  },
});

module.exports = InputFileUpload;
