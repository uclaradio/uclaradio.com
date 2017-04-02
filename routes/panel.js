// panel.js
// Staff user panel pages and API

var express = require('express');
var router = express.Router();

var accounts = require('../database/accounts');
var shows = require('../database/shows');
var faqs = require('../database/faqs');
var messages = require('../database/messages');

// Image compression module
var Jimp = require('jimp');
const RESIZE_WIDTH = 512; 
const IMAGE_QUALITY = 80;

/***** Main Log In Page *****/

router.get('/', function(req, res) {
  // check credentials
  if (req.cookies.username == undefined || req.cookies.pass == undefined) {
    res.render('panel/login', {title: 'Log In'});
  }
  else {
    accounts.autoLogin(req.cookies.username, req.cookies.pass, function(o) {
      if (o != null) {
        req.session.user = o;
        res.redirect('/panel/home');
      }
      else {
        res.render('panel/login', {title: 'Log In'});
      }
    });
  }
});

router.post('/', function(req, res) {
  accounts.manualLogin(req.body['username'], req.body['pass'], function(err, o) {
    if (!o) {
      res.status(400).send(err);
    }
    else {
      req.session.user = o;
      if (req.body['remember-me'] == 'true') {
        res.cookie('username', o.username, {maxAge: 900000});
        res.cookie('pass', o.pass, {maxAge: 900000});
      }
      res.status(200).send(o);
    }
  });
});


/***** User Home Page *****/

router.get('/home', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    var path = require('path');
    res.sendFile(path.resolve('public/panel/panel.html'));
  }
});

router.get('/logout', function(req, res) {
  if (req.session.user) {
    res.clearCookie('user');
    res.clearCookie('pass');
    req.session.destroy();
  }
  res.redirect('/panel');
});


/***** New Accounts *****/

router.get('/signup', function(req, res) {
  res.render('panel/signup', {title: 'Signup'});
});

router.post('/signup', function(req, res) {
  accounts.requestNewAccount(req.body['username'], req.body['pass'], req.body['email'], req.body['fullName'], function(e) {
    if (e) {
      res.status(400).send(e);
    }
    else {
      res.redirect('/panel');
    }
  });
});


/***** FAQ *****/

router.get('/faq', function(req, res) {
  var path = require('path');
  res.sendFile(path.resolve('public/panel/faq.html'));
});

router.get('/api/faq', function(req, res) {
  faqs.getAllFAQs(function(err, o) {
    if (o) {
      var response = {faqs: o};
      if (req.session.user == null) {
        res.json(response);
      }
      else {
        accounts.checkPrivilege(req.session.user.username, accounts.managerPrivilegeName, function(err, hasAccess) {
          // let managers edit
          response.editable = hasAccess;
          res.json(response);
        });
      }
    }
    else {
      res.status(400).send(err);
    }
  });
  // res.json({editable: true, faqs: [{"id": 1, "question": "How do I get staff points?", "answer": "[staffing points information]"}]});
});

router.post('/api/faq', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.status(400).send(err);
  }
  else {
    accounts.checkPrivilege(req.session.user.username, accounts.managerPrivilegeName, function(err, hasAccess) {
      if (hasAccess && req.body.faqs) {
        faqs.updateFAQs(JSON.parse(req.body.faqs), function(err, o) {
          if (o) { res.json(o); }
          else { res.status(400).send(err); }
        });
      }
      else {
        res.status(400).send(err);
      }
    });
  }
});

/***** Managers *****/

var managerInfo = function(req, res) {
  accounts.managerInfo(req.session.user.username, function(err, o) {
    if (o) {
      res.json(o);
    }
    else { res.status(400).send(err); }
  });
};

var updateManager = function(req, res) {
  // destringify
  var manager = JSON.parse(req.body.manager);
  if (manager.username === req.session.user.username) {
    // only let users update their own manager info
    accounts.updateManager(manager, function(err, o) {
      if (o) {
        res.json(o);
      }
      else { res.status(400).send(err); }
    });
  }
};

var listAccounts = function(req, res) {
  accounts.listAccounts(function(err, usernames) {
    res.json(usernames);
  });
};

var verifyAccount = function(req, res) {
  accounts.verifyAccount(req.body.username, function(err, o) {
    if (o) {
      // successfully updated
      res.json("success");
    }
    else {
      console.log("error verifying account:", err);
      res.status(400).send(err);
    }
  });
};

var deleteAccount = function(req, res) {
  accounts.deleteUser(req.body.username, function (e) {
    if (e) { console.log("error removing show: ", e); res.status(400).send(e); }
    else { res.json("success"); }
  });
};

var deleteUnverifiedAccount = function(req, res) {
  accounts.deleteUnverifiedUser(req.body.username, function (e) {
    if (e) { console.log("error removing show: ", e); res.status(400).send(e); }
    else { res.json("success"); }
  });
};

var deleteChat = function(req, res) {
    var messageID = req.body.id;
    messages.delete(messageID, function(){
        res.send("succesfully deleted");
    });
};

var freeChat = function(req, res) {
    var messageID = req.body.id;
    messages.free(messageID, function(){
        res.send("succesfully deleted");
    });
};

router.post('/manager/api/:link', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    accounts.checkPrivilege(req.session.user.username, accounts.managerPrivilegeName, function(err, hasAccess) {
      if (hasAccess) {
        var path = require('path');
        // perform action
        switch (req.params.link) {
          case 'info':
            managerInfo(req, res);
            break;
          case 'update':
            updateManager(req, res);
            break;
          case 'listAccounts':
            listAccounts(req, res);
            break;
          case 'verify': 
            verifyAccount(req, res);
            break;
          case 'delete':
            deleteAccount(req, res);
            break;
          case 'deleteUnverified':
            deleteUnverifiedAccount(req, res);
            break;
          case 'freechat':
            freeChat(req, res);
            break;
          case 'deletechat':
            deleteChat(req, res);
            break;
          default:
            res.status(404).send();
            break;
        }
      }
      else {
        res.status(400).send(err);
      }
    });
  }
});

router.get('/manager', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    accounts.checkPrivilege(req.session.user.username, accounts.managerPrivilegeName, function(err, hasAccess) {
      if (hasAccess) {
        var path = require('path');
        res.sendFile(path.resolve('public/panel/manager.html'));
      }
      else {
        // redirect to home page
        res.redirect('/panel');
      }
    });
  }
});

/***** Shows *****/

router.get('/show/:id', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    var path = require('path');
    res.sendFile(path.resolve('public/panel/show.html'));
  }
});

router.get('/api/showData/:id', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.status(400).send();
  }
  else {
    shows.userHasAccessToShow(req.session.user.username, req.params.id, function(hasAccess) {
      if (!hasAccess) {
        // user doesn't have access to this show
        console.log("user requested show they don't have access to");
        res.status(400).send();
        return;
      }
      else {
        shows.getDJMappedShow(req.params.id, function(err, o) {
          if (o) {
            res.json(o);
          }
          else {
            res.status(400).send(err);
          }
        });
      }
    });
  }
});

/***** API *****/

/***** Account Info *****/

router.get('/api/user', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.status(400).send();
  }
  else {
    var user = req.session.user;
    accounts.getDJByUserName(user.username, function(err, dj){
      if (err) {
        res.status(400).send(err);
      }
      else {
        var userData = accounts.webSafeUser(dj);
        res.json(userData);
      }
    });
  }
});

router.post('/api/user', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.status(400).send();
  }
  else {
    var user = JSON.parse(req.body.user);
    if (req.session.user.username !== user.username) {
      res.status(400).send();
    }
    else {
      // update user info
      accounts.updateAccount(user, function(err, user) {
        if (err) { res.status(400).send(err); }
        else {
          var userData = accounts.webSafeUser(user);
          res.json(userData);
        }
      });
    }
  }
});

var defaultLinks = [{"title": "FAQ", "link": "/panel/faq"}];
router.get('/api/userlinks', function(req, res) {
  if (req.session.user == null) {
    res.json({"loggedin": false, "links":defaultLinks});
  }
  else {
    var user = req.session.user;
    // retrieve links relevent to user's privileges (like Manager pages)
    accounts.getPrivilegeLinksForUser(user.username, function(err, links) {
      links = links.concat(defaultLinks);
      if (links) {
        res.json({"loggedin": true, "links":links});
      }
      else { res.status(400).send(); }
    });
  }
});

router.post('/api/userPic', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    // user has access to update this show
    var errorCallback = function(err) {
      console.log("failed to add show picture: ", err);
      res.status(400).send(err);
    }

    var imgPath = req.files.img.path;
    var mimeType = req.files.img.mimetype;

    // Perform image compression on JPG/PNG only
    if (mimeType == "image/jpeg" || mimeType == "image/png") {
      Jimp.read(imgPath, function(err, img) {
        if (err) { errorCallback(err); }
        img.resize(RESIZE_WIDTH, Jimp.AUTO).quality(IMAGE_QUALITY).write(imgPath);
      });
    }
    else {
      console.log("Non-png/jpg file type");
    }     

    var picture = imgPath.replace('public/', '/');
    var newData = {"picture": picture, "username": req.body.username};
    accounts.updateAccount(newData, function(err, user) {
      if (err) { errorCallback(err); }
      else {
        // updated successfully!
        res.json(user);
      }
    });
  }
});


/***** Show Info *****/

router.get('/api/usershows', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    // return list of shows belonging to current user
    shows.getShowsForUser(req.session.user.username, function(err, shows) {
      if (err) { console.log("failed to retrieve shows for user: ", err); }
      else {
        res.json(shows);
      }
    });
  }
});

router.get('/api/allshows', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    accounts.isManager(req.session.user.username, function(err, isManager) {
      if (isManager) {
        shows.getAllPublicShows(function(err, allShows) {
          if (err) {
            res.status(400).send();
          }
          else {
            res.json(allShows);
          }
        });
      }
      else {
        res.status(400).send();
      }
    });
  }
});

// update details for one show 
router.post('/api/updateShow', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    var showData = JSON.parse(req.body.show);
    shows.userHasAccessToShow(req.session.user.username, showData.id, function(hasAccess) {
      // user doesn't have access to this show
      if (!hasAccess) {
        console.log("user requested invalid show");
        res.status(400).send();
        return;
      }

      // map djs back to usernames
      var djUsernames = [];
      Object.keys(showData.djs).forEach(function (username) {
        djUsernames += username;
      });
      showData.djs = djUsernames;

      // return show with id belonging to logged in user
      var callback = function(err, show) {
        if (err) {
          console.log("error updating show: ", err);
        }

        if (show) {
          shows.getDJMappedShow(show.id, function(err, o) {
            if (o) {
              res.json(o);
            } else {
              res.status(400).send();
            }
          });
        } else {
          res.status(400).send();
        }
      };

      shows.updateShow(showData.id, showData, callback);
    });
  }
});

// delete show 
router.post('/api/deleteShow', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    shows.userHasAccessToShow(req.session.user.username, req.body.id, function(hasAccess) {
      // user doesn't have access to this show
      if (!hasAccess) {
        console.log("user requested invalid show");
        res.status(400).send();
        return;
      }

      shows.removeShow(req.body.id, function (e) {
        if (e) { console.log("error removing show: ", e); res.status(400).send(e); }
        else { res.json("success"); }
      });
    });
  }
});

router.post('/api/addShow', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    shows.addNewShow(req.body.title, req.body.day, req.body.time, [req.session.user.username], function(err, saved) {
      if (err) {
        console.log("failed to add show for user: ", err); 
        res.json({"success": false, "err": err});
      }

      else {
        // return full list of shows
        res.redirect('/panel/api/usershows');
      }
    });
  }
});

router.post('/api/showPic', function(req, res) {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  }
  else {
    shows.userHasAccessToShow(req.session.user.username, req.body.id, function(hasAccess) {
      if (!hasAccess) { res.status(400).send(); }

      else {
        // user has access to update this show
        var errorCallback = function(err) {
          console.log("failed to add show picture: ", err);
          res.status(400).send(err);
        }

        var imgPath = req.files.img.path;
        var mimeType = req.files.img.mimetype;

        // Perform image compression on JPG/PNG only
        if (mimeType == "image/jpeg" || mimeType == "image/png") {
          Jimp.read(imgPath, function(err, img) {
            if (err) { errorCallback(err); }
            img.resize(RESIZE_WIDTH, Jimp.AUTO).quality(IMAGE_QUALITY).write(imgPath);
          });
        }
        else {
          console.log("Non-png/jpg file type");
        }     
        
        var picture = imgPath.replace('public/', '/');
        // update show data with new pictures
        var newData = {"picture": picture};
        shows.updateShow(req.body.id, newData, function(err, o) {
          if (err) { errorCallback(err); }
          else {
            // updated successfully!
            res.json("success");
          }
        });
      }
    });
  }
});



module.exports = router;
