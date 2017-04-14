// ShowBlurb.jsx

var React = require('react');

// Common Components
import RectImage from '../../common/RectImage.jsx';

import { Link } from 'react-router';

// styling
require('./ShowBlurb.scss');

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

    urlFromShow(show) {
    return "/shows/" + show.id;
  },

  render: function() {

    if (!this.props.show) {
      return <div className="showBlurb" />;
    }

    return (
      <div className="showBlurb">
        
        <div className="dot" style={{backgroundColor: 'rgba(255,0,0,0.45)', left: 1, marginRight: 10}}></div>
        <h1 className="header" style={{position: "relative", display: "inline-block"}}>SELECTED SHOW: </h1>
        <Link to={this.urlFromShow(this.props.show)}>
          <div className="blurb">
            <div style={{ padding: '5px', marginLeft: '5px', marginRight: '5px' }}>
              <h1 className="showTitle">{this.props.show.title}</h1>
              <RectImage maxWidth="350px" src={this.props.show.picture || defaultShowPic} />
              <p className="djs">{this.djString(this.props.show.djs || {})}</p>
              <div className="lineStyle"/>
              <div className="lineStyle"/>
              <p className="time">{this.props.show.day.toUpperCase()} @ {this.props.show.time.toUpperCase()}<span style={{float: "right"}}>{this.props.show.genre}</span></p>
              <p className="blurbText">{this.props.show.blurb}</p>
            </div>
          </div> 
        </Link>
      </div>
    );
  
  }
});

module.exports = ShowBlurb;
