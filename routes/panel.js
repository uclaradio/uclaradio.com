var express = require('express');
var router = express.Router();
var db = require('../database/db');
var accounts = require('../database/dbAccounts.js');
var lwip = require('lwip');


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
	accounts.requestNewAccount(req.body['username'], req.body['pass'], req.body['email'], req.body['djName'], function(e) {
		if (e) {
			res.status(400).send(e);
		}
		else {
			res.redirect('/panel');
		}
	});
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
		accounts.userHasAccessToShow(req.session.user.username, req.params.id, function(hasAccess) {
			if (!hasAccess) {
				// user doesn't have access to this show
				console.log("user requested show they don't have access to");
				res.status(400).send();
				return;
			}
			else {
				accounts.getShowById(req.params.id, function(err, o) {
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
		var userData = {"username": user.username, "djName": user.djName, "email": user.email, "phone": user.phone};
		res.json(userData);
	}
});

router.get('/api/userlinks', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.status(400).send();
	}
	else {
		var user = req.session.user;
		// retrieve links relevent to user's privileges (like Manager pages)
		accounts.getPrivilegeLinksForUser(user.username, function(err, links) {
			if (links) {
				res.json(links);
			}
			else { res.status(400).send(err); }
		});
	}
});

router.post('/api/updateUser', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.status(400).send();
	}
	else {
		if (req.session.user.username != req.body.username) {
			res.status(400).send();
		}
		else {
			// update user info
			var callback = function(err, user) {
				if (err) { res.status(400).send(err); }
				else {
					var userData = {"username": user.username, "djName": user.djName, "email": user.email, "phone": user.phone};
					res.json(userData);
				}
			};
			accounts.updateAccount(req.body.username, req.body.email, req.body.djName, req.body.phone, callback);
		}
	}
});


/***** Show Info *****/

router.get('/api/shows', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		// return list of shows belonging to current user
		var callback = function(err, shows) {
			if (err) { console.log("failed to retrieve shows for user: ", err); }
			else {
				res.json(shows);
			}
		}
		accounts.getShowsForUser(req.session.user.username, callback);
	}
});

// update details for one show 
router.post('/api/updateShow', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		accounts.userHasAccessToShow(req.session.user.username, req.body.id, function(hasAccess) {
			// user doesn't have access to this show
			if (!hasAccess) {
				console.log("user requested invalid show");
				res.status(400).send();
				return;
			}

			// delete show
			if (req.body.delete) {
				accounts.removeShow(req.body.id, function (e) {
					if (e) { console.log("error removing show: ", e); res.status(400).send(e); }
					else { res.json("success"); }
				});
				return;
			}

			var djs = JSON.parse(req.body.djs);

			var newData = {
				"title": req.body.title,
				"day": req.body.day,
				"time": req.body.time,
				"djs": djs,
				"genre": req.body.genre,
				"blurb": req.body.blurb,
				"picture": req.body.picture,
				"thumbnail": req.body.thumbnail,
				"pages": req.body.pages,
				"episodes": req.body.episodes
			};
			// return show with id belonging to logged in user
			var callback = function(err, show) {
				if (err) { console.log("error updating show: ", err); }
				if (show) { res.json("success"); }
				else { res.status(400).send(); }
			}
			accounts.updateShow(req.body.id, newData, callback);
		});
	}
});

router.post('/api/addShow', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		var callback = function(err, saved) {
			if (err) { console.log("failed to add show for user: ", err); }

			if (saved) {
				// return full list of shows
				res.redirect('/panel/api/shows');
			}
			else { res.status(400).send(); }
		}
		// addNewShow = function(title, day, time, djs, callback) {
		accounts.addNewShow(req.body.title, req.body.day, req.body.time, [req.session.user.username], callback);
	}
});

router.post('/api/showPic', function(req, res) {
	if (req.session.user == null) {
		// not logged in, redirect to log in page
		res.redirect('/panel');
	}
	else {
		accounts.userHasAccessToShow(req.session.user.username, req.body.id, function(hasAccess) {
			if (!hasAccess) { res.status(400).send(); }

			else {
				// user has access to update this show
				var errorCallback = function(err) {
					console.log("failed to add show picture: ", err);
					res.status(400).send(err);
				}

				var picture = req.files.img.path.replace('public/', '/');
				var thumbnail = req.files.img.path.replace('public/', '/').replace('.jpg','thumbnail.jpg').replace('.png', 'thumbnail.png').replace('.jpeg', 'thumbnail.jpeg').replace('.gif', 'thumbnail.gif');

				// compress image
				lwip.open(req.files.img.path, function(err, image) {
					if (err) { errorCallback(err); }

					var options = { quality: 30 };

					image.writeFile('public/' + thumbnail, options , function(err) {
						if (err) { errorCallback(err); }

						// update show data with new pictures
						var newData = {"picture": picture, "thumbnail": thumbnail};
						accounts.updateShow(req.body.id, newData, function(err, o) {
							if (err) { errorCallback(err); }
							else {
								// updated successfully!
								res.json("success");
							}
						});
					});
				});
			}
		});
	}
});



module.exports = router;
