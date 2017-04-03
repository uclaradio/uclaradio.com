// accounts.js
// Data model for staff user accounts and privilege management

// connect to database
require('./db');

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var fs = require('fs');

var mail = require('../services/mail');

var accounts = {};

// Users (DJs)
var UserSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  pass: String,
  email: String,
  djName: String,
  picture: String, // relative url to image file
  phone: String,
  bio: String
});
UserSchema.index({username: 1});
var UnverifiedUserModel = mongoose.model('unverifiedUsers', UserSchema);
var UserModel = mongoose.model('users', UserSchema);

// Manager info for Manager Board
var ManagerSchema = new mongoose.Schema({
  username: String,
  position: String,
  email: String,
  meetingTime: String,
  meetingPlace: String,
  departmentInfo: String,
  public: Boolean
});
ManagerSchema.index({ id: 1});
var ManagerModel = mongoose.model('managers', ManagerSchema);

// User privileges (checked for access to manager pages, etc.)
var PrivilegeSchema = new mongoose.Schema({
  name: String, // name of privilege
  users: [String], // users who have this privilege
  links: [{ // pages these users can access (should still check permission at each url)
    title: String,
    link: String
  }]
});
accounts.managerPrivilegeName = "Manager";
// accounts.developerPrivilegeName = "Developer";
var PrivilegeModel = mongoose.model('privileges', PrivilegeSchema);


// only include properties that are safe to send to the client
accounts.webSafeUser = function(user) {
  return {"username": user.username,
    "fullName": user.fullName,
    "djName": user.djName,
    "picture": user.picture,
    "email": user.email,
    "phone": user.phone,
    "bio":  user.bio};
};

accounts.webSafeManager = function(manager) {
  return {username: manager.username,
    position: manager.position,
    email: manager.email,
    meetingTime: manager.meetingTime,
    meetingPlace: manager.meetingPlace,
    departmentInfo: manager.departmentInfo,
    public: manager.public};
}

/***** User Account Management *****/

// log in a user with given username and password hash, with unspecific error msg
accounts.autoLogin = function(username, pass, callback) {
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
accounts.manualLogin = function(username, pass, callback) {
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
accounts.addNewAccount = function(accountType, userData, callback) {
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
accounts.requestNewAccount = function(username, pass, email, fullName, callback) {
  newData = {
    "username": username,
    "email": email,
    "fullName": fullName
  };
  saltAndHash(pass, function(hash) {
    newData.pass = hash;
    accounts.addNewAccount('unverified', newData, callback);
  });
};

// list all accounts, verified and unverified
accounts.listAccounts = function(callback) {
  // get verified 
  UnverifiedUserModel.find({}, function(err, unverifiedAccounts) {
    unverifiedUsers = [];
    for (var i = 0; i < unverifiedAccounts.length; i++) {
      var user = {"username": unverifiedAccounts[i].username, "fullName": unverifiedAccounts[i].fullName, "email": unverifiedAccounts[i].email};
      unverifiedUsers.push(user);
    }
    UserModel.find({}, function(err, verifiedAccounts) {
      // also indicate if user is a manager
      PrivilegeModel.findOne({name: accounts.managerPrivilegeName}, function(err, privilegeUsers) {
        verifiedUsers = [];
        for (var i = 0; i < verifiedAccounts.length; i++) {
          var user = accounts.webSafeUser(verifiedAccounts[i]);
          if (privilegeUsers != null && privilegeUsers.users.indexOf(user.username) >= 0) {
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
accounts.verifyAccount = function(username, callback) {
  UnverifiedUserModel.findOne({username: username}, function(err, o) {
    if (o) {
      UnverifiedUserModel.remove({username: username}, function (e) {
        if (e) { console.log("error removing unverified user after verification:", e); }
        var verifiedUser = {username: o.username, email: o.email, fullName: o.fullName, pass: o.pass};
        accounts.addNewAccount('verified', verifiedUser, function(err, saved) {
          if (saved) {
            // account verified! let them know with an email
            mail.confirmAccount(o.email, o.username);
          }
          callback(err, saved);
        });
      });
    }
    else {
      callback(err, null);
    }
  });
};

// update email, djName, etc. on a user with the given username
accounts.updateAccount = function(newData, callback) {
  var update = function() {
    UserModel.findOneAndUpdate({'username': newData.username}, newData, {upsert:false, new:true}, function(err, o) {
      if (err) { callback(err); }
      else { callback(null, accounts.webSafeUser(o)); }
    });
  };

  UserModel.findOne({'username': newData.username}, function(err, o) {
    if (o) {
      if (o.picture !== newData.picture) {
        var path = require('path');
        fs.unlink(path.resolve('public'+o.picture), function() {
          update();
        });
      }
      else {
        update();
      }
    }
    else { callback(err); }
  });
};

// update password for user with email
// accounts.updatePassword = function(email, newPass, callback) {
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
accounts.deleteUser = function(username, callback) {
  UserModel.remove({username: username}, function (e) {
    callback(e);
  });
};

// delete an unverified user with the given id
accounts.deleteUnverifiedUser = function(username, callback) {
  console.log('attempting to delete user:', username);
  UnverifiedUserModel.remove({username: username}, function (e) {
    callback(e);
  });
};

// perform callback on user with provided email
// accounts.getUserByEmail = function(email, callback) {
//   UserModel.findOne({email: email}, function(err, o) {
//     callback(o);
//   });
// }

// perform callback on user with provided id
accounts.getDJNamesFromUsernames = function(usernames, callback) {
  UserModel.find({username: {$in: usernames}}, function(err, users) {
    var djNames = [];
    if (users != null) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].djName) {
          djNames.push(users[i].djName);
        }
      }
    }
    callback(err, djNames);
  });
};

accounts.getDJNameMap = function(usernames, callback) {
  UserModel.find({username: {$in: usernames}}, function(err, users) {
    if (err) {
      console.log(err);
      callback(err);
    }
    else {
      // create a dictionary of all users username->djName
      var nameMap = {};
      users.map(function(u) {
        if (u.djName != null && u.djName.trim()) {
          nameMap[u.username] = u.djName;
        } else {
          nameMap[u.username] = u.username;
        }
      });
      callback(null, nameMap);
    }
  });
}

accounts.getDJByUserName = function (username, callback) {
  UserModel.findOne({username: username}, function(err, o){
    if( err || o == null) {
      console.log(err);
      callback(err);
    }
    else {
      var user = accounts.webSafeUser(o);
      callback(err, user);
    }
  });
}

// return array of all users
accounts.getAllUsers = function(callback) {
  UserModel.find(function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var users = [];
      for (var i = 0; i < res.length; i++) {
        users.push(accounts.webSafeUser(res[i]));
      }
      callback(null, users);
    }
  });
};

// remove all users
accounts.removeAllUsers = function(callback) {
  UserModel.remove({}, callback);
};


/***** Manager Info *****/

accounts.promoteToManager = function(username, callback) {
  accounts.updatePrivilege(username, accounts.managerPrivilegeName, true, function(err, saved) {
    if (saved) {
      UserModel.findOne({'username': username}, function(err, o) {
        if (saved && o) {
          // user was successfully promoted. Let them know with an email!
          console.log("emailing", username);
          mail.confirmManager(o.email);
        }
        else {
          console.log("didn't email");
        }
        callback(err, saved);
      })
    }
  });
}

accounts.isManager = function(username, callback) {
  accounts.checkPrivilege(username, accounts.managerPrivilegeName, callback);
}

accounts.managerInfo = function(username, callback) {
  ManagerModel.findOne({username: username}, function(err, o) {
    if (!o && !err) {
      // need to create manager info for user
      var newData = {username: username};
      var newManager = new ManagerModel(newData);
      newManager.save(function(err, saved) {
        callback(err, accounts.webSafeManager(saved));
      });
    }
    else {
      callback(err, accounts.webSafeManager(o));
    }
  });
};

accounts.updateManager = function(manager, callback) {
  ManagerModel.findOneAndUpdate({username: manager.username}, manager, {upsert: true, new: true}, function(err, o) {
    callback(err, accounts.webSafeManager(o));
  });
}

// get all managers with user data too (name, pictures, show)
accounts.allManagers = function(callback) {
  ManagerModel.find({}, function(err, managers) {
    if (err) { callback(err); }
    else {
      var usernames = [];
      managers.map(function(m) {
        usernames.push(m.username);
      });
      UserModel.find({username: {$in: usernames}}, function(err, users) {
        if (err) { callback(err, null); }
        else {
          var nameMap = {};
          var pictureMap = {};
          users.map(function(u) {
            nameMap[u.username] = u.fullName;
            pictureMap[u.username] = u.picture;
          });
          managers.map(function(m) {
            m.name = nameMap[m.username];
            m.picture = pictureMap[m.username];
          });
          callback(err, managers);
        }
      });
    }
  });
}



/***** Privileges *****/

accounts.addPrivilege = function(privilege, links, callback) {
  PrivilegeModel.findOneAndUpdate({name: privilege}, {links: links, users: []}, {upsert: true, new: true}, function(err, o) {
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
accounts.updatePrivilege = function(username, privilege, shouldHave, callback) {
  
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
accounts.checkPrivilege = function(username, privilege, callback) {
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

accounts.getPrivilegeLinksForUser = function(username, callback) {
  PrivilegeModel.find({users: username}, function(err, privileges) {
    if (err) { console.log("error getting privileges: ", err); }
    var links = [];
    for (var i = 0; i < privileges.length; i++) {
      links = links.concat(privileges[i].links);
    }
    callback(err, links);
  });
};


/***** Encryption *****/

var saltRounds = 10;
var saltAndHash = function(pass, callback) {
  bcrypt.hash(pass, saltRounds, function(err, hash) {
    if (err) { console.log("error hashing", err); }
    callback(hash);
  });
};

var validatePassword = function(plainPass, hashedPass, callback) {
  bcrypt.compare(plainPass, hashedPass, function(err, correct) {
    if (err) { console.log("error validating hash:", err); }
    callback(null, correct);
  });
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


module.exports = accounts;
