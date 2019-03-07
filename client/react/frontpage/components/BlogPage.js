// BlogPage.js
// Blog page

import React from 'react';
import { Link } from 'react-router';
import Loader from './Loader';
import Pagination from './Pagination';
import BlogFilterBar from './BlogFilterBar';
import BlogSearch from './BlogSearch';
import moment from 'moment';
import './BlogPage.scss';

/**
Page content for all blog posts.
Displays shortened descriptions for each post
* */

const BlogPostsURL = '/getBlogPosts';

const BlogPage = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      fetching: true,
      page_number: 0,
      max_pages: 0,
      POSTS_PER_PAGE: 12,
      activeFilters: [],
      filteredPosts: [],
    };
  },
  componentDidMount() {
    $.get(BlogPostsURL, result => {
      const data = result.blog_posts;
      this.setState({
        fetching: false,
        max_pages: data.length / this.state.POSTS_PER_PAGE,
        posts: data,
        filteredPosts: data,
      });
    });
  },
  urlFromPost(post) {
    if (post) return `/blog/${post.id}`;
  },
  getCurrentPostsOnThisPage() {
    let postsonpage = this.state.filteredPosts.slice(
      this.state.page_number * this.state.POSTS_PER_PAGE,
      (this.state.page_number + 1) * this.state.POSTS_PER_PAGE
    );

    return this.state.filteredPosts.slice(
      this.state.page_number * this.state.POSTS_PER_PAGE,
      (this.state.page_number + 1) * this.state.POSTS_PER_PAGE
    );
  },
  setPageNumber(pageNum) {
    this.setState({ page_number: pageNum });
  },
  extractFirstImg(post) {
    switch (post.platform) {
      case 'KEYSTONE':
        if (post.coverPhoto) {
          return post.coverPhoto.secure_url;
        } else if (post.img1) {
          return post.img1.secure_url;
        }
      case 'TUMBLR':
        var el = document.createElement('html');
        el.innerHTML = post.content;
        var imgsrc = el.getElementsByTagName('img');
        if (imgsrc[0]) {
          return imgsrc[0].src;
        }
      default:
        return 'https://pbs.twimg.com/profile_images/988328487650914306/0LQl2f3v_400x400.jpg';
    }
  },
  containsArrayElement(element, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return true;
      }
    }
    return false;
  },
  filterPosts(filters) {
    if (filters.length == 0) {
      this.setState({
        filteredPosts: this.state.posts,
        activeFilters: [],
      });
    } else {
      const filteredPosts = this.state.posts.filter(post => {
        if (post.category) {
          return this.containsArrayElement(post.category, filters);
        } else {
          return false;
        }
      });
      this.setState({
        filteredPosts: filteredPosts,
        activeFilters: filters,
      });
    }
    this.setPageNumber(0);
  },
  handleSearch(input) {
    var searchQuery = input.target.value.toLowerCase();
    const searchedposts = this.state.posts.filter(el => {
      let searchValue;
      if (el.title) {
        searchValue = el.title.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      }
    });

    this.setState({
      filteredPosts: searchedposts,
    });
    this.setPageNumber(0);
  },
  authorExists(post) {
    return post.author && post.author != '';
  },
  photographerExists(post) {
    return post.photographer && post.photographer != '';
  },
  parseCategory(post) {
    var category = post.category;
    if (category && category != 'None' && category != 'Invalid Tag') {
      return category.toUpperCase();
    }
  },
  parseDate(post) {
    const date = new Date(post.date);
    const momentDate = moment(date).format('MM/DD/YYYY');
    return momentDate;
  },
  parseCredits(post) {
    var credits;
    switch (post.platform) {
      case 'KEYSTONE':
        var authorExists = this.authorExists(post);
        var photographerExists = this.photographerExists(post);

        if (authorExists && post.author == post.photographer) {
          credits = 'article and photographs by ' + post.author;
        } else if (authorExists && !photographerExists) {
          credits = 'article by ' + post.author;
        } else if (authorExists && photographerExists) {
          credits =
            'article by ' +
            post.author +
            ' and photographs by ' +
            post.photographer;
        }
        return credits;
      case 'TUMBLR':
        var wrapper = document.createElement('div');
        wrapper.innerHTML = post.content;
        var div = wrapper.firstChild;
        const italics = div.getElementsByTagName('i');
        if (italics.length >= 1) {
          if (italics[0].innerHTML.length > 'written by'.length) {
            return italics[0].textContent;
          }
        }
    }
  },
  renderPosts() {
    const currentPosts = this.getCurrentPostsOnThisPage();
    return currentPosts.map(post => {
      const imgURL = this.extractFirstImg(post);
      const credits = this.parseCredits(post);
      const category = this.parseCategory(post);
      const date = this.parseDate(post);
      var subheading;
      if (category) {
        subheading = category + ' | ' + date;
      } else {
        subheading = date;
      }
      return (
        <div className="postWrapper" key={post.id}>
          <Link to={this.urlFromPost(post)}>
            <div className="imageContainer">
              <img alt="cover photo" src={imgURL} className="postImage" />
            </div>
            <div className="textContainer">
              <div className="subheading">{subheading}</div>
              <div className="title">{post.title}</div>
              <div className="credits">{credits}</div>
            </div>
          </Link>
        </div>
      );
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
        <div className="blogHeading">
          Welcome to the new blog! If you're feeling nostalgic, you can still
          checkout our <a href="http://blog.uclaradio.com">old blog</a>.
        </div>
        <div className="blogNavbar">
          <BlogFilterBar handleFilterChange={this.filterPosts} />
          <BlogSearch onChange={this.handleSearch} />
        </div>
        <div className="postsContainer">{this.renderPosts()}</div>
        <Pagination
          maxPages={this.state.max_pages}
          setPageNumber={this.setPageNumber}
          pageNumber={this.state.page_number}
          numberOfPosts={this.state.filteredPosts.length}
        />
      </div>
    );
  },
});

export default BlogPage;
