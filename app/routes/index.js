// index.js
// Front page

const express = require('express');
const router = express.Router();
const async = require('async');
const shows = require('../database/shows');
const passwords = require('../../passwords');
const requestify = require('requestify');

const numberOfFBPosts = 7;
const numberOfTUMBLRPosts = 10;
const ghostIDLength = 24;
const tumblrIDLength = 12;
const GHOST = `https://tanzeelakhan.ghost.io/ghost/api/v2/content/posts/?key=${
  passwords.GHOST_API_KEY
}`;
const FB = `https://graph.facebook.com/uclaradio?fields=posts.limit(${numberOfFBPosts}){full_picture,message,created_time,link}&access_token=${
  passwords.FB_API_KEY
}`;
const TUMBLR = `https://api.tumblr.com/v2/blog/uclaradio.tumblr.com/posts/text?api_key=${
  passwords.TUMBLR_API_KEY
}&limit=${numberOfTUMBLRPosts}`;
const socialMediaURLs = [FB, TUMBLR];
const blogURLs = [GHOST, TUMBLR];

router.get('/blurbinfo', (req, res, next) => {
  const info = getTimeAndDay();

  shows.getShowByTimeslotAndDay(info.time, info.day, (err, blurb) => {
    if (blurb) blurb.djName = blurb.djName.join(',');

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(blurb));
  });
});

router.get('/getBlogPosts/:blogPostID', function(req, res) {
  // Length to differentiate blog IDs
  // external api database shouldn't be stored uclaradio.com
  // i think that would be reverse engineering
  const queryID = req.params.blogPostID;
  var query;
  var platform;
  if (queryID.length == ghostIDLength) {
    query = getGhostByID(queryID);
    platform = 'GHOST';
  } else if (queryID.length == tumblrIDLength) {
    query = TUMBLR;
    platform = 'TUMBLR';
  } else {
    res.send(null);
    return;
  }
  requestify
    .get(query, {
      cache: {
        cache: true,
        expires: 10800000,
      },
    })
    .then(response => {
      const data = response.getBody();
      var post;
      switch (platform) {
        case 'GHOST':
          post = data.posts[0];
          post.platform = 'GHOST';
          post.created_time = new Date(post.published_at);
          post.content = post.html;
          res.send(post);
          break;
        case 'TUMBLR':
          // Tumblr api doesn't seem to support getByID
          // get all posts and filter
          data.response.posts = data.response.posts.filter(post => {
            return post.id == queryID;
          });
          post = data.response.posts[0];
          post.platform = platform;
          post.created_time = new Date(post.date);
          post.content = post.body;
          res.send(post);
          break;
      }
    })
    .fail(response => {
      res.send(null);
    });
});

router.get('/getBlogPosts', (req, res) => {
  async.map(
    blogURLs,
    (url, callback) => {
      requestify
        .get(url, {
          cache: {
            cache: true,
            expires: 1080000,
          },
        })
        .then(response => {
          const data = response.getBody();
          switch (url) {
            case GHOST:
              data.posts.forEach(post => {
                post.platform = 'GHOST';
                post.created_time = new Date(post.published_at);
                post.content = post.html;
              });
              callback(null, data.posts);
              break;
            case TUMBLR:
              data.response.posts.forEach(post => {
                post.platform = 'TUMBLR';
                post.created_time = new Date(post.date);
                post.content = post.body;
              });
              callback(null, data.response.posts);
              break;
          }
        })
        .fail(response => {
          callback(null, []);
        });
    },
    (err, allBlogPosts) => {
      allBlogPosts = [].concat
        .apply([], allBlogPosts)
        .sort((postA, postB) => postA.created_time < postB.created_time);
      const result = {
        blog_posts: allBlogPosts,
      };
      res.send(result);
    }
  );
});

router.get('/getSocialMedia', (req, res) => {
  let FB_pagination_until; // get the index of the last facebook post basically
  async.map(
    socialMediaURLs,
    (url, callback) => {
      requestify
        .get(url, {
          cache: {
            cache: true,
            // cache for 30*60*60*1000 milliseconds
            expires: 108000000,
          },
        })
        .then(response => {
          const data = response.getBody();
          switch (url) {
            case FB:
              FB_pagination_until = getFBPaginationTools(
                data.posts.paging.next
              );
              data.posts.data.forEach(post => {
                post.platform = 'FB';
                post.created_time = new Date(post.created_time);
              });
              callback(null, data.posts.data);
              break;
            case TUMBLR:
              data.response.posts.forEach(post => {
                post.platform = 'TUMBLR';
                post.created_time = new Date(post.date);
              });
              callback(null, data.response.posts);
              break;
          }
        })
        .fail(response => {
          callback(null, []);
        });
    },
    (err, allSocialMediaPosts) => {
      allSocialMediaPosts = [].concat
        .apply([], allSocialMediaPosts)
        .sort((postA, postB) => postA.created_time < postB.created_time);
      const result = {
        social_media: allSocialMediaPosts,
        fb_pagination_until: FB_pagination_until,
      };
      res.send(result);
    }
  );
});

router.post('/getMoreFBPosts', (req, res) => {
  const url = getNextFBPosts(req.body.until);
  requestify
    .get(url, {
      cache: {
        cache: true,
        // cache for 30*60*60*1000 milliseconds
        expires: 108000000,
      },
    })
    .then(response => {
      response = response.getBody();
      res.send({
        social_media: response.data,
        fb_pagination_until: getFBPaginationTools(response.paging.next),
      });
    });
});

router.get('/pledgedrive', (req, res, next) => {
  res.render('pledgedrive');
});

function getGhostByID(id) {
  return `https://tanzeelakhan.ghost.io/ghost/api/v2/content/posts/${id}/?key=${
    passwords.GHOST_API_KEY
  }`;
}

// you should be familiar with facebook's 'next' URLS before modifying this function
function getFBPaginationTools(url) {
  paging_token = 0;
  until = url.split('until=')[1].split('&')[0] - 1;
  return until;
}

function getNextFBPosts(FB_pagination_until) {
  return `https://graph.facebook.com/v2.7/214439101900173/posts?fields=full_picture,message,created_time,link&limit=10&access_token=${
    passwords.FB_API_KEY
  }&until=${FB_pagination_until}`;
}

function getTimeAndDay() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date();

  const day = days[date.getDay()];
  let time = date.getHours();

  // Change the time into the format our db is expecting
  // AKA 12pm, 10am, 1pm: hour followed by am or pm
  if (time === 0) {
    time = '12am';
  } else if (time < 12) {
    time += 'am';
  } else if (time == 12) {
    time = '12pm';
  } else {
    time -= 12;
    time += 'pm';
  }

  return {
    day,
    time,
  };
}

module.exports = router;
