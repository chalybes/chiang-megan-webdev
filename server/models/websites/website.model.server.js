var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var userModel = require('../users/user.model.server');

var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('userWebsiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;

module.exports = websiteModel;

function createWebsite(userId, website) {
    website._user = userId;
    // return websiteModel
    //     .create(website)
    //     .then(function (website) {
    //         return userModel
    //             .addWebsite(userId, website._id);
    //     });

    return websiteModel.create(website);
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId})
        .populate("_user")
        .exec();
}

function deleteWebsite(userId, websiteId) {
    return websiteModel.remove({_id: websiteId});
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {$set: newWebsite});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById({_id: websiteId});
}