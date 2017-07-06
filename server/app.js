// module.exports = function(app) {

var app = require('../express');

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



