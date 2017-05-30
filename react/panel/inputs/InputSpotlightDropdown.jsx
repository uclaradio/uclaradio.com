// InputSpotlightDropdown.jsx
import 'react-select/dist/react-select.css'; //not sure where to put this!

var React = require('react');
var Select = require('react-select');

// Bootstrap elements
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var ButtonGroup = require('react-bootstrap').ButtonGroup;

var Dropdown = React.createClass({
  getInitialState: function () {
    return {spotlightShow: this.props.spotlightShow};
  },
  handleSpotlightChange: function (e) {
    this.setState({spotlightShow: e.value});
    this.props.onSpotlightSubmit(e.value);
  },
  render: function () {
    var options = [];
    this.props.shows.forEach(function (show) {
      options = [...options, {
        value: show.id,
        label: show.title
      }];
    });
    var clearable = false;

    return <Select options={options} value={this.state.spotlightShow} onChange={this.handleSpotlightChange} clearable={clearable} />;
  }
});

module.exports = Dropdown;
