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
const AddPost = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      subject: '',
    };
  },

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  },
  handleSubjectChange(e) {
    this.setState({ body: e.target.value });
  },

  render() {
    return (
      <div className="col-md-5">
        <div className="form-area">
          <form role="form">
            <br styles="clear:both" />
            <div className="Unit">
              <div className="form-group">
                <input
                  type="text"
                  onChange={this.handleTitleChange}
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                />
              </div>

              <div className="form-group" id="textbox">
                <textarea
                  className="form-control"
                  onChange={this.handleSubjectChange}
                  type="textarea"
                  id="subject"
                  placeholder="Subject"
                  maxlength="2000000000"
                  rows="10"
                />
              </div>
              <div className="button-align">
                <button
                  type="button"
                  id="submit"
                  name="submit"
                  className="btn btn-primary pull-right"
                >
                  Add Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  },
});
const BlogPage = React.createClass({
  getInitialState: function() {
    return { count: 'Hello!' };
  },
  componentDidMount() {
    // scroll to top of page
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },

  handleClick(e) {
    this.setState({ count: 1 });

    console.log('hi');
  },
  // creates readable string from DJ dictionary returned from the server

  render() {
    return (
      <div>
        <button
          onClick={this.handleClick}
          type="button"
          id="submit"
          name="submit"
          className="btn btn-primary pull-right"
        >
          Create a Post
        </button>
        ,{this.state.count === 1 && <AddPost />}
      </div>
    );
  },
});

// set show if found

export default BlogPage;
