var React = require('react');

// Panel Elements
var PanelEventList = require('./PanelEventList.jsx');

// Inputs
var InputEditableTextField = require('../inputs/InputEditableTextField.jsx');
var InputEditableDateTimeField = require('../inputs/InputEditableDateTimeField.jsx');
var InputCheckbox = require('../inputs/InputCheckbox.jsx');
var InputFileUpload = require('../inputs/InputFileUpload.jsx');
var ConfirmationButton = require('../inputs/ConfirmationButton.jsx');

// Bootstrap Elements
import { Grid, Col, Row, Well, ButtonGroup, Button, Input, DropdownButton, MenuItem } from 'react-bootstrap';

// Misc
var Dates = require('../../common/Dates.js');

const PanelUserEventsPage = React.createClass({
	render: function(){
		return (
      <div className="panelPage">
        <Grid>
          <Row>
            <Col xs={12} md={12}>
                <UserEventsList urls={this.props.urls} />
            </Col>
          </Row>
        </Grid>
      </div>
		);
	}
});

// TODO: Components are currently sharing styles with their show counterparts
// Update such that they have their own style

var UserEventsList = React.createClass({
  getInitialState: function() {
    return {events: []};
  },
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urls.eventsURL,
      dataType: 'json',
      cache: false,
      success: function(events) {
        this.setState({events: events});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.eventsURL, status, err.toString());
      }.bind(this)
    });
  },
  handleUserSubmitNewEvent: function(eventData) {
    var oldEvents = this.state.events;
    // optimistically add event data
    var localEventData = eventData;
    eventData.id = oldEvents.length + 1;
    localEventData.id = eventData.id; // give new show a temporary id so React has a key for the show element
    this.setState({events: this.state.events.concat([localEventData])});
    $.ajax({
      url: this.props.urls.addEventURL,
      dataType: 'json',
      type: 'POST',
      data: eventData,
      success: function(events) {
        this.setState({events: events});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({events: oldEvents});
        console.error(this.props.urls.addEventURL, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="userShowsList">
        <NewEventForm onNewEventSubmit={this.handleUserSubmitNewEvent}/>
        <PanelEventList url={this.props.urls.eventLink} events={this.state.events} placeholder="/img/radio.png" />
      </div>
    );
  }
});

var NewEventForm = React.createClass({
  getInitialState: function() {
    return {name: '', type: 'Ticket Giveaway', editable: false};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleTypeChange: function(e, type) {
    this.setState({type: type});
  },
  toggleEditableField: function(e) {
    this.setState({text: '', editable: !this.state.editable})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var type = this.state.type.trim();
    if (!name || !type) {
      return;
    }

    var eventData = {"name": name, "type": type};
    this.props.onNewEventSubmit(eventData);
    this.setState(this.getInitialState());

  },
  render: function() {
    return (
      <div className="newShowForm">
        { this.state.editable ?
          <form onSubmit={this.handleSubmit}>
            <h4>New Event</h4>
            <Input
              type="text"
              placeholder= "Event Name"
              value={this.state.name}
              className="noBottom"
              onChange={this.handleNameChange}
            />
            <div className="centered">
              <ButtonGroup className="lightPadding">
                <DropdownButton id="type" title={this.state.type || <span className="placeholder">Type</span>}
                onSelect={this.handleTypeChange} key={this.state.type}>
                  <MenuItem key="Ticket Giveaway" eventKey="Ticket Giveaway">Ticket Giveaway</MenuItem>
                  <MenuItem key="UCLA Radio Presents" eventKey="UCLA Radio Presents">UCLA Radio Presents</MenuItem>
                  <MenuItem key="Campus Event" eventKey="Campus Event">Campus Event</MenuItem>
                  <MenuItem key="Local Event" eventKey="Local Event">Local Event</MenuItem>
                </DropdownButton>
              </ButtonGroup>
              <Button onClick={this.handleSubmit} className="lightPadding">Submit</Button>
              <Button className="cancelLink lightPadding" onClick={this.toggleEditableField}>Cancel</Button>
            </div>
          </form>
          :
          // locked to user input
          <p className="centered"><a onClick={this.toggleEditableField}>+ Add New Event</a></p>

        }
      </div>
    );
  }
});


export default PanelUserEventsPage;