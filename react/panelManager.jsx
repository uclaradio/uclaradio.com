// home.html
// let DJ edit personal info

import React from 'react';
import ReactDOM from 'react-dom';

const urls = {
  managerInfo: '/panel/manager/api/info',
  managerUpdate: '/panel/manager/api/update',
  allShows: '/panel/api/allshows',
  showLink: '/panel/show',
  listAccounts: '/panel/manager/api/listAccounts',
  verifyAccount: '/panel/manager/api/verify',
  delete: '/panel/manager/api/delete',
  deleteUnverified: '/panel/manager/api/deleteUnverified',
  getReportedMessages: '/chat/reportedMessages',
  deleteMessages: '/panel/manager/api/deletechat',
  keepMessages: '/panel/manager/api/freechat',
};

// Panel Elements
const ActionTable = require('./panel/ActionTable.jsx');
const PanelLinksNavbar = require('./panel/PanelLinksNavbar.jsx');
const ShowList = require('./panel/ShowList.jsx');

// Inputs
const InputEditableTextField = require('./panel/inputs/InputEditableTextField.jsx');
const InputCheckbox = require('./panel/inputs/InputCheckbox.jsx');

// Bootstrap Elements
import { Grid, Row, Col, Well, Panel, Button } from 'react-bootstrap';

// other
const CheckBoxList = require('react-checkbox-list');

const ManagerPage = React.createClass({
  render() {
    return (
      <div className="managerPage">
        <Grid>
          <PanelLinksNavbar />
          <Row>
            <Col xs={12} md={6}>
              <Well>
                <Manager urls={this.props.urls} />
              </Well>
              <ReportedMessages />
              <ManagerShowsList urls={this.props.urls} />
            </Col>
            <Col xs={12} md={6}>
              <AccountsList urls={this.props.urls} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },
});

const ReportedMessages = React.createClass({
  getInitialState() {
    return {
      messages: [],
    };
  },
  fetchReportedMessages() {
    $.ajax({
      url: urls.getReportedMessages,
      type: 'GET',
      success: function(messages) {
        this.setState({ messages });
      }.bind(this),
    });
  },
  handleKeep(messageID) {
    $.ajax({
      url: urls.keepMessages,
      type: 'POST',
      data: {
        id: messageID,
      },
      success: function() {
        this.fetchReportedMessages();
      }.bind(this),
    });
  },
  handleDelete(messageID) {
    $.ajax({
      url: urls.deleteMessages,
      type: 'POST',
      data: {
        id: messageID,
      },
      success: function() {
        this.fetchReportedMessages();
      }.bind(this),
    });
  },
  componentDidMount() {
    this.fetchReportedMessages();
  },
  render() {
    if (this.state.messages.length == 0) {
      return <div className="reportedMessages" />;
    }
    const handleKeep = this.handleKeep;
    const handleDelete = this.handleDelete;
    return (
      <Well>
        <div className="reportedMessages">
          <center>
            <h2>Reported Messages</h2>
          </center>
          <br />
          <table className="reportedTable">
            <tbody>
              {this.state.messages.map(message => (
                <tr key={message.id}>
                  <td>
                    <Button
                      onClick={() => {
                        handleKeep(message.id);
                      }}>
                      Keep
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        handleDelete(message.id);
                      }}>
                      Delete
                    </Button>
                  </td>
                  <td>
                    <q>{message.text}</q>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Well>
    );
  },
});

const Manager = React.createClass({
  getInitialState() {
    return {
      manager: {},
      positionVerified: false,
      publicVerified: false,
      meetingTimeVerified: false,
      meetingLocationVerified: false,
      emailVerified: false,
      departmentInfoVerified: false,
    };
  },
  loadDataFromServer() {
    $.ajax({
      url: this.props.urls.managerInfo,
      dataType: 'json',
      type: 'POST',
      success: function(manager) {
        this.setState({ manager });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.managerInfo, status, err.toString());
      }.bind(this),
    });
  },
  handleManagerInfoSubmit(updatedManager, successVar) {
    const oldManager = this.state.manager;
    // Optimistically update local data, will be refreshed or reset after response from server
    this.setState({ manager: updatedManager });
    const updateData = { manager: JSON.stringify(updatedManager) };
    // don't mark as verified yet
    const unverifiedState = {};
    unverifiedState[successVar] = false;
    this.setState(unverifiedState);
    $.ajax({
      url: this.props.urls.managerUpdate,
      dataType: 'json',
      type: 'POST',
      data: updateData,
      success: function(manager) {
        const successState = { manager };
        successState[successVar] = true;
        this.setState(successState);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ manager: oldManager });
        console.error(this.props.urls.managerUpdate, status, err.toString());
      }.bind(this),
    });
  },
  handlePositionSubmit(position) {
    const manager = $.extend(true, {}, this.state.manager);
    manager.position = position;
    this.handleManagerInfoSubmit(manager, 'positionVerified');
  },
  handleMeetingTimeSubmit(meetingTime) {
    const manager = $.extend(true, {}, this.state.manager);
    manager.meetingTime = meetingTime;
    this.handleManagerInfoSubmit(manager, 'meetingTimeVerified');
  },
  handleMeetingPlaceSubmit(meetingPlace) {
    const manager = $.extend(true, {}, this.state.manager);
    manager.meetingPlace = meetingPlace;
    this.handleManagerInfoSubmit(manager, 'meetingLocationVerified');
  },
  handleEmailSubmit(email) {
    const manager = $.extend(true, {}, this.state.manager);
    manager.email = email;
    this.handleManagerInfoSubmit(manager, 'emailVerified');
  },
  handleDepartmentInfoSubmit(departmentInfo) {
    const manager = $.extend(true, {}, this.state.manager);
    manager.departmentInfo = departmentInfo;
    this.handleManagerInfoSubmit(manager, 'departmentInfoVerified');
  },
  handlePublicSubmit(checked) {
    const manager = $.extend(true, {}, this.state.manager);
    manager.public = checked;
    this.handleManagerInfoSubmit(manager, 'publicVerified');
  },
  componentDidMount() {
    this.loadDataFromServer();
  },
  render() {
    return (
      <div className="manager">
        <h2>Manager Info</h2>
        <InputEditableTextField
          title="Position"
          placeholder="Enter Manager Position"
          currentValue={this.state.manager.position}
          onSubmit={this.handlePositionSubmit}
          verified={this.state.positionVerified}
        />
        <InputEditableTextField
          title="Meeting Time"
          placeholder="Enter Department Meeting Times"
          currentValue={this.state.manager.meetingTime}
          onSubmit={this.handleMeetingTimeSubmit}
          verified={this.state.meetingTimeVerified}
        />
        <InputEditableTextField
          title="Meeting Location"
          placeholder="Enter Department Meeting Location"
          currentValue={this.state.manager.meetingPlace}
          onSubmit={this.handleMeetingPlaceSubmit}
          verified={this.state.meetingLocationVerified}
        />
        <InputEditableTextField
          title="Email"
          placeholder="Enter Department Email"
          currentValue={this.state.manager.email}
          onSubmit={this.handleEmailSubmit}
          verified={this.state.emailVerified}
        />
        <InputEditableTextField
          title="Department Info"
          placeholder="Enter Department Info"
          currentValue={this.state.manager.departmentInfo}
          onSubmit={this.handleDepartmentInfoSubmit}
          verified={this.state.departmentInfoVerified}
          multiline
        />
        <InputCheckbox
          title="Public"
          details="Show my info on Manager's Board"
          checked={this.state.manager.public}
          onSelect={this.handlePublicSubmit}
          verified={this.state.publicVerified}
        />
      </div>
    );
  },
});

const ManagerShowsList = React.createClass({
  getInitialState() {
    // shows: {title, day, time}
    return { shows: [] };
  },
  loadDataFromServer() {
    $.ajax({
      url: this.props.urls.allShows,
      dataType: 'json',
      cache: false,
      success: function(shows) {
        this.setState({ shows });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.allShows, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount() {
    this.loadDataFromServer();
  },
  render() {
    return (
      <div className="userShowsList">
        <h4>Shows</h4>
        <ShowList
          url={this.props.urls.showLink}
          shows={this.state.shows}
          placeholder="/img/radio.png"
          short
        />
      </div>
    );
  },
});

// user account strings
const atManagerGlyph = 'fire';
// verify user strings
const atAcceptTitle = 'Verify';
const atAcceptTooltip = 'Verify user is a Radio DJ';
// delete verified user strings
const atRejectTooltipVerified = 'Delete DJ account';

const AccountsList = React.createClass({
  loadDataFromServer() {
    $.ajax({
      url: this.props.urls.listAccounts,
      dataType: 'json',
      type: 'POST',
      cache: false,
      success: function(accounts) {
        this.setState({ accounts });
        this.updateTableRows();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  updateUser(url, username, oldAccounts) {
    const updateData = { username };
    $.ajax({
      url,
      dataType: 'json',
      type: 'POST',
      data: updateData,
      success: function() {
        this.loadDataFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ accounts: oldAccounts });
        this.updateTableRows();
        console.error(this.props.showURL, status, err.toString());
      }.bind(this),
    });
  },
  handleVerifyUser(username) {
    const oldAccounts = this.state.accounts;
    const newAccounts = $.extend(true, [], this.state.accounts);
    for (let i = 0; i < newAccounts.unverified.length; i++) {
      if (newAccounts.unverified[i].username == username) {
        // remove user from unverified and put in verified
        newAccounts.verified.push(newAccounts.unverified[i]);
        newAccounts.unverified.splice(i, 1);
        break;
      }
    }
    // optimistically add show data to present
    this.setState({ accounts: newAccounts });
    this.updateUser(this.props.urls.verifyAccount, username, oldAccounts);
  },
  handleDeleteUser(username) {
    const oldAccounts = this.state.accounts;
    const newAccounts = $.extend(true, [], this.state.accounts);
    for (let i = 0; i < newAccounts.verified.length; i++) {
      if (newAccounts.verified[i].username == username) {
        // remove user from verified
        newAccounts.verified.splice(i, 1);
        break;
      }
    }
    // optimistically add show data to present
    this.setState({ accounts: newAccounts });
    this.updateUser(this.props.urls.delete, username, oldAccounts);
  },
  handleDeleteUnverifiedUser(username) {
    const oldAccounts = this.state.accounts;
    const newAccounts = $.extend(true, [], this.state.accounts);
    for (let i = 0; i < newAccounts.unverified.length; i++) {
      if (newAccounts.unverified[i].username == username) {
        // remove user from unverified
        newAccounts.unverified.splice(i, 1);
        break;
      }
    }
    // optimistically add show data to present
    this.setState({ accounts: newAccounts });
    this.updateUser(this.props.urls.deleteUnverified, username, oldAccounts);
  },
  updateTableRows() {
    const makeRows = function(accounts, verified) {
      const rows = [];
      for (let i = 0; i < accounts.length; i++) {
        const row = {
          value: accounts[i].username,
          actionsDisabled: accounts[i].manager,
        };
        row.string1 = verified ? accounts[i].djName : accounts[i].fullName;
        row.string2 = verified ? accounts[i].fullName : accounts[i].email;
        rows.push(row);
      }
      return rows;
    };

    this.setState({
      unverifiedRows: makeRows(this.state.accounts.unverified, false),
    });
    this.setState({
      verifiedRows: makeRows(this.state.accounts.verified, true),
    });
  },

  getInitialState() {
    return {
      accounts: { unverified: [], verified: [] },
      unverifiedRows: [],
      verifiedRows: [],
    };
  },
  componentDidMount() {
    this.loadDataFromServer();
  },
  render() {
    return (
      <div className="accountsList">
        {this.state.unverifiedRows.length > 0 ? (
          <Panel header="Requested Accounts" bsStyle="warning">
            <ActionTable
              rows={this.state.unverifiedRows}
              string1={'Full Name'}
              string2={'Email'}
              acceptTitle={atAcceptTitle}
              rejectTitle={''}
              acceptTooltip={atAcceptTooltip}
              rejectTooltip={atRejectTooltipVerified}
              onAccept={this.handleVerifyUser}
              onReject={this.handleDeleteUnverifiedUser}
            />
          </Panel>
        ) : (
          <div />
        )}
        {this.state.verifiedRows.length > 0 ? (
          <Panel header="DJs" bsStyle="info">
            <ActionTable
              rows={this.state.verifiedRows}
              string1={'DJ Name'}
              string2={'Full Name'}
              placeholders1={['DJ Hagfish', 'DJ Bed Bugs', 'DJ Nickelback']}
              rejectTitle={''}
              rejectTooltip={atRejectTooltipVerified}
              onReject={this.handleDeleteUser}
              glyph={atManagerGlyph}
            />
          </Panel>
        ) : (
          <div />
        )}
      </div>
    );
  },
});

ReactDOM.render(
  <ManagerPage urls={urls} />,
  document.getElementById('content')
);
