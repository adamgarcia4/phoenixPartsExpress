var express = require('express');
var router = express.Router();
var User = require("../models/User.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});



router.get('/login', function(req, res, next) {
  //render view
  res.render('login');
});

router.post('/login',function(req, res) {

    //capture input info
    var user = req.body.username;
    var pass = req.body.password;

    //validate using checkBody (from body-parser middleware)
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    pass = hashUserPassword(pass);

    var errors = req.validationErrors();
    //Redirect back to login if errors
   if(errors == null){
        res.render('login',{
            errors:errors
        });
    } else {
        console.log('login ready to be authenticated');
        
        User.findOne({'username' : user, 'password' : pass}, function (err, doc) {
            if(doc==null) {
                console.log('User not found')
                res.redirect('login'); //TODO: Error message not showing
            } else {
                console.log('user is: ' + doc.username);
                console.log('pass is: ' + doc.password);
                console.log('hi');
                res.redirect('login');
            }
        });
    };
});

router.get('/register', function(req, res, next) {
  //render view
  res.render('register');
});

//Register User
router.post('/register', function(req, res){
    console.log('post working!');
    
    //Capture user info
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    
    //Validate using checkBody (from body-parser middleware)
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(password);
    req.checkBody('firstName', 'First Name is required').notEmpty(); 
    req.checkBody('lastName' , 'Last Name is required').notEmpty();
    
    var errors = req.validationErrors();

    // res.render('register');    
    if(errors){
        res.render('register',{
            errors:errors
        });
    } else {
        //successful, so create schema and save.

        var newUser = User();
        newUser.email = email;
        newUser.username = username;
        newUser.password = hashUserPassword(password);
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        //save schema to db
        newUser.save(function (err, user) {
            if(err) {
                res.status(401).json({
                    status: false,
                    user: undefined,
                    message: err,
                });
            } else {
                res.status(200).json({
                    status: true,
                    user: newUser,
                    message: "Account successfully created!",
                });
            }
        });

        //res.redirect('login');
    }
});

//Enable hashing
var salt = 'imsaltyaf7';
var Crypto = require('crypto');
function hashUserPassword(password) {
  return Crypto
    .createHash('sha1')
    .update(salt + password + salt)
    .digest("hex")
    .substring(0,6);
};

module.exports = router;
