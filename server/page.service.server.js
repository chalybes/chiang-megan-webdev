var app = require('../express');
var pageModel = require('./models/pages/page.model.server');

app.get('/api/assignment/page/:pageId', findPageById);
app.get('/api/assignment/:websiteId', findPageByWebsiteId);
app.post('/api/assignment/:websiteId/page', createPage);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);

var pages = [{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
             { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
             { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }];

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = req.params.websiteId;
    pages.push(page);
    res.send(page);
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params.pageId;
    for (var p in pages) {
        if (pageId === pages[p]._id) {
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}

function findPageById(req, res) {

    var pageId = req.params['pageId'];

    var page = pages.find(function (page) {
        return page._id === pageId;
    });

    res.send(page);
}

function findPageByWebsiteId(req, res) {

    var websiteId = req.params['websiteId'];

    var results = [];

    for (var p in pages) {
        if (pages[p].websiteId === websiteId) {
            results.push(pages[p]);
        }
    }
    res.send(results);
}