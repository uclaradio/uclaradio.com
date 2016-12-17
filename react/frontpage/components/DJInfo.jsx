// DJInfo.jsx
import React from 'react';

// Common Elements
import RectImage from '../../common/RectImage.jsx';

var defaultDJPic = "/img/bear_transparent.png";

/*
DJInfo: UI element showing information for a dj
@prop picture: url for dj profile picture
@prop name: dj name
*/
var DJInfo = React.createClass({
    getDJImage: function(picURL) {
        if (picURL) {
            return picURL;
        }
        return defaultDJPic;
    },
    render: function() {
    	return (
    		<div className="djTile">
    			<RectImage maxWidth="200px" src={this.getDJImage(this.props.picture)} circle />
    			<div className="djTileInfo">
    				<h4>{this.props.name}</h4>
    			</div>
    		</div>
    	);
    } 
});

module.exports = DJInfo;