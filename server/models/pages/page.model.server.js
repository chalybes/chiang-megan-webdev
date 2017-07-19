var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('userPageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findPageByWebsiteId = findPageByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel.create(page);
}

function findPageByWebsiteId(websiteId) {
    return pageModel.find({_website: websiteId})
        .populate("_website")
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}