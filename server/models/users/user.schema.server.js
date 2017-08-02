var mongoose = require('mongoose');
mongoose.Promise = require("q").Promise;

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    google: {
        id:    String,
        token: String
    },
    email: String,
    phone: String,
    role: [{type: String, enum: ['USER', 'ADMIN']}],
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "userWebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}},
    {collection: "user"});

module.exports = userSchema;