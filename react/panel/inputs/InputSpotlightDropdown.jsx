// InputSpotlightDropdown.jsx

var React = require('react');

// Bootstrap elements
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Input = require('react-bootstrap').Input;
var ButtonGroup = require('react-bootstrap').ButtonGroup;

var Dropdown = React.createClass({
  getInitialState: function () {
    return {spotlightShow: this.props.spotlightShow};
  },
  handleSpotlightChange: function (e, show) {
    this.setState({spotlightShow: show});
    this.props.onSpotlightSubmit(show.id);
  },
  render: function () {
    var shows = this.props.shows.map(function(show) {
      return <MenuItem key={show.id} eventKey={show}>{show.title}</MenuItem>;
    });

    return (
      <form className="form-horizontal">
        <ButtonGroup justified>
        <DropdownButton id="spotlightShow" title={this.state.spotlightShow.title || <span className="placeholder">Spotlight Show</span>}
        onSelect={this.handleSpotlightChange} key={this.state.spotlightShow.id}>
          {shows}
        </DropdownButton>
        </ButtonGroup>
      </form>
    );
  }
});

module.exports = Dropdown;
