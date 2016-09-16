// frontpage.jsx
// Radio Front Page

var React = require('react');
var ReactDOM = require('react-dom');

// FrontPage Elements
var TriangleCanvas = require('./frontpage/TriangleCanvas.jsx');
var FrontPageNavbar = require('./frontpage/FrontPageNavbar.jsx');
var StreamBar = require('./frontpage/StreamBar.jsx')

// Bootstrap elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Well = require('react-bootstrap').Well;

// Custom
var theme = require('./misc/theme');

var FrontPage = React.createClass({
  render: function() {
    return (
      <div className="frontPage">
        <TriangleCanvas xColors={theme.timezoneColorScheme()}>
          <div class="container" id="main">
            <Grid>

              <Col xs={12} md={3} mdPush={9}>
                <Well className="frontWell">
                  <h2>Current Show</h2>
                  <img style={{maxWidth: 100, maxHeight: 100, paddingBottom: 10}}
                    src="http://images.8tracks.com/cover/i/002/789/269/rsz_1on_stage_us_8track_2_big-9449.jpg?rect=0,0,596,596&q=98&fm=jpg&fit=max" />
                  <p>Best Coast</p>
                </Well>
              </Col>

              <Col xs={12} md={6}>
                <FrontPageNavbar />
                <Well className="frontWell">
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
                </Well>
              </Col>

              <Col xs={12} md={3} mdPull={9}>
                <Well className="frontWell">
                  <img style={{width: "100%", maxWidth: 200, maxHeight: 200, paddingBottom: 10}}
                    src="/img/radio.png" />
                  <p>UCLA Radio is an entirely student-run radio station. We broadcast all day, every day from a secret cave in Ackerman Student Union. Donate and Support</p>
                </Well>
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
