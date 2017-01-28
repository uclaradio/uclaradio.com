// ShowsGraph.jsx

var React = require('react');

import Dates from '../../common/Dates';

// styling
require('./shows.css');

const week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

/*
Full graph with schedule of shows

@prop shows: list of show objects

@prop currentShowID: id of current show
@prop spotlightShowID: id of spotlight show
@prop activeShowID: id of active show user clicked on
@prop onShowClick(show): callback for when a show is made active
*/
const ShowsGraph = React.createClass({
	componentWillReceiveProps(nextProps) {
		if (nextProps.shows) {
			var sorted = sortedShows(nextProps.shows);
			this.setState({
				schedule: sorted
			});
		}
	},
	getInitialState: function() {
		return {};
	},
	render: function() {
		var dayTitles = week.map((day) => {
			return (
				<p style={headsStyle}>
					{Dates.abbreviatedDay(day)}
				</p> 
			);
		});

		var timeStyle = {
			fontSize: '11px',
			marginRight: '3px',
			display: 'inline-block',
			position: 'relative',
			width: '8%',
			top: 7.5
		};

		var showBlocks = "";
		for (var hour = 0; hour < 24; hour++) {
			var hourString = Dates.availableTimes[hour];
			showBlocks += (
				<div style={{ width: '100%', margin: '0 auto' }}>
					<p style={timeStyle}>{hourString}</p> 
					{ week.map((day) => {
						var show = this.state.schedule[day][hour];
						showBlocks += (
							<ShowBlock isValidShow={(show !== null)}
								isCurrentShow={show && show.id === this.props.currentShowID}
								isActiveShow={show && show.id === this.props.activeShowID}
								isSpotlightShow={show && show.id === this.props.spotlightShowID}
								handleClick={()=>{show && this.props.onShowClick(show)}} />
						);
					})}
				</div>
			);
		}

		return (
			<div className="showsGraph">
				{dayTitles}
				{showBlocks}
			</div>
		);
	}
});

/*
Individual show block with rollover action

@prop handleClick: callback for mouse click action
@prop isValidShow: styling bool -> overwrites isCurrentShow and isSpotlightShow if false
@prop isCurrentShow: styling bool: this show is currently playing
@prop isActiveShow: styling bool: user clicked on this show
@prop isSpotlightShow: styling bool: show is a spotlight feature on website
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


// creates schedule object:
// {
// 	"sunday": {9: {show}, ...},
// 	...
// 	"saturday": {11: {show}, ...},
// }
const sortedShows = (shows) => {
	var schedule = {
		"sunday": {},
		"monday": {},
		"tuesday": {},
		"wednesday": {},
		"thursday": {},
		"friday": {},
		"saturday": {}
	};

	for (var s = 0; s < shows.length; s++) {
		var show = shows[s];
		var day = Dates.dayFromVar(show.day).lower();
		var hour = Dates.availableTimes.indexOf(show.time);
		if (day && hour) {
			schedule[day][hour] = show;
		}
	}

	return schedule;
};

module.exports = ShowsGraph;
