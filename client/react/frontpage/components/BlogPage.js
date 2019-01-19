// BlogPage.js
// Blog page

import React from 'react';
import { Link } from 'react-router';
import Loader from './Loader';
/**
Page content for all blog posts. 
Displays shortened descriptions for each post
* */

const BlogPostsURL = '/getBlogPosts';

const BlogPage = React.createClass({
  getInitialState: function() {
    return { posts: [], fetching: true };
  },
  componentDidMount() {
    $.get(BlogPostsURL, result => {
      this.setState({ fetching: false, posts: result.blog_posts });
    });
  },
  urlFromPost(post) {
    return `/blog/${post.id}`;
  },
  renderPosts() {
    return this.state.posts.map(post => {
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
      return (
        <div key={post.id}>
          <Link to={this.urlFromPost(post)}>
            <h1>{post.title}</h1>
          </Link>
          <h2>Content</h2>
          <div dangerouslySetInnerHTML={createMarkupForContent()} />
        </div>
      );
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
