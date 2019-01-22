// BlogPage.js
// Blog page

import React from 'react';
import { Link } from 'react-router';
import Loader from './Loader';
import Waterfall from './misc/ResponsiveWaterfall';
import isMobile from './misc/isMobile';
import FeaturedPost from './BlogFeaturedPost';
import NavBar from './BlogNavBar';

import Slider from 'react-slick';
import RectImage from '../../common/RectImage';
import './PromoBanner.scss';

/**
Page content for all blog posts. 
Displays shortened descriptions for each post
* */

const BlogPostsURL = '/getBlogPosts';
const keystoneURL = 'http://localhost:3010';
const getMoreTUMBLRPostsURL = '/getMoreTUMBLRPosts';

let waterfall;
import './WaterFallContent.scss';

const BlogPage = React.createClass({
  getInitialState: function() {
    return { posts: [], fetching: true, postNo: 0, tumblr_offset: 0 };
  },
  componentDidMount() {
    $.get(BlogPostsURL, result => {
      this.setState(
        {
          fetching: false,
          posts: result.blog_posts,
        },
        function() {
          waterfall = new Waterfall({ minBoxWidth: 250 });
          this.appendPosts(result.blog_posts);
          window.addEventListener('scroll', this.handleScroll);
        }
      );
    });
  },
  componentDidUpdate(prevProps, prevState) {
    if (prevState.posts[0] && prevState.posts !== this.state.posts) {
      waterfall = new Waterfall({ minBoxWidth: 250 });

      this.appendPosts(this.state.posts);
      console.log('here part2');
      console.log(this.state.posts);
    }
  },

  componentWillUnmount() {},
  urlFromPost(post) {
    if (!post) console.log('lmao never post');
    return `/blog/${post.id}`;
  },
  appendPosts(newPosts) {
    newPosts.map(el => {
      const boxHandle = this.nodeFromPost(el);

      if (boxHandle) {
        <Link to={this.urlFromPost(el)}>{waterfall.addBox(boxHandle)}</Link>;
      }
    });
  },

  handleScroll(event) {
    const i = waterfall.getHighestIndex();
    if (i > -1) {
      // get last box of the column
      const lastBox = Array.prototype.slice.call(
        waterfall.columns[i].children,
        -1
      )[0];
      if (checkSlide(lastBox) && !isMobile.any()) {
        if (this.state.paginatedDataInProgress == false) {
          // locking mechanism so scrolling won't cause an infinite amt of requests
          this.setState({
            paginatedDataInProgress: true,
          });
          // request next set of Facebook posts
          this.fetchMorePosts();
        }
      }
    }
  },

  handleNavbarChange(term) {
    const postsvar = this.state.posts.filter(el => {
      var len = el.tags.length;

      if (el.tags[len - 1] === term) {
      }

      return el.tags[len - 1] === term;
    });

    console.log(postsvar);

    this.setState({
      posts: postsvar,
    });
  },

  fetchMorePosts() {
    $.post(
      getMoreTUMBLRPostsURL,
      {
        offset: parseInt(this.state.tumblr_offset) + 10,
      },
      result => {
        console.log(result.tumblr_posts);
        this.setState(
          {
            tumblr_offset: result.offset,
            paginatedDataInProgress: false,
          },
          function() {
            this.appendPosts(result.tumblr_posts);
            // TODO: place append_posts() based on WaterFallContent.js
          }
        );
      }
    );
  },

  nodeFromPost(post) {
    var el = document.createElement('html');
    el.innerHTML = post.body;
    var imgsrc = el.getElementsByTagName('img');
    var imgsrc2;

    if (imgsrc[0]) {
      imgsrc2 = imgsrc[0].src;
    } else {
      imgsrc2 =
        'https://pbs.twimg.com/profile_images/988328487650914306/0LQl2f3v_400x400.jpg';
    }
    const link = this.urlFromPost(post);
    const picture = imgsrc2;
    const summary = post.summary || post.message || '';
    const platform = post.platform || 'FB';
    return this.newNode(picture, summary, link, platform, post);
  },

  // create new DOM element representing post with provided content
  newNode(full_picture, summary, created_time, link, platform, post) {
    if (!full_picture && (!summary || summary.includes('http'))) {
      return null;
    }
    const box = document.createElement('div');
    box.className = 'wf-box';
    const a = document.createElement('a');

    const box_content = document.createElement('div');
    box_content.className = 'wf-box-content';
    if (full_picture) {
      const image = document.createElement('img');
      image.src = full_picture;
      box_content.appendChild(image);

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      box_content.appendChild(overlay);
    }
    const box_content_text = document.createElement('div');
    switch (platform) {
      case 'TUMBLR':
        box_content_text.className = 'wf-box-content-blog';
        break;
    }
    box_content_text.appendChild(document.createTextNode(summary));
    summary = String(summary);
    if (!summary.includes('http') && !summary.includes('undefined')) {
      box_content.appendChild(box_content_text);
    }
    a.appendChild(box_content);
    box.appendChild(a);

    return box;
  },

  renderPosts() {
    return this.state.posts.map(post => {
      // Get the html for content
      switch (post.platform) {
        case 'KEYSTONE':
          const img = post.image ? post.image.filename : '';
          return (
            <div key={post.id}>
              <Link to={this.urlFromPost(post)}>
                <h1>{post.title}</h1>
              </Link>
              <img
                alt="post image"
                style={{ width: '300px', height: '300px' }}
                src={keystoneURL + '/' + img}
              />
            </div>
          );
        case 'TUMBLR':
          return (
            <div className="tumblrpost" key={post.id}>
              <Link to={this.urlFromPost(post)}>
                <div>{post.title}</div>
              </Link>
            </div>
          );
      }
    });
  },

  render() {
    // <Link> component is unable to link to external links
    // Currently doing an inline conditional via a ternary
    // The self variable is be declared as 'this' is function scoped
    // An alternative solution would be to use ES6 arrow functions

    // if (this.state.posts) {
    //   console.log("exists")
    // }
    // else {
    //   console.log("doesnt exist")
    // }

    return (
      <div>
        <FeaturedPost posts={this.state.posts} />

        <div>
          {' '}
          <NavBar function={this.handleNavbarChange} />{' '}
        </div>
        {
          <div className="WaterFallContent">
            {this.state.fetching && <Loader />}
            <div className="wf-container" />
            {isMobile.any() && (
              <span>
                <br />
                <center>
                  <button>MORE</button>
                </center>
              </span>
            )}
          </div>
        }
        <button onClick={this.fetchMorePosts}>fetch more posts</button>
      </div>
    );
  },
});

export default BlogPage;
