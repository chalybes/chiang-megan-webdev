var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel", required: true},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: "userPageModel"}],
    dateCreated: {type: Date, default: Date.now}},
    {collection: 'userWebsite'});

module.exports = websiteSchema;