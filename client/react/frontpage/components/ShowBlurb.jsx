// ShowBlurb.jsx

import React from 'react';
import { Link } from 'react-router';
import RectImage from '../../common/RectImage.jsx';
import './ShowBlurb.scss';
import '../_common.scss';

const defaultShowPic = '/img/radio.png';

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
const ShowBlurb = React.createClass({
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

  urlFromShow(show) {
    return `/shows/${show.id}`;
  },

  getDJLink(djName) {
    return `/djs/${djName}`;
  },

  render() {
    if (!this.props.show) {
      return <div className="showBlurb" />;
    }

    return (
      <div className="showBlurb">
        <div className="dot" />
        <h1 className="header">SELECTED SHOW: </h1>
        <div className="blurb">
          <div className="blurb-body">
            <h1 className="showTitle">{this.props.show.title}</h1>
            <Link to={this.urlFromShow(this.props.show)}>
              <RectImage
                maxWidth="350px"
                src={this.props.show.picture || defaultShowPic}
              />
            </Link>
            <Link to={this.getDJLink(this.djString(this.props.show.djs))}>
              <p className="djs">{this.djString(this.props.show.djs || {})}</p>
            </Link>
            <div className="lineStyle" />
            <div className="lineStyle" />
            <p className="time">
              {this.props.show.day.toUpperCase()} @{' '}
              {this.props.show.time.toUpperCase()}
              <span style={{ float: 'right' }}>{this.props.show.genre}</span>
            </p>
            <div className="social-icons">
              {this.props.show.facebook && (
                <a
                  className="facebookLogo"
                  href={this.props.show.facebook}
                  target="_blank">
                  <i
                    className="fa fa-facebook-square fa-lg"
                    aria-hidden="true"
                  />
                </a>
              )}
              {this.props.show.tumblr && (
                <a
                  className="tumblrLogo"
                  href={this.props.show.tumblr}
                  target="_blank">
                  <i className="fa fa-tumblr-square fa-lg" aria-hidden="true" />
                </a>
              )}
              {this.props.show.soundcloud && (
                <a
                  className="soundcloudLogo"
                  href={this.props.show.soundcloud}
                  target="_blank">
                  <i className="fa fa-soundcloud fa-lg" aria-hidden="true" />
                </a>
              )}
              {this.props.show.mixcloud && (
                <a
                  className="mixcloudLogo"
                  href={this.props.show.mixcloud}
                  target="_blank">
                  <i className="fa fa-mixcloud fa-lg" aria-hidden="true" />
                </a>
              )}
            </div>
            <p className="blurbText">{this.props.show.blurb}</p>
            <Link to={this.urlFromShow(this.props.show)}>
              [CLICK FOR FULL SHOW PAGE]
            </Link>
          </div>
        </div>
      </div>
    );
  },
});

export default ShowBlurb;
