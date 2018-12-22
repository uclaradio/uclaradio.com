// BlogPostPage.js
// shows full description of post

import React from 'react';
import Loader from './Loader';
/**
Page content for individual post
Displays full description of a post.. everything
* */

const keystoneAPI = '/getArticles';
const keystoneURL = 'http://localhost:3010';

const BlogPostPage = React.createClass({
  getInitialState: function() {
    return { blogPost: null };
  },
  componentDidMount() {
    var queryRoute = `${keystoneAPI}/${this.props.params.blogPostID}`;
    $.get(queryRoute, article => {
      this.setState({ blogPost: article });
    });
  },
  createMarkupForContent() {
    if (this.state.blogPost.content) {
      return {
        __html: this.state.blogPost.content,
      };
    } else {
      return;
    }
  },
  render() {
    if (!this.state.blogPost) {
      return (
        <div className="blogPostPage">
          {this.props.fetching ? <Loader /> : "This post doesn't exist!"}
        </div>
      );
    }
    const blogPost = this.state.blogPost;
    const img = blogPost.image ? blogPost.image.filename : '';
    return (
      <div className="blogPostPage">
        <div key={blogPost._id}>
          <h1>{blogPost.name}</h1>
          <img
            alt="blog post image"
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
