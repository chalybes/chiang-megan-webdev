var app = require('../express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(localStrategy)); //tells passport to use LocalStrategy and where LocalStrategy is configured
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


var userModel = require('./models/users/user.model.server');

app.get('/api/assignment/user', findUserByCredentials);
app.get('/api/assignment/:userId', findUserById);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);

app.post  ('/api/assignment/login', passport.authenticate('wam'), login);
app.get('/api/assignment/checkLoggedIn', checkLoggedIn);
app.post ('/api/assignment/register', register);
app.post ('/api/assignment/logout', logout);


// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];

function createUser(req, res) {
    var user = req.body;

    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        })
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params["userId"];

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (user !== null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

function findUserById(req, res) {

    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.send(user);
        });
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function register(req, res) {
    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {  //asynchronous call, Passport doesn't support promises
                res.json(user);
            });
        });
}

//passes user object into cookie
function serializeUser(user, done) {
    done(null, user);
}

//retrieves user from cookie, searches for the user using its ID
function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){  //if user exists, done
                done(null, user);
            },
            function(err){   //if user doesn't exist, error
                done(err, null);
            }
        );
}



