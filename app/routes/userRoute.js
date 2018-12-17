var User = require('../models/userModel');
var colorTool = require('../colors/groupsingleton');

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
                user.present = true;

                user.save(function (err) {
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
    })
};