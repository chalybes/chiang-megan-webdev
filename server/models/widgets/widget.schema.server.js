var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
        page: {type: mongoose.Schema.ObjectId, ref: "userPageModel"},
        type: {type: String, default: "HEADING, IMAGE, YOUTUBE, HTML, INPUT"},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}},
        {collection: 'userWidget'});

module.exports = widgetSchema;