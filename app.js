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

//Initialize app
var app = express();

//******** MONGOOOSE Database Linking ********
var mongo = require('./modules/mongoose')(app);
app.use(mongo);

//***********Parser Middlewares****************

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico'))); //TODO: Favicon Doesn't work
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
var expressValidator = require('express-validator');
app.use(expressValidator());

// Set static folder for WWW to use
app.use(express.static(path.join(__dirname, 'public')));

//**********Routes Middleware******************

// Establish routing handles
var users = require('./auth/user.route');
var parts = require('./routes/parts');

users(app);
// parts(app);

// TODO: given the current way that the routing middleware works, no next() is called.
// Thus, these middlewares are never called.
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


//***********Error Handlers***************

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {

		res.status(err.status || 500);
		res.send({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	console.log(err);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
