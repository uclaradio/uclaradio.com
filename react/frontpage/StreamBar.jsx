// StreamBar.jsx

var React = require('react');

// Bootstrap Elements
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

// Open-Source Components
// var Slider = require('react-slick');

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
    return {playing: false};
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
  render: function() {
    return (
      <div className="streamBar">
        <Grid>
          <Col xs={12} md={4}>
            <div onClick={this.togglePlay} className="streamContent playToggle">
              <span className="streamElement playButton"><Glyphicon glyph={this.state.playing ? "pause" : "play"} /></span>
              <span className="streamElement playText">
                LIVE STREAM: Opposites Attract
              </span>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <RecentlyPlayed />
          </Col>
        </Grid>
      </div>
    );
  }
});

var RecentlyPlayed = React.createClass({
  getInitialState: function() {
    return {expanded: false, recentTracks: sampleTracks};
  },
  toggleExpanded: function() {
    this.setState({expanded: !this.state.expanded});
  },
  currentSongInfo: function() {
    return 'Magic Potion - "Cheddar Lane"';
  },
  collapsedContent: function() {
    return (
      <div className="streamContent">
        <div className="streamElement">
            <span className="currentlyPlaying">{this.currentSongInfo()}</span>
        </div>
        <div className="streamElement" onClick={this.toggleExpanded}>
          <span className="expandAction">PLAY HISTORY</span>
        </div>
      </div>
    );
  },
  expandedContent: function() {
    return (
      <div className="streamContent">
        <div className="streamElement">
            { this.state.recentTracks.map(function(track) {
                return (
                  <div className="trackInfo">
                    <a href={track.url}>
                      <img src={track.image} />
                      <div>{track.name}</div>
                    </a>
                  </div>
                );
              })
            }
        </div>
        <div className="streamElement" onClick={this.toggleExpanded}>
          <span className="expandAction">HIDE</span>
        </div>
      </div>
    );
  },
  render: function() {
    return (
      <div className="recentlyPlayed">
        { this.state.expanded ?
          this.expandedContent()
          : 
          this.collapsedContent()
        }
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
