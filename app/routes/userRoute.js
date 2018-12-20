var User = require('../models/userModel');
var colorTool = require('../colors/groupsingleton');
var lobbyTool = require('../lobbies/lobbyController');
var expo = require('../expo');

module.exports = function(router) {

    router.get('/register/:userId', function(req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err){
                res.status(500);
                res.json(err);
            }else{
                if(user.length > 0) {
                    res.status(204);
                } else {
                    res.status(404);
                }
                res.send();
            }
        });
    });
    
    router.post('/register', function (req, res){
        let user = new User();
        const pushToken = req.body.pushToken;


        user.color = colorTool.getGroup();
        user.present = false;
        user.pushToken = pushToken;
        user.save(function (err) {
            if (err){
                res.json(err);
            }else{
            res.json({
                message: 'New User created!',
                data: user
            });
        }
        });
    });

    router.post('/notification', function (req, res) {
        User.getTokens(function(err, tokens) {
            if (err){
                console.log(err);
            }else {
                expo.sendNotification(tokens, "A game is ready", "Click here to see the timer. You will get another notification when the game is ready", {gameStart: true})
            }
        });

    });

    router.put('/isPresent/:userId', function (req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err){
                res.json(err);
            }else{
                if(user.length < 1){
                    res.json("No user was found for the given ID");
                }
                user[0].present = true;

                lobbyTool.assignUserToLobby(user[0], res).then((result) => {
                    User.update({_id: user[0]._id}, user[0], function (err) {
                        if (err) {
                            res.json(err);
                        }else{
                            res.json({
                                message: 'Game joined and user updated',
                                data: result
                            });
                        }
                    });
                }).catch(error => {
                    res.json("Error: " + error);
                });
            }
        });
    });
};