// ActionTable.js

var React = require('react');
var ReactDOM = require('react-dom');

// Bootstrap elements
var Table = require('react-bootstrap').Table;
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Glyphicon = require('react-bootstrap').Glyphicon;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Tooltip = require('react-bootstrap').Tooltip;

var ActionButtons = React.createClass({
  handleAccept: function() {
    this.props.onAccept(this.props.value);
  },
  handleReject: function() {
    this.props.onReject(this.props.value);
  },
  render: function() {
    var tooltip1 = (<Tooltip id={this.props.acceptTooltip}>{this.props.acceptTooltip}</Tooltip>);
    var tooltip2 = (<Tooltip id={this.props.rejectTooltip}>{this.props.rejectTooltip}</Tooltip>);
    return (
      <div className="actionButton">
        <ButtonGroup>

          <OverlayTrigger placement="top" overlay={tooltip1} delayShow={500}>
            <Button className="table-action1" bsStyle="link" onClick={this.handleAccept}>
              <Glyphicon glyph="ok" />&ensp;{this.props.acceptTitle}
            </Button>
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={tooltip2} delayShow={500}>
            <Button className="table-action2" bsStyle="link" onClick={this.handleReject}>
              <Glyphicon glyph="remove" />&ensp;{this.props.rejectTitle}
            </Button>
          </OverlayTrigger>

        </ButtonGroup>
      </div>
    );
  }
});

/**
*  Table with two string columns and one or two action buttons (accept/reject, reject)
* 
*  @prop string1: string title of the first column
*  @prop string2: string title of the second column
*  @prop acceptTitle: string title of the accept action if it exists
*  @prop rejectTitle: string title of the reject action
*  @prop acceptTooltip: string to show in accept action tooltip
*  @prop rejectTooltip: string to show in reject action tooltip
*  @prop onAccept -> function(row.value): function to call if accept button hit on row
*  @prop onReject -> function(row.value): function to call if reject button hit on row
*  @prop rows -> [{value: x, string1: x, string2: x}]
*/
var ActionTable = React.createClass({
	render: function() {
    var act1 = this.props.onAccept;
    var act2 = this.props.onReject;
    var acceptTitle = this.props.acceptTitle;
    var rejectTitle = this.props.rejectTitle;
    var acceptTooltip = this.props.acceptTooltip;
    var rejectTooltip = this.props.rejectTooltip;
    var tableBody = this.props.rows.map(function(row) {
      return (
        <tr key={row.value}>
          <td>{row.string1}</td>
          <td>{row.string2}</td>
          <td className="action-td">
            <ActionButtons value={row.value} acceptTitle={acceptTitle} rejectTitle={rejectTitle}
              acceptTooltip={acceptTooltip} rejectTooltip={rejectTooltip}
              onAccept={act1} onReject={act2} />
          </td>
        </tr>
      );
    });

		return (
			<div className="actionTable">
				<Table>
          <thead>
            <tr>
              <th>{this.props.string1}</th>
              <th colSpan="2">{this.props.string2}</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </Table>
			</div>
		);
	}
});

module.exports = ActionTable;
