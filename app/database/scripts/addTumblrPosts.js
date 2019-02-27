// addTumblrPosts.js
// Adds all tumblr posts to database
//
// usage: node app/database/scripts/addTumblrPosts.js
// api playground: https://api.tumblr.com/console/calls/blog/posts

const blogposts = require('../blogposts.js');
const passwords = require('../../../passwords');
const TUMBLRPostsLimit = 50;
const totalPosts = 1000;

// Authenticate via OAuth
const tumblr = require('tumblr.js');
const client = tumblr.createClient({
  consumer_key: passwords.TUMBLR_CONSUMER_KEY,
  consumer_secret: passwords.TUMBLR_CONSUMER_SECRET,
  token: passwords.TUMBLR_TOKEN,
  token_secret: passwords.TUMBLR_TOKEN_SECRET,
});

for (
  var currentOffset = 0;
  currentOffset <= totalPosts;
  currentOffset += TUMBLRPostsLimit
) {
  console.log(currentOffset);
  client.blogPosts(
    'uclaradio.tumblr.com',
    { limit: TUMBLRPostsLimit, offset: currentOffset },
    function(err, data) {
      if (err) {
        console.log('Request failed: ' + err);
        return;
      }
      data.posts.forEach(post => {
        if (post.title && post.body) {
          post.platform = 'TUMBLR';
          post.created_time = new Date(post.date);
          post.content = post.body;
          blogposts.addPost(
            post.id,
            post.title,
            post.content,
            post.platform,
            post.created_time,
            post.tags,
            (err, saved) => {
              if (err) {
                console.log('Failed to add post: ' + err);
              } else {
                console.log('No errors adding to DB');
              }
            }
          );
        }
      });
    }
  );
}
