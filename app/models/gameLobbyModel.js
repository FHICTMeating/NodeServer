var mongoose = require('mongoose');

var gameLobbySchema = mongoose.Schema({
    /*_id: { type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },*/
    color: String,
    gameType: String,
    startTime: Date,
    participants: []
},  { collection: 'GameLobbies' });

var GameLobby = module.exports = mongoose.model('GameLobbies', gameLobbySchema);

module.exports.getByColor = function (color, callback) {
    GameLobby.find({color: color}, callback);
};