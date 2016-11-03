// DJInfo.jsx
var React = require('react');
var defaultDJPic = "/img/radio.png"

// Common Elements
var RectImage = require('../common/RectImage.jsx');

var DJInfo = React.createClass({
    render: function() {
    	return (
    		<div className="dj-tile">
    			<RectImage maxWidth="200px" src={this.props.picture || defaultDJPic} />
    			<div className="dj-tile-info">
    				<h5>{this.props.name}</h5>
    			</div>
    		</div>
    	);
    } 
});
module.exports = DJInfo;