var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
        website: {type: mongoose.Schema.ObjectId, ref: "userWebsiteModel"},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "userWidgetModel"}],
        dateCreated: {type: Date, default: Date.now}},
        {collection: 'userPage'});

module.exports = pageSchema;