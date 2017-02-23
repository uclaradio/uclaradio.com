// ShowBlurb.jsx

var React = require('react');

// Common Components
import RectImage from '../../common/RectImage.jsx';

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
	
	djString: function(djMap) {
	    var djString = "";
	    var addComma = false;
	    for (var dj in djMap) {
	      if (addComma) {
	        djString += ", ";
	      }
	      djString += djMap[dj];
	      addComma = true;
	    }
	    return djString;
  	},

	render: function() {

		if (!this.props.show) {
			return <div className="showBlurb" />;
		}

		var blockStyle = {
    		width: '100%',
    		background: 'rgba(255,255,255,0.45)',
    		height: '100%'
		}

		var blurbStyle = {
			marginTop: -50
		}

		var lineStyle = {
			borderTop: '0.5px solid black',
			height: 0,
			width: "100%",
			position: 'relative',
			marginBottom: 2,
			top: -5
		}

		var dot = {
			position: 'relative',
		    width: 10,
		    height: 10,
		    borderRadius: '50%',
		    display: 'inline-block',
		    left: 1,
		    marginRight: 10,
		    backgroundColor: 'rgba(255,0,0, 0.45)'
		};
		
		return (
			<div className="showBlurb" style={blurbStyle}>
				
				<div style={dot}></div>
				<h1 className="header" style={{position: "relative", display: "inline-block"}}>SELECTED SHOW: </h1>
				<div style={blockStyle}>
					<div style={{ padding: '5px', marginLeft: '5px', marginRight: '5px' }}>
						<h1 className="showTitle">{this.props.show.title}</h1>
						<RectImage maxWidth="350px" src={this.props.show.picture || defaultShowPic} />
						<p className="djs">{this.djString(this.props.show.djs || {})}</p>
						<div style={lineStyle}/>
						<div style={lineStyle}/>
						<p className="time">{this.props.show.day.toUpperCase()} @ {this.props.show.time.toUpperCase()}<span style={{float: "right"}}>{this.props.show.genre}</span></p>
						<p className="blurb">{this.props.show.blurb}</p>
					</div>
				</div> 
			</div>
		);
	
	}
});

module.exports = ShowBlurb;
