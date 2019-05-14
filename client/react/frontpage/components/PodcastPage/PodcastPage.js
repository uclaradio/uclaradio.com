import React from 'react';
import { connect } from 'react-redux';
//import PodcastSearchBar from './PodcastSearchBar';
import {
  fetchPlaylists,
  updatePlaylists,
  startFetching,
  stopFetching,
} from '../../actions/podcasts';
import PodcastPlaylist from './PodcastPlaylist';
import './PodcastPage.scss';

import Loader from '../Loader';

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
  }
  componentDidMount() {
    this.props.updatePlaylists();
  }

  getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.playlists.length !== prevState.displayedPlaylists.length) {
      //if there was a change
      return {
        displayedPlaylists: nextProps.playlists,
      };
    } else return null;
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

    return (
      <div />
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
  console.log('6');
  return {
    playlists: state.podcasts.playlists,
    fetching: state.podcasts.fetching,
  };
};

const mapDispatchToProps = dispatch => ({
  updatePlaylists: () => {
    fetchPlaylists(dispatch);
  },
});

// export default PodcastPage;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastPage);
