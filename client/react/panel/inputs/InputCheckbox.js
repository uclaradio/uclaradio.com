// InputCheckbox.js

import React from 'react';
import { Input, Glyphicon } from 'react-bootstrap';

/**
 *  Input checkbox element which can be checked or unchecked
 *
 *  @prop checked -> bool: should be checked
 *  @prop title: title of the input
 *  @prop onSelect -> function(e): function to call on select
 *  @prop details: help details
 *  @prop verified: should indicate input data was... whatever
 */
class InputCheckbox extends React.Component {
  handleChange = e => {
    this.props.onSelect(e.target.checked);
  };

  render() {
    return (
      <form className="inputCheckbox form-horizontal">
        <Input
          label={this.props.title}
          labelClassName="col-xs-3"
          wrapperClassName="col-xs-9 inputCheckbox"
        >
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
                }
              >
                {this.props.details}
                {this.props.verified ? (
                  <Glyphicon className="verifiedGlyph" glyph="ok" />
                ) : (
                  ''
                )}
              </span>
            }
          />
        </Input>
      </form>
    );
  }
}

export default InputCheckbox;
