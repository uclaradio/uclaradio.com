// ShowsBlock.jsx
// graph selector with schedule of shows

var React = require('react');

// styling
require('./shows.css');



/*
Individual show block with rollover action

@prop handleClick: callback for mouse click action
@prop isValidShow: styling bool -> overwrites isCurrentShow and isSpotlightShow if false
@prop isCurrentShow: styling bool
@prop isSpotlightShow: styling bool
*/
var ShowBlock = React.createClass({
	handleMouseOver: function() {
		this.setState({active: true});
	},
	handleMouseOut: function() {
		this.setState({active: false});
	},
	handleClick: function() {
		this.props.handleClick()
	},
	render: function() {
		if (!this.props.isValidShow) {
			var boringBlockStyle = {
				backgroundColor: 'white'
			}
			return (
				<div className='showBlock' style={boringBlockStyle} />
			);
		} else {
			var blockColor = (this.props.isCurrentShow && '#3c84cc')
				|| (this.props.isSpotlightShow && 'purple')
				|| 'yellow';

			var blockStyle = {
				backgroundColor: blockColor,
			};
			return (
				<div className="showBlock" style={blockStyle}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}
				onClick={this.handleClick}
				/>
			);
		}
	}
});

module.exports = ShowBlock;
