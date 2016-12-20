// StreamBar.jsx

var React = require('react');
var ChatBox = require('./ChatBox.jsx');

// Bootstrap Elements
var Grid = require('react-bootstrap').Grid;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Collapse = require('react-bootstrap').Collapse;

// Open-Source Components
var Slider = require('react-slick');

var trackURL = "https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=uclaradio&api_key=d3e63e89b35e60885c944fe9b7341b76&limit=10&format=json";
var streamURL = "http://uclaradio.com:8000/;";

var stream;

/**
Black floating audio stream bar that sits at bottom of screen,
plays audio and shows recent tracks

@prop currentShowTitle: title of currently playing show, or null
*/
var StreamBar = React.createClass({
  getInitialState: function() {
    return {
      playing: false,
      expanded: false,
      chatForm: false,
      hasReset: false
    };
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
  togggleChatForm: function() {
    this.setState({chatForm: !this.state.chatForm});
  },
  onReset: function() {
    this.setState({hasReset: true});
  },
  render: function() {
    return (
      <div className="streamBar">
        <Collapse in={this.state.chatForm}>
          <div className='chat-box-wrapper'>
            <ChatBox />
          </div>
        </Collapse>
        <Grid>
          <div style={this.state.hasReset ? null : {opacity: "0", height: "0"}}>
            <RecentlyPlayed expanded={this.state.expanded}
              reset={!this.state.hasReset} onReset={this.onReset} />
          </div>
          <div className="streamContent">
            <div onClick={this.togggleChatForm} className="expandAction">
                <img className="chatIcon" src={this.state.chatForm ? "./img/icons/chat_clicked.svg" : "./img/icons/chat.svg"} />
            </div>
            <div onClick={this.toggleExpanded}>
              <span className="expandAction">
                <img className="musicIcon" src={this.state.expanded ? "./img/icons/music_clicked.svg" : "./img/icons/music.svg"} />
              </span>
            </div>
            <div onClick={this.togglePlay} className="playToggle">
              <span className="playButton"><Glyphicon glyph={this.state.playing ? "pause" : "play"} /></span>
              <span className="playText">
                { this.props.currentShowTitle ? "LIVE: " + this.props.currentShowTitle : "LIVE STREAM" }
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
    return {
      recentTracks: [],
      mounted: false,
      prepared: false,
      hasReset: false
    };
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  componentDidMount: function() {
    this.updateRecentTracks();
    // refresh tracks every 30 seconds
    this.interval = setInterval(this.updateRecentTracks, 30*1000);
    this.setState({mounted: true})
  },
  onEntered: function() {
    if (!this.state.prepared) {
      this.setState({prepared: true});
    }
    if (this.props.reset && !this.state.hasReset) {
      this.setState({hasReset: true});
    }
    document.getElementsByClassName("trackInfo").focus();
  },
  onExited: function() {
    if (this.props.reset) {
      this.props.onReset();
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
        var truncateName = this.truncateName;
        var tracks = rawTracks.recenttracks.track.map(function(rawTrack) {
          return {
            "artist": truncateName(rawTrack.artist["#text"], 22),
            "name": truncateName(rawTrack.name, 22),
            "url": rawTrack.url,
            "image": rawTrack.image[1]["#text"] != "" ? rawTrack.image[1]["#text"] : "/img/no_album_artwork.jpg",
            "nowPlaying": rawTrack["@attr"] != null
          };
        });
        console.log(tracks);
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
        <Collapse in={this.props.expanded || !this.state.mounted || (this.props.reset && !this.state.hasReset)}
          transitionAppear
          onEntered={this.onEntered} onExited={this.onExited}>
        <div className="recentContent">
        <Slider arrows infinite={false}
          slidesToShow={5}
          responsive={[
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 992, settings: { slidesToShow: 4 } } ]}>
          { this.state.recentTracks.map(function(track, i) {
              return (
                <div id={ track.nowPlaying ? "nowPlaying":""} className="trackInfo" key={track.artist+track.name+i}>
                    <img className="trackImage" src={track.image} />
                    <div className="trackName">
                      <a href={track.url} target="_blank">{track.name}</a>
                    </div>
                    <div className="trackArtist">
                      <a href={track.url} target="_blank">{track.artist}</a>
                    </div>
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
