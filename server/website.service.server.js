var app = require('../express');
var websiteModel = require('./models/websites/website.model.server');

app.get('/api/assignment/:userId/website', findAllWebsitesForUser);
app.get("/api/assignment/website/:websiteId", findWebsiteById);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete("/api/assignment/website/:websiteId", deleteWebsite);

// var websites = [{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
//                 { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
//                 { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
//                 { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
//                 { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
//                 { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
//                 { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }];


function findAllWebsitesForUser(req, res) {
    // var resultSet = [];
    // var userId = req.params.userId;
    // for (var w in websites) {
    //     if (websites[w].developerId === userId) {
    //         // websites[w].created = new Date();
    //         // websites[w].updated = new Date();
    //         resultSet.push(websites[w]);
    //     }
    // }
    // res.json(resultSet);

    var userId = req.params["userId"];

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];

    websiteModel.findWebsiteById(websiteId)
        .then(function(website) {
            res.json(website);
        });
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;

    // website.user = userId;

    websiteModel
        .createWebsite(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = req.body;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function(status) {
            res.sendStatus(200);
        })
}


function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel
        .deleteWebsite(websiteId)
        .then(function(status) {
            res.sendStatus(200);
        });
}