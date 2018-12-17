var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: String,
    color: String
},  { collection: 'Users' });

var User = module.exports = mongoose.model('Users', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};

module.exports.getByColor = function (color, callback) {
    User.find({color: color}, callback);
};