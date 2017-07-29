var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
// userModel.addWebsite = addWebsite;

module.exports = userModel;

function createUser(user) {
    user.roles = ['USER'];
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username})
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password})
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, user) {
    delete user.username;
    delete user.password;
    return userModel.update({_id: userId}, {$set: user});
        // $set: { firstName: newUser.firstName,
        //         lastName: newUser.lastName,
        //         email: newUser.email,
        //         phone: newUser.phone }
}

// function addWebsite(userId, websiteId) {
//     return userModel
//         .findById(userId)
//         .then(function (user) {
//             user.websites.push(websiteId);
//             return user.save();
//         });
// }