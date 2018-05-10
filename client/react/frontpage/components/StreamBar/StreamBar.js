// StreamBar.js

import React from 'react';
import { Grid, Glyphicon, Collapse } from 'react-bootstrap';
import Slider from 'react-slick';
import ChatBox from './ChatBox/ChatBox';
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed';
import SpaceJam from './SpaceJam/SpaceJam';
import isMobile from '../misc/isMobile';
import './StreamBar.scss';

const trackURL =
  'https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=uclaradio&api_key=d3e63e89b35e60885c944fe9b7341b76&limit=10&format=json';
const streamURL = 'http://uclaradio.com:8000/;';
let stream;

/**
Black floating audio stream bar that sits at bottom of screen,
plays audio and shows recent tracks

@prop currentShowTitle: title of currently playing show, or null
*/
const StreamBar = React.createClass({
  getInitialState() {
    return {
      playing: false,
      recentExpanded: false,
      chatExpanded: false,
      hasReset: false,
    };
  },
  componentDidMount() {
    stream = document.getElementById('stream');
    if (!isMobile.any()) {
      stream.setAttribute('preload', 'auto');
    }
  },
  togglePlay() {
    if (this.state.playing) {
      // pause
      stream.pause();
      if (isMobile.any()) {
        stream.src = '';
      }
      this.setState({ playing: false });
    } else {
      // play
      if (isMobile.any()) {
        stream.src = streamURL;
        stream.load();
      }
      stream.play();
      this.setState({ playing: true });
    }
  },
  toggleRecentExpanded() {
    this.setState({
      recentExpanded: !this.state.recentExpanded,
      chatExpanded: false,
    });
  },
  togggleChatExpanded() {
    this.setState({
      chatExpanded: !this.state.chatExpanded,
      recentExpanded: false,
    });
  },
  onReset() {
    this.setState({ hasReset: true });
  },
  render() {
    return (
      <div className="streamBar">
        <Grid>
          <div>
            <Collapse
              in={this.state.chatExpanded}
              onEntering={() => {
                const objDiv = document.getElementById('chatbox');
                objDiv.scrollTop = objDiv.scrollHeight;
              }}
            >
              <div>
                <ChatBox />
              </div>
            </Collapse>
          </div>
          {/*<div
            style={this.state.hasReset ? null : { opacity: '0', height: '0' }}>
            <RecentlyPlayed
              expanded={this.state.recentExpanded}
              reset={!this.state.hasReset}
              onReset={this.onReset}
            />
          </div>
          */}
          <div className="streamContent">
            <div onClick={this.togggleChatExpanded} className="expandAction">
              <img
                className="chatIcon"
                src={
                  this.state.chatExpanded
                    ? './img/icons/chat_clicked.svg'
                    : './img/icons/chat.svg'
                }
              />
            </div>
            {/*<div onClick={this.toggleRecentExpanded}>
              <span className="expandAction">
                <img
                  className="musicIcon"
                  src={
                    this.state.recentExpanded ? (
                      './img/icons/music_clicked.svg'
                    ) : (
                      './img/icons/music.svg'
                    )
                  }
                />
              </span>
            </div>
            */}
            <div onClick={this.togglePlay} className="playToggle">
              <span className="playButton">
                <Glyphicon glyph={this.state.playing ? 'pause' : 'play'} />
              </span>
              <span className="playText">
                {this.props.currentShowTitle
                  ? `LIVE: ${this.props.currentShowTitle}`
                  : 'LIVE STREAM'}
              </span>
            </div>
          </div>
        </Grid>
        {this.state.chatExpanded ? null : <SpaceJam />}
      </div>
    );
  },
});

export default StreamBar;
