var passport = require('../../modules/passport');
var config = require('../../config');
var User = require('../models/user.model');


exports.me = function (req, res) {

	return res.status(200).send({user: req.user});
};

// Login
// Test Cases
// 1.  Wrong Username
// 2.  etc...
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

	// TODO: make better interface for extracting/ Validating body info by
	// TODO: extracting Form Data Here in better way.

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