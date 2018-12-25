// index.js
// Front page

const express = require('express');

const router = express.Router();
const async = require('async');
const shows = require('../database/shows');
const passwords = require('../../passwords');
const requestify = require('requestify');

const numberOfFBPosts = 7;
const numberOfTUMBLRPosts = 3;
const KEYSTONE = 'http://localhost:3010/api/posts';
const FB = `https://graph.facebook.com/uclaradio?fields=posts.limit(${numberOfFBPosts}){full_picture,message,created_time,link}&access_token=${
  passwords.FB_API_KEY
}`;
const TUMBLR = `https://api.tumblr.com/v2/blog/uclaradio.tumblr.com/posts/text?api_key=${
  passwords.TUMBLR_API_KEY
}&limit=${numberOfTUMBLRPosts}`;
const socialMediaURLs = [FB, TUMBLR];

router.get('/blurbinfo', (req, res, next) => {
  const info = getTimeAndDay();

  shows.getShowByTimeslotAndDay(info.time, info.day, (err, blurb) => {
    if (blurb) blurb.djName = blurb.djName.join(',');

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(blurb));
  });
});

router.get('/getBlogPosts/:blogPostID', function(req, res) {
  var queryAPI = `${KEYSTONE}/${req.params.blogPostID}`;
  requestify
    .get(queryAPI, {
      cache: {
        cache: true,
        expires: 100000000,
      },
    })
    .then(response => {
      const data = response.getBody();
      res.send(data);
    })
    .fail(response => {
      console.log(response);
    });
});

router.get('/getBlogPosts', (req, res) => {
  requestify
    .get(KEYSTONE, {
      cache: {
        cache: true,
        expires: 100000000,
      },
    })
    .then(response => {
      const data = response.getBody();
      res.send(data.posts);
    })
    .fail(response => {
      console.log(response);
    });
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
