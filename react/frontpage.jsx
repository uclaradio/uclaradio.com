// frontpage.jsx
// Radio Front Page

var React = require('react');
var ReactDOM = require('react-dom');

// FrontPage Elements
var TriangleCanvas = require('./frontpage/TriangleCanvas.jsx');
var FrontPageNavbar = require('./frontpage/FrontPageNavbar.jsx');
var StreamBar = require('./frontpage/StreamBar.jsx');
var LiveShowInfo = require('./frontpage/LiveShowInfo.jsx');

// Common Elements
var RectImage = require('./common/RectImage.jsx');

// Bootstrap elements
var Bootstrap = require('react-bootstrap');
var Grid = Bootstrap.Grid;
var Col = Bootstrap.Col;

// Custom
var theme = require('./misc/theme');

var nowPlayingURL = "/api/nowplaying";

var FrontPage = React.createClass({
  getInitialState: function() {
    return {
      
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

              <Col xs={12} md={3}>
                <div className="radioInfo frontWell">
                  <a href="/beta">
                    <RectImage maxWidth="250px"
                      src="/img/uclaradio-black.png" />
                  </a>
                  <p>UCLA Radio is an entirely student-run radio station. We broadcast all day, every day from a secret cave in Ackerman Student Union.</p>
                  <p>Donate and Support</p>
                </div>
              </Col>

              <Col xs={12} md={showShow ? 6 : 9}>
                <FrontPageNavbar />
                <div className="frontWell">
                  <h2>Content</h2>
                  <p>8/16 - ayyy lmao</p>
                  <p>7/16 - ayyy lmao</p>
                  <p>6/16 - ayyy lmao</p>
                  <p>5/16 - ayyy lmao</p>
                  <p>3/16 - ayyy lmao</p>
                  <p>1/16 - ayyy lmao</p>
                  <p>Put lots of info heree</p>
                  <p>Put lots of info heree</p>
                  <p>Put lots of info heree</p>
                  <p>Put lots of info heree</p>
                  <p>Put lots of info heree</p>
                  <p>Put lots of info heree</p>
                  <p>Put lots of info heree</p>
                  <p>Put lots of info heree</p>
                  <p>Put lots of info heree</p>
                </div>
              </Col>

              <Col xs={12} md={showShow ? 3 : 0}>
                <LiveShowInfo show={showShow ? this.state.show : null} title="Now Playing" />
              </Col>

            </Grid>
          </div>
        <StreamBar />
        </TriangleCanvas>
      </div>
    )
  }  
});

ReactDOM.render(
  <FrontPage />,
  document.getElementById('content')
);
