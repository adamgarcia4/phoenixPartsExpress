var jwt = require('express-jwt');
var config = require('../config');

//https://github.com/auth0/express-jwt

module.exports = jwt({secret: config.secret});