// WaterFallContent.jsx
// Displays social media content in a ResponsiveWaterfall

var React = require('react');
var Dates = require('../misc/Dates.js');
var Waterfall = require('../misc/ResponsiveWaterfall.js');

// API urls
var SocialMediaURL = "/getSocialMedia";
var getMoreFBPostsURL = "/getMoreFBPosts";

// local vars
var waterfall;

var WaterFallContent = React.createClass({
  getInitialState: function() {
    return {
      socialMediaPosts: []
    };
  },
  componentDidMount: function() {
    // Get initial data
    $.get(SocialMediaURL, function (result) {
      this.setState({
        paginatedDataInProgress: false,
        fb_pagination_until:result['fb_pagination_until']
      }, function () {
        waterfall = new Waterfall({ minBoxWidth: 250 });
        this.appendPosts(result['social_media']);
        window.addEventListener('scroll', this.handleScroll);
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  // fetch another page of posts, display in waterfall
  fetchMorePosts: function() {
    $.post(getMoreFBPostsURL, {
      until: this.state.fb_pagination_until
    },function (result) {
      this.setState({
        fb_pagination_until: result['fb_pagination_until'],
        paginatedDataInProgress: false
      }, function() {
        this.appendPosts(result['social_media'])
      });
    }.bind(this));
  },
  // Add post objects from API to waterfall content as DOM elements
  appendPosts: function(newPosts) {
    newPosts.map(function(el) {
      var boxHandle = nodeFromPost(el);
      if (boxHandle) {
        waterfall.addBox(boxHandle);
      }
    });
  },
  handleScroll: function(event) {
    var i = waterfall.getHighestIndex();
    if (i > -1) {
      // get last box of the column
      var lastBox = Array.prototype.slice.call(waterfall.columns[i].children, -1)[0];
      if (checkSlide(lastBox)) {
        if (this.state.paginatedDataInProgress == false) {
          // locking mechanism so scrolling won't cause an infinite amt of requests
          this.setState({
            paginatedDataInProgress: true
          });
          // request next set of Facebook posts
          this.fetchMorePosts();
        }
      }
    }
  },
  render: function() {
    return (
      <div className='wf-container'>
      </div>
    );
  }
});

function checkSlide(elem) {
  if (elem) {
    var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop)
      + (document.documentElement.clientHeight || document.body.clientHeight);
    var elemCenter = elem.offsetTop + elem.offsetHeight / 2;
    return elemCenter < 1.5*screenHeight;
  }
}

// create new DOM element from a tumblr or facebook post json object
function nodeFromPost(post) {
  var link = post['link'] || post['post_url'];
  var picture = post['full_picture'];
  var summary = post['summary'] || post['message'];
  var created = formatDate(post['created_time']);
  var platform = post['platform'] || "FB";
  return newNode(picture, summary, created, link, platform);
}

// create new DOM element representing post with provided content
function newNode(full_picture, summary, created_time, link, platform) {  
  if (!full_picture && (!summary || summary.includes("http"))) {
    return null;
  }

  var box = document.createElement('div');
  box.className = 'wf-box';
  var a = document.createElement('a');
  a.href = link;
  a.target = "_blank";
  var box_content = document.createElement('div');
  box_content.className = 'wf-box-content';
  if (full_picture) {
    var image = document.createElement('img');
    image.src = full_picture;
    box_content.appendChild(image);
  }
  var box_content_text = document.createElement('div');
  switch(platform) {
    case "FB":
      box_content_text.className = 'wf-box-content-text';
      var box_content_date = document.createElement('div');
      box_content_date.className = 'wf-box-content-text-date';
      created_time = String(created_time);
      box_content_date.appendChild(document.createTextNode(created_time));
      box_content_text.appendChild(box_content_date);
      break;
    case "TUMBLR":
      box_content_text.className = 'wf-box-content-blog';
      break;
  }
  box_content_text.appendChild(document.createTextNode(summary));
  summary = String(summary);
  box_content.appendChild(box_content_text);
  a.appendChild(box_content);
  box.appendChild(a);
  return box;
}

function formatDate(dateString) {
  var date = String(dateString);
  date = new Date(date.split('T')[0]);
  return (date.getMonth()+1) + "/" + (date.getDate()+1) + "/" + (date.getYear() + 1900);
}

module.exports = WaterFallContent;
