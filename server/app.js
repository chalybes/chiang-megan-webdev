//This file is the entry point to all server-side logic required to run the assignment MEAN app
// module.exports = function(app) {

var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
// mongoose.connect('mongodb://localhost/test'); //tells where the mongodb connection is running

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local

if(process.env.MLAB_USER) { // check if running remotely
    var username = process.env.MLAB_USER; // get from environment
    var password = process.env.MLAB_PASS;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds161487.mlab.com:61487/heroku_hlfpq3hf'; // user yours
}

mongoose.connect(connectionString);

require('./user.service.server');
require('./website.service.server');
require('./page.service.server');
require('./widget.service.server');

app.get('/goodbye', sayHello);
app.get('/websites', sendWebsites);

// req takes in request from client, res is the response to client
function sendWebsites(req, res) {
    var websites = [
        {name: 'facebook'},
        {name: 'linkedin'},
        {name: 'twitter'}
    ];
    res.send(websites);
}

function sayHello() {
    console.log('Goodbye');
}

// }



