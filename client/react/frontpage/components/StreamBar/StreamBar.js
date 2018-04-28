// StreamBar.js

import React from 'react';
import { Grid, Glyphicon, Collapse } from 'react-bootstrap';
import Slider from 'react-slick';
import ChatBox from './ChatBox/ChatBox';
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed';
import isMobile from '../misc/isMobile';
import VolumeSlider from 'rc-slider';
import './StreamBar.scss';
import 'rc-slider/assets/index.css';

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
      showVolumeSlider: false,
    };
  },
  componentDidMount() {
    stream = document.getElementById('stream');
    if (!isMobile.any()) {
      stream.setAttribute('preload', 'auto');
    }
  },
  toggleShowVolumeSlider() {
    this.setState({ showVolumeSlider: !this.state.showVolumeSlider });
  },
  setVolume(volume) {
    stream.volume = volume / 100;
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
            <div className="volumeControl">
              <span
                className="volumeControlIcon"
                onClick={this.toggleShowVolumeSlider}
              >
                <Glyphicon glyph="volume-up" />
              </span>
              {(() => {
                if (!this.state.showVolumeSlider) {
                  return null;
                }

                return (
                  <div className="volumeSlider">
                    <VolumeSlider
                      step={1}
                      vertical={true}
                      included={true}
                      onChange={this.setVolume}
                      defaultValue={stream.volume * 100}
                      railStyle={{
                        backgroundColor: 'white',
                        borderRadius: 0,
                      }}
                      handleStyle={{
                        border: 'solid 0.5px grey',
                      }}
                      trackStyle={{
                        backgroundColor: '#ffccff',
                      }}
                    />
                  </div>
                );
              })()}
            </div>
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
      </div>
    );
  },
});

export default StreamBar;
