import React from 'react';
import { connect } from 'react-redux';
//import PodcastSearchBar from './PodcastSearchBar';
import {
  fetchTracks,
  play,
  pause,
  printStore,
  updatePlaylists,
  startFetching,
  stopFetching,
} from '../../actions/podcasts';
import PodcastPlaylist from './PodcastPlaylist';
import './PodcastPage.scss';
import Loader from '../Loader';
import FunctionalButton from './FunctionalButton';

/**
Content podcasts
Displays podcast playlists

@prop playlists: array of playlist objects
@prop fetching: currently fetching djs
@prop updatePodcasts: callback to update all listed Playlist
**/

class PodcastPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedPlaylists: this.props.playlists,
    };
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.handlePauseButtonClick = this.handlePauseButtonClick.bind(this);
    this.handlePrintButton = this.handlePrintButton.bind(this);
  }
  // Test functions here
  componentDidMount() {
    this.props.fetchTracks();
    // this.props.play('701900914')
  }

  // ARROW FUNCTIONS DONT WORK IN CLASSES
  // printhello = () => { console.log('hello') }

  getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.playlists.length !== prevState.displayedPlaylists.length) {
      //if there was a change
      return {
        displayedPlaylists: nextProps.playlists,
      };
    } else return null;
  }

  handlePlayButtonClick() {
    this.props.play('701900914');
    console.log('play button is being clicked!');
  }

  handlePauseButtonClick() {
    this.props.pause('701900914');
    console.log('pause button is being clicked');
  }

  handlePrintButton() {
    this.props.print();
  }

  render() {
    // const playlists = [];
    // const {displayedPlaylists} = this.state;
    // conso
    // //playlists to render
    // displayedPlaylists.forEach((playlist) => { playlist.push(
    //     <PodcastPlaylist
    //         title={playlist.title}
    //         tracks={playlist.tracks}
    //         imgURL={playlist.imgURL}
    //     />
    // )})
    console.log('printing from the component' + this);
    return (
      <div>
        <FunctionalButton
          handleClick={this.handlePlayButtonClick}
          button={'Play'}
        />
        <FunctionalButton
          handleClick={this.handlePauseButtonClick}
          button={'Pause'}
        />
        <FunctionalButton
          handleClick={this.handlePrintButton}
          button={'Print'}
        />
      </div>
      // <div className='podcastContainer'>
      //     <div className='searchBar'>
      //     </div>
      //     <div className='PlaylistContainer'>
      //         <h2></h2>
      //         {this.props.fetching ? <Loader /> : playlists}
      //     </div>
      // </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('Printed from PodcastPage.js');
  return {
    playlists: state.podcasts.playlists,
    fetching: state.podcasts.fetching,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchTracks: () => {
    fetchTracks(dispatch);
  },
  play: track => {
    play(dispatch, track);
  },
  pause: track => {
    pause(dispatch, track);
  },
  print: () => {
    printStore(dispatch);
  },
});

// export default PodcastPage;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastPage);
