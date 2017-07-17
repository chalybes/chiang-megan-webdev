var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');

var pageModel = mongoose.model('userPageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findPageByWebsiteId = findPageByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(page) {
    return pageModel.create(page);
}

function findPageByWebsiteId(websiteId) {
    return pageModel.find({_website: websiteId})
}

function findPageById(pageId) {
    return pageModel.find({_id: pageId});
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {$set: newPage});
}

function deletePage(pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .deletePage(pageId);
        });
}