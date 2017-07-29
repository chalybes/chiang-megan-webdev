var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "userWebsiteModel", required: true},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "userWidgetModel"}],
        dateCreated: {type: Date, default: Date.now}},
        {collection: 'userPage'});

module.exports = pageSchema;