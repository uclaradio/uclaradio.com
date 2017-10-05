// ActionTable.js

import React from 'react';
import {
  Table,
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

/**
*  ButtonGroup with one or two actions (reject, accept/reject)
*
*  @prop value: value to submit on actions
*  @prop actionsDisabled: should disable buttons
*  @prop acceptTitle: accept button title (or nothing)
*  @prop rejectTitle: reject button title
*  @prop acceptTooltip: string to show in accept action tooltip  (or nothing)
*  @prop rejectTooltip: string to show in reject action tooltip
*  @prop onAccept -> function(value): function to call if accept button hit (or nothing)
*  @prop onReject -> function(value): function to call if reject button hit
*/
const ActionButtons = React.createClass({
  handleAccept() {
    this.props.onAccept(this.props.value);
  },
  handleReject() {
    this.props.onReject(this.props.value);
  },
  render() {
    const showAccept =
      this.props.acceptTitle && this.props.acceptTooltip && this.props.onAccept;
    if (showAccept) {
      var tooltip1 = (
        <Tooltip id={this.props.acceptTooltip}>
          {this.props.acceptTooltip}
        </Tooltip>
      );
    }
    const tooltip2 = (
      <Tooltip id={this.props.rejectTooltip}>
        {this.props.rejectTooltip}
      </Tooltip>
    );
    return (
      <div className="actionButton">
        <ButtonGroup>
          {showAccept ? (
            <OverlayTrigger placement="top" overlay={tooltip1} delayShow={500}>
              <Button
                className="table-action1"
                bsStyle="link"
                onClick={this.handleAccept}
                disabled={this.props.actionsDisabled}>
                <Glyphicon glyph="ok" />
                {this.props.acceptTitle}
              </Button>
            </OverlayTrigger>
          ) : (
            <div />
          )}
          {this.props.children}
          <OverlayTrigger placement="top" overlay={tooltip2} delayShow={500}>
            <Button
              className="table-action2"
              bsStyle="link"
              onClick={this.handleReject}
              disabled={this.props.actionsDisabled}>
              <Glyphicon glyph="remove" />
              {this.props.rejectTitle}
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      </div>
    );
  },
});

/**
*  Table with two string columns and one or two action buttons (accept/reject, reject)
*
*  @prop string1: string title of the first column
*  @prop placeholders1: string placeholder of the first column
*  @prop string2: string title of the second column
*  @prop acceptTitle: string title of the accept action if it exists
*  @prop rejectTitle: string title of the reject action
*  @prop acceptTooltip: string to show in accept action tooltip
*  @prop rejectTooltip: string to show in reject action tooltip
*  @prop onAccept -> function(row.value): function to call if accept button hit on row
*  @prop onReject -> function(row.value): function to call if reject button hit on row
*  @prop rows -> [{value: x, string1: x, string2: x, actionsDisabled: bool}]
*/
const ActionTable = React.createClass({
  render() {
    const act1 = this.props.onAccept;
    const glyph = this.props.glyph;
    const act2 = this.props.onReject;
    const acceptTitle = this.props.acceptTitle;
    const rejectTitle = this.props.rejectTitle;
    const acceptTooltip = this.props.acceptTooltip;
    const rejectTooltip = this.props.rejectTooltip;
    const placeholders1 = this.props.placeholders1;
    const tableBody = this.props.rows.map(row => (
      <tr key={row.value}>
        <td>
          {row.string1 || (
            <span className="placeholder">
              {placeholders1[Math.floor(Math.random() * placeholders1.length)]}
            </span>
          )}
          {row.actionsDisabled ? (
            <span className="actionGlyph">
              <Glyphicon glyph={glyph} />
            </span>
          ) : (
            <div />
          )}
        </td>
        <td>{row.string2}</td>
        <td className="action-td">
          <ActionButtons
            value={row.value}
            acceptTitle={acceptTitle}
            rejectTitle={rejectTitle}
            acceptTooltip={acceptTooltip}
            rejectTooltip={rejectTooltip}
            onAccept={act1}
            onReject={act2}
            actionsDisabled={row.actionsDisabled}
          />
        </td>
      </tr>
    ));

    return (
      <div className="actionTable">
        <Table condensed hover>
          <thead>
            <tr>
              <th>{this.props.string1}</th>
              <th colSpan="2">{this.props.string2}</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </Table>
      </div>
    );
  },
});

module.exports = ActionTable;
