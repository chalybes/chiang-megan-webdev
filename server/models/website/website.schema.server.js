var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: "userModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}},
    {collection: 'userWebsite'});

module.exports = websiteSchema;