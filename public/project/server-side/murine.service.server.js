var app = require('../../../express.js');
var murineModel = require('./models/murine.model.server');

app.get('/api/allines', findAllLines);
app.post('/api/newLine', createLine);
app.put('/api/updateLine', updateLine);
app.delete('/api/killine', deleteLine);

// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];

function createLine(req, res) {

}

function updateLine(req, res) {

}

function deleteLine(req, res) {

}

function findAllLines(req, res) {

}



