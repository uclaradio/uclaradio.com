// EventsContent.jsx
var React = require('react');

var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var FormControls = require('react-bootstrap').FormControls;
var Button = require('react-bootstrap').Button;

//content of events page
var EventsContent = React.createClass({
	goToEventPage: function(e){
		var target = e.target
		while(target.className != "event" && target.className !== wf-container)
			target = target.parentNode;
		if(target.className !== wf-container)
			window.open("https://www.facebook.com/UCLARadio/");
	},
	render: function() {
		return(
			<div>
				<div className="colorKey">
					<div className="colorKeyLabel">
						<p>Giveaway</p>
						<div className="dot" style={{backgroundColor: "#3c84cc"}}></div>
					</div>
					<div className="colorKeyLabel">
						<p>UCLA Radio Presents</p>
						<div className="dot" style={{backgroundColor: "#098440"}}></div>
					</div>
					<div className="colorKeyLabel">
						<p>Campus Event</p>
						<div className="dot" style={{backgroundColor: "#842b78"}}></div>
					</div>
					<div className="colorKeyLabel">
						<p>Local Event</p>
						<div className="dot" style={{backgroundColor: "#cca437"}}></div>
					</div>
				</div>
				<div className='wf-container' onClick={this.goToEventPage}>
					{JSON.parse(this.props.data).events.map (function(el) {
							return (
								<div className="monthEvents" key={el['month']}>
									<h1>{el['month']}</h1>
									<div className="eventBlock">
										{el['arr'].map( function(event){
											return (
											<div className="event" key={event['id']}>
												<img src={event['image']} className="bandPic"/>
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
	var color;
	switch(type){
		case "Giveaway":
			color = "#3c84cc";	//blue
			break;
		case "UCLA Radio Presents":
			color = "#098440";	//green
			break;
		case "Campus Event":
			color = "#842b78";	//magenta
			break;
		case "Local Event":
			color = "#cca437";	//orange
			break;
		default:
			color = "grey";
	}
	return color;
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

module.exports = EventsContent;