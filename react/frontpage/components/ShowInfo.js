// ShowInfo.js

import React from 'react';

// Common Components
import RectImage from '../../common/RectImage.js';

import { Link } from 'react-router';

// styling
require('./ShowInfo.scss');

const defaultShowPic = '/img/radio.png';

/**
Floating div with image and relevant info for a show

@prop title: (optional) title to show above show
@prop show: show to present
*/
const ShowInfo = React.createClass({
  // creates readable string from DJ dictionary returned from the server
  djString(djMap) {
    let djString = '';
    let addComma = false;
    for (const dj in djMap) {
      if (addComma) {
        djString += ', ';
      }
      djString += djMap[dj];
      addComma = true;
    }
    return djString;
  },
  truncateName(name, l) {
    return name.length > l ? `${name.substr(0, l - 2)}\u2026` : name;
  },
  urlFromShow(show) {
    return `/shows/${show.id}`;
  },
  render() {
    if (!this.props.show) {
      return <div className="showInfoEmpty" />;
    }
    return (
      <div className="showInfo">
        {this.props.title && <p className="infoHeader">{this.props.title}</p>}
        <Link to={this.urlFromShow(this.props.show)} activeClassName="active">
          <div className="showBanner">
            <RectImage src={this.props.show.picture || defaultShowPic} />
            <div className="showDetails">
              <p className="showTitle">{this.props.show.title || ''}</p>
              <p className="djs">{this.djString(this.props.show.djs || {})}</p>
            </div>

            {/* <span className="genre">{this.truncateName(this.props.show.genre || "", 18)}</span> */}
          </div>
        </Link>
      </div>
    );
  },
});

module.exports = ShowInfo;
