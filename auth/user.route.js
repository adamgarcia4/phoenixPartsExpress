'use strict';
module.exports = function(app) {
	var usersController = require('./controllers/user.controller');

	// todoList Routes
	app.route('/logintest')
		.post(usersController.authenticateUser);
	app.route('/register')
		.post(usersController.registerUser);

	// app.route('/register')
	// 	.post(usersController.registerUser);


	// app.route('/users/:taskId')
	// 	.get(todoList.read_a_task)
	// 	.put(todoList.update_a_task)
	// 	.delete(todoList.delete_a_task);
};

//
// // Users.js--Route Handler
// //********Import Dependencies************
//
// var express = require('express');
// var router = express.Router();
//
// // Passport Dependencies
// var passport = require('passport');
// var localStrategy = require('passport-local').Strategy;
//
// // Model Dependency
// var User = require("../models/User.js");
//

//
// //************Passport Strategy Setup*************
//
// passport.use(new localStrategy(
//     function(username, password, done) {
//         User.getUserByUsername(username, function(err, user) {
//             if(err) throw err;
//             if(!user) {
//                 return(null, false, {message: 'Unknown User'});
//             }
//             User.comparePassword(password, user.password,function(err, isMatch) {
//                 if(err) throw err;
//                 if(isMatch) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false, {message: 'Invalid Password'});
//                 }
//             });
//         });
//     }
// ));
//
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.getUserById(id, function(err, user) {
//     done(err, user);
//   });
// });
//
// //**************Routes*****************

//
//
//
//     // router.post('/login',function(req, res) {
//
// //****************Register*********************
//
// router.get('/register', function(req, res, next) {
//   //render view
//   res.render('register');
// });
//
// //Register User
// router.post('/register', function(req, res){
//     console.log('post working!');
//
//     //Capture user info
//     var email = req.body.email;
//     var username = req.body.username;
//     var password = req.body.password;
//     var password2 = req.body.password2;
//     var firstName = req.body.firstName;
//     var lastName = req.body.lastName;
//
//
//     //Validate using checkBody (from body-parser middleware)
//     req.checkBody('email', 'Email is required').notEmpty();
//     req.checkBody('email', 'Email is not valid').isEmail();
//     req.checkBody('username', 'Username is required').notEmpty();
//     req.checkBody('password', 'Password is required').notEmpty();
//     req.checkBody('password2', 'Password is required').notEmpty();
//     req.checkBody('password2', 'Passwords do not match').equals(password);
//     req.checkBody('firstName', 'First Name is required').notEmpty();
//     req.checkBody('lastName' , 'Last Name is required').notEmpty();
//
//     var errors = req.validationErrors();
//
//     // res.render('register');
//     if(errors){
//     	console.log('error!');
// 	    res.status(404)        // HTTP status 404: NotFound
// 		    .send('Not found');
//         // res.render('register',{
//         //     errors:errors
//         // });
//     } else {
//     	console.log('yay!');
//         //successful, so create schema and save.
//         var newUser = User();
//         newUser.email = email;
//         newUser.username = username;
//         newUser.password = password;
//         newUser.firstName = firstName;
//         newUser.lastName = lastName;
//
//         //save schema to db
//         User.createUser(newUser, function(err, user) {
//             if(err) throw err;
//             console.log(user);
//         });
//
//         req.flash('success_msg', 'You are registered and can now login');
//         res.redirect('login');
//     }
// });
//
//
//
// //****************Logout************************
//
// router.get('/logout', function(req, res) {
//     req.logout();
//
//
//     req.flash('success_msg', 'You are logged out');
//
//     res.redirect('login');
// })
//
//
// module.exports = router;