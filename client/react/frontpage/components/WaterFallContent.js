// WaterFallContent.js
// Displays social media content in a ResponsiveWaterfall

import React from 'react';
import Waterfall from './misc/ResponsiveWaterfall';
import isMobile from './misc/isMobile';
import Loader from './Loader';

// styling
import './WaterFallContent.scss';

// API urls
const SocialMediaURL = '/getSocialMedia';
const getMoreFBPostsURL = '/getMoreFBPosts';

// local vars
let waterfall;

class WaterFallContent extends React.Component {
  state = {
    socialMediaPosts: [],
    fetching: true,
  };

  componentDidMount() {
    // Get initial data
    $.get(SocialMediaURL, result => {
      this.setState(
        {
          fetching: false,
          paginatedDataInProgress: false,
          fb_pagination_until: result.fb_pagination_until,
        },
        function() {
          waterfall = new Waterfall({ minBoxWidth: 250 });
          this.appendPosts(result.social_media);
          window.addEventListener('scroll', this.handleScroll);
        }
      );
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // fetch another page of posts, display in waterfall
  fetchMorePosts = () => {
    $.post(
      getMoreFBPostsURL,
      {
        until: this.state.fb_pagination_until,
      },
      result => {
        this.setState(
          {
            fb_pagination_until: result.fb_pagination_until,
            paginatedDataInProgress: false,
          },
          function() {
            this.appendPosts(result.social_media);
          }
        );
      }
    );
  };

  // Add post objects from API to waterfall content as DOM elements
  appendPosts = newPosts => {
    newPosts.map(el => {
      const boxHandle = nodeFromPost(el);
      if (boxHandle) {
        waterfall.addBox(boxHandle);
      }
    });
  };

  handleScroll = event => {
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
  };

  mobileLoadMore = () => {
    this.setState({
      paginatedDataInProgress: true,
    });
    // request next set of Facebook posts
    this.fetchMorePosts();
  };

  render() {
    return (
      <div className="WaterFallContent">
        {this.state.fetching && <Loader />}
        <div className="wf-container" />
        {isMobile.any() && (
          <span>
            <br />
            <center>
              <button id="load_more" onClick={this.mobileLoadMore}>
                MORE
              </button>
            </center>
          </span>
        )}
      </div>
    );
  }
}

function checkSlide(elem) {
  if (elem) {
    const screenHeight =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      (document.documentElement.clientHeight || document.body.clientHeight);
    const elemCenter = elem.offsetTop + elem.offsetHeight / 2;
    return elemCenter < 1.5 * screenHeight;
  }
}

// create new DOM element from a tumblr or facebook post json object
function nodeFromPost(post) {
  const link = post.link || post.post_url;
  const picture = post.full_picture;
  const summary = post.summary || post.message || '';
  const created = formatDate(post.created_time);
  const platform = post.platform || 'FB';
  return newNode(picture, summary, created, link, platform);
}

// create new DOM element representing post with provided content
function newNode(full_picture, summary, created_time, link, platform) {
  if (!full_picture && (!summary || summary.includes('http'))) {
    return null;
  }
  const box = document.createElement('div');
  box.className = 'wf-box';
  const a = document.createElement('a');
  a.href = link;
  a.target = '_blank';
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
    case 'FB':
      box_content_text.className = 'wf-box-content-text';
      var box_content_date = document.createElement('div');
      box_content_date.className = 'wf-box-content-text-date';
      created_time = String(created_time);
      box_content_date.appendChild(document.createTextNode(created_time));
      box_content_text.appendChild(box_content_date);
      break;
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
}

function formatDate(dateString) {
  let date = String(dateString);
  date = new Date(date.substring(0, 10));
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getYear() + 1900}`;
}

export default WaterFallContent;
