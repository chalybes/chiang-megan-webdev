var app = require('../express');
var requestModel = require('./servermodels/murine.model.server');

app.get('/api/assignment/:userId', findAllRequests);
app.post('/api/order', createRequest);
app.put('/api/updateOrder', updateRequest);
app.delete('/api/cancel', deleteRequest);

// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];

function createRequest(req, res) {
    var line = req.body;

    requestModel.createLineRequest(line)
        .then(function (line) {
            res.json(line);
        })
}

function updateRequest(req, res) {
    var line = req.body;

    requestModel
        .updateLineRequest(userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function deleteRequest(req, res) {
    var line = req.body;

    requestModel
        .deleteLineRequest(line)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findAllRequests(req, res) {
    var lineId = req.params["lineId"];

    requestModel.findLineRequests(lineId).then(function (lineRequests) {
        res.send(lineRequests);
    });
}



