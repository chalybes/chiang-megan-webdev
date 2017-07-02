//From original server file DON'T DELETE
// var express = require('express');
// var app = express();

var app = require('./express');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// require('./utilities/filelist');

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

// require ("./test/app.js")(app);
// require ("./public/assignment/server/app.js")(app);

require ("./test/app.js");
require ("./public/assignment/server/app.js");

var port = process.env.PORT || 3000;

app.listen(port);