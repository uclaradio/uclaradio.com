// frontpage.jsx
// Radio Front Page

import React from 'react';
// React-Router
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

// Frontpage Containers (View Controllers)
import ShowsTab from './containers/ShowsTab.jsx';
import EventsTab from './containers/EventsTab.jsx';
import DJsTab from './containers/DJsTab.jsx';
import ShowContainer from './containers/ShowContainer.jsx';

// Frontpage Components (Views)
import TriangleCanvas from './components/TriangleCanvas.jsx';
import FrontPageNavbar from './components/FrontPageNavbar.jsx';
import StreamBar from './components/StreamBar.jsx';
import ShowInfo from './components/ShowInfo.jsx';
import WaterFallContent from './components/WaterFallContent.jsx';
// Common Components
import RectImage from '../common/RectImage.jsx';

// Bootstrap elements
import { Bootstrap, Grid, Col } from 'react-bootstrap';

// Misc
import theme from '../common/theme';

// styling
require('./Frontpage.scss');

// temp data
const sampleFeaturedShow = {"title":"Pirate Radio","id":12,"day":"Mon","time":"10pm","djs":{"chris":"DJ Jamburglar"},"genre":"Psychedelic","blurb":"Life is a trip... Sail away to undiscovered psychic frontiers with underground psychedelic jams","public":true,"pages":[],"episodes":[]};

/**
Frontpage UI, including radio stream, navbar, and triangle background.
Expects children components for tab contents

@prop nowPlaying: show to display as live
@prop children: components to display in content area
**/
const FrontpageContent = React.createClass({
  componentWillMount: function() {
    // refresh live show info now and every 30 seconds
    this.props.updateNowPlaying();
    this.interval = setInterval(this.props.updateNowPlaying, 30*1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    var showPlaying = this.props.nowPlaying && this.props.nowPlaying.title != null;
    return (
      <div className="frontpageContent">
        { /* <TriangleCanvas xColors={theme.timezoneColorScheme()}> */ }
        <TriangleCanvas xColors="Spectral">
          <div class="container" id="main">
            <Grid>

              <Col xs={12} md={3} className="frontpageCol">
                <IndexLink to="/beta" activeClassName="active">
                  <div className="radioBanner">
                    <RectImage maxWidth="350px"
                      src="/img/uclaradio-black.png" />
                  </div>
                </IndexLink>
                <ShowInfo title="Current Show"
                  show={showPlaying ? this.props.nowPlaying : null} />
                <ShowInfo title="Spotlight" show={sampleFeaturedShow} />
              </Col>

              <Col xs={12} md={9} className="frontpageCol">
                <div className="promoBanner">
                  <Link to="/beta/shows">
                    { /* Sample data: Show of the month from last year */ }
                    <RectImage src="/img/sotmoctober2015cut.png" aspectRatio={5}>
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
Wrapper for Frontpage content, implementing routes for different tabs.
Will pass own props down to FrontpageContent
**/
const Frontpage = React.createClass({
  render: function() {
    return (
      <Router history={browserHistory}>
        <Route path="/beta" component={props => <FrontpageContent {...this.props} {...props} />}>
          <IndexRoute component={WaterFallContent} />
          <Route path="/beta/djs" component={DJsTab} />
          <Route path="/beta/events" component={EventsTab} />
          <Route path="/beta/shows" components={ShowsTab} />
          <Route path="/beta/shows/:showID" component={ShowContainer} />
        </Route>
      </Router>
    );
  }
});

export default Frontpage;
