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
  console.log('start fetching');
  dispatch(startFetching);
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
  });
};
