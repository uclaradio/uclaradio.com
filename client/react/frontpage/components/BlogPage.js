// ShowPage.js
// shows full description of a show

import React from 'react';
/**
Page content for individual show
Displays full description of a show, with blurb, picture, djs.. everything

@prop fetching: currently fetching shows
* */

const keystoneAPI = '/getArticles';
const keystoneURL = 'http://localhost:3010/';

const BlogPage = React.createClass({
  getInitialState: function() {
    return { blogPosts: [] };
  },
  componentDidMount() {
    $.get(keystoneAPI, articles => {
      this.setState({ blogPosts: articles });
    });
  },
  renderArticles() {
    const data = Object.values(this.state.blogPosts);
    return data.map(article => {
      console.log('article');
      console.log(article);
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
            <h1>{article.name}</h1>
            <img
              style={{ width: '300px', height: '300px' }}
              src={keystoneURL + img}
            />
            <h2>Content</h2>
            <div dangerouslySetInnerHTML={createMarkupForContent()} />
          </div>
        );
      }
    });
  },
  render() {
    if (this.state.blogPosts) {
      return <div>{this.renderArticles()}</div>;
    }
    return <div>Loading</div>;
  },
});

export default BlogPage;
