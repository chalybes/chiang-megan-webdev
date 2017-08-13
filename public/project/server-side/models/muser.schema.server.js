var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var muserSchema = mongoose.Schema({
        username: {type: String, require: true},
        password: {type: String, require: true},
        firstName: String,
        lastName: String,
        google: {
            id:    String,
            token: String
        },
        email: String,
        role: [{type: String, enum: ['USER', 'ADMIN']}],
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: "commentsModel"}],
        dateCreated: {type: Date, default: Date.now}},
        {collection: "muser"});

module.exports = muserSchema;