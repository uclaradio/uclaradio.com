// BlogPostPage.js
// shows full description of post

import React from 'react';
import Loader from './Loader';
/**
Page content for individual post
Displays full description of a post.. everything
* */

const keystoneAPI = '/getBlogPosts';
const keystoneURL = 'http://localhost:3010';

const BlogPostPage = React.createClass({
  getInitialState: function() {
    return { fetching: true, post: null };
  },
  componentDidMount() {
    var queryRoute = `${keystoneAPI}/${this.props.params.blogPostID}`;
    $.get(queryRoute, post => {
      this.setState({ fetching: false, post: post });
    });
  },
  createMarkupForContent() {
    if (this.state.post.content) {
      return {
        __html: this.state.post.content,
      };
    } else {
      return;
    }
  },
  render() {
    if (!this.state.post) {
      return (
        <div className="blogPostPage">
          {this.state.fetching ? <Loader /> : "This post doesn't exist!"}
        </div>
      );
    }
    const post = this.state.post;
    const img = post.image ? post.image.filename : '';
    return (
      <div className="blogPostPage">
        <div key={post._id}>
          <h1>{post.name}</h1>
          <img
            alt="post image"
            style={{ width: '300px', height: '300px' }}
            src={keystoneURL + '/' + img}
          />
          <h2>Content</h2>
          <div dangerouslySetInnerHTML={this.createMarkupForContent()} />
        </div>
      </div>
    );
  },
});

export default BlogPostPage;
