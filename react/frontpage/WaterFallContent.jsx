// WaterFallContent.jsx

var React = require('react');
var passwords = require('../../passwords.json');
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
			{this.state.facebookPosts.map(function(el){ return(<div className='waterfall-box'><div className='waterfall-box-content'>{el['full_picture'] && <img src={el['full_picture']} />}<div className='waterfall-box-content-text'>{el['message']}</div></div></div>)})}
			</div>
		);
	}
});

module.exports = WaterFallContent;