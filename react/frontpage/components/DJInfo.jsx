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
        return picURL || defaultDJPic;
    },
    render: function() {
        var className = this.props.picture == null ? "djTile empty" : "djTile";
    	return (
    		<div className={className}>
    			<RectImage maxWidth="200px" src={this.getDJImage(this.props.picture)} circle />
                <div className="djTileOverlay"><p className="djName">{this.props.name}</p></div>
    		</div>
    	);
    } 
});

module.exports = DJInfo;