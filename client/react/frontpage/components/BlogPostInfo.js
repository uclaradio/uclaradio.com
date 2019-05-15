// BlogPostInfo.js

import React from 'react';
import { Link } from 'react-router';
import RectImage from '../../common/RectImage';
import './BlogPostInfo.scss';

const defaultShowPic = '/img/radio.png';
const BlogPostURL = '/getLatestBlogPost';

const BlogPostInfo = React.createClass({
  getInitialState() {
    return {
      postInfo: {},
    };
  },
  componentDidMount() {
    $.get(BlogPostURL, result => {
      const latestPost = result.post;
      this.setState({
        postInfo: latestPost,
      });
    });
  },
  urlFromPost(post) {
    if (post) {
      if (post._id) {
        console.log(post._id);
        return `/blog/${post._id}`;
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
    return (
      <div className="blogPostInfo">
        <p className="infoHeader">Latest Blog Post</p>
        <Link to={this.urlFromPost(this.state.postInfo)}>
          <div className="blogPic">
            <RectImage
              src={this.urlFromImage(this.state.postInfo) || defaultShowPic}
            />
            <div className="postDetails">
              <p className="postTitle">{this.state.postInfo.name}</p>
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
