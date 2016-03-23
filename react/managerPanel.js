// home.html
// let DJ edit personal info

var React = require('react');
var ReactDOM = require('react-dom');

var urls = {url: "/panel/manager/info", 
            listAccounts: "/panel/manager/api/listAccounts",
            verifyAccount: "/panel/manager/api/verify",
            delete: "/panel/manager/api/delete",
            deleteUnverified: "/panel/manager/api/deleteUnverified"};

// Custom elements
var ActionTable = require('./components/ActionTable.jsx');
var PanelLinksNavbar = require('./components/PanelLinksNavbar.jsx');

// Bootstrap elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Well = require('react-bootstrap').Well;
var Panel = require('react-bootstrap').Panel;
var Pager = require('react-bootstrap').Pager;
var PageItem = require('react-bootstrap').PageItem;

const tabs = ["Home", "Manager", "FAQ"];

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
        <Grid>
          <PanelLinksNavbar />
          <Row>
            <Col xs={12} md={6}>
              <Well>
                <p>Name: name</p>
              </Well>
            </Col>
            <Col xs={12} md={6}>
              <AccountsList urls={this.props.urls} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

// user account strings
const atString1 = "Full Name";
const atString2 = "Email";
const atManagerGlyph = "fire";
// verify user strings
const atAcceptTitle = "Verify";
const atAcceptTooltip = "Verify user is a Radio DJ";
// reject unverified user strings
const atRejectTitleUnverified = "Delete";
const atRejectTooltipUnverified = "Deny account request";
// delete verified user strings
const atRejectTitleVerified = "Remove DJ";
const atRejectTooltipVerified = "Delete DJ account";
var AccountsList = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urls.listAccounts,
      dataType: 'json',
      type: 'POST',
      cache: false,
      success: function(accounts) {
        this.setState({accounts: accounts});
        this.updateTableRows();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  updateUser: function(url, username, oldAccounts) {
    var updateData = {"username": username};
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: updateData,
        success: function() {
          this.loadDataFromServer();
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({accounts: oldAccounts});
          this.updateTableRows();
          console.error(this.props.showURL, status, err.toString());
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
    this.updateUser(this.props.urls.verifyAccount, username, oldAccounts);
  },
  handleDeleteUser: function(username) {
    var oldAccounts = this.state.accounts;
    var newAccounts = $.extend(true, [], this.state.accounts);
    for (var i = 0; i < newAccounts.verified.length; i++) {
      if (newAccounts.verified[i].username == username) {
        // remove user from verified
        newAccounts.verified.splice(i, 1);
        break;
      }
    }
    // optimistically add show data to present
    this.setState({accounts: newAccounts});
    this.updateUser(this.props.urls.delete, username, oldAccounts);
  },
  handleDeleteUnverifiedUser: function(username) {
    var oldAccounts = this.state.accounts;
    var newAccounts = $.extend(true, [], this.state.accounts);
    for (var i = 0; i < newAccounts.unverified.length; i++) {
      if (newAccounts.unverified[i].username == username) {
        // remove user from unverified
        newAccounts.unverified.splice(i, 1);
        break;
      }
    }
    // optimistically add show data to present
    this.setState({accounts: newAccounts});
    this.updateUser(this.props.urls.deleteUnverified, username, oldAccounts);
  },
  updateTableRows: function() {
    var makeRows = function(accounts) {
      var rows = [];
      for (var i = 0; i < accounts.length; i++) {
        var row = {value: accounts[i].username,
                  string1: accounts[i].username,
                  string2: accounts[i].email,
                  actionsDisabled: accounts[i].manager
                };
        rows.push(row);
      }
      return rows;
    };

    this.setState({unverifiedRows: makeRows(this.state.accounts.unverified)});
    this.setState({verifiedRows: makeRows(this.state.accounts.verified)});
  },

  getInitialState: function() {
    return {accounts: {unverified: [], verified: []}, unverifiedRows:[], verifiedRows: []};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="accountsList">
        {(this.state.unverifiedRows.length > 0)
          ?
          <Panel header="Requested Accounts" bsStyle="warning">
            <ActionTable rows={this.state.unverifiedRows} string1={atString1} string2={atString2}
              acceptTitle={atAcceptTitle} rejectTitle={atRejectTitleUnverified}
              acceptTooltip={atAcceptTooltip} rejectTooltip={atRejectTooltipVerified}
              onAccept={this.handleVerifyUser} onReject={this.handleDeleteUnverifiedUser}
            />
          </Panel>
          : <div />
        }
        {(this.state.verifiedRows.length > 0)
          ?
          <Panel header="DJs" bsStyle="info">
            <ActionTable rows={this.state.verifiedRows} string1={atString1} string2={atString2}
              rejectTitle={atRejectTitleVerified} rejectTooltip={atRejectTooltipVerified}
              onReject={this.handleDeleteUser} glyph={atManagerGlyph}
            />
          </Panel>
          : <div />
        }
      </div>
    );
  }
});

var UnverifiedUserAccount = React.createClass({
  handleVerifyUser: function() {
    this.props.onVerifyUser(this.props.user.username);
  },
  handleRemoveUser: function() {
    this.props.onDelete(this.props.user.username);
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
    this.props.onDelete(this.props.user.username);
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
