var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    /*_id: { type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },*/
    color: String,
    present: Boolean,
    pushToken: Object,
},  { collection: 'Users' });

var User = module.exports = mongoose.model('Users', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};

module.exports.findById = function (userId, callback) {
    User.find({_id: userId}, callback)
};

module.exports.getByColor = function (color, callback) {
    User.find({color: color}, callback);
};

module.exports.getTokens = function (callback) {    
    User.find({}, 'pushToken', callback);
};

module.exports.getAllTokens = function (color, callback) {
    User.find({color: color}, 'pushToken', callback);
};