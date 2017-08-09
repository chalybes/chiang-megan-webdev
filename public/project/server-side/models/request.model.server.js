var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var requestSchema = require('./request.schema.server');
var requestModel = mongoose.model('RequestModel', requestSchema);

requestModel.createLineRequest = createLineRequest;
requestModel.deleteLineRequest = deleteLineRequest;
requestModel.updateLineRequest = updateLineRequest;
requestModel.findLineRequests = findLineRequests;
requestModel.findLineRequestById = findLineRequestById;

module.exports = requestModel;

function createLineRequest(line) {
    return requestModel.create(line);
}

function updateLineRequest(lineId, newLine) {
    return requestModel.update({_id: lineId}, {$set: newLine});
}

function deleteLineRequest(lineId) {
    return requestModel.remove({_id: lineId});
}

function findLineRequests() {
    return requestModel.find();
}

function findLineRequestById(lineId) {
    return requestModel.findById({_id: lineId});
}