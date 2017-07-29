// Example for using json keys
var fs = require('fs');
const KEYPATH = '186029965139-ea014dplbek4loi7bbk5eptijjmpm8id.apps.googleusercontent.com';
var json = fs.readFileSync(KEYPATH, 'utf8');
var key = JSON.parse(json).private_key;
module.exports.key = key;