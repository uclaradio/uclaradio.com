// forms.js
// Contains common elements in forms


/**
*  Show current saved value for a text field and let user update the field and submit changes
*
*  @prop name: field being edited: 'Title'
*  @prop currentValue: current saved value of the field: 'Some Show'
*  @prop multiline: should allow user to enter multiple lines of text
*  @prop onTextSubmit -> function(text): parent's function to be called if 'Submit' is hit
*
*  @state text: current value being entered
*  @state editable: should let the user edit the field
*  @state currentlyEditing: user has begun editing the text field by typing at least 1 character (used to select text on first edit)
*/
var UserEditableTextField = React.createClass({
  getInitialState: function() {
    return {text: '', editable: false, currentlyEditing: false};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value, currentlyEditing: false});
  },
  toggleEditableField: function(e) {
    this.setState({text: this.props.currentValue, editable: !this.state.editable, currentlyEditing: true})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onTextSubmit(text)
    this.setState({text: '', editable: false});
  },
  componentDidUpdate: function(e) {
    if (this.state.editable && this.state.currentlyEditing) {
      ReactDOM.findDOMNode(this.refs.valueInput).select();
    }
  },
  render: function() {
    var textEdit = this.props.multiline ? 
        ( <textarea
          ref="valueInput"
          placeholder={this.props.name}
          value={this.state.text}
          onChange={this.handleTextChange}
        /> )
        :
        (
        <input
          type="text"
          ref="valueInput"
          placeholder={this.props.name}
          value={this.state.text}
          onChange={this.handleTextChange}
        /> );
    return (
      <div className="userEditableTextField">
      { this.state.editable ?
        <form onSubmit={this.handleSubmit}>
        
        {textEdit}

        &ensp;<input type="submit" value="Update" />
        &ensp;<a onClick={this.toggleEditableField}>Cancel</a>
        </form>
      :
      // locked to user input
      <p>{this.props.name}: <span className="savedData">{this.props.currentValue}</span> <a onClick={this.toggleEditableField}>Edit</a></p>
    }
    </div>
    );
  }
});

/**
*  Allow user to select date and time as format ddd/hh (Mon / 10am)
*  @prop day: current day
*  @prop time: current time
*  @prop onDayChange: function to call when day changes
*  @prop onTimeChange: function to call when time changes
*/
var DateTimeField = React.createClass({
  render: function() {
    return (
      <div className="dateTimeField">
        <select value={this.props.day} onChange={this.props.onDayChange}>
          <option value="Mon">Monday</option>
          <option value="Tue">Tuesday</option>
          <option value="Wed">Wednesday</option>
          <option value="Thu">Thursday</option>
          <option value="Fri">Friday</option>
          <option value="Sat">Saturday</option>
          <option value="Sun">Sunday</option>
        </select>
        &ensp;
        <select value={this.props.time} onChange={this.props.onTimeChange}>
          <option value="12am">12AM</option>
          <option value="1am">1AM</option>
          <option value="2am">2AM</option>
          <option value="3am">3AM</option>
          <option value="4am">4AM</option>
          <option value="5am">5AM</option>
          <option value="6am">6AM</option>
          <option value="7am">7AM</option>
          <option value="8am">8AM</option>
          <option value="9am">9AM</option>
          <option value="10am">10AM</option>
          <option value="11am">11AM</option>
          <option value="12pm">12PM</option>
          <option value="1pm">1PM</option>
          <option value="2pm">2PM</option>
          <option value="3pm">3PM</option>
          <option value="4pm">4PM</option>
          <option value="5pm">5PM</option>
          <option value="6pm">6PM</option>
          <option value="7pm">7PM</option>
          <option value="8pm">8PM</option>
          <option value="9pm">9PM</option>
          <option value="10pm">10PM</option>
          <option value="11pm">11PM</option>
        </select>
    </div>
    );
  }
});

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

/**
*  Allows user to confirm a button submission
*
*  @prop confirm: text to display on button when confirming
*  @prop submit: text to display on button when submitting
*  @prop onSubmit -> function(): parent's function to call when submitting
*/
var ConfirmationButton = React.createClass({
  getInitialState: function() {
    return {unlock: false};
  },
  toggleUnlock: function() {
    this.setState({unlock: !this.state.unlock});
  },
  render: function() {
    return (
      <div className="confirmationButton">
      { this.state.unlock ? 
        <div><button className="confirm-btn2" onClick={this.props.onSubmit}>{this.props.submit}</button>
        <button className="confirm-cancel" onClick={this.toggleUnlock}>Cancel</button></div>
        :
        <button className="confirm-btn1" onClick={this.toggleUnlock}>{this.props.confirm}</button>
      }
      </div>
    );
  }
});

window.UserEditableTextField = UserEditableTextField;
window.DateTimeField = DateTimeField;
window.UserEditableDateTimeField = UserEditableDateTimeField;
window.ConfirmationButton = ConfirmationButton;
