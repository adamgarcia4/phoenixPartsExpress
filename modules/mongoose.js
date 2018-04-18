// Mongoose connector

// Establish MongoDB Connection
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var connectDBLink = process.env.MONGO_DB;
mongoose.connect(connectDBLink);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
	console.log("DB opened");
});


module.exports = function (app) {

	console.log('haii');

	// TODO: Model initialization happening in ???: Trace call through route layout and document that here.


	return function (req, res, next) {
		// actual middleware

		// var parts = require('../routes/parts');
		// parts(req.app);
		// Move onto next middleware in Routing Flow
		next()
	}
};


// module.exports = function(req, res, next) {
//
// 	console.log("Mongoose middleware hit!");
//
//
// 	// Proceed
// 	next();
//
// }
//
// var myMiddleware = require('./lib/mymiddleware.js')(app);
// ...
// app.configure( function(){
// 	app.use( myMiddleware );
// 	...
// }

// var connectDBLink = process.env.MONGO_DB;
// mongoose.connect(connectDBLink);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
// 	console.log("DB opened");
// });

// 'use strict';
// module.exports = function(app) {
// 	var todoList = require('../controllers/partsController');
//
// 	// todoList Routes
// 	app.route('/tasks')
// 		.get(todoList.list_all_tasks)
// 		.post(todoList.create_a_task);
//
//
// 	app.route('/tasks/:taskId')
// 		.get(todoList.read_a_task)
// 		.put(todoList.update_a_task)
// 		.delete(todoList.delete_a_task);
// };