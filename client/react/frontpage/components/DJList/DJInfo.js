// DJInfo.js
import React from 'react';

// Common Elements
import RectImage from '../../../common/RectImage';

import { Link } from 'react-router';

const defaultDJPic = '/img/bear_transparent.png';

/*
DJInfo: UI element showing information for a dj
@prop picture: url for dj profile picture
@prop name: dj name
*/
const DJInfo = React.createClass({
  getDJImage(picURL) {
    return picURL || defaultDJPic;
  },
  getDJLink(djName) {
    return `/djs/${djName}`;
  },
  render() {
    const className =
      this.props.picture == null ? 'djTile empty' : 'djTile full';
    return (
      <div className={className}>
        <Link to={this.getDJLink(this.props.name)}>
          <RectImage
            maxWidth="235px"
            maxHeight="235px"
            src={this.getDJImage(this.props.picture)}
            circle
          />
          <div className="djTileOverlay">
            <p className="djName">{this.props.name}</p>
            <p className="djBio">About: {this.props.bio}</p>
          </div>
        </Link>
      </div>
    );
  },
});

export default DJInfo;
