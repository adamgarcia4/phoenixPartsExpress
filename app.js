// App Starting Point

//*********Import Middlewares*************

//Framework Middleware
var express = require('express');

// Utility Middleware
require('dotenv').config();
var path = require('path');
var favicon = require('serve-favicon');

// Request/Response HTTP Middlewares
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Session/Passport Middleware
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Flash Message Handlers
var flash = require('connect-flash');

// View/templating Engine
var exphbs = require('express-handlebars');

// Establish routing handles
var routes = require('./routes/index');
var users = require('./routes/users');
var parts = require('./routes/parts');

//Initialize app
var app = express();



//******** MONGOOOSE Database Linking ********
var mongoose = require('mongoose');
var connectDBLink = process.env.MONGO_DB;
mongoose.connect(connectDBLink);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log("DB opened");
});



//***********View Engine Setup***************
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');



//***********Parser Middlewares****************

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico'))); //TODO: Favicon Doesn't work
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set static folder for WWW to use
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//*************Session Setup********************

// Express Session Initialization
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());


//************Connect Flash********************

app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); //passport sets its own errors to error
  res.locals.user = req.user || null;
  next();
});



//**********Routes Middleware******************
app.use('/', routes);
app.use('/users', users);
app.use('/parts', parts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



//***********Error Handlers***************

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
