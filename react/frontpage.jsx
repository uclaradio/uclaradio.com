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
    var loremIpsum = <div><p>Lorem ipsum dolor sit amet, iriure sanctus eos te, in has fierent vituperatoribus, deserunt senserit et quo. No vix amet eripuit interpretaris, nam sint quot quaerendum eu. Duo ne wisi quodsi mediocritatem, inani minimum moderatius mea et, te legimus albucius mel. Tation prompta hendrerit no est, lorem ignota theophrastus has ut. No his wisi novum, est nostrud facilis appetere no, te vel autem summo nemore. </p><p>Eius harum vis id, eam exerci possit oporteat ut. Ei mutat delicatissimi pro, ius ceteros singulis cu, no mea zril legimus honestatis. Eu per probo singulis, ad eam dicant utinam. Ut sea latine nonumes. </p><p>At erant altera omnesque his, qui an discere lobortis, id laudem democritum eum. Case appellantur his te, eu putent offendit vis. Possim utamur reformidans ius ea, eum feugiat saperet ad, in has mucius recusabo quaerendum. Ea velit dicta mel, iriure maluisset eos cu. Nec aperiri vocibus ea, te vim lorem suavitate. At his illud liber saperet. </p><p>Mei adhuc docendi gloriatur in, case habemus vim ad, vix te aliquip imperdiet theophrastus. Qui ex eripuit liberavisse, sit dolorum sensibus ea, ut congue munere eligendi vim. Eos ei soluta labitur appellantur. Est putant recteque in, cu rebum convenire mei, ad mea velit constituam temporibus. Probo autem assum vim cu, dicam ceteros partiendo in qui, eos ipsum lorem salutandi an. </p><p>Nonumy inciderint in nec, in per eirmod omnium recusabo. In deserunt salutatus est. Suavitate democritum voluptatibus ius cu, saperet evertitur ut eam. Quot graeco dolorem nec at, vis ad probo petentium maiestatis.</p></div>;
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
                  <p>Donate and Support</p>
                </div>
              </Col>

              <Col xs={12} md={showShow ? 6 : 9} style={{paddingLeft: "7.5px", paddingRight: "7.5px"}}>
                <FrontPageNavbar />
                <div className="frontWell">
                  <h2>Content</h2>
                  {loremIpsum}
                </div>
              </Col>

              <Col xs={12} md={showShow ? 3 : 0} style={{paddingLeft: "7.5px", paddingRight: "7.5px"}}>
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
