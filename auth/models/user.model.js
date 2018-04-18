//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config');



//Users Schema
var UserSchema = new Schema({
	email: {
		type: String,
		// required: true
	},
	username: {
		type: String,
		// required: true,
		// unique: true
	},
	password: {
		type: String,
		required: true
	},
	dateCreated: {
		type: Date,
		default: Date.now
	},
	firstName: String,
	lastName: String,
	admin: {
		type: Boolean,
		default: false
	}
});

// Password Hashing Middleware
UserSchema.pre('save', function(next) {
	var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

// return the model
module.exports.model = User = mongoose.model('User', UserSchema);

//TODO: CreateUser Function

//Auxiliary functions


module.exports.saveUser = function (data) {
	var outer = this;

	return new Promise(function (resolve, reject) {

		outer.create(data, function (err, data) {
			if (err) {
				reject(err)
			} else {
				resolve(data);
			}
		})
	})
};

module.exports.getUserByEmail = function (email) {
	var query = {email: email};

	// Exec returns a promise
	return User.findOne(query).exec();
}

module.exports.getUserById = function (id, callback) {

	User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	return new Promise(function(resolve, reject) {
		bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
			if (err) return reject(err);
			resolve(isMatch);
		});
	})

};

// Creates token from user document
module.exports.createToken = function(user) {
	// TODO: Why can't I pass in the entire user object or create an auxilary function to remove sensitive info.

	var token = jwt.sign({id: user._id, email: user.email}, config.secret, {
		expiresIn: 86400 // expires in 24 hours
	});
	return token;
};


// module.exports.userSafe = function (userData) {
// 	var newData = userData;
// 	console.log(typeof userData);
// 	delete newData['email'];
// 	console.log(newData);
// 	return newData;
// };