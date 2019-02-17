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
const GetMorePostsURL = '/getMoreTUMBLRPosts';

const keystoneURL = 'http://localhost:3010';

const BlogPage = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      allposts: [],
      fetching: true,
      page_number: 0,
      max_pages: 0,
      POSTS_PER_PAGE: 12,
      tumblr_offset: 0,
    };
  },
  componentDidMount() {
    $.get(BlogPostsURL, result => {
      const data = result.blog_posts;
      this.setState({
        fetching: false,
        posts: data,
        max_pages: 12,
        allposts: data,
      });
    });
  },
  fetchMorePosts() {
    console.log('here2');
    $.post(
      GetMorePostsURL,
      {
        offset: parseInt(this.state.tumblr_offset) + 24,
      },
      result => {
        console.log('hellohellohello');
        console.log(result);

        this.setState({
          tumblr_offset: result.offset,

          allposts: this.state.allposts.concat(result.tumblr_posts),
        });
      }
    );
  },

  urlFromPost(post) {
    if (post) return `/blog/${post.id}`;
  },
  getCurrentPostsOnThisPage() {
    console.log('camebackhere');

    console.log(this.state.allposts.length);

    let postsonpage = this.state.allposts.slice(
      this.state.page_number * this.state.POSTS_PER_PAGE,
      (this.state.page_number + 1) * this.state.POSTS_PER_PAGE
    );

    console.log(postsonpage.length);
    if (this.state.page_number > 0 && postsonpage.length < 12) {
      console.log('here1');
      this.fetchMorePosts();
    }
    return this.state.allposts.slice(
      this.state.page_number * this.state.POSTS_PER_PAGE,
      (this.state.page_number + 1) * this.state.POSTS_PER_PAGE
    );
  },
  handleNavbarChange(term) {
    const postsvar = this.state.allposts.filter(el => {
      var len = el.tags.length;

      if (el.tags[len - 1] === term) {
      }

      return el.tags[len - 1] === term;
    });

    console.log(postsvar);

    this.setState({
      allposts: postsvar,
    });
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
    console.log('renderPosts');
    const currentPosts = this.getCurrentPostsOnThisPage();
    return currentPosts.map(post => {
      console.log(post);
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
        {/* <FeaturedPost posts={this.state.posts} /> */}
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
