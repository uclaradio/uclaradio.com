// StreamBar.jsx

var React = require('react');

// Bootstrap Elements
var Grid = require('react-bootstrap').Grid;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Collapse = require('react-bootstrap').Collapse;

// Open-Source Components
var Slider = require('react-slick');

var trackURL = "https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=uclaradio&api_key=d3e63e89b35e60885c944fe9b7341b76&limit=10&format=json";
var streamURL = "http://stream.uclaradio.com:8000/listen";

var stream;

/**
Black floating audio stream bar that sits at bottom of screen,
plays audio and shows recent tracks

@prop currentShowTitle: title of currently playing show, or null
*/
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
        stream.src = streamURL;
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
                { this.props.currentShowTitle ? "LIVE STREAM: " + this.props.currentShowTitle : "LIVE STREAM" }
              </span>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
});

/**
Recently played tracks collapsable slider
@prop expanded: should show recently played tracks
*/
var RecentlyPlayed = React.createClass({
  getInitialState: function() {
    return {recentTracks: [], mounted: false, prepared: false};
  },
  componentDidMount: function() {
    this.setState({mounted: true})
    this.updateRecentTracks();
  },
  onEntered: function() {
    if (!this.state.prepared) {
      this.setState({prepared: true});
    }
  },
  truncateName: function(name, l) {
    return name.length > l ? name.substr(0,l-2) + "\u2026" : name;
  },
  updateRecentTracks: function() {
    $.ajax({
      url: trackURL,
      dataType: 'json',
      cache: false,
      success: function(rawTracks) {
        console.log(rawTracks);
        InteractionManager.runAfterInteractions(function() {
        var truncateName = this.truncateName;
        var tracks = rawTracks.recenttracks.track.map(function(rawTrack) {
          return {
            "artist": truncateName(rawTrack.artist["#text"], 22),
            "name": truncateName(rawTrack.name, 22),
            "url": rawTrack.url,
            "image": rawTrack.image[1]["#text"] != "" ? rawTrack.image[1]["#text"] : "/img/no_album_artwork.jpg"
          };
        })
        });
        if (!tracks) {
          tracks = [];
        }
        this.setState({recentTracks: tracks});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(trackURL, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="recentlyPlayed">
        { (!this.state.recentTracks || this.state.recentTracks.length == 0) ? null :
        <Collapse in={this.props.expanded || !this.state.mounted}
          style={this.state.prepared ? null : {display: "none"}}
          onEntered={this.onEntered}>
        <div className="recentContent">
        <Slider arrows infinite={false}
          slidesToShow={5}
          responsive={[
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 992, settings: { slidesToShow: 4 } } ]}>
          { this.state.recentTracks.map(function(track, i) {
              return (
                <div className="trackInfo" key={track.artist+track.name+i}>
                  <img className="trackImage" src={track.image} />
                  <div className="trackName">{track.name}</div>
                  <div className="trackArtist">{track.artist}</div>
                </div>
              );
            })
          }
        </Slider>
        </div>
        </Collapse>
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
