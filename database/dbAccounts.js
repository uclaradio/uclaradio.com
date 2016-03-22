var mongoose = require('mongoose');
var fs = require('fs');
var helper_funcs = require('../routes/helper_funcs');
var crypto 		= require('crypto'); // encryption
// var moment 		= require('moment'); // dates

var db = {};

var Schema = mongoose.Schema;

// Users (DJs)
var UserSchema = new Schema({
	username: String,
	pass: String,
	email: String,
	djName: String,
	phone: String
});

// Radio shows to show on the site
var ShowSchema = new Schema({
	title: String,
	id: Number,
	day: String,
	time: String,
	djs: [String], // collection of username strings
	genre: String,
	blurb: String,
	picture: String,
	thumbnail: String,
	public: Boolean,
	pages: {
		title: String,
		link: String
	},
	episodes: {
		date: Date,
		title: String,
		picture: String,
		link: String,
		description: String
	}
});

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

// Contains last distributed id for a table, in order to provide a unique id for each show, etc.
var LastIdSchema = new Schema({
	key: String, // name of table
	lastId: Number // greatest id of objects created (should increment when creating new ones)
});
var showIdKey = "show"; // ids for Show table

var UnverifiedUserModel = mongoose.model('unverifiedUsers', UserSchema);
var UserModel = mongoose.model('users', UserSchema);

var ShowModel = mongoose.model('shows', ShowSchema);

var PrivilegeModel = mongoose.model('privileges', PrivilegeSchema);

var LastIdModel = mongoose.model('lastIds', LastIdSchema);


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
}

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
}

// create a new unverified user with the given user data
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
}

db.requestNewAccount = function(username, pass, email, djName, callback) {
	newData = {
		"username": username,
		"email": email,
		"djName": djName
	};
	saltAndHash(pass, function(hash) {
		newData.pass = hash;
		db.addNewAccount('unverified', newData, callback);
	});
}

db.listAccounts = function(callback) {
	// get verified 
	UnverifiedUserModel.find({}, function(err, accounts) {
		unverifiedUsers = [];
		for (var i = 0; i < accounts.length; i++) {
			var user = {"username": accounts[i].username, "email": accounts[i].email};
			unverifiedUsers.push(user);
		}
		UserModel.find({}, function(err, verifiedAccounts) {
			verifiedUsers = [];
			for (var i = 0; i < verifiedAccounts.length; i++) {
				var user = {"username": verifiedAccounts[i].username, "email": verifiedAccounts[i].email};
				verifiedUsers.push(user);
			}
			callback(err, {"verified": verifiedUsers, "unverified": unverifiedUsers});
		});
	});
}

db.verifyAccount = function(username, callback) {
	UnverifiedUserModel.findOne({username: username}, function(err, o) {
		if (o) {
			db.addNewAccount('verified', o, callback);
			UnverifiedUserModel.remove({username: username});
		}
		else {
			callback(err, null);
		}
	});
}

// update email, djName on a user with the given username
db.updateAccount = function(username, email, djName, phone, callback) {
	var newData = {"email": email, "djName": djName, "phone": phone};
	UserModel.findOneAndUpdate({'username': username}, newData, {upsert:false, new:true}, function(err, o) {
    	if (err) return res.send(500, { error: err });
    	callback(null, o);
	});
}

// update password for user with email
db.updatePassword = function(email, newPass, callback) {
	UserModel.findOne({email: email}, function(err, o) {
		if (o) {
			saltAndHash(newPass, function(hash) {
				o.pass = hash;
				UserModel.save(o, {safe: true}, callback);
			});
		}
		else {
			callback(err, null);
		}
	});
}

// delete a user with the given username
db.deleteUser = function(username, callback) {
	UserModel.remove({username: username}, function (e) {
		callback(e);
	});
}

// delete an unverified user with the given id
db.deleteUnverifiedUser = function(username, callback) {
	console.log('attempting to delete user:', username);
	UnverifiedUserModel.remove({username: username}, function (e) {
		callback(e);
	});
}

// perform callback on user with provided email
// db.getUserByEmail = function(email, callback) {
// 	UserModel.findOne({email: email}, function(err, o) {
// 		callback(o);
// 	});
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
}

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
}

// remove all users
db.removeAllUsers = function(callback) {
	UserModel.remove({}, callback);
}


/***** Encryption *****/

var generateSalt = function() {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback) {
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback) {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, (hashedPass === validHash));
}


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
}


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
}

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
// 	ShowModel.findOne({id: id}, function(err, o) {
// 		callback(err, o);
// 	});
// };

db.getShowByTitle = function(title, callback) {
	ShowModel.findOne({title: title}, function(err, o) {
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
}

db.removeShow = function(id, callback) {
	ShowModel.remove({id: id}, function (e) {
		callback(e);
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
}

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
}

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
}

db.getPrivilegeLinksForUser = function(username, callback) {
	PrivilegeModel.find({users: username}, function(err, privileges) {
		if (err) { console.log("error getting privileges: ", err); }
		var links = [];
		for (var i = 0; i < privileges.length; i++) {
			links = links.concat(privileges[i].links);
		}
		callback(err, links);
	});
}

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

module.exports = db;