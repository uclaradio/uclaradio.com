// ShowPage.js
// shows full description of a show

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from './Loader';
import RectImage from '../../common/RectImage';
const axios = require('axios');
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
      content: '',
    };
  },

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  },
  handleContentChange(e) {
    this.setState({ body: e.target.value });
  },
  addPost() {
    axios
      .post('/addPost', {
        title: this.state.title,
        content: this.state.content,
      })
      .then(function(response) {
        console.log('response from add post is ', response);
      })
      .catch(function(error) {
        console.log(error);
      });
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
                  id="content"
                  placeholder="Subject"
                  maxLength="2000000000"
                  rows="10"
                />
              </div>
              <div className="button-align">
                <button
                  type="button"
                  id="submit"
                  name="submit"
                  className="btn btn-primary pull-right"
                  onClick={this.addPost}
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
