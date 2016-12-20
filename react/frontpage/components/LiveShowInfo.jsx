// LiveShowInfo.jsx

import React from 'react';

// Common Components
import RectImage from '../../common/RectImage.jsx';

// Bootstrap Components
import { Glyphicon } from 'react-bootstrap';

import { Link } from 'react-router';

// styling
require('./LiveShowInfo.scss');

var defaultShowPic = "/img/radio.png"

/**
Floating div with image and relevant info for a show

@prop title: (optional) title to show above show
@prop activeClassName
@prop show: show to present
*/
var LiveShowInfo = React.createClass({
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
  truncateName: function(name, l) {
    return name.length > l ? name.substr(0,l-2) + "\u2026" : name;
  },
  render: function() {
    if (!this.props.show) {
      return <div classname="liveShowInfoEmpty"></div>;
    } else {
      return (
        <div className="liveShowInfo">
          { this.props.title &&
            <p className="infoHeader">{ /* <Glyphicon glyph="volume-up"/> */ }{this.props.title}</p>
          }
          <Link to="/beta/shows" activeClassName={this.props.activeClassName}>
            <div className="liveShowBanner">
              <RectImage
                src={this.props.show.picture || defaultShowPic} />
              <div className="showDetails">
                <p className="showTitle">{this.props.show.title || ""}</p>
                <p className="djs">{this.djString(this.props.show.djs || {})}</p>
              </div>
              
              { /*<span className="genre">{this.truncateName(this.props.show.genre || "", 18)}</span> */ }
            </div>
          </Link>
        </div>
      );
    }
  }
});

module.exports = LiveShowInfo;
