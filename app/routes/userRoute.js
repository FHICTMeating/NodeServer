var User = require('../models/userModel');


module.exports = function(router) {

    //GET all applications
    router.get('/register', function (req, res){
        const color = "blue";
        let user = new User();
        user.color = color;

        user.save(function (err) {
            // if (err)
            //     res.json(err);
            res.json({
                message: 'New User created!',
                data: user
            });
        });
    });
};