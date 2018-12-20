var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    /*_id: { type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },*/
    playerID: String,
    playerRole: String,
    pushID: Object,
    content: String
},  { collection: 'Players' });

var Player = module.exports = mongoose.model('Players', playerSchema);