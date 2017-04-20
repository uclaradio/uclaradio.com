// let manager edit event info

var React = require('react');
var ReactDOM = require('react-dom');

// Panel Elements
var RectImage = require('../../common/RectImage.jsx');

// Inputs
var InputEditableTextField = require('../inputs/InputEditableTextField.jsx');
var InputEditableMonthDateField = require('../inputs/InputEditableMonthDateField.jsx');
var InputCheckbox = require('../inputs/InputCheckbox.jsx');
var InputFileUpload = require('../inputs/InputFileUpload.jsx');
var ConfirmationButton = require('../inputs/ConfirmationButton.jsx');

//Helper files
var Dates = require('../../common/Dates.js');

// Bootstrap Elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Well = require('react-bootstrap').Well;
var FormControls = require('react-bootstrap').FormControls;

var PanelEventPage = React.createClass({
  getEventIDFromURL: function() {
    return window.location.pathname.split('/').pop();
  },

  getInitialState: function() {
    return {eventID: this.getEventIDFromURL()};
  },
  render: function() {
    return (
      <div className="showPage">
        <Event urls={this.props.urls} eventID={this.state.eventID} />
      </div>
    );
  }
});
 
var Event = React.createClass({
  getInitialState: function() {
    return {event: {month: 'January', date: 1}, nameVerified: false, publicVerified: false, artVerified: false};
  },
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urls.eventDataURL+this.props.eventID,
      dataType: 'json',
      cache: true,
      success: function(event) {
        this.setState({event: event});
        this.forceUpdate(); //needed so that month/date input renders correctly
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.eventDataURL, status, err.toString());
      }.bind(this)
    });
  },
  handleDateSubmit: function(month, date) {
    var event = $.extend(true, {}, this.state.event);
    event.month = month;
    event.date = date;
    event.year = new Date().getFullYear();
    this.handleEventDataSubmit(event, 'dateVerified');
  },
  handleEventDataSubmit: function(updatedEvent, successVar) {
    var oldEvent = this.state.event;
    // Optimistically update local data, will be refreshed or reset after response from server
    this.setState({event: updatedEvent});
    // Stringify arrays so they reach the server
    var safeEvent = JSON.stringify(updatedEvent);
    // don't mark as verified yet
    var unverifiedState = {};
    unverifiedState[successVar] = false;
    this.setState(unverifiedState);
    $.ajax({
      url: this.props.urls.eventUpdateURL,
      dataType: 'json',
      type: 'POST',
      data: {event: safeEvent},
      success: function(event) {
        var successState = {event: event};
        successState[successVar] = true;
        this.setState(successState);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({event: oldEvent});
        console.error(this.props.urls.eventUpdateURL, status, err.toString());
      }.bind(this)
    });
  },
  verifyEventArt: function() {
    this.setState({artVerified: true});
  },
  unverifyEventArt: function() {
    this.setState({artVerified: false});
  },
  handleEventArtSubmit: function(data) {
    if (!data) { return; }

    var formData = new FormData();
    formData.append("img", data);
    formData.append("id", this.state.event.id);
    var request = new XMLHttpRequest();
    request.open("POST", this.props.urls.eventPicURL);
    var loadData = this.loadDataFromServer;
    var verify = this.verifyEventArt;
    var unverify = this.unverifyEventArt;
    unverify();
    request.onload = function(e) {
      if (request.status == 200) {
        loadData();
        verify();
      }
      else {
        unverify();
      }
    };
    request.send(formData);
  },
  handleNameSubmit: function(title) {
    var event = $.extend(true, {}, this.state.event);
    event.title = title;
    this.handleEventDataSubmit(event, 'titleVerified');
  },
  handleLocationSubmit: function(location){
    var event = $.extend(true, {}, this.state.event);
    event.location = location;
    this.handleEventDataSubmit(event, 'locationVerified');
  },
  handlePublicSubmit: function(checked) {
    var event = $.extend(true, {}, this.state.event);
    event.public = checked;
    this.handleEventDataSubmit(event, 'publicVerified');
  },
  handleDeleteEvent: function() {
    $.ajax({
      url: this.props.urls.deleteEventURL,
      dataType: 'json',
      type: 'POST',
      data: {"id": this.state.event.id},
      success: function() {
        location.href = this.props.urls.deleteRedirectURL;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.deleteEventURL, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="show">
        <Grid>
          <Well>
            <Row>
              <Col xs={12} md={4}>
                <RectImage src={this.state.event.picture || "/img/radio.png" } rounded maxWidth="380px" />
              </Col>
              <Col xs={12} md={8}>
                <h3>{this.state.event.name}</h3>
                <InputFileUpload accept=".png,.gif,.jpg,.jpeg" title="Art" onSubmit={this.handleEventArtSubmit} verified={this.state.artVerified} />
                <InputEditableTextField title="Name" currentValue={this.state.event.name}
                  onSubmit={this.handleNameSubmit} placeholder="Enter Event Name" verified={this.state.nameVerified} />
                <InputEditableTextField title="Location" currentValue={this.state.event.location}
                  onSubmit={this.handleLocationSubmit} placeholder="Enter Event Location" verified={this.state.locationVerified} />
                <InputEditableMonthDateField key="monthDate" title="Date" month={this.state.event.month} date={this.state.event.date}
                  onDateSubmit={this.handleDateSubmit} placeholder="Enter Show Time" verified={this.state.dateVerified} />
                <InputCheckbox title="Public" details="Make Event Public" checked={this.state.event.public}
                  onSelect={this.handlePublicSubmit} verified={this.state.publicVerified} />

                <ConfirmationButton confirm={"Delete '" + this.state.event.name + "'"} submit={"Really delete '" + this.state.event.name + "'?"} onSubmit={this.handleDeleteEvent} />
              </Col>
            </Row>
          </Well>
        </Grid>
      </div>
    );
  }
});

export default PanelEventPage;

