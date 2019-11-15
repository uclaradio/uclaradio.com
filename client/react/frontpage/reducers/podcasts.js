//reducer for podcasts
const initialState = {
  playlists: [],
  fetching: false,
};

// Initialize SC Player
const SC = require('soundcloud');
SC.initialize({
  client_id: 'fm3wyeQvCi4fIiAoBCz40q9gWfzFSUZu',
});
const user_id = '65467039';

let trackPlayer;

const playTrack = track => {
  SC.stream(`/tracks/${track}`).then(player => {
    trackPlayer = player;
    player.play();
    console.log('playing from the function');
  });
};

const pauseTrack = player => {
  // SC.stream(`/tracks/${track}`)
  //   .then(player => {
  //     player.pause()
  //     console.log('pausing from the function')
  //   })
  player.pause();
  console.log('pausing from the function');
};

const fetchTracks = () => {
  SC.get(`/users/${user_id}/tracks`).then(tracks => {
    console.log(tracks[0]);
    dispatch(loadTracks(tracks));
    // dispatch(print) // test print
    // dispatch(stopFetching)
    // tracks.forEach((track) => {
    // 	console.log(track.title)
    // })
  });
};

const podcasts = (state = initialState, action) => {
  switch (action.type) {
    // case 'UPDATE_PLAYLISTS':
    //   return Object.assign({}, state, { playlists: action.playlists });
    case 'STARTED_FETCHING_PLAYLISTS':
      return Object.assign({}, state, { fetching: true });
    case 'STOPPED_FETCHING_PLAYLISTS':
      return Object.assign({}, state, { fetching: false });
    case 'LOAD_TRACKS':
      console.log(fetchTracks());
      return Object.assign({}, state, { tracks });
    case 'PRINT':
      console.log(
        'Printing tracks from state: ' + JSON.stringify(state.tracks)
      );
      return state;
    case 'PLAY_TRACK':
      playTrack(action.track);
      console.log('playing from the reducer');
      return Object.assign({}, state, { player });
    case 'PAUSE_TRACK':
      pauseTrack(action.track);
      console.log('pausing from the reducer');
    case 'SET_TRACK':
    default:
      return state;
  }
};

export default podcasts;
