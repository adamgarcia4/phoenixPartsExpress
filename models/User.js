//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var salt = 'imsaltyaf7';
var Crypto = require('crypto');
var bcrypt = require('bcryptjs');


//Users Schema
var UserSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },
    firstName : String,
    lastName : String,
    admin: {
      type: Boolean,
      default: false
    }
});

//Auxiliary functions
UserSchema.methods.validPassword = function(password) {
  var comparePassword = hashUserPassword(password);

  if (comparePassword == this.password) {
    return true;
  } else {
    return false;
  }
};

//TODO: Implement Bcrypt instead of crypto for higher security
// function hashUserPassword(password) {
//   return Crypto
//     .createHash('sha1')
//     .update(salt + password + salt)
//     .digest("hex")
//     .substring(0,6);
// };

// return the model
module.exports = User = mongoose.model('User', UserSchema);

//TODO: CreateUser Function

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};

  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {

  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  }); 
}