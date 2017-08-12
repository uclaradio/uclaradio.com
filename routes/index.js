// index.js
// Front page

var express = require('express');
var router = express.Router();
var async = require('async');
var shows = require('../database/shows');
var passwords = require('../passwords');
var requestify = require('requestify');

var numberOfFBPosts = 7;
var numberOfTUMBLRPosts = 3;
var FB =
  'https://graph.facebook.com/uclaradio?fields=posts.limit(' +
  numberOfFBPosts +
  '){full_picture,message,created_time,link}&access_token=' +
  passwords['FB_API_KEY'];
var TUMBLR =
  'https://api.tumblr.com/v2/blog/uclaradio.tumblr.com/posts/text?api_key=' +
  passwords['TUMBLR_API_KEY'] +
  '&limit=' +
  numberOfTUMBLRPosts;
var socialMediaURLs = [FB, TUMBLR];

router.get('/blurbinfo', function(req, res, next) {
  var info = getTimeAndDay();

  shows.getShowByTimeslotAndDay(info.time, info.day, function(err, blurb) {
    if (blurb) blurb.djName = blurb.djName.join(',');

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(blurb));
  });
});

router.get('/getSocialMedia', function(req, res) {
  var FB_pagination_until; //get the index of the last facebook post basically
  async.map(
    socialMediaURLs,
    function(url, callback) {
      requestify
        .get(url, {
          cache: {
            cache: true,
            //cache for 30*60*60*1000 milliseconds
            expires: 108000000,
          },
        })
        .then(function(response) {
          var data = response.getBody();
          switch (url) {
            case FB:
              FB_pagination_until = getFBPaginationTools(
                data['posts']['paging']['next']
              );
              data['posts']['data'].forEach(function(post) {
                post['platform'] = 'FB';
                post['created_time'] = new Date(post['created_time']);
              });
              callback(null, data['posts']['data']);
              break;
            case TUMBLR:
              data['response']['posts'].forEach(function(post) {
                post['platform'] = 'TUMBLR';
                post['created_time'] = new Date(post['date']);
              });
              callback(null, data['response']['posts']);
              break;
          }
        })
        .fail(function(response) {
          callback(null, []);
        });
    },
    function(err, allSocialMediaPosts) {
      allSocialMediaPosts = [].concat
        .apply([], allSocialMediaPosts)
        .sort(function(postA, postB) {
          return postA['created_time'] < postB['created_time'];
        });
      var result = {
        social_media: allSocialMediaPosts,
        fb_pagination_until: FB_pagination_until,
      };
      res.send(result);
    }
  );
});

router.post('/getMoreFBPosts', function(req, res) {
  var url = getNextFBPosts(req.body.until);
  requestify
    .get(url, {
      cache: {
        cache: true,
        //cache for 30*60*60*1000 milliseconds
        expires: 108000000,
      },
    })
    .then(function(response) {
      response = response.getBody();
      res.send({
        social_media: response['data'],
        fb_pagination_until: getFBPaginationTools(response['paging']['next']),
      });
    });
});

router.get('/blog', function(req, res, next) {
  res.redirect('http://uclaradio.tumblr.com');
});

router.get('/pledgedrive', function(req, res, next) {
  res.render('pledgedrive');
});

//you should be familiar with facebook's 'next' URLS before modifying this function
function getFBPaginationTools(url) {
  paging_token = 0;
  until = url.split('until=')[1].split('&')[0] - 1;
  return until;
}

function getNextFBPosts(FB_pagination_until) {
  return (
    'https://graph.facebook.com/v2.7/214439101900173/posts?fields=full_picture,message,created_time,link&limit=10&access_token=' +
    passwords['FB_API_KEY'] +
    '&until=' +
    FB_pagination_until
  );
}

function getTimeAndDay() {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var date = new Date();

  var day = days[date.getDay()];
  var time = date.getHours();

  //Change the time into the format our db is expecting
  //AKA 12pm, 10am, 1pm: hour followed by am or pm
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
    day: day,
    time: time,
  };
}

module.exports = router;
