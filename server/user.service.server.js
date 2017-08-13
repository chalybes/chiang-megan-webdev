var app = require('../express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// If undefined in our process load our local file
// (i.e. we aren't on an external server where we set these differently)
if(!process.env.GOOGLE_CLIENT_ID) {
    var env = require('../env.js');
}

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

passport.use("assignmentLocal",new LocalStrategy(localStrategy)); //tells passport to use LocalStrategy and where LocalStrategy is configured
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var userModel = require('./models/users/user.model.server');

// app.get('/api/assignment/user', findUserByCredentials);
app.get('/api/assignment/user', isAdmin, findAllUsers);
app.get('/api/assignment/:userId', findUserById);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', isAdmin, deleteUser);
app.delete('/api/assignment/unregister', unregister);

app.post  ('/api/assignment/login', passport.authenticate('assignmentLocal'), login);
app.get   ('/api/checkAdmin', checkAdmin);
app.get   ('/api/checkLoggedIn', checkLoggedIn);
app.post  ('/api/assignment/register', register);
app.post  ('/api/assignment/logout', logout);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

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

function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
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

    // if(user && bcrypt.compareSync(password, user.password)) {
    //     return done(null, user);
    // } else {
    //     return done(null, false);
    // }
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {  //asynchronous call, Passport doesn't support promises
                res.json(user);
            });
        });
}

function unregister(req, res) {
    userModel.deleteUser(req.user._id)
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



