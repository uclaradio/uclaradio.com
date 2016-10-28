// WaterFallContent.jsx
var React = require('react');
var Dates = require('../misc/Dates.js');
var SocialMedia = "/getSocialMedia"
var WaterFallContent = React.createClass({
	getInitialState: function() {
		return {
			socialMediaPosts: []
		};
	},
	componentWillMount: function() {
		this.serverRequest = $.get(SocialMedia, function (result) {
			this.setState({
				socialMediaPosts:result['posts']['data']
			});
		}.bind(this));
	},
	render: function () {
		return(
			 <div className='waterfall-content'> 
			{ this.state.socialMediaPosts.map (function(el) {
					return (
						<a href={el['link']} target="_blank" key={el['link']}>
							<div className='waterfall-box'>
								<div className='waterfall-box-content'>

								{ el['full_picture'] && <img src={el['full_picture']} /> }
								{ el['message'] && 
									!el['message'].includes("http") && 
									<div className='waterfall-box-content-text'>
										{
											<div className='waterfall-box-content-text-date'>{formateDate(el['created_time'])}</div> 
										}
										{
											el['message']
										}
									</div>
								}
								</div>
							</div>
						</a>
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