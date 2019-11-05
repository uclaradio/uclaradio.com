//podcasts.js
//action creators

export const updatePlaylists = playlists => ({
  type: 'UPDATE_PLAYLISTS',
  playlists,
});

export const startFetching = () => ({
  type: 'STARTED_FETCHING_PLAYLISTS',
});

export const stopFetching = () => ({
  type: 'STOPPED_FETCHING_PLAYLISTS',
});

const user_id = '65467039';

export const fetchPlaylists = dispatch => {
  var newPlaylists = [];

  var SC = require('soundcloud');
  SC.initialize({
    client_id: 'fm3wyeQvCi4fIiAoBCz40q9gWfzFSUZu',
  });

  SC.get('/users/65467039/tracks')
    .then(function(tracks) {
      alert('Latest track: ' + tracks[0].title);
    })
    .then(_ => {
      return SC.get(`/users/65467039/playlists`);
    })
    .then(_ => {
      return dispatch(startFetching);
    })
    .then((err, playlists) => {
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
      }
    })
    .then(_ => {
      dispatch(updatePlaylists(newPlaylists)); //update the playlists
      dispatch(stopFetching);
      console.log('stopped fetching');
    })
    .catch(err => {
      console.log(err);
    });
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
