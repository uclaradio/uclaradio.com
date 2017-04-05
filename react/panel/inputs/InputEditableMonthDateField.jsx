// InputEditableMonthDateField.js

var React = require('react');

// Helper files
var Dates = require('../../common/Dates.js');

// Bootstrap elements
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var Glyphicon = require('react-bootstrap').Glyphicon;

/**
*  Show current saved value for day/time and let user update data and submit changes
*
*  @prop title: form title of the element
*  @prop placeholder: placeholder to show in field
*  @prop verified: should show indicator that the value was successfully... whatever
*
*  @prop month: current saved month value
*  @prop date: current saved date value
*  @prop onDateSubmit -> function(day, time): parent's function to be called if 'Submit' is hit
*
*  @state day: current day value being entered
*  @state time: current time value being entered
*  @state editable: should let the user edit the field
*/
var InputEditableMonthDateField = React.createClass({
  getInitialState: function() {
    return {month: this.props.month, date: this.props.date, editable: false};
  },
  componentWillReceiveProps: function(){
    console.log("rerendering with month " + this.props.month);
    this.setState({month: this.props.month, date: this.props.date});
  },
  handleMonthChange: function(e, month) {
    this.setState({month: month});
  },
  handleDateChange: function(e, date) {
    this.setState({date: date});
  },
  toggleEditableField: function(e) {
    this.setState({editable: !this.state.editable})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var month = this.state.month;
    var date = this.state.date;
    if (month && date) {
      this.props.onDateSubmit(month, date);
      this.setState({editable: false});
    }
  },
  render: function() {
    var editButton = <a className="customInput" onClick={this.toggleEditableField}>Edit</a>;
    var actionButton = <span>
                        <a onClick={this.handleSubmit}>{this.props.buttonTitle || "Update"}</a>
                        &emsp;&emsp;&emsp;<a className="cancelLink" onClick={this.toggleEditableField}>Cancel</a>
                       </span>
    var months = Dates.availableMonths.map(function(month) {
      return <MenuItem key={month} eventKey={month}>{month}</MenuItem>;
    });

    var dates = [...Array(Dates.numberOfDaysFromMonth(this.state.month)).keys()].map(function(date){
      return <MenuItem key={date + 1} eventKey={date + 1}>{date + 1}</MenuItem>;
    });

    return (
      <div className="inputEditableDateTimeField">
        <form className="form-horizontal">
          <Input label={this.props.title} labelClassName="col-xs-3" wrapperClassName="inputEditWrapper col-xs-9"
            addonAfter={this.state.editable ? actionButton : editButton}>
            { this.state.editable ?
              // field edit/submittable
                <ButtonGroup>
                  <DropdownButton id="month" title={this.state.month || <span className="placeholder">Month</span>}
                  onSelect={this.handleMonthChange} key={this.state.month}>
                    {months}
                  </DropdownButton>
                  <DropdownButton id="date" title={this.state.date || <span className="placeholder">Date</span>}
                  onSelect={this.handleDateChange} key={this.state.date}>
                    {dates}
                  </DropdownButton>
                </ButtonGroup>
              :
              // locked to user input
              <span className="customInput">
                { (this.props.month && this.props.date) ?
                  <span>{this.props.month} {this.props.date} {this.props.verified ? <Glyphicon className="verifiedGlyph" glyph="ok" /> : ''}</span>
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

module.exports = InputEditableMonthDateField;
