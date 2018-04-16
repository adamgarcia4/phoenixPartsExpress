// // Passport Dependencies
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

// // Model Dependency
var User = require("../auth/models/User.js");

passport.use(new localStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if(err) throw err;
            if(!user) {
                return(null, false, {message: 'Unknown User'});
            }
            User.comparePassword(password, user.password,function(err, isMatch) {
                if(err) throw err;
                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid Password'});
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;