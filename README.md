# UCLA Radio

All of the code that powers [uclaradio.com](https://uclaradio.com).

UCLA Radio is a Javascript application, powered by [Node.js](https://nodejs.org/en/) and utilizing the [Express.js](http://expressjs.com) framework. We use [MongoDB](https://www.mongodb.com) for our database and [React](https://facebook.github.io/react/) on the front-end.

In addition to the visible site, we also have a [RESTful API](https://github.com/uclaradio/uclaradio/blob/master/docs/api-endpoints.md), which powers an internal panel for managers and DJs as well as our [iOS](https://github.com/uclaradio/uclaradio-iOS) and [Android](https://github.com/uclaradio/uclaradio-Android) apps.

UCLA Radio is a completely student-run organization offering cultural content created by 100+ DJs. [Let us know](mailto:radio.web@media.ucla.edu) if you have any suggestions! All of the software here is written by students.

## Getting Started

### Running

#### Development
- Ensure you have Mongo installed and a Mongo db instance is running
  - For macOS: If you have [homebrew](http://brew.sh/) installed, you can just run [`setup.sh`](https://github.com/uclaradio/uclaradio/blob/master/setup.sh) to set up node and MongoDB automatically!
- In the project root directory, run `npm install` to install dependencies (may need sudo)
- Run `npm start` to start the server for development
- Point your browser to [`http://localhost:3000`](http://localhost:3000) :heart_eyes:

#### Production
- Make sure all packages are installed with `npm install`
- Run `node bin/www prod` to start the server for production (will require HTTPS and listen on port 80)


### Getting Started

#### Overview

#### Directories

##### [`./routes`](https://github.com/uclaradio/uclaradio/tree/master/routes)
Handles all routing logic, or logic that deals with URI endpoints and HTTP request methods (GET, POST, etc.). (e.g. what happens when you load [`uclaradio.com/shows`](https://uclaradio.com/shows))

##### [`./database`](https://github.com/uclaradio/uclaradio/tree/master/database)
Contains all data models and functions we use in the routes to do things like create a new show

##### [`./public`](https://github.com/uclaradio/uclaradio/tree/master/public)
Everything we have public on the site. For your images, JavaScript, CSS, HTML and what have you

##### [`./views`](https://github.com/uclaradio/uclaradio/tree/master/views)
Jade templates. Right now many front-end pages are in Jade, hopefully we will redesign them in Javascript soon.

##### [`./react`](https://github.com/uclaradio/uclaradio/tree/master/react)
React front-end pages. Reusable components like UI elements are in `/react/components`

#### Files

[`app.js`](https://github.com/uclaradio/uclaradio/blob/master/app.js): The main server!

[`defaultPasswords.json`](https://github.com/uclaradio/uclaradio/blob/master/defaultPasswords.json): Where the passwords go. These are different on the production server.

[`Gruntfile.js`](https://github.com/uclaradio/uclaradio/blob/master/Gruntfile.js): Our [grunt](https://gruntjs.com) file. It automatically compiles all of our `.jsx` and `.scss` files. Just run `grunt watch`!

[`setup.sh`](https://github.com/uclaradio/uclaradio/blob/master/setup.sh): The setup script for macOS.

##### Using Routes

This segment from `./routes/api.js` is a good example of how routes and data models work:
```javascript
var shows = require('../database/shows');
// ...
// uclaradio.com/api/schedule -> JSON
router.get('/schedule', function(req, res) {
  shows.getAllShows(function(err, results) {
    if (results) {
      res.json({shows: results.filter(checkPublic)});
    } else {
      // something went wrong
      res.status(400).send(err);
    }
  });
});
```

##### React

React files must be compiled to actual javascript before a browser can use them, because they do things like this:
```javascript
var djs = {'Toad', 'Squirrel', 'Camel'};
return <p>UCLA Radio is a student-run organization with {djs.length} student DJs. </p>;
```

Do so with Grunt, which automates Webpack:
* install grunt-client with npm: `npm install -g grunt-cli`
* run `grunt` to compile .jsx files in `./react` and put minified versions in `./public/build`
  * run `grunt watch` to automatically recompile whenever you hit save!
* add `.../build/[x].min.js` as a script in your HTML files

##### React + API

We prefer using a front-end web app and an API over static templates, because apps can be interactive. Our internal staff panel / content management system works this way:

```javascript
/***** User Home Page *****/

// Front-end: provide HTML file to logged in users, redirect everyone else
// uclaradio.com/panel/home -> HTML
router.get('/home', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    var path = require('path');
    res.sendFile(path.resolve('public/panel/panel.html'));
  }
});

// API: Return current logged-in user's shows as a JSON file which can be parsed by React, or 400 error
// uclaradio.com/panel/api/shows -> JSON
router.get('/api/shows', function(req, res) {
  if (req.session.user == null) {
    res.status(400).send();
  } else {
    var user = req.session.user;
    shows.getShowsForUser(user.username, function(err, userShows) {
      if (userShows) {
        res.json({'shows': userShows});
      } else {
        res.status(400).send();
      }
    });
  }
});
```


### Requirements for new code

As a student-run organization, UCLA Radio is especially liable to technical debt. We have some goals for cleaning up our codebase in the future, but most importantly new code should:
* Have data models written with __SQL__ (PostgreSQL) instead of MongoDB because we've had problems with Mongo and it's not what students are taught at UCLA
* Have new front-end pages in __React__. We prefer using a front-end framework with an API to complicated templates
* Delete files that are not used anymore. It's okay, get rid of clutter
* Follow an organized structure. Put things in the right directories
