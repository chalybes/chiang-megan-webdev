var app = require('../../../express.js');
var murineModel = require('./models/murine.model.server');

app.get('/api/allines', findAllLines);
app.get('/api/findLine/:lineId', findLineById);
app.post('/api/newLine', createLine);
app.put('/api/updateLine', updateLine);
app.delete('/api/killine', deleteLine);

function createLine(req, res) {
    var line = req.body;

    murineModel.createLine(line)
        .then(function (line) {
            res.json(line);
        });
}

function updateLine(req, res) {
    var line = req.body;
    var lineId = req.params["lineId"];

    murineModel.updateLine(lineId, line)
        .then(function (status) {
            res.send(status);
        });
}

function deleteLine(req, res) {
    var line = req.body;

    murineModel.deleteLine()
        .then(function (status) {
            res.sendStatus(200);
        });
}

function findAllLines(req, res) {
    murineModel.findAllLines()
        .then(function (lines) {
            res.send(lines);
        })
}

function findLineById(req, res) {
    var lineId = req.params["lineId"];

    murineModel.findLineById(lineId)
        .then(function (line) {
            res.json(line);
        });
}



