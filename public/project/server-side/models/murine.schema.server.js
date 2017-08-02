var mongoose = require('mongoose');

var murineSchema = mongoose.Schema({
        mouseline: {type: String, require: true},
        status: String,
        generation: String,
        litters: {type: Date},
        availability: String},
        {collection: "mouselines"});

module.exports = murineSchema;