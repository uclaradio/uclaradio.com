// WaterFallContent.jsx

var React = require('react');
var passwords = require('../../passwords.json');
var Dates = require('../misc/Dates.js');
var numberOfFBPosts = 7;
var FB = "https://graph.facebook.com/uclaradio?fields=posts.limit("+numberOfFBPosts+"){full_picture,message,created_time,link}&access_token=" + passwords["FB_API_KEY"];
var WaterFallContent = React.createClass({
	getInitialState: function() {
		return {
			facebookPosts: []
		};
	},
	componentWillMount: function() {
		this.serverRequest = $.get(FB, function (result) {
			this.setState({
				facebookPosts:result['posts']['data']
			});
		}.bind(this));
	},
	render: function () {
		return(
			 <div className='waterfall-content'> 
			{ this.state.facebookPosts.map (function(el) {
					return (
						<a href={el['link']}>
							<div className='waterfall-box'>
								<div className='waterfall-box-content'>

								{ el['full_picture'] && <img src={el['full_picture']} /> }
								{
									!el['message'].includes("http") && 
									<div className='waterfall-box-content-text'>
										{
											<div className='waterfall-box-content-text-date'>{formateDate(el['created_time'])}</div> 
											// el['message']
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
	var date = new Date(dateString);
	return Dates.availableDays[date.getDay()] + ", " +date.getMonth() + "/" + date.getDate();
}
module.exports = WaterFallContent;