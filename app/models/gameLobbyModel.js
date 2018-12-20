var mongoose = require('mongoose');
var gamesEnum = require("../lobbies/gamesenum");

var gameLobbySchema = mongoose.Schema({
    /*_id: { type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },*/
    color: String,
    gameType: String,
    startTime: Date,
    gameType: String,
    participants: []
},  { collection: 'GameLobbies' });

var GameLobby = module.exports = mongoose.model('GameLobbies', gameLobbySchema);

module.exports.getByColor = function (color) {
    return GameLobby.find({color: color});
};