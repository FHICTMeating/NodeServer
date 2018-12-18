var mongoose = require('mongoose');

var sequenceGameSchema = mongoose.Schema({
    /*_id: { type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },*/
    originalMessage: String,
    participants: []
},  { collection: 'SequenceGames' });

var GameLobby = module.exports = mongoose.model('SequenceGames', sequenceGameSchema);