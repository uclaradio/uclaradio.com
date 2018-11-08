// ShowPage.js
// shows full description of a show

import React from 'react';
import './BlogPage.scss';

const axios = require('axios');
/**
Page content for adding a blog post
Displays a button to add blog post

@prop addPost: callback to add a blog post
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
    this.setState({ content: e.target.value });
  },
  addPost() {
    console.log('BlogPage.js addPost()');
    axios
      .post('/blog/addPost', {
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
                  onChange={this.handleContentChange}
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
  },

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

export default BlogPage;
