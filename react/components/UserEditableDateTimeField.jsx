// UserEditableDateTimeField.js

var React = require('react');

var DateTimeField = require('./DateTimeField.jsx');

/**
*  Show current saved value for day/time and let user update data and submit changes
*
*  @prop day: current saved day value
*  @prop time: current saved time value
*  @prop onDateSubmit -> function(day, time): parent's function to be called if 'Submit' is hit
*
*  @state day: current day value being entered
*  @state time: current time value being entered
*  @state editable: should let the user edit the field
*/
var UserEditableDateTimeField = React.createClass({
  getInitialState: function() {
    return {day: 'Mon', time: '10am', editable: false};
  },
  handleDayChange: function(e) {
    this.setState({day: e.target.value});
  },
  handleTimeChange: function(e) {
    this.setState({time: e.target.value});
  },
  toggleEditableField: function(e) {
    this.setState({day: this.props.day, time: this.props.time, editable: !this.state.editable})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var day = this.state.day.trim();
    var time = this.state.time.trim();
    if (!day || !time) {
      return;
    }
    this.props.onDateSubmit(day, time)
    this.setState({day: 'Mon', time: '10am', editable: false});
  },
  render: function() {
    return (
      <div className="userEditableDateTimeField">
      { this.state.editable ?
        // field edit/submittable
        <form onSubmit={this.handleSubmit}>
        <DateTimeField day={this.state.day} time={this.state.time} onDayChange={this.handleDayChange} onTimeChange={this.handleTimeChange} />
        &ensp;<input type="submit" value="Update" />
        &ensp;<a onClick={this.toggleEditableField}>Cancel</a>
        </form>
      :
      // locked to user input
      <p><span className="savedData">{this.props.day} ({this.props.time})</span> <a onClick={this.toggleEditableField}>Edit</a></p>
    }
    </div>
    );
  }
});

module.exports = UserEditableDateTimeField;
