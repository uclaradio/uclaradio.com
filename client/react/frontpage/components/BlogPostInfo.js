// BlogPostInfo.js

import React from 'react';
import { Link } from 'react-router';
import RectImage from '../../common/RectImage';
import './BlogPostInfo.scss';

const defaultShowPic = '/img/radio.png';
const BlogPostURL = '/getBlogPosts';

const BlogPostInfo = React.createClass({
  getInitialState() {
    return {
      postInfo: {},
      fetching: true,
    };
  },
  componentDidMount() {
    $.get(BlogPostURL, result => {
      const latestPost = result.blog_posts[0];
      this.setState({
        postInfo: latestPost,
        fetching: false,
      });
    });
  },
  urlFromPost(post) {
    if (post) {
      if (post.id) {
        console.log(post.id);
        return `/blog/${post.id}`;
      }
    }
    return null;
  },
  urlFromImage(post) {
    if (post) {
      if (post.coverPhoto) {
        return post.coverPhoto.secure_url;
      } else if (post.img1) {
        return post.img1.secure_url;
      }
    }
    return null;
  },
  render() {
    if (this.state.fetching) {
      return <p />;
    }
    return (
      <div className="blogPostInfo">
        <p className="infoHeader">Latest Blog Post</p>
        <Link to={this.urlFromPost(this.state.postInfo)}>
          <div className="blogPic">
            <RectImage
              src={this.urlFromImage(this.state.postInfo) || defaultShowPic}
            />
            <div className="postDetails">
              <p className="postTitle">{this.state.postInfo.title || ''}</p>
              <p className="postAuthor">
                by {this.state.postInfo.author || ''}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  },
});

export default BlogPostInfo;
