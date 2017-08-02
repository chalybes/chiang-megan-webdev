var app = require('../../../express');
var requestModel = require('./models/request.model.server');

app.get('/mouseOrder/all', findAllRequests);
app.post('/mouseOrder/order', createRequest);
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
    var lineId = req.params["lineId"];

    requestModel
        .updateLineRequest(lineId, line)
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



