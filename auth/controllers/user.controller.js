
var passport = require('../../modules/passport');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config');


exports.authenticateUser = function(req,res) {
	console.log('Authenticate User time!');
};


exports.registerUser = function(req, res) {

	// TODO: make better interface for extracting body info
	// var hashedPassword = ;

	var registeredInfo = getRegisterData(req);
	console.log(registeredInfo);

	User.create(registeredInfo,
		function (err, user) {

			if (err) return res.status(500).send({
				body:"There was a problem registering the user`.",
				err: err
			});

			// if user is registered without errors create a token
			var token = jwt.sign({id: user._id}, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});

			res.status(200).send({auth: true, token: token});
		});


	console.log('Time to register a user!!');

	console.log(getRegisterData(req))
};






function getRegisterData(req) {

	// TODO: make function that allows us to exclude certain, or include certain properties, else return all.
	// Whitelist, blacklist...
	return {
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}
}


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
