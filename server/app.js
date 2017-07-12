//This file is the entry point to all server-side logic required to run this MEAN app
// module.exports = function(app) {

var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/test'); //tells where the mongodb connection is running

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



