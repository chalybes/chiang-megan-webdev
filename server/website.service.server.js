var app = require('../express');
var websiteModel = require('/server/models/website/website.model.server');

app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.post('api/assignment/user/:userId/website', createWebsite);

var websites = [{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }];


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

    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        })
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    website._user = userId;
    websiteModel
        .createWebsite(website)
        .then(function (website) {
            res.json(website);
        });
}