// EventTab.jsx
import React from 'react';

// Common Elements
import RectImage from '../../common/RectImage.jsx';

// styling
require('./EventList.scss');

const defaultColor = "grey";
const colors = {
	"Giveaway": "#3c84cc",	//blue
	"UCLA Radio Presents": "#098440",	//green
	"Campus Event": "#842b78",	//magenta
	"Local Event": "#cca437",	//orange
}

/**
Content of events page

@prop events: list of event objects
@prop updateEvents: callback action to fetch updated events from server
**/
var EventList = React.createClass({
	componentWillMount: function() {
		this.props.updateEvents();
	},
	render: function() {
		// describe colors with events legend
		var legend = Object.keys(colors).map((eventType) => {
			return (
				<div className="colorKeyLabel" key={eventType}>
					<span>{eventType}</span>
					<div className="dot" style={{backgroundColor: getBackgroundColor(eventType)}}></div>
				</div>
			);
		});

		return (
			<div className="eventsTab">
				<div className="colorKey">
					{legend}
				</div>
				<div>
					{ this.props.events.map (function(event) {
							return (
								<div className="monthEvents" key={event['month']}>
									<h1>{event['month']}</h1>
									<div className="allEvents">
										{ event['arr'].map( function(event) {
											return (
												<div className="event" key={event['id']}>
													<RectImage src={event['image']} />
													<div className="overlayWrapper">
														<div className="overlay" style={{backgroundColor: getBackgroundColor(event['type'])}}>
															<p className="eventDate">{formatDate(event['start'])}</p>
															<div className="eventOverlay">
																<p className="bandName">{getBandName(event['summary'])}</p>
																<p className="separator">. . .&nbsp;&nbsp;&nbsp;. . .&nbsp;&nbsp;&nbsp;. . .</p>
																<p className="venue">{getVenue(event['summary'])}</p>
															</div>
														</div>
														<div className="hoverOverlay">
															<p className="enterLabel">click for more details</p>
														</div>
													</div>
												</div>											
											);
										})
										}
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
});

var getBackgroundColor = function(type){
	return colors[type] || defaultColor;
};

var getBandName = function(desc){
	return desc.substring(0, desc.indexOf("@") - 1);
};

var getVenue = function(desc){
	return desc.substring(desc.indexOf("@") + 2);
};

var formatDate = function(dateString) {
  var date = new Date(dateString);
	return date.getDate();
};

module.exports = EventList;
