// frontpage.jsx
// Radio Front Page

import React from 'react';
// React-Router
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

// Frontpage Containers (View Controllers)
import ShowsTab from './containers/ShowsTab.jsx';
import EventsTab from './containers/EventsTab.jsx';
import DJsTab from './containers/DJsTab.jsx';
import TopAlbumsTab from './components/TopAlbumsTab.jsx';

import ShowContainer from './containers/ShowContainer.jsx';
import EventContainer from './containers/EventContainer.jsx';
import DJContainer from './containers/DJContainer.jsx';


// Frontpage Components (Views)
import TriangleCanvas from './components/TriangleCanvas.jsx';
import FrontPageNavbar from './components/FrontPageNavbar.jsx';
import StreamBar from './components/StreamBar.jsx';
import ShowInfo from './components/ShowInfo.jsx';
import WaterFallContent from './components/WaterFallContent.jsx';
import Error404Page from './components/Error404Page.jsx';
import StreamIssuesPage from './components/StreamIssuesPage.jsx';
import AboutPage from './components/AboutPage.jsx';

// Common Components
import RectImage from '../common/RectImage.jsx';

// Bootstrap elements
import { Bootstrap, Grid, Col } from 'react-bootstrap';

// Google analytics helper
import passwords from '../../passwords.json';
var ReactGA = require('react-ga');
ReactGA.initialize(passwords.googleanalyticskey);

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

// Misc
import theme from '../common/theme';

// styling
require('./Frontpage.scss');

// temp data
// const sampleFeaturedShow = {"title":"Pirate Radio","id":12,"day":"Mon","time":"10pm","djs":{"chris":"DJ Jamburglar"},"genre":"Psychedelic","blurb":"Life is a trip... Sail away to undiscovered psychic frontiers with underground psychedelic jams","public":true,"pages":[],"episodes":[]};

/**
Frontpage UI, including radio stream, navbar, and triangle background.
Expects children components for tab contents

@prop nowPlaying: show to display as live
@prop spotlight: show to display as spotlight
@prop children: components to display in content area

@prop children: components to display in content area
**/
const FrontpageContent = React.createClass({
  render: function() {
    var showPlaying = this.props.nowPlaying && this.props.nowPlaying.title != null;
    return (
      <div className="frontpageContent">
        { /* <TriangleCanvas xColors={theme.timezoneColorScheme()}> */ }
        <TriangleCanvas xColors="Spectral">
          <div className="container" id="main">
            <Grid>

              <Col xs={12} md={3} className="frontpageCol">
                <IndexLink to="/" activeClassName="active">
                  <div className="radioBanner">
                    <RectImage maxWidth="350px"
                      src="/img/uclaradio-black.png" />
                  </div>
                </IndexLink>
                <ShowInfo title="Current Show" show={this.props.nowPlaying} />
                { /* Show Spotlight */ }
                <ShowInfo title="Spotlight" show={this.props.spotlight} />
              </Col>

              <Col xs={12} md={9} className="frontpageCol">
                { /* Show of the Month */ }
                <div className="promoBanner">
                  <Link to="/shows/90">
                    <RectImage src="/img/sotm-mar17-nuindigo.png" aspectRatio={5}>
                      <div className="overlay" />
                    </RectImage>
                  </Link>
                </div>
                <FrontPageNavbar />
                { this.props.children }
              </Col>

            </Grid>
          </div>
        <StreamBar currentShowTitle={showPlaying ? this.props.nowPlaying.title : null} />
        </TriangleCanvas>
      </div>
    )
  }
});

/**
Redux container (wrapper) for FrontpageContent to provide props:
  nowPlaying, spotlight
**/
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  var props = {};

  // set nowPlaying & spotlight shows if found
  for (var showIndex = 0; showIndex < state.shows.shows.length; showIndex++) {
    var show = state.shows.shows[showIndex];
    if (show.id === state.shows.nowPlayingID) {
      props.nowPlaying = show;
    }
    // note: only set spotlight show if different from current show
    if (show.id === state.shows.spotlightID && show.id !== state.shows.nowPlayingID) {
      props.spotlight = show;
    }
  }

  var spotlight = state.shows.shows.find((show) => {
    return show.id == state.shows.spotlightID;
  });
  if (spotlight && spotlight !== -1) {
    props.spotlight = spotlight;
  }

  return props;
};
const FrontpageContentContainer = connect(
  mapStateToProps
)(FrontpageContent);

// react-router routes 
// each path represents a page of our frontpage with a component
const routes = (
  <Route path="/" component={FrontpageContentContainer}>
    <IndexRoute component={WaterFallContent} />
    <Route path="/djs" component={DJsTab} />
    <Route path="/djs/:djName" component={DJContainer} />
    <Route path="/events" component={EventsTab} />
    <Route path="/shows" components={ShowsTab} />
    <Route path="/shows/:showID" component={ShowContainer} />
    <Route path="/events/:eventID" component={EventContainer} />
    <Route path="/streamIssues" component={StreamIssuesPage} />
    <Route path="/about" component={AboutPage} />
    <Route path="*" component={Error404Page} />
  </Route>
);

/**
Wrapper component, allows to use react-router to switch pages
also sets some data in store

@prop updateNowPlaying: () => refresh now playing by requesting new data from server
@prop setSpotlightShowID: (showID) => update the spotlight to be a show with the provided showID
@prop updateShows: () => should fetch updated list of shows and update store
**/
const Frontpage = React.createClass({
  componentWillMount: function() {
    // refresh live show info now and every 30 seconds
    this.props.updateNowPlaying();
    this.interval = setInterval(this.props.updateNowPlaying, 30*1000);

    // update now playing and fetch initial shows data
    // 2/27/17 - Queers 4 Ur Ears!
    this.props.setSpotlightShowID(76);
    this.props.updateShows();
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <Router history={browserHistory} onUpdate={logPageView}>
        {routes}
        <Route path="/" component={props => <FrontpageContent {...this.props} {...props} />}>
          <IndexRoute component={WaterFallContent} />
          <Route path="/djs" component={DJsTab} />
          <Route path="/events" component={EventsTab} />
          <Route path="/shows" components={ShowsTab} />
          <Route path="/shows/:showID" component={ShowContainer} />
          <Route path="/events/:eventID" component={EventContainer} />
          <Route path="/streamIssues" component={StreamIssuesPage} />
          <Route path="/topalbums" components={TopAlbumsTab} />
          <Route path="*" component={Error404Page} />
        </Route>
      </Router>
    );
  }
});

export default Frontpage;
