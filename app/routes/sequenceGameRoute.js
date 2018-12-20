var SequenceGame = require('../models/sequenceGameModel');

module.exports = function (router) {

    router.get('/sequencegame/:gameId/:userId', function (req, res) {
        SequenceGame.findById(req.params.gameId, function (err, game) {
            if (err) {
                res.status(500);
                res.json(err);
            } else {
                if (game.length > 0) {
                    game = game[0];
                    var thisPlayer = game.participants.filter(function (participant) {
                        return participant.playerID === req.params.userId;
                    });
                    if(thisPlayer.length > 0){
                        res.status(200);
                        res.json(thisPlayer[0]);
                    }
                } else {
                    res.status(404);
                    res.send();
                }
            }
        });
    });

    router.post('/sequencegame/:gameId', function (req, res) {
        var answer = req.body.answer;
        console.log("a: ", answer);
        SequenceGame.findById(req.params.gameId, function (err, game) {
            if (err) {
                res.status(500);
                res.json(err);
            } else {
                if (game.length > 0) {
                    res.status(200);
                    game = game[0];
                    console.log("om: ", game.originalMessage);
                    if(game.originalMessage.toLowerCase() == answer.toLowerCase()){
                        res.json("Correct answer!");
                    }else{
                        res.json("Wrong answer.");
                    }
                } else {
                    res.status(404);
                    res.send();
                }
            }
        });
    });
};