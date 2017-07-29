var mongoose = require('mongoose');

var requestSchema = require('./request.schema.server');
var requestModel = mongoose.model('RequestModel', requestSchema);

requestModel.createLine = createLineRequest;
requestModel.deleteLine = deleteLineRequest;
requestModel.updateLine = updateLineRequest;
requestModel.findLinesById = findLineRequests;

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