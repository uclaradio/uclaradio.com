// ShowPage.js
// shows full description of a show

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from './Loader';
import RectImage from '../../common/RectImage';

/**
Page content for individual show
Displays full description of a show, with blurb, picture, djs.. everything

@prop show: show object
@prop fetching: currently fetching shows
@prop updateShows: callback to update all listed shows
* */
const BlogPage = React.createClass({
  componentDidMount() {
    // scroll to top of page
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  // creates readable string from DJ dictionary returned from the server

  render() {
    return <div>hello</div>;
  },
});

// set show if found

export default BlogPage;
