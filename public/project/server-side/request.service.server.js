var app = require('../express');
var requestModel = require('./models/murine.model.server');

app.get('/mouseOrder/all', findAllRequests);
app.post('/mouseOrder', createRequest);
app.put('/mouseOrder/update', updateRequest);
app.delete('/mouseOrder/delete', deleteRequest);

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

    requestModel.findLineRequests()
        .then(function (orderRequests) {
            res.send(orderRequests);
    });
}



