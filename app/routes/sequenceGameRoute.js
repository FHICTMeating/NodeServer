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
                    if (thisPlayer.length > 0) {
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

    //To answer the solved statement
    router.post('/sequencegame/answer/:gameId', function (req, res) {
        var ranswer = req.body.answer;
        SequenceGame.findById(req.params.gameId, function (err, game) {
            if (err) {
                res.status(500);
                res.json(err);
            } else {
                if (game.length > 0) {
                    res.status(200);
                    game = game[0];
                    game.answer = ranswer;
                    game.save(function (err) {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json("Statement was answered");
                        }
                    });
                } else {
                    res.status(404);
                    res.send();
                }
            }
        });
    });

    //To solve the composition of the statement
    router.post('/sequencegame/:gameId', function (req, res) {
        var answer = req.body.answer;
        SequenceGame.findById(req.params.gameId, function (err, game) {
            if (err) {
                res.status(500);
                res.json(err);
            } else {
                if (game.length > 0) {
                    res.status(200);
                    game = game[0];
                    if (game.originalMessage.toLowerCase() == answer.toLowerCase()) {
                        res.json("Correct answer!");
                        game.solved = true;
                        game.save(function (err) {
                            if (err) {
                                res.json(err);
                            }
                        });
                    } else {
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