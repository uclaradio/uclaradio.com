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

    if (this.state.page_number > 0 && postsonpage.length < 12) {
      this.setPageNumber(0);
    }
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
      const filteredPosts = this.state.posts.filter(post => {
        switch (post.platform) {
          case 'KEYSTONE':
            if (post.type) {
              var filterName = this.tagToType(post.type);
              return this.containsFilter(filterName, filters);
            } else {
              return false;
            }
          case 'TUMBLR':
            var filterName = this.tagToType(post.topic);
            return this.containsFilter(filterName, filters);
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
    switch (post.platform) {
      case 'KEYSTONE':
        if (post.type) {
          return this.tagToType(post.type);
        }
      case 'TUMBLR':
        return this.tagToType(post.topic);
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
    tag = tag.toLowerCase().replace(/ /g, '');
    switch (tag) {
      case 'concertreview':
      case 'festivalreview':
      case 'showreview':
        return 'CONCERT REVIEW'; // 1
      case 'albumreview':
      case 'singlereview':
      case 'musicreview':
        return 'MUSIC REVIEW'; //2
      case 'artistinterview':
      case 'interview':
        return 'INTERVIEW'; //3
      case 'sports':
      case 'uclaradiosports':
        return 'SPORTS'; //4
      case 'uclaradionews':
      case 'news':
        return 'NEWS'; //5
      case 'filmreview':
      case 'tv':
      case 'entertainment':
        return 'ENTERTAINMENT'; //6
      case 'uclaradiocomedy':
      case 'comedy':
        return 'COMEDY'; //7
      case 'showofthemonth':
      case 'meetthedj':
        return 'FEATURED'; //8
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
          setPageNumber={this.setPageNumber}
          pageNumber={this.state.page_number}
        />
      </div>
    );
  },
});

export default BlogPage;
