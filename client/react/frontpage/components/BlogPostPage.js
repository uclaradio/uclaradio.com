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

const BlogPostPage = React.createClass({
  getInitialState: function() {
    return { fetching: true, post: null, category: '', date: '' };
  },
  componentDidMount() {
    var queryRoute = `${BlogPostsURL}/${this.props.params.blogPostID}`;
    $.get(queryRoute, post => {
      this.parseCategory(post);
      this.parseDate(post);
      this.setState({ fetching: false, post: post });
    });
  },
  parseKeystonePost(post) {
    if (post.imgs)
      for (let i = 0; i < post.imgs.length; i++) {
        post.content = post.content.replace(
          new RegExp(`/&lt;.*?Image${i}.*?&gt;/`),
          `<img class="content-img" alt="Image ${i}" src=${
            post.imgs[i].secure_url
          } />`
        );
      }
    if (post.img1) {
      post.content = post.content.replace(
        /&lt;.*?Image1.*?&gt;/,
        `<img class="content-img" alt="Image 1" src=${post.img1.secure_url} />`
      );
    }
    if (post.img2) {
      post.content = post.content.replace(
        /&lt;.*?Image2.*?&gt;/,
        `<img class="content-img" alt="Image 2" src=${post.img2.secure_url} />`
      );
    }
    if (post.img3) {
      post.content = post.content.replace(
        /&lt;.*?Image3.*?&gt;/,
        `<img class="content-img" alt="Image 3" src=${post.img3.secure_url} />`
      );
    }
    if (post.img4) {
      post.content = post.content.replace(
        /&lt;.*?Image4.*?&gt;/,
        `<img class="content-img" alt="Image 4" src=${post.img4.secure_url} />`
      );
    }
    if (post.img5) {
      post.content = post.content.replace(
        /&lt;.*?Image5.*?&gt;/,
        `<img class="content-img" alt="Image 5" src=${post.img5.secure_url} />`
      );
    }

    return post.content;
  },
  createMarkupForContent() {
    if (this.state.post.content) {
      switch (this.state.post.platform) {
        case 'KEYSTONE':
          return {
            __html: this.parseKeystonePost(this.state.post),
          };
        case 'TUMBLR':
          return {
            __html: this.state.post.content,
          };
      }
    } else {
      return;
    }
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
      this.setState({
        category: category.toUpperCase(),
      });
    }
  },
  parseDate(post) {
    const date = new Date(post.date);
    const momentDate = moment(date).format('MM/DD/YYYY');
    this.setState({
      date: momentDate,
    });
  },
  parseCredits(post) {
    var credits;
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
  },
  renderPost() {
    const post = this.state.post;
    const credits = this.parseCredits(post);
    var subheading;
    if (this.state.category) {
      subheading = this.state.category + ' | ' + this.state.date;
    } else {
      subheading = this.state.date;
    }
    switch (post.platform) {
      case 'KEYSTONE':
        var coverImageDiv;
        if (post.coverPhoto) {
          coverImageDiv = (
            <div className="coverImageContainer">
              <img
                className="coverImage"
                alt="post image"
                src={post.coverPhoto.secure_url}
              />
            </div>
          );
        }
        return (
          <div key={post.id} className="blogPostContainer">
            {coverImageDiv}
            <div className="subheading">{subheading}</div>
            <h1>{post.title}</h1>
            <div className="credits">{credits}</div>
            <div
              className="content"
              dangerouslySetInnerHTML={this.createMarkupForContent()}
            />
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
