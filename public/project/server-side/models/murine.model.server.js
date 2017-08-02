var mongoose = require('mongoose');
var murineSchema = require('./murine.schema.server');

var murineModel = mongoose.model('MurineModel', murineSchema);
murineModel.createLine = createLine;
murineModel.deleteLine = deleteLine;
murineModel.updateLine = updateLine;
murineModel.findAllLines = findAllLines;
murineModel.findLineById = findLineById;

module.exports = murineModel;

function createLine(line) {
    return murineModel.create(line);
}

function updateLine(lineId, newLine) {
    return murineModel.update({_id: lineId}, {$set: newLine});
}

function deleteLine(lineId) {
    return murineModel.remove({_id: lineId});
}

function findAllLines() {
    return murineModel.find();
}

function findLineById(lineId) {
    return murineModel.findById({_id: lineId});
}