// BlogPage.js
// Blog page

import React from 'react';
import { Link } from 'react-router';
import Loader from './Loader';
import Pagination from './Pagination';
import FeaturedPost from './BlogFeaturedPost';
import FilterBar from './FilterBar';
import BlogSearch from './BlogSearch';
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
      activeFilters: [],
      filteredPosts: [],
    };
  },
  componentDidMount() {
    $.get(BlogPostsURL, result => {
      const data = result.blog_posts;
      this.setState({
        fetching: false,
        max_pages: 12,
        posts: data,
        allposts: data,
        filteredPosts: data,
      });
    });
  },
  fetchMorePosts() {
    console.log('fetchMorePosts');
    $.post(
      GetMorePostsURL,
      {
        offset: parseInt(this.state.tumblr_offset) + 24,
      },
      result => {
        var combinedPosts = this.state.posts.concat(result.tumblr_posts);
        const filteredPosts = combinedPosts.filter(el => {
          var len = el.tags.length;
          return this.containsFilter(
            el.tags[len - 1],
            this.state.activeFilters
          );
        });
        this.setState({
          tumblr_offset: result.offset,
          posts: combinedPosts,
          storedposts: this.state.posts,
          filteredPosts: filteredPosts,
        });
      }
    );
  },

  urlFromPost(post) {
    if (post) return `/blog/${post.id}`;
  },
  getCurrentPostsOnThisPage() {
    console.log('camebackhere');
    console.log(this.state.page_number);
    console.log(this.state.filteredPosts.length);
    let postsonpage = this.state.filteredPosts.slice(
      this.state.page_number * this.state.POSTS_PER_PAGE,
      (this.state.page_number + 1) * this.state.POSTS_PER_PAGE
    );

    console.log(postsonpage.length);
    if (this.state.page_number > 0 && postsonpage.length < 12) {
      console.log('here1');
      this.setPageNumber(0);
    }
    return this.state.filteredPosts.slice(
      this.state.page_number * this.state.POSTS_PER_PAGE,
      (this.state.page_number + 1) * this.state.POSTS_PER_PAGE
    );
  },

  setPageNumber(pageNum) {
    this.setState({ page_number: pageNum });
    console.log(this.state.page_number);
  },
  extractFirstImg(post) {
    var el = document.createElement('html');
    el.innerHTML = post.content;
    var imgsrc = el.getElementsByTagName('img');
    if (!imgsrc[0]) {
      return 'https://pbs.twimg.com/profile_images/988328487650914306/0LQl2f3v_400x400.jpg';
    }
    return imgsrc[0].src;
  },
  containsFilter(filterName, filters) {
    var list = filters;
    for (var i = 0; i < list.length; i++) {
      if (list[i] === filterName) {
        return true;
      }
    }
    return false;
  },
  filterPosts(filters) {
    console.log('filterPosts');
    console.log(filters);
    if (filters.length == 0) {
      this.setState({
        filteredPosts: this.state.posts,
        activeFilters: [],
      });
    } else {
      const filteredPosts = this.state.posts.filter(el => {
        var len = el.tags.length;
        return this.containsFilter(el.tags[len - 1], filters);
      });
      this.setState({
        filteredPosts: filteredPosts,
        activeFilters: filters,
      });
    }
  },
  handleSearch(input) {
    console.log('in handle search' + input.target.value);
    console.log(this.state.allposts.length);
    const query = input.target.value;

    var searchQuery = input.target.value.toLowerCase();

    const searchedposts = this.state.allposts.filter(el => {
      let searchValue;

      console.log(el.title);

      if (el.title) {
        searchValue = el.title.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      }
    });

    this.setState({
      filteredPosts: searchedposts,
    });
    this.setPageNumber(0);
    console.log('here1');
  },
  renderPosts() {
    console.log('renderPosts');
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
    if (!this.state.filteredPosts) {
      return (
        <div className="blogPage">
          {this.state.fetching ? <Loader /> : 'No posts!'}
        </div>
      );
    }
    return (
      <div className="blogPage">
        {/* {<FeaturedPost posts={this.state.posts} />} */}

        <FilterBar handleFilterChange={this.filterPosts} />
        <BlogSearch onChange={this.handleSearch} />

        <div className="posts-container">{this.renderPosts()}</div>
        <Pagination
          maxPages={this.state.max_pages}
          setPageNumber={this.setPageNumber}
          pageNumber={this.state.page_number}
        />
      </div>
    );
  },
});

export default BlogPage;
