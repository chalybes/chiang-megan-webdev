var mongoose = require('mongoose');
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
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id);
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId});
        // .populate('_user')
        // .exec();
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(userId, websiteId);
        });
}

function updateWebsite(websiteId, newWebsite) {
    // delete newWebsite.name;
    // delete newWebsite.description;
    return websiteModel.update({_id: websiteId}, {$set: newWebsite});
}

function findWebsiteById(websiteId) {
    return websiteModel.find({_id: websiteId});
}