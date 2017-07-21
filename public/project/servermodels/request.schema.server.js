var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
        strain: {type: String, require: true},
        amount: Number,
        gender: {type: String, enum: ['male', 'female']},
        deadline: {type: Date}},
        {collection: "mousequest"});

module.exports = requestSchema;