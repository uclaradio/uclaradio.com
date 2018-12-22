// BlogPage.js
// Blog page

import React from 'react';
import { Link } from 'react-router';
import Loader from './Loader';
/**
Page content for all blog posts. 
Displays shortened descriptions for each post
* */

const keystoneAPI = '/getArticles';
const keystoneURL = 'http://localhost:3010';

const BlogPage = React.createClass({
  getInitialState: function() {
    return { blogPosts: [] };
  },
  componentDidMount() {
    $.get(keystoneAPI, articles => {
      this.setState({ blogPosts: articles });
    });
  },
  urlFromBlogPost(blogPost) {
    return `/blog/${blogPost._id}`;
  },
  renderArticles() {
    const data = Object.values(this.state.blogPosts);
    return data.map(article => {
      const img = article.image ? article.image.filename : '';
      // Get the html for content
      function createMarkupForContent() {
        if (article.content) {
          return {
            __html: article.content,
          };
        } else {
          return;
        }
      }
      if ((article.state = 'published')) {
        return (
          <div key={article._id}>
            <Link to={this.urlFromBlogPost(article)}>
              <h1>{article.name}</h1>
            </Link>
            <img
              alt="blog post image"
              style={{ width: '300px', height: '300px' }}
              src={keystoneURL + '/' + img}
            />
            <h2>Content</h2>
            <div dangerouslySetInnerHTML={createMarkupForContent()} />
          </div>
        );
      }
    });
  },
  render() {
    if (!this.state.blogPosts) {
      return (
        <div className="blogPage">
          {this.props.fetching ? <Loader /> : 'No blog posts!'}
        </div>
      );
    }
    return <div className="blogPage">{this.renderArticles()}</div>;
  },
});

export default BlogPage;
