// WaterFallContent.jsx
var React = require('react');
var Dates = require('../misc/Dates.js');
var Waterfall = require('./responsive_waterfall.js');
var SocialMedia = "/getSocialMedia";

var WaterFallContent = React.createClass({
	getInitialState: function() {
		return {
			newData: false,
			socialMediaPosts: []
		};
	},
	componentWillMount: function() {
		this.serverRequest = $.get(SocialMedia, function (result) {
			this.setState({
				newData: true,
				socialMediaPosts:result
			});
		}.bind(this));
	},
	componentDidUpdate: function() {
		//once data has been recieved from the GET requests and formatted on the page
		//this will cause cards on radio to reorganize to row-wise chronology
		if(this.state.newData == true) {
			var waterfall = new Waterfall({ minBoxWidth: 250 });
			this.setState({
				newData: false
			});
		}
	},
	render: function() {
		return(
			 <div className='wf-container'>
			{ this.state.socialMediaPosts.map (function(el) {
					return (
							<div className='wf-box'>
								<a href={ (el['link'] || el['post_url'])} target="_blank" key={el['link']}>
									<div className='wf-box-content'>
									{ (el['platform'] == 'TUMBLR') && 
										<div className='wf-box-content-blog'>{el['summary']}</div>}
									{ (el['platform'] == 'FB') && el['full_picture'] && 
										<img src={el['full_picture']} /> }
									{ (el['platform'] == 'FB') && el['message'] && 
										!el['message'].includes("http") && 
										<div className='wf-box-content-text'>
											{
												<div className='wf-box-content-text-date'>{formateDate(el['created_time'])}</div> 
											}
											{
												el['message']
											}
										</div>
									}
									</div>
								</a>
							</div>
					);
				})
			}
			</div>
		);
	}
});

var containsHttp = function(myString) {
	return myString.split(" ").map(function(el) { return el.includes("http") ? "click" : el }).join(' ');
}

var formateDate = function(dateString) {
	var arr = "2010-03-15 10:30:00".split(/[- :]/),
    date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
	return Dates.availableDays[date.getDay()] + ", " + date.getMonth() + "/" + date.getDate();
}
module.exports = WaterFallContent;