// DJInfo.jsx
var React = require('react');
var defaultDJPic = "/img/radio.png"
var baseURL = "https://uclaradio.com";

// Common Elements
var RectImage = require('../common/RectImage.jsx');


var DJInfo = React.createClass({
    getDJImage: function(picURL) {
        if (!picURL) {
            return defaultDJPic;
        }
        else {
            return baseURL+picURL;
        }
    },
    render: function() {
    	return (
    		<div className="dj-tile">
    			<RectImage maxWidth="200px" src={this.getDJImage(this.props.picture)} />
    			<div className="dj-tile-info">
    				<h5>{this.props.name}</h5>
    			</div>
    		</div>
    	);
    } 
});

module.exports = DJInfo;