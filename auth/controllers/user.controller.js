var passport = require('../../modules/passport');
var config = require('../../config');
var User = require('../models/user.model');


exports.me = function (req, res) {

	return res.status(200).send({user: req.user});
};

// Login
// Test Cases
// 1.  Wrong Username
exports.authenticateUser = function (req, res) {
	console.log('Login User time!');

	//Validate using checkBody (from body-parser middleware)
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();

	// https://github.com/ctavan/express-validator#legacy-api
	var errList = req.validationErrors(true);
	if(errList) {
		return res.status(422).json(errList);
	}

	// Check if email and password fields here
	var data = {
		email: req.body.email,
		password: req.body.password
	};

	// TODO: Should I pull this out of controller and into model?
	User.model.findOne({email: data.email}).exec()
		.then(function (user) {

			if (user == null) return res.status(200).send({user: 'no user!'});

			User.comparePassword(data.password, user.password)
				.then(function (isMatch) {
					if (isMatch) return res.status(200).send({user: user, token: User.createToken(user)});
					else return res.status(200).send({user: null, err: 'No User found'});
				});
			//TODO; Add Catch into here
		});

	// User.getUserByEmail(req.body.email)
	// 	.then(function(data) {
	// 		console.log('data is: ',data);
	// 		return res.status(200).send({user: data});
	// 	})
	// 	.catch(function(err) {
	// 		console.log('err is: ',err);
	// 		return res.status(500).send({
	// 			body: "There was a problem logging in.",
	// 			err: err
	// 		});
	// 	});
};

exports.registerUser = function (req, res) {

	// TODO: make better interface for extracting/ Validating body info
	// Extract Form Data Here
	var data = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	};


	User.model.create(data)
		.then(function (user) {

			return res.status(200).send({auth: true, user: user, token: User.createToken(user)});
		})
		.catch(function (err) {
			console.log(err);
			// TODO: For standard error response return new Error(errMsg, body?) which checks if production mode or not.
			// If dev mode, console log errors.
			return res.status(500).send({
				body: "There was a problem registering the user`.",
				err: err
			});
		});
};

// TODO: make function that allows us to exclude certain, or include certain properties, else return all.


// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
//
//
// var VerifyToken = require('./VerifyToken');
//
// var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var bcrypt = require('bcryptjs');
// var config = require('../config'); // get config file
//
//
//
// var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
//
// var User = require('./models/user.model');
//
// router.post('/register', function (req, res) {
//
// 	console.log('1');
//
// 	var hashedPassword = bcrypt.hashSync(req.body.password, 8);
//
// 	console.log('2');
//
// 	User.create({
// 			firstName: req.body.firstName,
// 			email: req.body.email,
// 			password: hashedPassword
// 		},
// 		function (err, user) {
// 			console.log('3')
// 			if (err) return res.status(500).send({
// 				body:"There was a problem registering the user`.",
// 				err: err
// 			});
//
// 			// if user is registered without errors
// 			// create a token
// 			var token = jwt.sign({id: user._id}, config.secret, {
// 				expiresIn: 86400 // expires in 24 hours
// 			});
//
// 			res.status(200).send({auth: true, token: token});
// 		});
//
// });
//
//
// router.post('/login', function(req, res) {
//
// 	User.findOne({ email: req.body.email }, function (err, user) {
// 		if (err) return res.status(500).send('Error on the server.');
// 		if (!user) return res.status(404).send('No user found.');
//
// 		// check if the password is valid
// 		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
// 		if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
//
// 		// if user is found and password is valid
// 		// create a token
// 		var token = jwt.sign({ id: user._id }, config.secret, {
// 			expiresIn: 86400 // expires in 24 hours
// 		});
//
// 		// return the information including token as JSON
// 		res.status(200).send({ auth: true, token: token });
// 	});
//
// });
//
// router.get('/me', VerifyToken, function(req, res, next) {
//
// 	User.findById(req.userId, { password: 0 }, function (err, user) {
// 		if (err) return res.status(500).send("There was a problem finding the user.");
// 		if (!user) return res.status(404).send("No user found.");
// 		res.status(200).send(user);
// 	});
//
// });
//
//
// module.exports = router;


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


// module.exports = router;
