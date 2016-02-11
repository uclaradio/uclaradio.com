var mongoose = require('mongoose');
var fs = require('fs');
var helper_funcs = require('../routes/helper_funcs');
var crypto 		= require('crypto'); // encryption
// var moment 		= require('moment'); // dates

var db = {};

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	pass: String,
	email: String,
	djName: String,
	phone: String,
	privileges: [String]
}, {collection: 'User'});

var ShowSchema = new Schema({
	title: String,
	day: String,
	time: String,
	djs: [String], // collection of username strings
	genre: String,
	blurb: String,
	picture: String,
	thumbnail: String,
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


var UserModel = mongoose.model('User', UserSchema);

var ShowModel = mongoose.model('Show', ShowSchema);


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

// create a new user with the given user data
db.addNewAccount = function(username, pass, email, djName, callback) {
	newData = {
		"username": username,
		"email": email,
		"djName": djName
	};

	UserModel.findOne({username: newData.username}, function(err, o) {
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


/***** Shows *****/

// create a new show with the given data
db.addNewShow = function(title, day, time, djName, callback) {
	newData = {
		"title": title,
		"day": day,
		"time": time,
		"djName": djName
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
					});
				}
			});
		}
	});
}

db.updateShow = function(title, day, time, djs, genre, blurb, picture, thumbnail, pages, episodes, callback) {
	var newData = {
		"day": day,
		"time": time,
		"djs": djs,
		"genre": genre,
		"blurb": blurb,
		"picture": picture,
		"thumbnail": thumbnail,
		"pages": pages,
		"episodes": episodes
	};

	ShowModel.findOneAndUpdate({'title': title}, newData, {upsert:true, new:true}, function(err, o) {
    	if (err) return res.send(500, { error: err });
    	callback(null, o);
	});
};

db.getShowsForUser = function(djUsername, callback) {
	UserModel.find({djs: djUsername}).toArray(function(err, res) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, res);
		}
	});
};

db.getShow = function(title, callback) {
	ShowModel.findOne({title: title}, function(err, o) {
		if (o) {
			callback(o);
		}
	});
};


module.exports = db;