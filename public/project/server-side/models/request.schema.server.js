var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
        username: String,
        strain: String,
        amount: Number,
        gender: {type: String, enum: ['male', 'female']},
        deadline: {type: Date},
        room: String,
        delivered: Boolean},
        {collection: "order"});

module.exports = requestSchema;