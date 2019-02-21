// InputEditableDateTimeField.js

import React from 'react';
import {
  ButtonGroup,
  DropdownButton,
  MenuItem,
  Input,
  Glyphicon,
} from 'react-bootstrap';
import Dates from '../../common/Dates';

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
class InputEditableDateTimeField extends React.Component {
  state = { day: 'Mon', time: '10am', editable: false };

  handleDayChange = (e, day) => {
    this.setState({ day });
  };

  handleTimeChange = (e, time) => {
    this.setState({ time });
  };

  toggleEditableField = e => {
    this.setState({
      day: this.props.day,
      time: this.props.time,
      editable: !this.state.editable,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const day = this.state.day.trim();
    const time = this.state.time.trim();
    if (day && time) {
      this.props.onDateSubmit(day, time);
      this.setState({ day: 'Mon', time: '10am', editable: false });
    }
  };

  render() {
    const editButton = (
      <a className="customInput" onClick={this.toggleEditableField}>
        Edit
      </a>
    );
    // var cancelButton = <Button className="cancelLink" onClick={this.toggleEditableField}>Cancel</Button>;
    const actionButton = (
      <span>
        <a onClick={this.handleSubmit}>{this.props.buttonTitle || 'Update'}</a>
        &emsp;&emsp;&emsp;
        <a className="cancelLink" onClick={this.toggleEditableField}>
          Cancel
        </a>
      </span>
    );
    const days = Dates.availableDays.map(day => (
      <MenuItem key={day} eventKey={day}>
        {Dates.dayFromVar(day)}
      </MenuItem>
    ));

    const times = Dates.availableTimes.map(time => (
      <MenuItem key={time} eventKey={time}>
        {time}
      </MenuItem>
    ));
    return (
      <div className="inputEditableDateTimeField">
        <form className="form-horizontal">
          <Input
            label={this.props.title}
            labelClassName="col-xs-3"
            wrapperClassName="inputEditWrapper col-xs-9"
            addonAfter={this.state.editable ? actionButton : editButton}
          >
            {this.state.editable ? (
              // field edit/submittable
              <ButtonGroup>
                <DropdownButton
                  id="day"
                  title={
                    Dates.dayFromVar(this.state.day) || (
                      <span className="placeholder">Day</span>
                    )
                  }
                  onSelect={this.handleDayChange}
                  key={this.state.day}
                >
                  {days}
                </DropdownButton>
                <DropdownButton
                  id="time"
                  title={
                    this.state.time || <span className="placeholder">Time</span>
                  }
                  onSelect={this.handleTimeChange}
                  key={this.state.time}
                >
                  {times}
                </DropdownButton>
              </ButtonGroup>
            ) : (
              // locked to user input
              <span className="customInput">
                {this.props.day && this.props.time ? (
                  <span>
                    {Dates.dayFromVar(this.props.day)} {this.props.time}{' '}
                    {this.props.verified ? (
                      <Glyphicon className="verifiedGlyph" glyph="ok" />
                    ) : (
                      ''
                    )}
                  </span>
                ) : (
                  <span className="placeholder">{this.props.placeholder}</span>
                )}
              </span>
            )}
          </Input>
        </form>
      </div>
    );
  }
}

export default InputEditableDateTimeField;
