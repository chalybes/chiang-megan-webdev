//This file is the entry point to all server-side logic required to run the assignment MEAN app
// module.exports = function(app) {

var app = require('../../../express');
var q = require('q');
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test'); //tells where the mongodb connection is running

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local

if(process.env.MLAB_USER) { // check if running remotely
    var username = process.env.MLAB_USER; // get from environment
    var password = process.env.MLAB_PASS;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds161487.mlab.com:61487/heroku_hlfpq3hf'; // user yours
}

mongoose.connect(connectionString);

mongoose.Promise = q.Promise;

require('./murine.service.server');
require('./request.service.server');




