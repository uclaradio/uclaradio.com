// panel.js
// Staff user panel pages and API

const express = require('express');

const router = express.Router();
const path = require('path');
const mime = require('mime');
const multer = require('multer');
const Jimp = require('jimp');

const accounts = require('../database/accounts');
const shows = require('../database/shows');
const faqs = require('../database/faqs');
const messages = require('../database/messages');
const rivendell = require('../database/rivendell');

// Image handling
const RESIZE_WIDTH = 512;
const IMAGE_QUALITY = 80;

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'client', 'public', 'uploads'),
  filename(req, file, cb) {
    cb(null, `${file.fieldname + Date.now()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({ storage });

const handleUpload = function(file) {
  const imgPath = file.path;
  const mimeType = file.mimetype;

  // Perform image compression on JPG/PNG only
  if (mimeType == 'image/jpeg' || mimeType == 'image/png') {
    console.log('compressing');
    Jimp.read(imgPath, (err, img) => {
      if (err) {
        errorCallback(err);
      }
      img
        .resize(RESIZE_WIDTH, Jimp.AUTO)
        .quality(IMAGE_QUALITY)
        .write(imgPath);
    });
  } else {
    console.log('Non-png/jpg file type');
  }

  return imgPath.replace(/.+public\//g, '/');
};

/** *** Main Log In Page **** */

router.get('/', (req, res) => {
  // check credentials
  if (req.cookies.username === undefined || req.cookies.pass === undefined) {
    res.render('panel/login', { title: 'Log In' });
  } else {
    accounts.autoLogin(req.cookies.username, req.cookies.pass, o => {
      if (o != null) {
        req.session.user = o;
        res.redirect('/panel/home');
      } else {
        res.render('panel/login', { title: 'Log In' });
      }
    });
  }
});

router.post('/', (req, res) => {
  accounts.manualLogin(req.body.username, req.body.pass, (err, o) => {
    if (!o) {
      res.status(400).send(err);
    } else {
      req.session.user = o;
      if (req.body['remember-me'] === 'true') {
        res.cookie('username', o.username, { maxAge: 900000 });
        res.cookie('pass', o.pass, { maxAge: 900000 });
      }
      res.status(200).send(o);
    }
  });
});

/** *** User Home Page **** */

router.get('/home', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    res.sendFile(path.resolve('client/public/panel/panel.html'));
  }
});

router.get('/logout', (req, res) => {
  if (req.session.user) {
    res.clearCookie('user');
    res.clearCookie('pass');
    req.session.destroy();
  }
  res.redirect('/panel');
});

/** *** New Accounts **** */

router.get('/signup', (req, res) => {
  res.render('panel/signup', { title: 'Signup' });
});

router.post('/signup', (req, res) => {
  accounts.requestNewAccount(
    req.body.username,
    req.body.pass,
    req.body.email,
    req.body.fullName,
    e => {
      if (e) {
        res.status(400).send(e);
      } else {
        res.redirect('/panel');
      }
    }
  );
});

/** *** Reset Password Link **** */

router.get('/reset-password', (req, res) => {
  res.render('panel/reset', { title: 'Reset' });
});

router.post('/reset', (req, res) => {});

/** *** FAQ **** */

router.get('/faq', (req, res) => {
  res.sendFile(path.resolve('client/public/panel/faq.html'));
});

router.get('/api/faq', (req, res) => {
  faqs.getAllFAQs((err, o) => {
    if (o) {
      const response = { faqs: o };
      if (req.session.user == null) {
        res.json(response);
      } else {
        accounts.checkPrivilege(
          req.session.user.username,
          accounts.managerPrivilegeName,
          (err, hasAccess) => {
            // let managers edit
            response.editable = hasAccess;
            res.json(response);
          }
        );
      }
    } else {
      res.status(400).send(err);
    }
  });
  // res.json({editable: true, faqs: [{"id": 1, "question": "How do I get staff points?", "answer": "[staffing points information]"}]});
});

router.post('/api/faq', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.status(400).send(err);
  } else {
    accounts.checkPrivilege(
      req.session.user.username,
      accounts.managerPrivilegeName,
      (err, hasAccess) => {
        if (hasAccess && req.body.faqs) {
          faqs.updateFAQs(JSON.parse(req.body.faqs), (err, o) => {
            if (o) {
              res.json(o);
            } else {
              res.status(400).send(err);
            }
          });
        } else {
          res.status(400).send(err);
        }
      }
    );
  }
});

/** *** Managers **** */

const managerInfo = function(req, res) {
  accounts.managerInfo(req.session.user.username, (err, o) => {
    if (o) {
      res.json(o);
    } else {
      res.status(400).send(err);
    }
  });
};

const updateManager = function(req, res) {
  // destringify
  const manager = JSON.parse(req.body.manager);
  if (manager.username === req.session.user.username) {
    // only let users update their own manager info
    accounts.updateManager(manager, (err, o) => {
      if (o) {
        res.json(o);
      } else {
        res.status(400).send(err);
      }
    });
  }
};

const listAccounts = function(req, res) {
  accounts.listAccounts((err, usernames) => {
    res.json(usernames);
  });
};

const verifyAccount = function(req, res) {
  accounts.verifyAccount(req.body.username, (err, o) => {
    if (o) {
      // successfully updated
      res.json('success');
    } else {
      console.log('error verifying account:', err);
      res.status(400).send(err);
    }
  });
};

const deleteAccount = function(req, res) {
  accounts.deleteUser(req.body.username, e => {
    if (e) {
      console.log('error removing show: ', e);
      res.status(400).send(e);
    } else {
      res.json('success');
    }
  });
};

const deleteUnverifiedAccount = function(req, res) {
  accounts.deleteUnverifiedUser(req.body.username, e => {
    if (e) {
      console.log('error removing show: ', e);
      res.status(400).send(e);
    } else {
      res.json('success');
    }
  });
};

const deleteChat = function(req, res) {
  const messageID = req.body.id;
  messages.delete(messageID, () => {
    res.send('succesfully deleted');
  });
};

const freeChat = function(req, res) {
  const messageID = req.body.id;
  messages.free(messageID, () => {
    res.send('succesfully deleted');
  });
};

router.post('/manager/api/:link', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    accounts.checkPrivilege(
      req.session.user.username,
      accounts.managerPrivilegeName,
      (err, hasAccess) => {
        if (hasAccess) {
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
        } else {
          res.status(400).send(err);
        }
      }
    );
  }
});

router.get('/manager', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    accounts.checkPrivilege(
      req.session.user.username,
      accounts.managerPrivilegeName,
      (err, hasAccess) => {
        if (hasAccess) {
          res.sendFile(path.resolve('client/public/panel/manager.html'));
        } else {
          // redirect to home page
          res.redirect('/panel');
        }
      }
    );
  }
});

/** *** Shows **** */

router.get('/show/:id', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    res.sendFile(path.resolve('client/public/panel/show.html'));
  }
});

router.get('/api/showData/:id', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.status(400).send();
  } else {
    shows.userHasAccessToShow(
      req.session.user.username,
      req.params.id,
      hasAccess => {
        if (!hasAccess) {
          // user doesn't have access to this show
          console.log("user requested show they don't have access to");
          res.status(400).send();
        } else {
          shows.getDJMappedShow(req.params.id, (err, o) => {
            if (o) {
              res.json(o);
            } else {
              res.status(400).send(err);
            }
          });
        }
      }
    );
  }
});

/** *** API **** */

/** *** Account Info **** */

router.get('/api/user', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.status(400).send();
  } else {
    const user = req.session.user;
    accounts.getDJByUserName(user.username, (err, dj) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const userData = accounts.webSafeUser(dj);
        res.json(userData);
      }
    });
  }
});

router.post('/api/user', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.status(400).send();
  } else {
    const user = JSON.parse(req.body.user);
    if (req.session.user.username !== user.username) {
      res.status(400).send();
    } else {
      // update user info
      accounts.updateAccount(user, (err, user) => {
        if (err) {
          res.status(400).send(err);
        } else {
          const userData = accounts.webSafeUser(user);
          res.json(userData);
        }
      });
    }
  }
});

const defaultLinks = [
  { title: 'FAQ', link: '/panel/faq' },
  { title: 'Elrond', link: '/panel/elrond' },
];
router.get('/api/userlinks', (req, res) => {
  if (req.session.user == null) {
    res.json({ loggedin: false, links: defaultLinks });
  } else {
    const user = req.session.user;
    // retrieve links relevent to user's privileges (like Manager pages)
    accounts.getPrivilegeLinksForUser(user.username, (err, links) => {
      links = links.concat(defaultLinks);
      if (links) {
        res.json({ loggedin: true, links });
      } else {
        res.status(400).send();
      }
    });
  }
});

router.post('/api/userPic', upload.single('img'), (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    // user has access to update this show
    const errorCallback = function(err) {
      console.log('failed to add show picture: ', err);
      res.status(400).send(err);
    };

    const picture = handleUpload(req.file);

    const newData = { picture, username: req.body.username };
    accounts.updateAccount(newData, (err, user) => {
      if (err) {
        errorCallback(err);
      } else {
        // updated successfully!
        res.json(user);
      }
    });
  }
});

/** *** Show Info **** */

router.get('/api/usershows', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    // return list of shows belonging to current user
    shows.getShowsForUser(req.session.user.username, (err, shows) => {
      if (err) {
        console.log('failed to retrieve shows for user: ', err);
      } else {
        res.json(shows);
      }
    });
  }
});

router.get('/api/allshows', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    accounts.isManager(req.session.user.username, (err, isManager) => {
      if (isManager) {
        shows.getAllPublicShows((err, allShows) => {
          if (err) {
            res.status(400).send();
          } else {
            res.json(allShows);
          }
        });
      } else {
        res.status(400).send();
      }
    });
  }
});

// update details for one show
router.post('/api/updateShow', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    const showData = JSON.parse(req.body.show);
    shows.userHasAccessToShow(
      req.session.user.username,
      showData.id,
      hasAccess => {
        // user doesn't have access to this show
        if (!hasAccess) {
          console.log('user requested invalid show');
          res.status(400).send();
          return;
        }

        // map djs back to usernames
        let djUsernames = [];
        Object.keys(showData.djs).forEach(username => {
          djUsernames += username;
        });
        showData.djs = djUsernames;

        // return show with id belonging to logged in user
        const callback = function(err, show) {
          if (err) {
            console.log('error updating show: ', err);
          }

          if (show) {
            shows.getDJMappedShow(show.id, (err, o) => {
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
      }
    );
  }
});

// delete show
router.post('/api/deleteShow', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    shows.userHasAccessToShow(
      req.session.user.username,
      req.body.id,
      hasAccess => {
        // user doesn't have access to this show
        if (!hasAccess) {
          console.log('user requested invalid show');
          res.status(400).send();
          return;
        }

        shows.removeShow(req.body.id, e => {
          if (e) {
            console.log('error removing show: ', e);
            res.status(400).send(e);
          } else {
            res.json('success');
          }
        });
      }
    );
  }
});

router.post('/api/addShow', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    shows.addNewShow(
      req.body.title,
      req.body.day,
      req.body.time,
      [req.session.user.username],
      (err, saved) => {
        if (err) {
          console.log('failed to add show for user: ', err);
          res.json({ success: false, err });
        } else {
          // return full list of shows
          res.redirect('/panel/api/usershows');
        }
      }
    );
  }
});

router.post('/api/showPic', upload.single('img'), (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    shows.userHasAccessToShow(
      req.session.user.username,
      req.body.id,
      hasAccess => {
        if (!hasAccess) {
          res.status(400).send();
        } else {
          // user has access to update this show
          const errorCallback = function(err) {
            console.log('failed to add show picture: ', err);
            res.status(400).send(err);
          };

          const picture = handleUpload(req.file);

          // update show data with new pictures
          const newData = { picture };
          shows.updateShow(req.body.id, newData, (err, o) => {
            if (err) {
              errorCallback(err);
            } else {
              // updated successfully!
              res.json('success');
            }
          });
        }
      }
    );
  }
});

/** ELROND * */

router.get('/elrond', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    res.sendFile(path.resolve('client/public/panel/elrond.html'));
  }
});

router.get('/api/songs', (req, res) => {
  if (req.session.user == null) {
    // not logged in, redirect to log in page
    res.redirect('/panel');
  } else {
    rivendell.getSongs((err, o) => {
      if (o) {
        res.json({ songs: o.songs, time: o.time });
      } else {
        res.status(400).send();
      }
    });
  }
});

/** ACCOUNT MANAGEMENT */
router.get('/send-password-reset', (req, res) => {
  res.render('panel/check-email');
});

router.post('/send-password-reset', (req, res) => {
  if (req.body !== undefined) {
    accounts.forgotPassword(req.body.email); // if user entered email
    res.redirect('/panel/send-password-reset');
  } else {
    res.redirect('back'); // else, refresh page
  }
});

router.get('/password-did-reset', (req, res) => {
  res.render('panel/success-password');
});

// FORM TO SET A NEW PASSWORD
router.get('/set-password', (req, res) => {
  res.render('panel/new-password');
});

router.post('/set-password', (req, res) => {
  if (req.body !== undefined) {
    accounts.verifyNUpdatePassword(
      req.body.pass1,
      req.body.pass2,
      req.body.unique_id,
      function(message, success) {
        if (!success) res.render('panel/new-password', { errMsg: message });
        else res.redirect('/panel/password-did-reset');
      }
    );
  } else {
    res.redirect('back');
  }
});

module.exports = router;
