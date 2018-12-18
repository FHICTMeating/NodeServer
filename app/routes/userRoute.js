var User = require('../models/userModel');
var colorTool = require('../colors/groupsingleton');
var lobbyTool = require('../lobbies/lobbyController');

module.exports = function(router) {

    //GET all applications
    router.get('/register', function (req, res){
        let user = new User();
        user.color = colorTool.getGroup();
        user.present = false;
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

    router.put('/isPresent/:userId', function (req, res) {
        User.findById(req.params.userId, function (err, user) {
            console.log("TTTTTTTTere");
            if (err){
                res.json(err);
            }else{
                if(user.length < 1){
                    throw "No user was found for the given ID"; 
                }
                user[0].present = true;

                lobbyTool.assignUserToLobby(user[0], res).then(() => {
                    console.log("Huzzah!");
                    User.update({_id: user[0]._id}, user[0], function (err) {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json({
                                message: 'Game joined and user updated',
                                data: user
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