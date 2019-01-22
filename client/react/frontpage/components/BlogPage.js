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
const keystoneURL = 'http://localhost:3010';
const getMoreTUMBLRPostsURL = '/getMoreTUMBLRPosts';

const BlogPage = React.createClass({
  getInitialState: function() {
    return { posts: [], fetching: true, tumblr_offset: 0 };
  },
  componentDidMount() {
    $.get(BlogPostsURL, result => {
      this.setState({ fetching: false, posts: result.blog_posts });
    });
  },
  urlFromPost(post) {
    return `/blog/${post.id}`;
  },
  fetchMorePosts() {
    $.post(
      getMoreTUMBLRPostsURL,
      {
        offset: parseInt(this.state.tumblr_offset) + 10,
      },
      result => {
        console.log(result.tumblr_posts);
        this.setState(
          {
            tumblr_offset: result.offset,
          },
          function() {
            // TODO: place append_posts() based on WaterFallContent.js
          }
        );
      }
    );
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
      switch (post.platform) {
        case 'KEYSTONE':
          const img = post.image ? post.image.filename : '';
          return (
            <div key={post.id}>
              <Link to={this.urlFromPost(post)}>
                <h1>{post.title}</h1>
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
        case 'TUMBLR':
          return (
            <div key={post.id}>
              <Link to={this.urlFromPost(post)}>
                <h1>{post.title}</h1>
              </Link>
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
