var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var commentsSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "muserModel", required: true},
        title: String,
        comment: String,
        dateCreated: {type: Date, default: Date.now}},
        {collection: 'comments'});

module.exports = commentsSchema;