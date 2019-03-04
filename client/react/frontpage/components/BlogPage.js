// BlogPage.js
// Blog page

import React from 'react';
import { Link } from 'react-router';
import Loader from './Loader';
import Pagination from './Pagination';
import FilterBar from './FilterBar';
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
      tumblr_offset: 0,
      activeFilters: [],
      filteredPosts: [],
      postsOnPage: 0,
    };
  },
  componentDidMount() {
    $.get(BlogPostsURL, result => {
      const data = result.blog_posts;
      const dataWithout2016 = data.filter(post => {
        var date = new Date(post.date);
        var momentDate = moment(date).format('YYYY');
        return momentDate != '2016';
      });
      this.setState({
        fetching: false,
        max_pages: data.length / this.state.POSTS_PER_PAGE,
        posts: dataWithout2016,
        filteredPosts: dataWithout2016,
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
    console.log('right here ');
  },
  increasePageNumber() {
    this.setState({ page_number: this.state.page_number + 1 });
  },
  decreasePageNumber() {
    this.setState({ page_number: this.state.page_number - 1 });
  },
  extractFirstImg(post) {
    switch (post.platform) {
      case 'KEYSTONE':
        if (post.coverImage) {
          return post.coverImage.secure_url;
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
    if (filters.length == 0) {
      this.setState({
        filteredPosts: this.state.posts,
        activeFilters: [],
      });
    } else {
      const filteredPosts = this.state.posts.filter(el => {
        if (el.tags) {
          var len = el.tags.length;
          return this.containsFilter(el.tags[len - 1], filters);
        } else {
          return false;
        }
      });
      this.setState({
        filteredPosts: filteredPosts,
        activeFilters: filters,
      });
    }
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
  parseTag(post) {
    if (post.tags) {
      const len = post.tags.length;
      return this.tagToType(post.tags[len - 1]);
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
        if (post.author != null && post.author == post.photographer) {
          credits = 'article and photographs by ' + post.author;
        } else if (post.author && post.photographer == null) {
          credits = 'article by ' + post.author;
        } else if (post.author && post.photographer) {
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
          if (italics[0].innerHTML.length > 'written by'.length)
            return italics[0].innerHTML;
        }
    }
  },
  tagToType(tag) {
    switch (tag) {
      case 'ConcertReview':
      case 'ShowReview':
        return 'CONCERT REVIEW';
      case 'ArtistInterview':
        return 'ARTIST INTERVIEW';
      case 'Sports':
        return 'SPORTS';
      case 'FestivalReview':
        return 'FESTIVAL REVIEW';
      case 'Other':
        return 'UCLA RADIO';
    }
  },
  renderPosts() {
    const currentPosts = this.getCurrentPostsOnThisPage();
    return currentPosts.map(post => {
      const imgURL = this.extractFirstImg(post);
      const credits = this.parseCredits(post);
      const type = this.parseTag(post);
      const date = this.parseDate(post);
      var subheading;
      if (type) {
        subheading = type + ' | ' + date;
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
        <div className="filterHeading">Filters</div>
        <div className="blogNavbar">
          <FilterBar handleFilterChange={this.filterPosts} />
          <BlogSearch onChange={this.handleSearch} />
        </div>
        <div className="postsContainer">{this.renderPosts()}</div>
        <Pagination
          maxPages={this.state.max_pages}
          increasePageNumber={this.increasePageNumber}
          decreasePageNumber={this.decreasePageNumber}
          pageNumber={this.state.page_number}
          postNumber={this.state.filteredPosts.length}
        />
      </div>
    );
  },
});

export default BlogPage;
