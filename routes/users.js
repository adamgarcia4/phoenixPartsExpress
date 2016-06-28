var express = require('express');
var router = express.Router();
var firebase = require('../modules/firebase');

var usersRef = firebase.child("users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  //render view
  res.render('register');
});

router.get('/login', function(req, res, next) {
  //render view
  res.render('login');
});

//Register User
router.post('/register', function(req, res){
    console.log('post working!');
    
    //Capture user info
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    //Validate using checkBody (from body-parser middleware)
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(password);
    //console.log('check working');
    var errors = req.validationErrors();
    // res.render('register');    
    if(errors){
        res.render('register',{
            errors:errors
        });
    } else {
        var newUser = {
            "name" : name,
            "email" : email,
            "username" : username,
            "password" : password
        };
        //console.log(newUser);
        usersRef.push(newUser);
        res.redirect('login');
    }
});

module.exports = router;
