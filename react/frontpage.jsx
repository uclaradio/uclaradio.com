// frontpage.jsx
// Radio Front Page

var React = require('react');
var ReactDOM = require('react-dom');

// FrontPage Elements
var TriangleCanvas = require('./frontpage/TriangleCanvas.jsx');
var FrontPageNavbar = require('./frontpage/FrontPageNavbar.jsx');
var StreamBar = require('./frontpage/StreamBar.jsx');
var LiveShowInfo = require('./frontpage/LiveShowInfo.jsx');
var WaterFallContent = require('./frontpage/WaterFallContent.jsx');
var EventsContent = require('./frontpage/EventsContent.jsx');

// Common Elements
var RectImage = require('./common/RectImage.jsx');

// Bootstrap elements
var Bootstrap = require('react-bootstrap');
var Grid = Bootstrap.Grid;
var Col = Bootstrap.Col;

// Custom
var theme = require('./misc/theme');

var nowPlayingURL = "/api/nowplaying";

var eventsData = '{"events":[{"month":"October","arr":[{"start":"2016-10-27T07:00:00.000Z","end":"2016-10-28T07:00:00.000Z","status":"CONFIRMED","summary":"Good Charlotte @ The Novo","description":"","location":"","id":"52ghriau6f6u2h6e8tu38rtlfc@google.com"},{"start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"M83 @ The Greek Theater","description":"","location":"","id":"i8eqp5uhrbenehl4qrirm6fcqk@google.com"},{"start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"Giraffage @ The Novo","description":"","location":"","id":"1rr546mob8ak34179o8jgcpfbg@google.com"},{"start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"Sweater Beats @ El Rey","description":"","location":"","id":"84loghf68ca49otkefg81b9rk0@google.com"},{"start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"Preoccupations @ The Roxy","description":"","location":"","id":"aou5sshkdndcohmt1j9kp6ue54@google.com"},{"start":"2016-10-29T07:00:00.000Z","end":"2016-10-30T07:00:00.000Z","status":"CONFIRMED","summary":"Festival Supreme @ Shrine Expo Hall & Grounds","description":"","location":"","id":"mho6d3paff5kp9e9vmn8lamb48@google.com"}]},{"month":"November","arr":[{"start":"2016-11-01T07:00:00.000Z","end":"2016-11-02T07:00:00.000Z","status":"CONFIRMED","summary":"The King Khan + BBQ Show @ El Rey","description":"","location":"","id":"4s9gmna6aptgnm1uj4n5obugcc@google.com"},{"start":"2016-11-03T07:00:00.000Z","end":"2016-11-04T07:00:00.000Z","status":"CONFIRMED","summary":"Goldroom & Autograf @ The Novo","description":"","location":"","id":"i1glinrsnp2kaekf5ulvnnsf24@google.com"},{"start":"2016-11-05T07:00:00.000Z","end":"2016-11-06T07:00:00.000Z","status":"CONFIRMED","summary":"Wet @ Fonda","description":"","location":"","id":"3it0juu1t1dc7hqn3qbd3g43rg@google.com"},{"start":"2016-11-11T08:00:00.000Z","end":"2016-11-12T08:00:00.000Z","status":"CONFIRMED","summary":"STRFKR @ El Rey","description":"","location":"","id":"pcjg77als3orr1p4t6rbgtsc10@google.com"},{"start":"2016-11-12T08:00:00.000Z","end":"2016-11-13T08:00:00.000Z","status":"CONFIRMED","summary":"STRFKR @ El Rey","description":"","location":"","id":"un8mllsuaj355fppkcsm1if7tk@google.com"},{"start":"2016-11-14T08:00:00.000Z","end":"2016-11-15T08:00:00.000Z","status":"CONFIRMED","summary":"Rae Sremmurd @ Novo","description":"","location":"","id":"rdhn7nuj1bdnjntrd186h6nr6o@google.com"},{"start":"2016-11-14T08:00:00.000Z","end":"2016-11-15T08:00:00.000Z","status":"CONFIRMED","summary":"The Naked and Famous @ Fox Theater Pomona","description":"","location":"","id":"l545b4bu3e0q4o8kpr11c4120k@google.com"},{"start":"2016-11-16T08:00:00.000Z","end":"2016-11-17T08:00:00.000Z","status":"CONFIRMED","summary":"Lapsley @ Mayan","description":"","location":"","id":"24k1fnktohds9f054fhh3ot414@google.com"},{"start":"2016-11-16T08:00:00.000Z","end":"2016-11-17T08:00:00.000Z","status":"CONFIRMED","summary":"Clean Bandit @ El Rey","description":"","location":"","id":"07lrbf9mhp1cl82ek1ivnde928@google.com"},{"start":"2016-11-17T08:00:00.000Z","end":"2016-11-18T08:00:00.000Z","status":"CONFIRMED","summary":"Hopsin @ The Novo","description":"","location":"","id":"spocu2onqh2lemr7a4vljrraa8@google.com"},{"start":"2016-11-23T08:00:00.000Z","end":"2016-11-24T08:00:00.000Z","status":"CONFIRMED","summary":"Capital Cities @ Fonda (11/23)","description":"","location":"","id":"tkq7qk2a3s3ftlld5is5182ua0@google.com"},{"start":"2016-11-26T08:00:00.000Z","end":"2016-11-27T08:00:00.000Z","status":"CONFIRMED","summary":"Jai Wolf @ The Novo","description":"","location":"","id":"gi69id1ti4luactfaef68jb2js@google.com"}]},{"month":"December","arr":[{"start":"2016-12-02T08:00:00.000Z","end":"2016-12-03T08:00:00.000Z","status":"CONFIRMED","summary":"Mr. Carmack @ The Novo","description":"","location":"","id":"fje2ccuvd8o8sqondv87o45j68@google.com"}]}]}';

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

              <Col xs={12} md={3} style={{paddingLeft: "7.5px", paddingRight: "7.5px"}}>
                <div className="radioInfo frontWell">
                  <a href="/beta">
                    <RectImage maxWidth="250px"
                      src="/img/uclaradio-black.png" />
                  </a>
                  <p>UCLA Radio is an entirely student-run radio station. We broadcast all day, every day from a secret cave in Ackerman Student Union.</p>
                </div>
                <LiveShowInfo show={showShow ? this.state.show : null} title="Now Playing" />
              </Col>

              <Col xs={12} md={9} style={{paddingLeft: "7.5px", paddingRight: "7.5px"}}>
                <FrontPageNavbar />
                <EventsContent data={eventsData} />
              </Col>

            </Grid>
          </div>
        <StreamBar currentShowTitle={showShow ? this.state.show.title : null} />
        </TriangleCanvas>
      </div>
    )
  }
});

ReactDOM.render(
  <FrontPage />,
  document.getElementById('content')
);
