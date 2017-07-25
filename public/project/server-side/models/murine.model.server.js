var mongoose = require('mongoose');
var murineSchema = require('./murine.schema.server');

var murineModel = mongoose.model('MurineModel', murineSchema);
murineModel.createLine = createLine;
murineModel.deleteLine = deleteLine;
murineModel.updateLine = updateLine;
murineModel.findLines = findLines;

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

function findLines(lineId) {
    return murineModel.find({_id: lineId});
}