//podcasts.js
//action creators

import store from '../../FrontpageApp.js';

// Initialize SC Player
const SC = require('soundcloud');
SC.initialize({
  client_id: 'fm3wyeQvCi4fIiAoBCz40q9gWfzFSUZu',
});
const user_id = '65467039';

// ACTIONS
export const updatePlaylists = playlists => ({
  type: 'UPDATE_PLAYLISTS',
  playlists,
});

export const startFetching = {
  type: 'STARTED_FETCHING_PLAYLISTS',
};

export const stopFetching = {
  type: 'STOPPED_FETCHING_PLAYLISTS',
};

const loadTracks = tracks => ({
  type: 'LOAD_TRACKS',
  tracks,
});

// TESTS
const print = {
  type: 'PRINT',
};

export const startPlaying = () => ({
  type: 'PLAY',
});

const playTrack = track => ({
  type: 'PLAY_TRACK',
  track,
});

const pauseTrack = track => ({
  type: 'PAUSE_TRACK',
  track,
});

export const printStore = dispatch => {
  dispatch(print);
};

export const play = (dispatch, track) => {
  const action = playTrack(track);
  console.log('trying to play a track with an action');
  dispatch(action);
  // const correctAction = {
  //   type: 'PLAY_TRACK',
  //   track: '701900914'
  // }
  // dispatch(correctAction)
};

export const pause = (dispatch, track) => {
  const action = pauseTrack(track);
  console.log('trying to pause a track with an action');
  dispatch(action);
  // const correctAction = {
  //   type: 'PLAY_TRACK',
  //   track: '701900914'
  // }
  // dispatch(correctAction)
};

export const fetchTracks = dispatch => {
  SC.get(`/users/${user_id}/tracks`).then(tracks => {
    console.log(tracks[0]);
    dispatch(loadTracks(tracks));
    dispatch(print); // test print
    // dispatch(stopFetching)
    // tracks.forEach((track) => {
    // 	console.log(track.title)
    // })
  });
  // dispatch(loadTracks)

  //dispatch(startFetching)

  //   SC.get(`/users/${user_id}/tracks`)
  // .then((tracks) => {
  //     console.log(tracks[0])
  //     dispatch(loadTracks(tracks))
  //     // dispatch(print)
  //     dispatch(stopFetching)
  //     // tracks.forEach((track) => {
  //     // 	console.log(track.title)
  //     // })
  //     // console.log(tracks)
  //     // play = tracks[0].uri
  //     // console.log(play)
  //     // // dispatch(log);
  //     // dispatch(startFetching);
  // })

  // SC.oEmbed('https://soundcloud.com/travisscott-2/highest-in-the-room', {
  //   auto_play: true
  // }).then(function (embed) {
  //   console.log('oEmbed response: ', embed);
  //   console.log('the streamer should be working!')
  // });

  // SC.get('/users/65467039/tracks')
  //   .then(function (tracks) {
  //     alert('Latest track: ' + tracks[0].title);
  //   })
  //   .then(_ => {
  //     console.log("hiii mom")
  //     return SC.get(`/users/65467039/playlists`);
  //   })
  //   .then(_ => {
  //     setTimeout(() => {
  //       console.log('hiiiiiiii')
  //       return dispatch(startFetching);
  //     }, 1000)
  //   })
  //   .then((err, playlists) => {
  //     console.log('fetching');
  //     console.log(playlists);
  //     if (err) alert(err);
  //     else {
  //       playlists.forEach(playlist => {
  //         newPlaylists.push({
  //           title: playlist.title,
  //           tracks: playlist.tracks,
  //         });
  //       });
  //     }
  //   })
  //   .then(_ => {
  //     dispatch(updatePlaylists(newPlaylists)); //update the playlists
  //     dispatch(stopFetching);
  //     console.log('stopped fetching');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  /*
  SC.get(`/users/65467039/playlists`, function(err, playlists) {
    
    console.log('fetching');
    console.log(playlists);
    if (err) alert(err);
    else {
      playlists.forEach(playlist => {
        newPlaylists.push({
          title: playlist.title,
          tracks: playlist.tracks,
        });
      });
      dispatch(updatePlaylists(newPlaylists)); //update the playlists
      dispatch(stopFetching);
      console.log('stopped fetching');
    }
  }).then(btggf => {
    dispatch(startFetching);
  });
  */
};
