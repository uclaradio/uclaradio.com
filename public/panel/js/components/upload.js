// upload.js
// Contains elements used for uploading files in a form


/**
*  Upload a file with file input field
*
*  @prop onChange: function(event) -> call when file chosen to upload
*  @prop accept: file types to accept
*  @prop submitText: text to display as submit button
*/
var FileInput = React.createClass({
  getInitialState: function() {
    return {"fileSelected": false};
  },
  handleChange: function() {
    var file = ReactDOM.findDOMNode(this.refs.file).files[0];
    this.setState({"fileSelected": (file != null)});
  },
  handleSubmit: function() {
    var file = ReactDOM.findDOMNode(this.refs.file).files[0];
    if (this.props.onChange && file) {
      this.props.onChange(file);
    }
  },
  render: function() {
    return (
      <div className="fileInput">
        <input ref="file" type="file" accept={this.props.accept} onChange={this.handleChange} />
        <br /><a className={this.state.fileSelected ? "enabled" : "disabled"} onClick={this.handleSubmit}>{this.props.submitText}</a>
      </div>
    );
  }
});

window.FileInput = FileInput;
