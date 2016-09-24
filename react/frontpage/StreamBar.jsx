// StreamBar.jsx

var React = require('react');

// Bootstrap Elements
var Button = require('react-bootstrap').Button;

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
        stream.pause();
      }
      this.setState({playing: false});
    } else {
      // play
      if (isMobile.any()) {
        stream.src = "http://stream.uclaradio.com:8000/listen";
      }
      stream.play();
      this.setState({playing: true});
    }
  },
  render: function() {
    return (
      <div className="streamBar">
        <Button onClick={this.togglePlay}>{this.state.playing ? "Pause" : "Play"}</Button>
        <span style={{paddingLeft: 10}}>Now playing...</span>
      </div>
    );
  }
});

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
