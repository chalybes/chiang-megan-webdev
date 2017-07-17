var mongoose = require('mongoose');
var murineSchema = require('./murine.schema.server');

var murineModel = mongoose.model('MurineModel', murineSchema);
murineModel.createLine = createLine;
murineModel.deleteLine = deleteLine;
murineModel.updateLine = updateLine;

module.exports = murineModel;

function createLine(line) {
    return murineModel.create(line);
}

function deleteLine(lineId) {
    return murineModel.remove({_id: lineId});
}

function updateLine(lineId, newLine) {
    delete newLine.mouseline;
    return murineModel.update({_id: lineId}, {
        $set: { mouseline: newLine.mouseline,
                status: newLine.status,
                generation: newLine.generation,
                litters: newLine.litters,
                availability: newLine.availability }
    });
}