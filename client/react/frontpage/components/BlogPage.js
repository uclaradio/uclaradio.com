// BlogPage.js
// Blog page

import React from 'react';
import { Link } from 'react-router';
import Loader from './Loader';
import Pagination from './Pagination';
import FeaturedPost from './BlogFeaturedPost';
import NavBar from './BlogNavBar';
import './BlogPage.scss';

/**
Page content for all blog posts. 
Displays shortened descriptions for each post
* */

const BlogPostsURL = '/getBlogPosts';
const keystoneURL = 'http://localhost:3010';

const BlogPage = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      fetching: true,
      page_number: 0,
      max_pages: 0,
      POSTS_PER_PAGE: 12,
    };
  },
  componentDidMount() {
    $.get(BlogPostsURL, result => {
      const data = result.blog_posts;
      this.setState({
        fetching: false,
        posts: data,
        max_pages: Math.ceil(data.length / this.state.POSTS_PER_PAGE) - 1,
      });
    });
  },
  urlFromPost(post) {
    if (post) return `/blog/${post.id}`;
  },
  getCurrentPostsOnThisPage() {
    return this.state.posts.slice(
      this.state.page_number * this.state.POSTS_PER_PAGE,
      (this.state.page_number + 1) * this.state.POSTS_PER_PAGE
    );
  },
  handleNavbarChange(term) {
    console.log(haha);
  },

  setPageNumber(pageNum) {
    this.setState({ page_number: pageNum });
  },
  extractFirstImg(post) {
    var el = document.createElement('html');
    el.innerHTML = post.body;
    var imgsrc = el.getElementsByTagName('img');
    if (!imgsrc[0]) {
      return 'https://pbs.twimg.com/profile_images/988328487650914306/0LQl2f3v_400x400.jpg';
    }
    return imgsrc[0].src;
  },
  renderPosts() {
    const currentPosts = this.getCurrentPostsOnThisPage();
    return currentPosts.map(post => {
      switch (post.platform) {
        case 'KEYSTONE':
          const img = post.image ? post.image.filename : '';
          return (
            <div className="post-wrapper" key={post.id}>
              <Link to={this.urlFromPost(post)}>
                <img
                  alt="post image"
                  style={{ width: '300px', height: '300px' }}
                  src={keystoneURL + '/' + img}
                />
                <div>{post.title}</div>
              </Link>
            </div>
          );
        case 'TUMBLR':
          const imgURL = this.extractFirstImg(post);
          return (
            <div className="post-wrapper" key={post.id}>
              <Link to={this.urlFromPost(post)}>
                <div>
                  <img src={imgURL} />
                  <div>{post.title}</div>
                </div>
              </Link>
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
    return (
      <div className="blogPage">
        <FeaturedPost posts={this.state.posts} />
        <div>
          <NavBar function={this.handleNavbarChange} />{' '}
        </div>
        <div className="posts-container">{this.renderPosts()}</div>
        <Pagination
          maxPages={this.state.max_pages}
          setPageNumber={this.setPageNumber}
        />
      </div>
    );
  },
});

export default BlogPage;
