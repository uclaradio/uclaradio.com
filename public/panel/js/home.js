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
      url: this.props.updateUrl,
      dataType: 'json',
      type: 'POST',
      data: updatedUser,
      success: function(user) {
        this.setState({user: user});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({user: oldUser});
        console.error(this.props.updateUrl, status, err.toString());
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

        <UserEditableTextField name="DJ Name" currentValue={this.state.user.djName} onTextSubmit={this.handleDJNameSubmit} />
        <UserEditableTextField name="Email" currentValue={this.state.user.email} onTextSubmit={this.handleEmailSubmit} />
        <UserEditableTextField name="Phone Number" currentValue={this.state.user.phone} onTextSubmit={this.handlePhoneSubmit} />

        <br />
        <ShowsList />
      </div>
    );
  }
});

var ShowsList = React.createClass({
  getInitialState: function() {
    return {shows: []};
  },
  render: function() {
    // list shows
    return (
      <div className="showsList">
      <h2> Shows </h2>
      <ul>
        <li>No shows found.</li>
      </ul>
    </div>
    );
  }
});


ReactDOM.render(
  <UserData url="/panel/api/user" updateUrl="/panel/api/updateUser" />,
  document.getElementById('content')
);
