// ShowBlurb.jsx

var React = require('react');

// styling
require('./shows.css');

const defaultShowPic = "/img/radio.png";

/*
Vertical blurb info for a show, including picture and description

@prop show: show object: {
	title: String,
	id: Number, // unique identifier
	day: String, // Mon / Tue / Wed / Thu / Fri / Sat / Sun
	time: String,
	djs: [String], // collection of username strings
	genre: String,
	blurb: String, // show description
	picture: String, // relative url to image file
  
}
*/
var ShowBlurb = React.createClass({
	render: function() {

		if (!this.props.show) {
			return <div className="showBlurb" />;
		}

		var blockStyle = {
    		width: '100%',
    		background: 'rgba(255,255,255,0.45)',
    		height: '100%'
		}
		
		return (
			<div className="showBlurb">
				<h1 className="header"> >> SELECTED SHOW: </h1>
				<div style={blockStyle}>
					<div style={{ padding: '5px', marginLeft: '5px', marginRight: '5px' }}>
						<h1 className="showTitle">{this.props.show.title}</h1>
						<img src={this.props.show.picture || defaultShowPic}/>
						<p className="djs">{this.props.show.djs[0]}</p>
						<p className="time">{this.props.show.day} @ {this.props.time} // {this.props.show.genre} </p>
						<p className="blurb">{this.props.show.blurb}</p>
					</div>
				</div> 
			</div>
		);
	
	}
});

module.exports = ShowBlurb;