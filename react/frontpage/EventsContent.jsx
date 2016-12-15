// EventsContent.jsx
var React = require('react');

var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var FormControls = require('react-bootstrap').FormControls;
var Button = require('react-bootstrap').Button;

//content of events page
var EventsContent = React.createClass({
	getInitialState: function(){
		return{
			currentShow: null
		};
	},
	showModal: function(e){
		var target = e.target
		while(target.className != "event" && target !== document)
			target = target.parentNode;
		if(target !== document)
			this.setState({currentShow: target.getElementsByClassName("bandName")[0].innerHTML});
	},
	hideModal: function(){
		this.setState({currentShow: null})
	},
	render: function() {
		return(
			<div className='wf-container' onClick={this.showModal}>
				{JSON.parse(this.props.data).events.map (function(el) {
						return (
							<div className="monthEvents" key={el['month']}>
								<h1>{el['month']}</h1>
								<div className="eventBlock">
									{el['arr'].map( function(event){
										return (
										<div className="event" key={event['id']}>
											<p className="bandName">{getBandName(event['summary'])}</p>
											<img src="https://avatars3.githubusercontent.com/u/7256558?v=3&s=466" className="bandPic"/>
											<div className="overlay">
												<div className="eventOverlay">
													<p className="showDate">{formatDate(event['start'])}</p>
													<p className="separator">... ... ...</p>
													<p className="venue">{getVenue(event['summary'])}</p>
												</div>
												<p className="enterLabel">(click to enter contest)</p>
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
				<Modal show={this.state.currentShow} onHide={this.hideModal} className="enterContest">
			<Modal.Body style={{marginTop: 20}}>
				<p className="showLabel">SHOW: </p><p className="showDesc">{this.state.currentShow}</p>
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
				</Modal>
			</div>
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