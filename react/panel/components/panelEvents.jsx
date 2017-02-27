var React = require('react');

// Inputs
var InputEditableTextField = require('../inputs/InputEditableTextField.jsx');
var InputEditableDateTimeField = require('../inputs/InputEditableDateTimeField.jsx');
var InputCheckbox = require('../inputs/InputCheckbox.jsx');
var InputFileUpload = require('../inputs/InputFileUpload.jsx');
var ConfirmationButton = require('../inputs/ConfirmationButton.jsx');

const PanelEventsPage = React.createClass({
	getInitialState: function() {	//temporary until we figure out the back end
    	return {verified: false, checked: true};
  	},
	handleSubmit: function(){	//temporary until we figure out the back end
		return;
	},
	render: function(){
		return (
			<div>
				<InputCheckbox title="Public" details="Make Event Public" checked={this.state.checked}
                  onSelect={this.handleSubmit} verified={this.state.verified} />
				<InputEditableTextField title="Name"
                  onSubmit={this.handleSubmit} placeholder="Name of Event" verified={this.state.verified} />
                <InputEditableTextField title="Type"
                  onDateSubmit={this.handleSubmit} placeholder="Type of Event" verified={this.state.verified} />
                <InputEditableDateTimeField title="Date" 
                  onSubmit={this.handleSubmit} placeholder="Date" verified={this.state.verified} />
                <InputEditableTextField title="Location" 
                  onSubmit={this.handleSubmit} placeholder="Location" verified={this.state.verified} />
                <InputEditableTextField title="Description" multiline 
                  onSubmit={this.handleSubmit} placeholder="Description of event goes here" verified={this.state.verified} />
                <InputFileUpload title="Event Picture" accept=".png,.gif,.jpg,.jpeg" 
                onSubmit={this.handleSubmit} details="" verified={this.state.verified}/>
            </div>
		);
	}
});

export default PanelEventsPage;