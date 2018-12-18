var async = require('async');
var calls = [];

var minutesTillStart = 1;//after the first user checks in the game should start after x minutes
var Lobby = require('../models/gameLobbyModel');


module.exports.assignUserToLobby =  function (user){
    //Does the current Lobby exist?
    let lobby;
    calls.push(Lobby.getByColor(user.color, function (err, lobby) {
        if (err || lobby.length < 1){
            //Create the lobby with the close time within the next 'minutesTillStart' minutes.
            let timestamp = Date.now()//time in seconds
            lobby = new Lobby();
            lobby.color = user.color;
            lobby.startTime = timestamp + (minutesTillStart * 60000);//add the extra minutes
            lobby.participants.push(user._id)

            calls.push(lobby.save(function (err) {
                if (err){
                    throw err;
                }
            }));

            //#ToDo start the thread to start the game within 2 minutes
        }else{
            if(lobby[0].startTime > Date.now()){
                lobby[0].participants.push(user._id);

                calls.push(Lobby.update({_id: lobby[0]._id}, lobby[0], function (err) {
                    if (err) {
                        throw err;
                    }
                }));
            }else{
                //user was too late.
                Promise.reject("Game has already started");
                // throw "Game has already started";
            }
        }
    }));
    /*async.parallel(calls, function(err, result) {
        /* this code will run after all calls finished the job or
           when any of the calls passes an error *
        if (err){
        console.log(err)
            //res.json(err);
        }
    });*/
    Promise.all(calls).then((result) => {
        try{
        console.log("catch in promise" + result);
        }catch(ex){
            
        }
    }).catch(err => { console.log("In catch promise " + err)})
};