var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
        personame: String,
        strain: String,
        amount: Number,
        gender: {type: String, enum: ['male', 'female']},
        deadline: {type: Date},
        room: String,
        delivered: Boolean},
        {collection: "orders"});

module.exports = requestSchema;