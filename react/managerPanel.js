// home.html
// let DJ edit personal info

var React = require('react');
var ReactDOM = require('react-dom');

var urls = {managerInfo: "/panel/manager/api/info",
            managerUpdate: "/panel/manager/api/update",
            listAccounts: "/panel/manager/api/listAccounts",
            verifyAccount: "/panel/manager/api/verify",
            delete: "/panel/manager/api/delete",
            deleteUnverified: "/panel/manager/api/deleteUnverified"};

// Custom elements
var ActionTable = require('./components/ActionTable.jsx');
var PanelLinksNavbar = require('./components/PanelLinksNavbar.jsx');
var InputEditableTextField = require('./components/InputEditableTextField.jsx');

// Bootstrap elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Well = require('react-bootstrap').Well;
var Panel = require('react-bootstrap').Panel;
var Pager = require('react-bootstrap').Pager;
var PageItem = require('react-bootstrap').PageItem;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

var ManagerPage = React.createClass({
  render: function() {
    return (
      <div className="managerPage">
        <Grid>
          <PanelLinksNavbar />
          <Row>
            <Col xs={12} md={6}>
              <Well>
                <Manager urls={this.props.urls} />
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

var Manager = React.createClass({
  getInitialState: function() {
    return {manager: {}, positionVerified: false,
      meetingTimeVerified: false, meetingLocationVerified: false};
  },
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urls.managerInfo,
      dataType: 'json',
      type: 'POST',
      success: function(manager) {
        this.setState({manager: manager});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.managerInfo, status, err.toString());
      }.bind(this)
    });
  },
  handleManagerInfoSubmit: function(updatedManager, successVar) {
    var oldManager = this.state.manager;
    // Optimistically update local data, will be refreshed or reset after response from server
    this.setState({manager: updatedManager});
    var updateData = {manager: JSON.stringify(updatedManager)};
    $.ajax({
      url: this.props.urls.managerUpdate,
      dataType: 'json',
      type: 'POST',
      data: updateData,
      success: function(manager) {
        var successState = {manager: manager};
        successState[successVar] = true;
        this.setState(successState);
      }.bind(this),
      error: function(xhr, status, err) {
        var failedState = {manager: oldManager};
        failedState[successVar] = false;
        this.setState(failedState);
        console.error(this.props.urls.managerUpdate, status, err.toString());
      }.bind(this)
    });
  },
  handlePositionSubmit: function(position) {
    var manager = $.extend(true, {}, this.state.manager);
    manager.position = position;
    this.handleManagerInfoSubmit(manager, "positionVerified");
  },
  handleMeetingTimeSubmit: function(meetingTime) {
    var manager = $.extend(true, {}, this.state.manager);
    manager.meetingTime = meetingTime;
    this.handleManagerInfoSubmit(manager, "meetingTimeVerified");
  },
  handleMeetingPlaceSubmit: function(meetingPlace) {
    var manager = $.extend(true, {}, this.state.manager);
    manager.meetingPlace = meetingPlace;
    this.handleManagerInfoSubmit(manager, "meetingLocationVerified");
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="manager">
        <h2>Manager Info</h2>
        <InputEditableTextField title="Position" placeholder="Enter Manager Position"
          currentValue={this.state.manager.position} onSubmit={this.handlePositionSubmit}
          verified={this.state.positionVerified} />
        <InputEditableTextField title="Meeting Time" placeholder="Enter Department Meeting Times"
          currentValue={this.state.manager.meetingTime} onSubmit={this.handleMeetingTimeSubmit}
          verified={this.state.meetingTimeVerified} />
        <InputEditableTextField title="Meeting Location" placeholder="Enter Department Meeting Location"
          currentValue={this.state.manager.meetingPlace} onSubmit={this.handleMeetingPlaceSubmit}
          verified={this.state.meetingLocationVerified} />
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


ReactDOM.render(
  <ManagerPage urls={urls} />,
  document.getElementById('content')
);
