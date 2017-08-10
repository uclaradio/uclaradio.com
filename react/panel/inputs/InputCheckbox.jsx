// InputCheckbox.jsx

var React = require('react');

// Bootstrap elements
var Input = require('react-bootstrap').Input;
var Glyphicon = require('react-bootstrap').Glyphicon;

/**
*  Input checkbox element which can be checked or unchecked
*
*  @prop checked -> bool: should be checked
*  @prop title: title of the input
*  @prop onSelect -> function(e): function to call on select
*  @prop details: help details
*  @prop verified: should indicate input data was... whatever
*/
var InputCheckbox = React.createClass({
  handleChange: function(e) {
    this.props.onSelect(e.target.checked);
  },
  render: function() {
    return (
      <form className="inputCheckbox form-horizontal">
        <Input
          label={this.props.title}
          labelClassName="col-xs-3"
          wrapperClassName="col-xs-9 inputCheckbox">
          <Input
            type="checkbox"
            checked={this.props.checked}
            onChange={this.handleChange}
            label={
              <span
                className={
                  this.props.checked
                    ? 'checkboxInner'
                    : 'placeholder checkboxInner'
                }>
                {this.props.details}
                {this.props.verified
                  ? <Glyphicon className="verifiedGlyph" glyph="ok" />
                  : ''}
              </span>
            }
          />
        </Input>
      </form>
    );
  },
});

module.exports = InputCheckbox;
