/**
FrontpageApp.jsx

Redux container for frontpage app.
Note: this is not the UI, but simply a redux container providing
  a store and relevant actions. See './frontpage/Frontpage.jsx' for UI.

Renders application with ReactDOM, rendering on #content element
* */

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './frontpage/reducers/';
// creates store and enables redux dev tools
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import { connect } from 'react-redux';

import {
  updateNowPlaying,
  addUpdateShow,
  updateSpotlightShow,
  fetchUpdatedShows,
} from './frontpage/actions/shows';
import Frontpage from './frontpage/Frontpage.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

const mapDispatchToProps = dispatch => ({
  updateNowPlaying: () => {
    fetchUpdatedNowPlaying(dispatch);
  },
  setSpotlightShowID: showID => {
    dispatch(updateSpotlightShow(showID));
  },
  updateShows: () => {
    fetchUpdatedShows(dispatch);
  },
});

// fetch now playing show info from server and update store
const nowPlayingURL = '/api/nowplaying';
const fetchUpdatedNowPlaying = dispatch => {
  $.ajax({
    url: nowPlayingURL,
    dataType: 'json',
    cache: false,
    success(nowPlaying) {
      if (nowPlaying.title) {
        const showID = nowPlaying.id;
        dispatch(updateNowPlaying(showID));
        dispatch(addUpdateShow(nowPlaying));
      }
    },
    error(xhr, status, err) {
      console.error(nowPlayingURL, status, err.toString());
    },
  });
};

// redux container for frontpage
const FrontpageContainer = connect(null, mapDispatchToProps)(Frontpage);

// wrap container in redux provider to provide data store
const FrontpageApp = () =>
  <Provider store={store}>
    <FrontpageContainer />
  </Provider>;

// display app
ReactDOM.render(<FrontpageApp />, document.getElementById('content'));
