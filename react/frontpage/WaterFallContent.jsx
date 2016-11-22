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
var boxHandle;

var WaterFallContent = React.createClass({
  getInitialState: function() {
    return {
      newData: false,
      socialMediaPosts: []
    };
  },
  componentDidMount: function() {
    $.get(SocialMediaURL, function (result) {
      this.setState({
        paginatedDataInProgress: false,
        // socialMediaPosts:result['social_media'],
        fb_pagination_until:result['fb_pagination_until']
      }, function () {
        waterfall = new Waterfall({ minBoxWidth: 250 });
        result['social_media'].map(function(el) {
          var boxHandle = nodeFromPost(el);
          waterfall.addBox(boxHandle);
        });
        window.addEventListener('scroll', this.handleScroll);
      });
    }.bind(this));
    
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll: function(event) {
    var i = waterfall.getHighestIndex();
    if (i > -1) {
      // get last box of the column
      var lastBox = Array.prototype.slice.call(waterfall.columns[i].children, -1)[0];
      if (checkSlide(lastBox)) {
        if (this.state.paginatedDataInProgress == false) {
          // Locking mechanism so scrolling won't cause an infinite amt of requests
          this.setState({
            paginatedDataInProgress: true
          });
          //request next set of Facebook posts
          console.log("$handleScroll");
          this.serverRequest = $.post(getMoreFBPostsURL, {
            until: this.state.fb_pagination_until
          },function (result) {
            result['social_media'].map(function(el) {
              var boxHandle = nodeFromPost(el);
              waterfall.addBox(boxHandle);
            });
            // var newPosts = this.state.socialMediaPosts.concat(result['social_media']);
            this.setState({
              // socialMediaPosts: newPosts,
              fb_pagination_until: result['fb_pagination_until'],
              paginatedDataInProgress: false
            });
          }.bind(this));
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
  if(elem) {
    var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop)
      + (document.documentElement.clientHeight || document.body.clientHeight);
    var elemCenter = elem.offsetTop + elem.offsetHeight / 2;
    return elemCenter < 1.5*screenHeight;
  }
}

function nodeFromPost(post) {
  var link = post['link'] || post['post_url'];
  var picture = post['full_picture'];
  var summary = post['summary'] || post['message'];
  var created = post['created_time'];
  return newNode(picture, summary, created, link);
}

function newNode(full_picture, summary, created_time, link) {  
  var box = document.createElement('div');
  box.className = 'wf-box';
  var a = document.createElement('a');
  a.href = link;
  var box_content = document.createElement('div');
  box_content.className = 'wf-box-content';
  if (full_picture) {
    var image = document.createElement('img');
    image.src = full_picture;
    box_content.appendChild(image);
  }
  var box_content_text = document.createElement('div');
      box_content_text.className = 'wf-box-content-text';
  var box_content_date = document.createElement('div');
     box_content_date.className = 'wf-box-content-text-date';
     created_time = String(created_time);
     box_content_date.appendChild(document.createTextNode(created_time));
  box_content_text.appendChild(box_content_date);
  box_content_text.appendChild(document.createTextNode(summary));
  summary = String(summary);
  if (!summary.includes("http")) {
    box_content.appendChild(box_content_text);
    a.appendChild(box_content);
    box.appendChild(a);
  }
  return box;
}

function containsHttp(myString) {
  return myString.split(" ").map(function(el) { return el.includes("http") ? "click" : el }).join(' ');
}

function formatDate(dateString) {
  var date = String(dateString);
  date = new Date(date.split('T')[0]);
  return (date.getMonth()+1) + "/" + (date.getDate()+1) + "/" + (date.getYear() + 1900);
}

module.exports = WaterFallContent;
