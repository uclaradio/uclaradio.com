// frontpage.jsx
// Radio Front Page

import React from 'react';
import ReactDOM from 'react-dom';
// React-Router
import { Router, Route, IndexRoute, browserHistory, IndexLink } from 'react-router';
// Redux / React-Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './frontpage/reducers/';

const store = createStore(reducer);

// FrontPage Elements
import TriangleCanvas from './frontpage/TriangleCanvas.jsx';
import FrontPageNavbar from './frontpage/FrontPageNavbar.jsx';
import StreamBar from './frontpage/StreamBar.jsx';
import LiveShowInfo from './frontpage/LiveShowInfo.jsx';
import WaterFallContent from './frontpage/components/WaterFallContent.jsx';
import DJList from './frontpage/DJList.jsx';
import EventsTab from './frontpage/components/EventsTab.jsx';

// Common Elements
import RectImage from './common/RectImage.jsx';

// Bootstrap elements
import { Bootstrap, Grid, Col } from 'react-bootstrap';

// Custom
import theme from './misc/theme';

var nowPlayingURL = "/api/nowplaying";

var FrontPage = React.createClass({
  getInitialState: function() {
    return {
      show: null
    };
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  componentDidMount: function() {
    this.updateNowPlaying();
    // refresh tracks every 30 seconds
    this.interval = setInterval(this.updateNowPlaying, 30*1000);
  },
  updateNowPlaying: function() {
    $.ajax({
      url: nowPlayingURL,
      dataType: 'json',
      cache: false,
      success: function(nowPlaying) {
        this.setState({show: nowPlaying});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({show: null});
        console.error(nowPlayingURL, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var showShow = this.state.show && this.state.show.title != null;
    return (
      <div className="frontPage">
        <TriangleCanvas xColors={theme.timezoneColorScheme()}>
          <div class="container" id="main">
            <Grid>

              <Col xs={12} md={3} className="frontpageCol">
                  <IndexLink to="/beta" activeClassName="active">
                    <div className="radioInfo">
                      <RectImage maxWidth="350px"
                        src="/img/uclaradio-white.png" />
                    </div>
                  </IndexLink>
                <LiveShowInfo show={showShow ? this.state.show : null} title="Now Playing" />
                <div>
                  <p>UCLA Radio is an entirely student-run radio station. We broadcast all day, every day from a secret cave in Ackerman Student Union.</p>
                </div>
              </Col>

              <Col xs={12} md={9} className="frontpageCol">
                <FrontPageNavbar />
                { this.props.children }
              </Col>

            </Grid>
          </div>
        <StreamBar currentShowTitle={showShow ? this.state.show.title : null} />
        </TriangleCanvas>
      </div>
    )
  }
});

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/beta" component={FrontPage}>
        <IndexRoute component={WaterFallContent} />
        <Route path="/beta/djs" component={DJList} />
        <Route path="/beta/events" component={EventsTab} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('content'))
