var mongoose = require('mongoose');
var fs = require('fs');
var helper_funcs = require('../routes/helper_funcs');
var crypto 		= require('crypto'); // encryption
// var moment 		= require('moment'); // dates
 
mongoose.connect('mongodb://192.241.193.240/local');

var db = {};

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	pass: String,
	email: String,
	djName: String
}, {collection: 'User'});

var UserModel = mongoose.model('User', UserSchema);


/***** User Account Management *****/

// log in a user with given name and password hash, with unspecific error msg
db.autoLogin = function(name, pass, callback) {
	UserModel.findOne({name: name}, function(err, o) {
		if (o && o.pass = pass) {
			// user logged in
			callback(o);
		}
		else {
			// no such user or wrong password
			callback(null);
		}
	});
}

// log in a user with given name and password, with 'invalid-pass' or 'user-not-found' error msg
db.manualLogin = function(name, pass, callback) {
	UserModel.findOne({name: name}, function(err, o) {
		if (o == null) {
			callback('user-not-found');
		}
		else {
			validatePassword(pass, o.pass, function(err, res) {
				if (res) {
					// successfully logged in
					callback(null, o);
				}
				else {
					callback('invalid-pass');
				}
			});
		}
	});
}

// create a new user with the given user data
db.addNewAccount = function(name, pass, email, djName, callback) {
	newData = {
		"name": name,
		"email": email,
		"djName": djName
	};

	UserModel.findOne({name: newData.name}, function(err, o) {
		if (o) {
			callback('username-taken');
		}
		else {
			UserModel.findOne({email: newData.email}, function(err, o) {
				if (o) {
					callback('email-taken');
				}
				else {
					saltAndHash(pass, function(hash) {
						// create new user
						newData.pass = hash;
						var newUser = new UserModel(newData);
						newUser.save(function(err, userSaved) {
							callback(err, userSaved);
						});
					})
				}
			});
		}
	});
}

// update email, djName on a user with the given name
db.updateAccount = function(name, email, djName, callback) {
	UserModel.findOne({name: name}, function(err, o) {
		o.email = email;
		o.djName = djName;

		UserModel.save(o, {safe: true}, function(err) {
			if (err) callback(err);
			else callback(null, o);
		});
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

// delete a user with the given id
db.deleteUser = function(id, callback) {
	UserModel.remove({_id: getObjectId(id)}, callback);
}

// perform callback on user with provided email
db.getUserByEmail = function(email, callback) {
	UserModel.findOne({email: email}, function(err, o) {
		callback(o);
	});
}

// return array of all users
db.getAllUsers = function(callback) {
	UserModel.find().toArray(function(err, res) {
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


module.exports = db;