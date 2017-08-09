var app = require('../../../express');
var requestModel = require('./models/request.model.server');

app.get('/mouseOrder/all', findAllRequests);
app.get('/mouseOrder/:orderId', findRequestById);
app.post('/mouseOrder/order', createRequest);
app.put('/mouseOrder/update/:orderId', updateRequest);
app.delete('/mouseOrder/delete/:orderId', deleteRequest);

function createRequest(req, res) {
    var line = req.body;

    requestModel.createLineRequest(line)
        .then(function (line) {
            res.json(line);
        })
}

function updateRequest(req, res) {
    var order = req.body;
    var orderId = req.params["orderId"];

    requestModel
        .updateLineRequest(orderId, order)
        .then(function (status) {
            res.send(status);
        });
}

function deleteRequest(req, res) {
    var orderId = req.params["orderId"];

    requestModel
        .deleteLineRequest(orderId)
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

function findRequestById(req, res) {

    var orderId = req.params["orderId"];

    requestModel.findLineRequestById(orderId)
        .then(function (order) {
            res.json(order);
        });
}



