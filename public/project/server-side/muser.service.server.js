var app = require('../../../express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var muserModel = require('./models/muser.model.server');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var gcal     = require('google-calendar');

if(!process.env.GOOGLE_CLIENT_ID) {
    var env = require('../../../env.js');
}

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID2,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET2,
        callbackURL: process.env.GOOGLE_CALLBACK_URL2,
        scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']
    },
    function(accessToken, refreshToken, profile, done) {

        google_calendar = new gcal.GoogleCalendar(accessToken);

        return done(null, profile);
    }
));

app.get('/auth',
    passport.authenticate('google', { session: false }));

app.all('/:calendarId/add', function(req, res) {

    if(!req.session.access_token) return res.redirect('/auth');

    var accessToken     = req.session.access_token;
    var calendarId      = req.params.calendarId;
    var text            = req.query.text || 'Hello World';

    gcal(accessToken).events.quickAdd(calendarId, text, function(err, data) {
        if(err) return res.send(500,err);
        return res.redirect('/'+calendarId);
    });
});

passport.use(new LocalStrategy(localStrategy)); //tells passport to use LocalStrategy and where LocalStrategy is configured
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post  ('/muser/login', passport.authenticate('local'), login);
app.get   ('/muser/authStat', checkLoggedIn);
app.get   ('/muser/checkAdmin', checkAdmin);
app.post  ('/muser/register', register);
app.post  ('/muser/logout', logout);

// app.get('/api/assignment/user', findUserByCredentials);
app.get('/muser/users', isAdmin, findAllUsers);
app.get('/muser/:userId', findUserById);
app.post('/muser/user', createUser);
app.put('/muser/user/:userId', updateUser);
app.delete('/muser/user/:userId', isAdmin, deleteUser);


function localStrategy(username, password, done) {
    muserModel
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

function createUser(req, res) {
    var user = req.body;

    muserModel.createUser(user)
        .then(function (user) {
            res.json(user);
        })
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params["userId"];

    muserModel
        .updateUser(userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    muserModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    muserModel
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

function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        muserModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        muserModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        muserModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}

function findUserById(req, res) {

    var userId = req.params['userId'];

    muserModel
        .findUserById(userId)
        .then(function (user) {
            res.send(user);
        });
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function checkAdmin(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;

    muserModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {  //asynchronous call, Passport doesn't support promises
                res.json(user);
            });
        });
}

function unregister(req, res) {
    muserModel.deleteUser(req.user._id)
        .then(function (status) {
            req.user.logout();
            res.sendStatus(200);
        });
}

//passes user object into cookie
function serializeUser(user, done) {
    done(null, user);
}

//retrieves user from cookie, searches for the user using its ID
function deserializeUser(user, done) {
    muserModel
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



