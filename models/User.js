//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var salt = 'imsaltyaf7';
var Crypto = require('crypto');


//Users Schema
var UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    dateCreated: { type: Date, default: Date.now},
    firstName : String,
    lastName : String,
    admin: {type: Boolean, default: false}
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

function hashUserPassword(password) {
  return Crypto
    .createHash('sha1')
    .update(salt + password + salt)
    .digest("hex")
    .substring(0,6);
};

// return the model
module.exports = User = mongoose.model('User', UserSchema);
