// index.js
// Front page

const express = require('express');
const axios = require('axios');

const router = express.Router();
const passwords = require('../../passwords');

const numberOfFBPosts = 7;
const numberOfTUMBLRPosts = 3;
const FB = `https://graph.facebook.com/uclaradio?fields=posts.limit(${
  numberOfFBPosts
}){full_picture,message,created_time,link}&access_token=${
  passwords.FB_API_KEY
}`;
const TUMBLR = `https://api.tumblr.com/v2/blog/uclaradio.tumblr.com/posts/text?api_key=${
  passwords.TUMBLR_API_KEY
}&limit=${numberOfTUMBLRPosts}`;
const socialMediaURLs = [FB, TUMBLR];

router.get('/getSocialMedia', async (req, res) => {
  let allPosts = [];
  let FB_pagination_until;

  const facebookResponse = await axios.get(FB);
  const facebookData = facebookResponse.data;
  FB_pagination_until = getFBPaginationTools(facebookData.posts.paging.next);
  facebookData.posts.data.forEach(post => {
    post.platform = 'FB';
    post.created_time = new Date(post.created_time);
  });
  allPosts = allPosts.concat(facebookData.posts.data);

  const tumblrResponse = await axios.get(TUMBLR);
  const tumblrData = tumblrResponse.data;
  tumblrData.response.posts.forEach(post => {
    post.platform = 'TUMBLR';
    post.created_time = new Date(post.date);
  });
  allPosts = allPosts.concat(tumblrData.response.posts);

  const result = {
    social_media: allPosts,
    fb_pagination_until: FB_pagination_until,
  };
  res.send(result);
});

router.post('/getMoreFBPosts', async (req, res) => {
  const url = getNextFBPosts(req.body.until);
  const response = await axios.get(url);
  res.send({
    social_media: response.data,
    fb_pagination_until: getFBPaginationTools(response.paging.next),
  });
});

router.get('/blog', (req, res, next) => {
  res.redirect('http://uclaradio.tumblr.com');
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

module.exports = router;
