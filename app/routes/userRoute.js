var User = require('../models/userModel');
var colorTool = require('../colors/groupsingleton');

module.exports = function(router) {

    router.get('/register/:userId', function(req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err){
                res.status(500);
                res.json(err);
            }else{
                console.log(user);
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