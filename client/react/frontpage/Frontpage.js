// frontpagejs
// Radio Front Page

import React from 'react';
// React-Router
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  IndexLink,
} from 'react-router';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { Grid, Col } from 'react-bootstrap';

// Redux Components
import ShowsContent from './components/ShowsContent';
import EventList from './components/EventList';
import DJList from './components/DJList/DJList';
import ShowPage from './components/ShowPage';
import EventPage from './components/EventPage';
import DJPage from './components/DJPage';

// Non-Redux Components
import TriangleCanvas from './components/TriangleCanvas';
import FrontPageNavbar from './components/FrontPageNavbar';
import StreamBar from './components/StreamBar/StreamBar';
import SocialPanel from './components/SocialPanel';
import ShowInfo from './components/ShowInfo';
import WaterFallContent from './components/WaterFallContent';
import Error404Page from './components/Error404Page';
import StreamIssuesPage from './components/StreamIssuesPage';
import AboutPage from './components/AboutPage';
import PromoBanner from './components/PromoBanner';

// Common Components
import RectImage from '../common/RectImage';

import './frontpage.scss';

// Google analytics helper

ReactGA.initialize('UA-21406547-20');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

// Misc

// styling

// temp data
// const sampleFeaturedShow = {"title":"Pirate Radio","id":12,"day":"Mon","time":"10pm","djs":{"chris":"DJ Jamburglar"},"genre":"Psychedelic","blurb":"Life is a trip... Sail away to undiscovered psychic frontiers with underground psychedelic jams","public":true,"pages":[],"episodes":[]};

/**
Frontpage UI, including radio stream, navbar, and triangle background.
Expects children components for tab contents

@prop nowPlaying: show to display as live
@prop spotlight: show to display as spotlight
@prop children: components to display in content area
* */

// update social media links here
// img is the base name of the Font Awesome icon
// Move to a separate file later?
const socialMediaLinks = [
  {
    img: 'facebook',
    link: 'https://www.facebook.com/uclaradio',
  },
  {
    img: 'twitter',
    link: 'https://twitter.com/UCLAradio',
  },
  {
    img: 'instagram',
    link: 'https://www.instagram.com/uclaradio/',
  },
  {
    img: 'snapchat-ghost',
    link: 'https://www.snapchat.com/add/uclaradio',
  },
];

const FrontpageContent = React.createClass({
  render() {
    const showPlaying =
      this.props.nowPlaying && this.props.nowPlaying.title != null;
    return (
      <div className="frontpageContent">
        {/* <TriangleCanvas xColors={theme.timezoneColorScheme()}> */}
        <TriangleCanvas xColors="Spectral">
          <div className="container" id="main">
            <Grid>
              <Col xs={12} md={3} className="frontpageCol">
                <IndexLink to="/" activeClassName="active">
                  <div className="radioBanner">
                    <RectImage
                      maxWidth="350px"
                      src="/img/uclaradio-black.png"
                    />
                  </div>
                </IndexLink>
                <SocialPanel links={socialMediaLinks} size="2x" />
                <ShowInfo title="Current Show" show={this.props.nowPlaying} />
                {/* Show Spotlight */}
                <ShowInfo title="Spotlight" show={this.props.spotlight} />
              </Col>

              <Col xs={12} md={9} className="frontpageCol">
                {/* Show of the Month */}
                <PromoBanner />
                <FrontPageNavbar />
                {this.props.children}
              </Col>
            </Grid>
          </div>
          <StreamBar
            currentShowTitle={showPlaying ? this.props.nowPlaying.title : null}
          />
        </TriangleCanvas>
      </div>
    );
  },
});

/**
Redux container (wrapper) for FrontpageContent to provide props:
  nowPlaying, spotlight
* */

const mapStateToProps = state => {
  const props = {};

  // set nowPlaying & spotlight shows if found
  for (
    let showIndex = 0;
    showIndex < state.shows.shows.length;
    showIndex += 1
  ) {
    const show = state.shows.shows[showIndex];
    if (show.id === state.shows.nowPlayingID) {
      props.nowPlaying = show;
    }
    // note: only set spotlight show if different from current show
    if (
      show.id === state.shows.spotlightID &&
      show.id !== state.shows.nowPlayingID
    ) {
      props.spotlight = show;
    }
  }

  const spotlight = state.shows.shows.find(
    show => show.id == state.shows.spotlightID
  );
  if (spotlight && spotlight !== -1) {
    props.spotlight = spotlight;
  }

  return props;
};
const FrontpageContentContainer = connect(mapStateToProps)(FrontpageContent);

// react-router routes
// each path represents a page of our frontpage with a component
const routes = (
  <Route path="/" component={FrontpageContentContainer}>
    <IndexRoute component={WaterFallContent} />
    <Route path="/djs" component={DJList} />
    <Route path="/djs/:djName" component={DJPage} />
    <Route path="/events" component={EventList} />
    <Route path="/shows" components={ShowsContent} />
    <Route path="/shows/:showID" component={ShowPage} />
    <Route path="/events/:eventID" component={EventPage} />
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
* */
const Frontpage = React.createClass({
  componentWillMount() {
    // refresh live show info now and every 30 seconds
    this.props.updateNowPlaying();
    this.interval = setInterval(this.props.updateNowPlaying, 30 * 1000);

    // update now playing and fetch initial shows data
    // 05/22/17 - Cabronx
    this.props.setSpotlightShowID(172);
    this.props.updateShows();
  },
  componentWillUnmount() {
    clearInterval(this.interval);
  },
  render() {
    return (
      <Router history={browserHistory} onUpdate={logPageView}>
        {routes}
      </Router>
    );
  },
});

export default Frontpage;
