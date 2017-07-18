var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: "userPageModel"}],
    dateCreated: {type: Date, default: Date.now}},
    {collection: 'userWebsite'});

module.exports = websiteSchema;