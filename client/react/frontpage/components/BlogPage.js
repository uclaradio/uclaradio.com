// BlogPage.js
// Blog page

import React from 'react';
import { Link } from 'react-router';
import Loader from './Loader';
/**
Page content for all blog posts. 
Displays shortened descriptions for each post
* */

const keystoneAPI = '/getBlogPosts';
const keystoneURL = 'http://localhost:3010';

const BlogPage = React.createClass({
  getInitialState: function() {
    return { posts: [], fetching: true };
  },
  componentDidMount() {
    $.get(keystoneAPI, posts => {
      this.setState({ fetching: false, posts: posts });
    });
  },
  urlFromPost(post) {
    return `/blog/${post._id}`;
  },
  renderPosts() {
    const data = Object.values(this.state.posts);
    return data.map(post => {
      const img = post.image ? post.image.filename : '';
      // Get the html for content
      function createMarkupForContent() {
        if (post.content) {
          return {
            __html: post.content,
          };
        } else {
          return;
        }
      }
      if ((post.state = 'published')) {
        return (
          <div key={post._id}>
            <Link to={this.urlFromPost(post)}>
              <h1>{post.name}</h1>
            </Link>
            <img
              alt="post image"
              style={{ width: '300px', height: '300px' }}
              src={keystoneURL + '/' + img}
            />
            <h2>Content</h2>
            <div dangerouslySetInnerHTML={createMarkupForContent()} />
          </div>
        );
      }
    });
  },
  render() {
    if (!this.state.posts) {
      return (
        <div className="blogPage">
          {this.state.fetching ? <Loader /> : 'No posts!'}
        </div>
      );
    }
    return <div className="blogPage">{this.renderPosts()}</div>;
  },
});

export default BlogPage;
