// home.html
// let DJ edit personal info


var UserData = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(user) {
        this.setState({user: user});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDJNameSubmit: function(newDJName) {
    var user = $.extend(true, {}, this.state.user);
    user.djName = newDJName;
    this.handleUserDataSubmit(user);
  },
  handleEmailSubmit: function(newEmail) {
    var user = $.extend(true, {}, this.state.user);
    user.email = newEmail;
    this.handleUserDataSubmit(user);
  },
  handlePhoneSubmit: function(newPhone) {
    var user = $.extend(true, {}, this.state.user);
    user.phone = newPhone;
    this.handleUserDataSubmit(user);
  },
  handleUserDataSubmit: function(updatedUser) {
    var oldUser = this.state.user;
    console.log("submiting username: ", updatedUser.username, ", djName: ", updatedUser.djName, ", email: ", updatedUser.email, ", phone:", updatedUser.phone);
    // Optimistically update local data
    updatedUser.username = oldUser.username;
    this.setState({user: updatedUser});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: updatedUser,
      success: function(user) {
        this.setState({user: user});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({user: oldUser});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {user: {username: '', djName: '', email: '', phone: ''}};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="userData">
        <h2>{this.state.user.username}</h2>

        <UserEditableTextField name="DJ Name" currentValue={this.state.user.djName} onTextSubmit={this.handleDJNameSubmit}/>
        <UserEditableTextField name="Email" currentValue={this.state.user.email} onTextSubmit={this.handleEmailSubmit}/>
        <UserEditableTextField name="Phone Number" currentValue={this.state.user.phone} onTextSubmit={this.handlePhoneSubmit}/>

        <br />
        <p>No page links available</p>
      </div>
    );
  }
});

/*
var UserTextForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onTextSubmit(text)
    this.setState({text: ''});
  },
  render: function() {
    return (
      <form className="userTextForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder={this.props.name}
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Update" />
      </form>
    );
  }
});
*/

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

ReactDOM.render(
  <UserData url="/panel/api/updateUser"/>,
  document.getElementById('content')
);
