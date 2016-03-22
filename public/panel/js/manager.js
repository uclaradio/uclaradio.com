// home.html
// let DJ edit personal info

var urls = {url: "/panel/manager/info", 
            listAccounts: "/panel/manager/api/listAccounts",
            verifyAccount: "/panel/manager/api/verify"};

var Manager = React.createClass({
  // loadDataFromServer: function() {
  //   $.ajax({
  //     url: this.props.urls.url,
  //     dataType: 'json',
  //     cache: false,
  //     success: function(user) {
  //       this.setState({user: user});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.urls.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  // handleDJNameSubmit: function(newDJName) {
  //   var user = $.extend(true, {}, this.state.user);
  //   user.djName = newDJName;
  //   this.handleUserDataSubmit(user);
  // },
  // handleEmailSubmit: function(newEmail) {
  //   var user = $.extend(true, {}, this.state.user);
  //   user.email = newEmail;
  //   this.handleUserDataSubmit(user);
  // },
  // handlePhoneSubmit: function(newPhone) {
  //   var user = $.extend(true, {}, this.state.user);
  //   user.phone = newPhone;
  //   this.handleUserDataSubmit(user);
  // },
  // handleUserDataSubmit: function(updatedUser) {
  //   var oldUser = this.state.user;
  //   // Optimistically update local data, will be refreshed or reset after response from server
  //   updatedUser.username = oldUser.username;
  //   this.setState({user: updatedUser});
  //   $.ajax({
  //     url: this.props.urls.updateURL,
  //     dataType: 'json',
  //     type: 'POST',
  //     data: updatedUser,
  //     success: function(user) {
  //       this.setState({user: user});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       this.setState({user: oldUser});
  //       console.error(this.props.urls.updateURL, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    // this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="manager">
        <AccountsList url={this.props.urls.listAccounts} verifyURL={this.props.urls.verifyAccount} />
      </div>
    );
  }
});

var AccountsList = React.createClass({
  loadDataFromServer: function() {
    console.log("retrieving accounts...");
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      cache: false,
      success: function(accounts) {
        this.setState({accounts: accounts});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleVerifyUser: function(username) {
    var oldAccounts = this.state.accounts;
    var newAccounts = $.extend(true, [], this.state.accounts);
    for (var i = 0; i < newAccounts.unverified.length; i++) {
      if (newAccounts.unverified[i].username == username) {
        // remove user from unverified and put in verified
        newAccounts.verified.push(newAccounts.unverified[i]);
        newAccounts.unverified.splice(i, 1);
        break;
      }
    }
    // optimistically add show data to present
    this.setState({accounts: newAccounts});
    var updateData = {"username": username};
    $.ajax({
      url: this.props.verifyURL,
      dataType: 'json',
      type: 'POST',
      data: updateData,
      success: function() {
        this.loadDataFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({accounts: oldAccounts});
        console.error(this.props.showURL, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    // accounts: {verified: [], unverified: []}
    return {accounts: {unverified: [], verified: []}};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    // create list of all shows
    var handleVerifyUser = this.handleVerifyUser;
    var unverified = this.state.accounts.unverified.map(function(unverifiedUser) {
      return (
      <div key={unverifiedUser.username}>
       <UnverifiedUserAccount user={unverifiedUser} onVerifyUser={handleVerifyUser} />
      </div>
      );
    });
    var verified = this.state.accounts.verified.map(function(verifiedUser) {
      return (
      <div key={verifiedUser.username}>
       <UserAccount user={verifiedUser} />
      </div>
      );
    });
    return (
      <div className="accountsList">
        
        {(this.state.accounts.unverified.length > 0) ? <div><h2> Requested Accounts </h2> {unverified}</div> : <div />}
        <br />
        {(this.state.accounts.verified.length > 0) ? <div><h2> DJs </h2> {verified}</div> : <div />}
      </div>
    );
  }
});

var UnverifiedUserAccount = React.createClass({
  handleVerifyUser: function() {
    this.props.onVerifyUser(this.props.user.username);
  },
  handleRemoveUser: function() {
    // TO DO: delete user
  },
  render: function() {
    return (
      <div className="unverifiedUserAccount">
        <p>{this.props.user.username}, email: {this.props.user.email}
        <button onClick={this.handleVerifyUser}>Verify DJ</button>
        &emsp;
        <button className="destructive" onClick={this.handleRemoveUser}>Delete</button>
        </p>
      </div>
    );
  }
});

var UserAccount = React.createClass({
  handleRemoveUser: function() {
    // TO DO: delete user
  },
  render: function() {
    return (
      <div className="userAccount">
        <p>{this.props.user.username}, email: {this.props.user.email}
        <button className="destructive" onClick={this.handleRemoveUser}>Delete</button>
        </p>
      </div>
    );
  }
});


ReactDOM.render(
  <Manager urls={urls} />,
  document.getElementById('content')
);
