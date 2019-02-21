import React from 'react';
import { Grid, Glyphicon, Collapse } from 'react-bootstrap';
import Slider from 'react-slick';
import './RecentlyPlayed.scss';

const trackURL =
  'https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=uclaradio&api_key=d3e63e89b35e60885c944fe9b7341b76&limit=10&format=json';

/**
Recently played tracks collapsable slider
@prop expanded: should show recently played tracks
*/
class RecentlyPlayed extends React.Component {
  state = {
    recentTracks: [],
    mounted: false,
    prepared: false,
    hasReset: false,
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.updateRecentTracks();
    // refresh tracks every 30 seconds
    this.interval = setInterval(this.updateRecentTracks, 30 * 1000);
    this.setState({ mounted: true });
  }

  onEntered = () => {
    if (!this.state.prepared) {
      this.setState({ prepared: true });
    }
    if (this.props.reset && !this.state.hasReset) {
      this.setState({ hasReset: true });
    } else {
      document.getElementById('focusAnchor').focus();
    }
  };

  onExited = () => {
    if (this.props.reset) {
      this.props.onReset();
    }
  };

  truncateName = (name, l) => {
    return name.length > l ? `${name.substr(0, l - 2)}\u2026` : name;
  };

  updateRecentTracks = () => {
    $.ajax({
      url: trackURL,
      dataType: 'json',
      cache: false,
      success: function(rawTracks) {
        const truncateName = this.truncateName;
        let tracks = rawTracks.recenttracks.track.map(rawTrack => ({
          artist: truncateName(rawTrack.artist['#text'], 22),
          name: truncateName(rawTrack.name, 22),
          url: rawTrack.url,
          image:
            rawTrack.image[1]['#text'] != ''
              ? rawTrack.image[1]['#text']
              : '/img/no_album_artwork.jpg',
          nowPlaying: rawTrack['@attr'] != null,
        }));
        if (!tracks) {
          tracks = [];
        }
        this.setState({ recentTracks: tracks });
      }.bind(this),
      error(xhr, status, err) {
        console.error(trackURL, status, err.toString());
      },
    });
  };

  render() {
    const slideSettings = {
      infinite: false,
      arrows: true,
      slidesToShow: 5,
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 992, settings: { slidesToShow: 4 } },
      ],
    };
    return (
      <div className="recentlyPlayed">
        {!this.state.recentTracks ||
        this.state.recentTracks.length == 0 ? null : (
          <Collapse
            in={
              this.props.expanded ||
              !this.state.mounted ||
              (this.props.reset && !this.state.hasReset)
            }
            transitionAppear
            onEntered={this.onEntered}
            onExited={this.onExited}
          >
            <div className="recentContent">
              <Slider {...slideSettings}>
                {this.state.recentTracks.map((track, i) => (
                  <div
                    id={track.nowPlaying ? 'nowPlaying' : 'focusAnchor'}
                    className="trackInfo"
                    key={track.artist + track.name + i}
                  >
                    <div className="albumArt">
                      <img className="trackImage" src={track.image} />
                    </div>
                    <div className="trackName">
                      <a href={track.url} target="_blank">
                        {track.name}
                      </a>
                    </div>
                    <div className="trackArtist">
                      <a href={track.url} target="_blank">
                        {track.artist}
                      </a>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Collapse>
        )}
      </div>
    );
  }
}

export default RecentlyPlayed;
