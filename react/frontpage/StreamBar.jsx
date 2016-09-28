// StreamBar.jsx

var React = require('react');

// Bootstrap Elements
var Grid = require('react-bootstrap').Grid;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Collapse = require('react-bootstrap').Collapse;

// Open-Source Components
var Slider = require('react-slick');

var sampleTracks = [
  {
    "artist": "Bibio",
    "name": "Town & Country",
    "url": "https://www.last.fm/music/Bibio/_/Town+&+Country",
    "image": "https://lastfm-img2.akamaized.net/i/u/64s/8058d75819ab70c2e3bae4e436046469.png",
  },
  {
    "artist": "Broncho",
    "name": "Stay Loose",
    "url": "https://www.last.fm/music/Broncho/_/Stay+Loose",
    "image": "https://lastfm-img2.akamaized.net/i/u/64s/f990e852bb7c42c7c2dd17da86a89974.png"
  },
  {
    "artist": "Kablam",
    "name": "Nu Metall",
    "url": "https://www.last.fm/music/Kablam/_/Nu+Metall",
    "image": "https://lastfm-img2.akamaized.net/i/u/64s/8db108e9a2725ed009adc262886b5b14.png"
  }
];

var stream;
var StreamBar = React.createClass({
  getInitialState: function() {
    return {playing: false, expanded: false};
  },
  componentDidMount: function() {
    stream = document.getElementById('stream');
    if (!isMobile.any()) {
      stream.setAttribute('preload', 'auto');
    }
  },
  togglePlay: function() {
    if (this.state.playing) {
      // pause
      stream.pause();
      if (isMobile.any()) {
        stream.src = "";
      }
      this.setState({playing: false});
    } else {
      // play
      if (isMobile.any()) {
        stream.src = "http://stream.uclaradio.com:8000/listen";
        stream.load();
      }
      stream.play();
      this.setState({playing: true});
    }
  },
  toggleExpanded: function() {
    this.setState({expanded: !this.state.expanded});
  },
  render: function() {
    return (
      <div className="streamBar">
        <Grid>
          <RecentlyPlayed expanded={this.state.expanded} />

          <div className="streamContent">
            <div onClick={this.toggleExpanded}>
              <span className="expandAction">{this.state.expanded ? "HIDE RECENT TRACKS" : "SHOW RECENT TRACKS"}</span>
            </div>
            <div onClick={this.togglePlay} className="playToggle">
              <span className="playButton"><Glyphicon glyph={this.state.playing ? "pause" : "play"} /></span>
              <span className="playText">
                LIVE STREAM: Opposites Attract
              </span>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
});

var RecentlyPlayed = React.createClass({
  getInitialState: function() {
    return {recentTracks: sampleTracks, mounted: false};
  },
  componentDidMount: function() {
    this.setState({mounted: true})
  },
  render: function() {
    return (
      <div className="recentlyPlayed">

        <Collapse in={this.props.expanded || !this.state.mounted}>
        <div className="recentContent">
        <Slider arrows dots
          slidesToShow={5}
          responsive={[
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 992, settings: { slidesToShow: 4 } } ]}>
          { this.state.recentTracks.map(function(track) {
              return (
                <div className="trackInfo" key={track.artist+track.name}>
                  <img src={track.image} />
                  <div>{track.name}</div>
                </div>
              );
            })
          }
        </Slider>
        </div>
        </Collapse>
      </div>
    );
  }
})

/** Helper functions **/

var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

module.exports = StreamBar;
