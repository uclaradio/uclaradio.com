// EventsContent.jsx
var React = require('react');

var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var FormControls = require('react-bootstrap').FormControls;
var Button = require('react-bootstrap').Button;
if (typeof Button === 'undefined' || Button === null) {
    console.log("issues!!\n");
}

var EventsContent = React.createClass({
	render: function() {
		return(
			 <div className='wf-container'>
			{ JSON.parse(this.props.data).events.map (function(el) {
					return (
						<div className="monthEvents" key={el['month']}>
							<h1>{el['month']}</h1>
							<div className="eventBlock">
								{el['arr'].map( function(event){
									return (
										<Event event={event} key={event['id']}/>
									);
								})
								}
							</div>
						</div>
					);
				})
			}
			</div>
		);
	}
});

var Event = React.createClass({
	getInitialState: function(){
		return{
			hover: false,
			showModal: false
		};
	},
	mouseEnter: function(){
		this.setState({hover: true});
	},
	mouseLeave: function(){
		this.setState({hover: false});
	},
	showModal: function(){
		this.setState({showModal: true})
	},
	hideModal: function(){
		this.setState({showModal: false})
	},
	render: function(){
		var hoverStyle = {display: "none"};
		if(this.state.hover){
			hoverStyle = {height: 200, width: 200, backgroundColor: "grey", opacity:"0.8", position: "absolute", bottom: 0, left: 0, right: 0, display: "inline"};
		}
		return(
		<div>
			<div className="event" onClick={this.showModal} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
				<p className="bandName">{getBandName(this.props.event['summary'])}</p>
				<img src="https://avatars3.githubusercontent.com/u/7256558?v=3&s=466" className="bandPic"/>
				<div style={hoverStyle}>
					<div className="eventOverlay">
						<p className="showDate">{formatDate(this.props.event['start'])}</p>
						<p className="separator">... ... ...</p>
						<p className="venue">{getVenue(this.props.event['summary'])}</p>
					</div>
					<p className="enterLabel">(click to enter contest)</p>
				</div>
			</div>
			<Modal show={this.state.showModal} onHide={this.hideModal} className="enterContest">
				<EnterContest show={this.props.event['summary']}/>
			</Modal>
		</div>
		);
	}
});

var EnterContest = React.createClass({
	render: function(){
		return (
			<Modal.Body style={{marginTop: 20}}>
				<p className="showLabel">SHOW: </p><p className="showDesc">{this.props.show}</p>
				<form>
					<div className="formGroup">
						<p className="formLabel">ENTER NAME: </p>
						<input type="text" label="name" className="formInput"/><br/>
					</div>
					<div className="formGroup">
						<p className="formLabel">ENTER EMAIL: </p>
						<input type="text" label="email" className="formInput"/><br/>
					</div>
					<Button className="formButton">
						SUBMIT
					</Button>
				</form>
			</Modal.Body>
		);
	}
});

var getBandName = function(desc){
	return desc.substring(0, desc.indexOf("@") - 1);
};

var getVenue = function(desc){
	return desc.substring(desc.indexOf("@") + 2);
};

var formatDate = function(dateString) {
    var date = new Date(dateString);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dq = "th";
    if(date.getDate() % 10 == 1)
    	dq = "st";
    else if (date.getDate() % 10 == 2)
    	dq = "nd";
    else if (date.getDate() % 10 == 3)
    	dq = "rd";
    if(date.getDate > 9 && date.getDate < 20)
    	dq = "th";
	return months[date.getMonth()] + " " + date.getDate() + dq;
};

module.exports = EventsContent;