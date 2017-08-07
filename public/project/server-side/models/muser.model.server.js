var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var muserSchema = require('./muser.schema.server');
var muserModel = mongoose.model('muserModel', muserSchema);

muserModel.createUser = createUser;
muserModel.findAllUsers = findAllUsers;
muserModel.findUserById = findUserById;
muserModel.findUserByUsername = findUserByUsername;
muserModel.findUserByCredentials = findUserByCredentials;
muserModel.deleteUser = deleteUser;
muserModel.updateUser = updateUser;
// muserModel.findUserByGoogleId = findUserByGoogleId;

module.exports = muserModel;

function createUser(user) {
    user.roles = ['USER'];
    return muserModel.create(user);
}

function findAllUsers() {
    return muserModel.find();
}

function findUserById(userId) {
    return muserModel.findById(userId);
}

function findUserByUsername(username) {
    return muserModel.findOne({username: username})
}

function findUserByCredentials(username, password) {
    return muserModel.findOne({username: username, password: password})
}

function deleteUser(userId) {
    return muserModel.remove({_id: userId});
}

function updateUser(userId, user) {
    delete user.username;
    delete user.password;
    return muserModel.update({_id: userId}, {$set: user});
    // $set: { firstName: newUser.firstName,
    //         lastName: newUser.lastName,
    //         email: newUser.email,
    //         phone: newUser.phone }
}

// function findUserByGoogleId(googleId) {
//     return muserModel.findOne({'google.id': googleId});
// }