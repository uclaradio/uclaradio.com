// ShowsGraph.jsx

var React = require('react');

import Dates from '../../common/Dates';

// styling
require('./shows.css');

const week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const dayWidth = `${100/8}%`;

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

	findStartEndTimes: function(start, end) {

		for(start=0; start < 24; start ++){
			for(var j = 0; j < this.props.shows.length; j++){
				if(this.props.shows[j].time == Dates.availableTimes[start]){
					break;
				}
			}
		}

		for(end = 23; end > 0; end--){
			for(var j = 0; j < this.props.shows.length; j++){
				if(this.props.shows[j].time == Dates.availableTimes[end]){
					break;
				}
			}
		}
		start = 9;
		end = 19;

		return;
	},

	render: function() {
		
		var colorKey = {
			display: "block",
			position: "relative"
		};

		var colorKeyPara = {
			fontSize: 13,
			position: "relative",
			display: "inline-block"
		};


		var dotCur = {
			position: 'relative',
		    width: 10,
		    height: 10,
		    borderRadius: '50%',
		    display: 'inline-block',
		    marginLeft: 10,
		    marginRight: 20,
		    backgroundColor: 'rgba(60,132,204, 0.45)'
		};

		var dotSpot = {
			position: 'relative',
		    width: 10,
		    height: 10,
		    borderRadius: '50%',
		    display: 'inline-block',
		    marginLeft: 10,
		    marginRight: 15,
		    backgroundColor: 'rgba(128,0,128,0.45)'
		};		

		var headsStyle = {
 			fontSize: '11px',
 			paddingRight: '1px',
 			marginBottom: '2px',
 			left: dayWidth,
 			display: 'inline-block', 
 			position: 'relative',
 			width: dayWidth
 		};

		var dayTitles = week.map((day) => {
			return (
				<span style={headsStyle}>
					{Dates.abbreviatedDay(day)}
				</span> 
			);
		});

		var timeStyle = {
			fontSize: '11px',
			paddingRight: '3px',
			display: 'inline-block',
			position: 'relative',
			width: dayWidth,
			marginRight: -15,
			top: -5
		};

		var showBlocks = [];

		var fl1, fl2 = 0;

		var start, end; 
		for(start=1; start < 24; start ++){
			for(var j = 0; j < this.props.shows.length; j++){
				if(this.props.shows[j].time == Dates.availableTimes[start]){
					fl1 = 1;
					break;
				}
			}
			if(fl1) {break;}
		}

		for(end = 23; end > 0; end--){
			for(var j = 0; j < this.props.shows.length; j++){
				if(this.props.shows[j].time == Dates.availableTimes[end]){
					fl2 = 1;
					break;
				}
			}
			if(fl2) {break;}
		}
		//this.findStartEndTimes(startTime, endTime);

		for (var hour = start; hour < end+1; hour++) {
			var hourString = Dates.availableTimes[hour];
			showBlocks.push( 
				<div style={{ width: '100%', marginBottom: -10, display: 'inline-block', position: 'relative' }}>
					<p style={timeStyle}>{hourString}</p>
					{ week.map((day) => {
						var show = this.state.schedule && this.state.schedule[day][hour];
						return (
							<ShowBlock isValidShow={(show && show.title)}
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
				
				<div style={colorKey}>
					<p style={colorKeyPara}>current show</p>
					<div style={dotCur}></div>
					<p style={colorKeyPara}>spotlight show</p>
					<div style={dotSpot}></div>
					
				</div>

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
				height: "100%",
				width: "100%",
				backgroundColor: 'white',
				display: 'inline-block', 
				position: 'relative'
			}
			return (
				<div style={{width: dayWidth}} className="showBlock">
					<div style={boringBlockStyle} />
				</div>
			);
		} else {
			var blockColor = (this.props.isActiveShow && 'red')
				|| (this.props.isSpotlightShow && 'purple')
				|| (this.props.isCurrentShow && '#3c84cc')
				|| 'black';

			var blockStyle = {
				cursor: "pointer",
				height: "100%",
				width: "100%",
				backgroundColor: blockColor,
				display: 'inline-block', 
				position: 'relative'
			};
			return (
				<div style={{width: dayWidth}} className="showBlock">
					<div style={blockStyle}
						onMouseOver={this.handleMouseOver}
						onMouseOut={this.handleMouseOut}
						onClick={this.handleClick} />
				</div>
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
		var day = Dates.dayFromVar(show.day).toLowerCase();
		var hour = Dates.availableTimes.indexOf(show.time);
		if (day && hour) {
			schedule[day][hour] = show;
		}
	}

	return schedule;
};

module.exports = ShowsGraph;
