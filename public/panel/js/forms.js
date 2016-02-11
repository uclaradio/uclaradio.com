// forms.js
// Contains common elements in forms

var UserEditableTextField = React.createClass({
  getInitialState: function() {
    return {text: '', editableField: false};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  toggleEditableField: function(e) {
    this.setState({text: '', editableField: !this.state.editableField})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onTextSubmit(text)
    this.setState({text: '', editableField: false});
  },
  render: function() {
    return (
      <div className="userEditableTextField">
      { this.state.editableField ?
        // field edit/submittable
        <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="no_bottom_margins"
          placeholder={this.props.name}
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        &ensp;<input type="submit" id="no_bottom_margins" value="Update" />
        &ensp;<a onClick={this.toggleEditableField}>Cancel</a>
        </form>
      :
      // locked to user input
      <p>{this.props.name}: {this.props.currentValue} <a onClick={this.toggleEditableField}>Edit</a></p>
    }
    </div>
    );
  }
});
