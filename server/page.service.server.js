var app = require('../express');

var pageModel = require('./models/pages/page.model.server');

app.get('/api/assignment/page/:pageId', findPageById);
app.get('/api/page/:websiteId', findPageByWebsiteId);
app.post('/api/assignment/:websiteId/page', createPage);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);

var pages = [{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
             { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
             { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }];

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    // page._id = (new Date()).getTime() + "";
    // pages.push(page);
    // res.send(page);

    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params.pageId;

    pageModel
        .updatePage(pageId, page)
        .then(function(status) {
            res.sendStatus(200);
        });

    // for (var p in pages) {
    //     if (pageId === pages[p]._id) {
    //         pages[p] = page;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;

    pageModel
        .deletePage(pageId)
        .then(function(status) {
            res.sendStatus(200);
        });
    // var page = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    // var index = pages.indexOf(page);
    // pages.splice(index, 1);
    // res.sendStatus(200);
}

function findPageById(req, res) {

    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });

    // var page = pages.find(function (page) {
    //     return page._id === pageId;
    // });
    //
    // res.send(page);
}

function findPageByWebsiteId(req, res) {

    var websiteId = req.params["websiteId"];

    pageModel
        .findPageByWebsiteId(websiteId)
        .then(function (results) {
            res.json(results);
        });

    // var results = [];
    //
    // for (var p in pages) {
    //     if (pages[p].websiteId === websiteId) {
    //         results.push(pages[p]);
    //     }
    // }
    // res.send(results);
}