// reactSchedule-s16.js
// schedule for spring 2016

var Schedule = React.createClass({
	getInitialState: function() {
		var d = new Date();
		return {"day": d.getDay()};
	},
	handleButtonClick: function(day) {
		this.setState({day: day});
	},
	scheduleOfTheDayURL: function() {
		switch(this.state.day) {
			case 0: // Sun
				return '/img/s16prettySchedule/Sunday.png';
			case 1: // Mon
				return '/img/s16prettySchedule/Monday.png';
			case 2: // Tue
				return '/img/s16prettySchedule/Tuesday.png';
			case 3: // Wed
				return '/img/s16prettySchedule/Wednesday.png';
			case 4: // Thurs
				return '/img/s16prettySchedule/Thursday.png';
			case 5: // Fri
				return '/img/s16prettySchedule/Friday.png';
			case 6: // Sat
				return '/img/s16prettySchedule/Saturday.png';
		}
	},
	buttons: function() {
		var currentDay = this.state.day;
		var handleClick = this.handleButtonClick;
		return ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"].map(function(day, i) {
			var className = (i == currentDay) ? "pop-button schedule-button selected" : "pop-button schedule-button";
			return <a key={i} className={className} role="button" onClick={()=>handleClick(i)}>{day}</a>;
		});
	},
	render: function() {
		return (
			<div className="schedule">
				<h1>Spring 2016 Schedule</h1>
				<div id="scheduleButtons">{this.buttons()}</div>
				<img src={this.scheduleOfTheDayURL()} />
			</div>
		);
	}
}); 

ReactDOM.render(
	React.createElement(Schedule, null),
	document.getElementById('FootHold')
);
