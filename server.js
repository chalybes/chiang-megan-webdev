//From original server file DON'T DELETE
// var express = require('express');
// var app = express();

var app = require('./express.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret: "whatever random secret to hold place"}));
app.use(passport.initialize());
app.use(passport.session()); //tells passport to use the session already created ref: line 15


app.set('view engine', 'ejs');
// require('./utilities/filelist');

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

// require ("./test/app.js")(app);
// require ("./public/assignment/server/app.js")(app);

require ("./test/app.js");
require ("./server/app.js");

var port = process.env.PORT || 3000;

app.listen(port);