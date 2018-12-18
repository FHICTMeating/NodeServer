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
            if (err){
                res.json(err);
            }else{
                if(user.length < 0){
                    throw "No user was found for the given ID"; 
                }
                user[0].present = true;

                //lobbyTool.assignUserToLobby(user);

                User.update({_id: user[0]._id}, user[0], function (err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({
                            message: 'User updated!',
                            data: user
                        });
                    }
                });
            }
        });
    });
};