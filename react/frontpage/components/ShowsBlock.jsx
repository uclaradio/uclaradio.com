// EventsContent.jsx
var React = require('react');

var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var FormControls = require('react-bootstrap').FormControls;
var Button = require('react-bootstrap').Button;


//styling
require('./shows.css');

//content of events page
var ShowBlock = React.createClass({

	getInitialState: function() {
			
			if (this.isCurrentShow()) {
				return { 
					color: '#3c84cc',
					clicked: false
			 	};
			 }
			 else {
			 	return { 
					color: 'black',
					clicked: false
			 	};
			 }

	},

	handleColor: function() {
		var newColor = 'red';
		this.setState({
			color: newColor
		});
	},

	resetColor: function() {
		
		if(this.isCurrentShow()) {
			this.setState({
				color: '#3c84cc'
			});
		}
		else {
			this.setState({
				color: 'black'
			});
		}	
	},

	validShowSlot: function(t, d) {

		for (var i=0; i < this.props.showData.length; i++) {
			if (this.props.showData[i].time == t && this.props.showData[i].day == d) {
				return true;
			}
		}
		return false;
	},

	isCurrentShow: function() {
		var d = this.props.getCurDay();
		var h = this.props.getCurHour();

		if (this.props.time == h && this.props.day == d) {
			return true;
		}
		else {
			return false;
		}
	},

	render: function() {

		var blockStyle = {
			backgroundColor: this.state.color,
			opacity: 0.5, 
			width: '8%', 
			height: '20px', 
			marginRight: '5px',
			marginBottom: '-15px', 
			display: 'inline-block', 
			position: 'relative'
		} 

		var boringBlockStyle = {
			backgroundColor: 'white',
			opacity: 0.5, 
			width: '8%', 
			height: '20px', 
			marginRight: '5px',
			marginBottom: '-15px', 
			display: 'inline-block', 
			position: 'relative'
		}

		if (this.validShowSlot(this.props.time, this.props.day)){
			return(
				<div onMouseOver={function(){ this.handleColor(); this.props.hoverHandler(this.props.day,this.props.time); }.bind(this)} onMouseOut={function(){ this.resetColor(); this.props.hoverHandler(this.props.dDay,this.props.dHour); }.bind(this) }  onClick={() => this.props.clickHandler(this.props.day, this.props.time)} style={blockStyle}>
				</div> 
			);
		}
		else { 
			return( <div style={boringBlockStyle} /> );
		}
	
	}
});

module.exports = ShowBlock;