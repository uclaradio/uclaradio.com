// InputEditableDateTimeField.js

var React = require('react');

// Bootstrap elements
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var Glyphicon = require('react-bootstrap').Glyphicon;

const dayFromVar = function(day) {
  switch (day) {
    case 'Mon':
      return 'Monday';
    case 'Tue':
      return 'Tuesday';
    case 'Wed':
      return 'Wednesday';
    case 'Thu':
      return 'Thursday';
    case 'Fri':
      return 'Friday';
    case 'Sat':
      return 'Saturday';
    case 'Sun':
      return 'Sunday';
    default:
      return '';
  }
};

const availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const availableTimes = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
                        '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

/**
*  Show current saved value for day/time and let user update data and submit changes
*
*  @prop title: form title of the element
*  @prop placeholder: placeholder to show in field
*  @prop verified: should show indicator that the value was successfully... whatever
*
*  @prop day: current saved day value
*  @prop time: current saved time value
*  @prop onDateSubmit -> function(day, time): parent's function to be called if 'Submit' is hit
*
*  @state day: current day value being entered
*  @state time: current time value being entered
*  @state editable: should let the user edit the field
*/
var InputEditableDateTimeField = React.createClass({
  getInitialState: function() {
    return {day: 'Mon', time: '10am', editable: false};
  },
  handleDayChange: function(e, day) {
    this.setState({day: day});
  },
  handleTimeChange: function(e, time) {
    this.setState({time: time});
  },
  toggleEditableField: function(e) {
    this.setState({day: this.props.day, time: this.props.time, editable: !this.state.editable})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var day = this.state.day.trim();
    var time = this.state.time.trim();
    if (day && time) {
      this.props.onDateSubmit(day, time);
      this.setState({day: 'Mon', time: '10am', editable: false});
    }
  },
  render: function() {
    var editButton = <a className="customInput" onClick={this.toggleEditableField}>Edit</a>;
    // var cancelButton = <Button className="cancelLink" onClick={this.toggleEditableField}>Cancel</Button>;
    var actionButton = <span>
                        <a onClick={this.handleSubmit}>{this.props.buttonTitle || "Update"}</a>
                        &emsp;&emsp;&emsp;<a className="cancelLink" onClick={this.toggleEditableField}>Cancel</a>
                       </span>
    var days = availableDays.map(function(day) {
      return <MenuItem key={day} eventKey={day}>{dayFromVar(day)}</MenuItem>;
    });

    var times = availableTimes.map(function(time) {
      return <MenuItem key={time} eventKey={time}>{time}</MenuItem>;
    });
    return (
      <div className="inputEditableDateTimeField">
        <form className="form-horizontal">
          <Input label={this.props.title} labelClassName="col-xs-3" wrapperClassName="inputEditWrapper col-xs-9"
            addonAfter={this.state.editable ? actionButton : editButton}>
            { this.state.editable ?
              // field edit/submittable
                <ButtonGroup>
                  <DropdownButton id="day" title={dayFromVar(this.state.day) || <span className="placeholder">Day</span>}
                  onSelect={this.handleDayChange} key={this.state.day}>
                    {days}
                  </DropdownButton>
                  <DropdownButton id="time" title={this.state.time || <span className="placeholder">Time</span>}
                  onSelect={this.handleTimeChange} key={this.state.time}>
                    {times}
                  </DropdownButton>
                </ButtonGroup>
              :
              // locked to user input
              <span className="customInput">
                { (this.props.day && this.props.time) ?
                  <span>{dayFromVar(this.props.day)} {this.props.time} {this.props.verified ? <Glyphicon className="verifiedGlyph" glyph="ok" /> : ''}</span>
                  :
                  <span className="placeholder">{this.props.placeholder}</span>
                }
              </span>
            }
          </Input>
        </form>
      </div>
    );
  }
});

module.exports = InputEditableDateTimeField;
