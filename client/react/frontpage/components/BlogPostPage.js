// BlogPostPage.js
// shows full description of post

import React from 'react';
import Loader from './Loader';
import moment from 'moment';
import './BlogPostPage.scss';

/**
Page content for individual post
Displays full description of a post.. everything
* */

const BlogPostsURL = '/getBlogPosts';
const keystoneURL = 'http://localhost:3010';

const BlogPostPage = React.createClass({
  getInitialState: function() {
    return { fetching: true, post: null, type: '', date: '' };
  },
  componentDidMount() {
    var queryRoute = `${BlogPostsURL}/${this.props.params.blogPostID}`;
    $.get(queryRoute, post => {
      this.parseTag(post);
      this.parseDate(post);
      this.setState({ fetching: false, post: post });
    });
  },
  createMarkupForContent() {
    if (this.state.post.content) {
      return {
        __html: this.state.post.content,
      };
    } else {
      return;
    }
  },
  parseTag(post) {
    const len = post.tags.length;
    this.setState({
      type: this.tagToType(post.tags[len - 1]),
    });
  },
  parseDate(post) {
    const date = new Date(post.date);
    const momentDate = moment(date).format('MM/DD/YYYY');
    this.setState({
      date: momentDate,
    });
  },
  tagToType(tag) {
    switch (tag) {
      case 'ConcertReview':
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
  renderPost() {
    const post = this.state.post;
    var subheading;
    if (this.state.type) {
      subheading = this.state.type + ' | ' + this.state.date;
    } else {
      subheading = this.state.date;
    }
    switch (post.platform) {
      case 'KEYSTONE':
        const img = post.image ? post.image.filename : '';
        return (
          <div key={post.id}>
            <div className="coverPhoto">
              <img
                alt="post image"
                style={{ width: '300px', height: '300px' }}
                src={keystoneURL + '/' + img}
              />
            </div>
            <h1>{post.title}</h1>
            <h2>Content</h2>
            <div dangerouslySetInnerHTML={this.createMarkupForContent()} />
          </div>
        );
      case 'TUMBLR':
        return (
          <div key={post.id} className="blogPostContainer">
            <div className="subheading">{subheading}</div>
            <h1>{post.title}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={this.createMarkupForContent()}
            />
          </div>
        );
    }
  },
  render() {
    if (!this.state.post) {
      return (
        <div className="blogPostPage">
          {this.state.fetching ? <Loader /> : "This post doesn't exist!"}
        </div>
      );
    }
    return <div className="blogPostPage">{this.renderPost()}</div>;
  },
});

export default BlogPostPage;
