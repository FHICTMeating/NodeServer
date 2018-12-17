var User = require('../models/userModel');
var colorTool = require('../colors/groupsingleton');

module.exports = function(router) {

    //GET all applications
    router.get('/register', function (req, res){
        let user = new User();
        user.color = colorTool.getGroup();
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
};