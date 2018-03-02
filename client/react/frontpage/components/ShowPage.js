// ShowPage.js
// shows full description of a show

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from './Loader';
import RectImage from '../../common/RectImage';
import './ShowPage.scss';

import { fetchUpdatedShows } from '../actions/shows';

const defaultShowPic = '/img/radio.png';

/**
Page content for individual show
Displays full description of a show, with blurb, picture, djs.. everything

@prop show: show object
@prop fetching: currently fetching shows
@prop updateShows: callback to update all listed shows
* */
const ShowPage = React.createClass({
  componentWillMount() {
    if (this.props.show == null) {
      this.props.updateShows();
    }
  },
  componentDidMount() {
    // scroll to top of page
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
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
  getDJLink(djName) {
    return `/djs/${djName}`;
  },
  render() {
    if (!this.props.show) {
      return (
        <div className="showPage">
          {this.props.fetching ? <Loader /> : "This show doesn't exist!"}
        </div>
      );
    }

    const show = this.props.show;
    const djName = this.djString(show.djs);

    return (
      <div className="showPage">
        <p>
          <Link to="/shows">{`${show.day} ${show.time}`}</Link>
          {show.genre && ` / ${show.genre}`}
        </p>
        <RectImage maxWidth="350px" src={show.picture || defaultShowPic} />
        <div className="showInfo">
          <h3>{show.title}</h3>
          <Link to={this.getDJLink(djName)}>
            <p>{djName}</p>
          </Link>
          <p>{show.blurb}</p>
          <div className="social-icons">
            {show.facebook && (
              <a className="facebookLogo" href={show.facebook} target="_blank">
                <i className="fa fa-facebook-square fa-lg" aria-hidden="true" />
              </a>
            )}
            {show.tumblr && (
              <a className="tumblrLogo" href={show.tumblr} target="_blank">
                <i className="fa fa-tumblr-square fa-lg" aria-hidden="true" />
              </a>
            )}
            {show.soundcloud && (
              <a
                className="soundcloudLogo"
                href={show.soundcloud}
                target="_blank"
              >
                <i className="fa fa-soundcloud fa-lg" aria-hidden="true" />
              </a>
            )}
            {show.mixcloud && (
              <a className="mixcloudLogo" href={show.mixcloud} target="_blank">
                <i className="fa fa-mixcloud fa-lg" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  },
});

const mapStateToProps = (state, ownProps) => {
  const props = {
    fetching: state.shows.fetching,
  };

  const showID = Number(ownProps.params.showID);

  // set show if found
  for (let showIndex = 0; showIndex < state.shows.shows.length; showIndex++) {
    const show = state.shows.shows[showIndex];
    if (show.id === showID) {
      props.show = show;
    }
  }

  return props;
};

const mapDispatchToProps = dispatch => ({
  updateShows: () => {
    fetchUpdatedShows(dispatch);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
