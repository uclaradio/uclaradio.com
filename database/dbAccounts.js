var mongoose = require('mongoose');
var fs = require('fs');
var helper_funcs = require('../routes/helper_funcs');
var crypto     = require('crypto'); // encryption
// var moment     = require('moment'); // dates

var db = {};

var Schema = mongoose.Schema;

// Users (DJs)
var UserSchema = new Schema({
  username: String,
  fullName: String,
  pass: String,
  email: String,
  djName: String,
  picture: String, // relative url to image file
  phone: String
});
UserSchema.index({username: 1});
var UnverifiedUserModel = mongoose.model('unverifiedUsers', UserSchema);
var UserModel = mongoose.model('users', UserSchema);

// Radio shows to show on the site
var ShowSchema = new Schema({
  title: String,
  id: Number, // unique identifier
  day: String, // Mon / Tue / Wed / Thu / Fri / Sat / Sun
  time: String,
  djs: [String], // collection of username strings
  genre: String,
  blurb: String, // show description
  picture: String, // relative url to image file
  thumbnail: String,
  public: Boolean,
  // collection of page links (social media)
  pages: [{
    title: String,
    link: String
  }],
  // collection of specific episodes (probably many)
  episodes: [{
    date: Date,
    title: String,
    picture: String,
    link: String,
    description: String
  }]
});
ShowSchema.index({ id: 1});
var ShowModel = mongoose.model('shows', ShowSchema);

// Frequently Asked Questions
var FAQSchema = new Schema({
	id: Number,
	question: String,
	answer: String
});
var FAQModel = mongoose.model('faqs', FAQSchema);

var ManagerSchema = new Schema({
  username: String,
  position: String,
  meetingTime: String,
  meetingPlace: String,
  departmentInfo: String,
  public: Boolean
});
ManagerSchema.index({ id: 1});
var ManagerModel = mongoose.model('managers', ManagerSchema);

// User privileges (checked for access to manager pages, etc.)
var PrivilegeSchema = new Schema({
  name: String, // name of privilege
  users: [String], // users who have this privilege
  links: [{ // pages these users can access (should still check permission at each url)
    title: String,
    link: String
  }]
});
db.managerPrivilegeName = "Manager";
// db.developerPrivilegeName = "Developer";
var PrivilegeModel = mongoose.model('privileges', PrivilegeSchema);

// Contains last distributed id for a table, in order to provide a unique id for each show, etc.
var LastIdSchema = new Schema({
  key: String, // name of table
  lastId: Number // greatest id of objects created (should increment when creating new ones)
});
var showIdKey = "show"; // ids for Show table
var faqIdKey = "faq"; // ids for FAQ table
var LastIdModel = mongoose.model('lastIds', LastIdSchema);

// only include properties that are safe to send to the client
db.webSafeUser = function(user) {
  return {"username": user.username,
          "fullName": user.fullName,
            "djName": user.djName,
           "picture": user.picture,
             "email": user.email,
             "phone": user.phone};
};


/***** User Account Management *****/

// log in a user with given username and password hash, with unspecific error msg
db.autoLogin = function(username, pass, callback) {
  UserModel.findOne({username: username}, function(err, o) {
    if (o && o.pass == pass) {
      // user logged in
      callback(o);
    }
    else {
      // no such user or wrong password
      callback(null);
    }
  });
};

// log in a user with given username and password, with 'invalid-pass' or 'user-not-found' error msg
db.manualLogin = function(username, pass, callback) {
  UserModel.findOne({username: username}, function(err, o) {
    if (o == null) {
      callback('user-not-found');
      console.log("user not found: ", username);
    }
    else {
      validatePassword(pass, o.pass, function(err, res) {
        if (res) {
          // successfully logged in
          callback(null, o);
        }
        else {
          callback('invalid-pass');
          console.log("invalid pass");
        }
      });
    }
  });
};

// create a new verified or unverified user with the given user data
db.addNewAccount = function(accountType, userData, callback) {
  UserModel.findOne({username: userData.username}, function(err, o) {
    if (o) {
      callback('username-taken');
    }
    else {
      UserModel.findOne({email: userData.email}, function(err, o) {
        if (o) {
          callback('email-taken');
        }
        else {
          if (accountType === 'verified') {
            // new verified user (will have access to dj panel)
            var newUser = new UserModel(userData);
            newUser.save(function(err, userSaved) {
              callback(err, userSaved);
            });
          }
          else if (accountType === 'unverified') {
            // unverified user (will need to be verified before logging in)
            var newUnverifiedUser = new UnverifiedUserModel(userData);
            newUnverifiedUser.save(function(err, userSaved) {
              callback(err, userSaved);
            })
          }
        }
      });
    }
  });
};

// create new unverified user
db.requestNewAccount = function(username, pass, email, fullName, callback) {
  newData = {
    "username": username,
    "email": email,
    "fullName": fullName
  };
  saltAndHash(pass, function(hash) {
    newData.pass = hash;
    db.addNewAccount('unverified', newData, callback);
  });
};

// list all accounts, verified and unverified
db.listAccounts = function(callback) {
  // get verified 
  UnverifiedUserModel.find({}, function(err, accounts) {
    unverifiedUsers = [];
    for (var i = 0; i < accounts.length; i++) {
      var user = {"username": accounts[i].username, "fullName": accounts[i].fullName, "email": accounts[i].email};
      unverifiedUsers.push(user);
    }
    UserModel.find({}, function(err, verifiedAccounts) {
    	// also indicate if user is a manager
      PrivilegeModel.findOne({name: db.managerPrivilegeName}, function(err, o) {
        verifiedUsers = [];
        for (var i = 0; i < verifiedAccounts.length; i++) {
          var user = {"username": verifiedAccounts[i].username, "fullName": verifiedAccounts[i].fullName,
            "djName": verifiedAccounts[i].djName, "email": verifiedAccounts[i].email};
          if (o.users.indexOf(user.username) >= 0) {
            // user is a manager
            user.manager = true;
          }
          verifiedUsers.push(user);
        }
        callback(err, {"verified": verifiedUsers, "unverified": unverifiedUsers});
      });
    });
  });
};

// move account from unverified to verified
db.verifyAccount = function(username, callback) {
  UnverifiedUserModel.findOne({username: username}, function(err, o) {
    if (o) {
      UnverifiedUserModel.remove({username: username}, function (e) {
        if (e) { console.log("error removing unverified user after verification:", e); }
      });
      db.addNewAccount('verified', o, callback);
    }
    else {
      callback(err, null);
    }
  });
};

// update email, djName, etc. on a user with the given username
db.updateAccount = function(newData, callback) {
  UserModel.findOneAndUpdate({'username': newData.username}, newData, {upsert:false, new:true}, function(err, o) {
      if (err) { callback(err); }
      else { callback(null, o); }
  });
};

// update password for user with email
// db.updatePassword = function(email, newPass, callback) {
//   UserModel.findOne({email: email}, function(err, o) {
//     if (o) {
//       saltAndHash(newPass, function(hash) {
//         o.pass = hash;
//         UserModel.save(o, {safe: true}, callback);
//       });
//     }
//     else {
//       callback(err, null);
//     }
//   });
// };

// delete a user with the given username
db.deleteUser = function(username, callback) {
  UserModel.remove({username: username}, function (e) {
    callback(e);
  });
};

// delete an unverified user with the given id
db.deleteUnverifiedUser = function(username, callback) {
  console.log('attempting to delete user:', username);
  UnverifiedUserModel.remove({username: username}, function (e) {
    callback(e);
  });
};

// perform callback on user with provided email
// db.getUserByEmail = function(email, callback) {
//   UserModel.findOne({email: email}, function(err, o) {
//     callback(o);
//   });
// }

// perform callback on user with provided id
db.getDJNamesFromUsernames = function(usernames, callback) {
  console.log("finding usernames:", usernames);
  UserModel.find({username: {$in: usernames}}, function(err, users) {
    var djNames = [];
    for (var i = 0; i < users.length; i++) {
      djNames.push(users[i].djName);
    }
    callback(err, djNames);
  });
};

// return array of all users
db.getAllUsers = function(callback) {
  UserModel.find(function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res);
    }
  });
};

// remove all users
db.removeAllUsers = function(callback) {
  UserModel.remove({}, callback);
};

/***** FAQ *****/

db.updateFAQs = function(newFAQs, callback) {
	db.getAllFAQs(function(err, o) {
		if (o) {
			// remove any not in the new faqs
			var staleIds = [];
			var newIds = [];
			for (var i = 0; i < o.length; i++) {
				var old = o[i];
				staleIds.push(old.id);
			}
			for (var i = 0; i < newFAQs.length; i++) {
				var faq = newFAQs[i];
				if (staleIds.indexOf(faq.id) > -1) {
					staleIds.splice(staleIds.indexOf(faq.id), 1);
				}
				else {
					newIds.push(faq.id);
				}
			}
			// remove old stale faqs
			FAQModel.remove({id: {$in: staleIds}}, function(e) {
				if (e) { console.log("error removing faq:", e); }
			});
			// update and insert new faqs
			newFAQs.map(function(faq) {
				db.getNextAvailableId(faqIdKey, function(nextId) {
					var makeNewId = (newIds.indexOf(faq.id) > -1);
					if (makeNewId) {
						faq.id = nextId;
					}
					FAQModel.findOneAndUpdate({'id': faq.id}, faq, {upsert:true, new:true}, function(err, o) {
				    	if (err) { console.log("error updating faqs:", err); }
				    	else {
                db.setLastTakenId(faqIdKey, nextId, function(err) {
                  if (err) { console.log("error setting next id for faqs: ", err); }
                });
              }
					});
				});
			});
			callback(null, o);
		}
		else {
			callback(err);
		}

	});
};

// return array of all faq questions
db.getAllFAQs = function(callback) {
	FAQModel.find(function(err, res) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, res);
		}
	});
};

// delete a faq question with the given id
db.deleteFAQ = function(id, callback) {
	FAQModel.remove({id: id}, function (e) {
		callback(e);
	});
};

/***** Shows *****/

// create a new show with the given data
db.addNewShow = function(title, day, time, djs, callback) {
  db.getNextAvailableId(showIdKey, function(nextId) {
    // console.log("nextId: ", nextId);
    newData = {
      "title": title,
      "id": nextId,
      "day": day,
      "time": time,
      "djs": djs
    };

    ShowModel.findOne({title: newData.title}, function(err, o) {
      if (o) {
        callback('title-taken');
      }
      else {
        ShowModel.findOne({day: newData.day, time: newData.time}, function(err, o) {
          if (o) {
            callback('time-taken');
          }
          else {
            var newShow = new ShowModel(newData);
            newShow.save(function(err, saved) {
              callback(err, saved);
              if (saved) {
                db.setLastTakenId(showIdKey, nextId, function(err) {
                  if (err) { console.log("error setting next id for shows: ", err); }
                });
              }
            });
          }
        });
      }
    });
  });
};

db.updateShow = function(id, newData, callback) {
  ShowModel.findOneAndUpdate({'id': id}, newData, {upsert:false, new:true}, function(err, o) {
      if (err) { callback(err); }
      else { callback(null, o); }
  });
};

db.getShowsForUser = function(djUsername, callback) {
  ShowModel.find({djs: djUsername}, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res);
    }
  });
};

db.userHasAccessToShow = function(username, id, callback) {
  ShowModel.findOne({id: id, djs: username}, function(err, o) {
    if (o) { callback(true); }
    else { callback(false); }
  });
};

// db.getShow = function(id, callback) {
//   ShowModel.findOne({id: id}, function(err, o) {
//     callback(err, o);
//   });
// };

db.getShowByTitle = function(title, callback) {
  ShowModel.findOne({title: title}, function(err, o) {
    callback(err, o);
  });
};

db.getShowById = function(id, callback) {
  ShowModel.findOne({id: id}, function(err, o) {
    callback(err, o);
  });
};

// return array of all users
db.getAllShows = function(callback) {
  ShowModel.find(function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res);
    }
  });
};

db.removeShow = function(id, callback) {
  ShowModel.remove({id: id}, function (e) {
    callback(e);
  });
};



/***** Manager Info *****/

db.managerInfo = function(username, callback) {
  ManagerModel.findOne({username: username}, function(err, o) {
    if (!o && !err) {
      // need to create manager info for user
      var newData = {username: username};
      var newManager = new ManagerModel(newData);
      newManager.save(function(err, saved) {
        callback(err, saved);
      });
    }
    else {
      callback(err, o);
    }
  });
};

db.updateManager = function(manager, callback) {
  ManagerModel.findOneAndUpdate({username: manager.username}, manager, {upsert: true, new: true}, function(err, o) {
    callback(err, o);
  });
}

db.allManagers = function(callback) {
  ManagerModel.find({}, function(err, managers) {
    callback(err, managers);
  });
}



/***** Privileges *****/

db.addPrivilege = function(privilege, links, callback) {
  PrivilegeModel.findOneAndUpdate({name: privilege}, {links: links}, {upsert: true, new: true}, function(err, o) {
    if (err) {
      callback(err, false);
    }
    else {
      callback(null, true);
    }
  });
};

/**
*  Update the privileges table to give or take away a privilege for a user
*  ...
*  @param shoudlHave -> bool: user should get privilege
*  @param callback -> function(err, updated: bool)
*/
db.updatePrivilege = function(username, privilege, shouldHave, callback) {
  
  var update = shouldHave ? {$push: {users: username}} :  {$pull: {users: username}};

  PrivilegeModel.findOneAndUpdate({name: privilege}, update, {upsert: false}, function(err, o) {
    if (err) {
      console.log("error updating privilege: ", err);
      callback(err, false);
    }
    else {
      callback(null, true);
    }
  });
};

/**
*  Check if a user has a given privilege
*  ...
*  @param callback -> function(err, hasAccess: bool)
*/
db.checkPrivilege = function(username, privilege, callback) {
  PrivilegeModel.findOne({name: privilege}, function(err, o) {
    if (err) {
      console.log("error checking privilege:", err);
      callback(err, false);
    }
    else {
      if (o && o.users.indexOf(username) > -1) {
        // user has access
        callback(null, true);
      }
      else { callback(null, false); }
    }
  });
};

db.getPrivilegeLinksForUser = function(username, callback) {
  PrivilegeModel.find({users: username}, function(err, privileges) {
    if (err) { console.log("error getting privileges: ", err); }
    var links = [];
    for (var i = 0; i < privileges.length; i++) {
      links = links.concat(privileges[i].links);
    }
    callback(err, links);
  });
};

/***** Last Ids *****/

db.getNextAvailableId = function(key, callback) {
  LastIdModel.findOne({key: key}, function(err, o) {
    if (o) {
      callback(o.lastId + 1);
    }
    else {
      callback(1);
    }
  });
};

db.setLastTakenId = function(key, lastId, callback) {
  newData = {key: key, lastId: lastId};
  LastIdModel.findOneAndUpdate({key: key}, newData, {upsert: true, new:true}, function(err, o) {
    if (err) { callback(err); }
    else { callback(null); }
  });
};


/***** Encryption *****/

var generateSalt = function() {
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  var salt = '';
  for (var i = 0; i < 10; i++) {
    var p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
};

var md5 = function(str) {
  return crypto.createHash('md5').update(str).digest('hex');
};

var saltAndHash = function(pass, callback) {
  var salt = generateSalt();
  callback(salt + md5(pass + salt));
};

var validatePassword = function(plainPass, hashedPass, callback) {
  var salt = hashedPass.substr(0, 10);
  var validHash = salt + md5(plainPass + salt);
  callback(null, (hashedPass === validHash));
};


/***** Helper Methods *****/

var getObjectId = function(id) {
  UserModel.findOne({_id: getObjectId(id)}, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res);
    }
  });
};


module.exports = db;
