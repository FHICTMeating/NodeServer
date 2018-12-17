var minutesTillStart = 10;//after the first user checks in the game should start after x minutes
var Lobby = require('../models/gameLobbyModel');


module.exports.assignUserToLobby = function (user){
    //Does the current Lobby exist?
    let lobby;
    Lobby.getByColor(user.color, function (err, lobby) {
        if (err){
            //Create the lobby with the close time within the next 'minutesTillStart' minutes.
            let timestamp = Date.now()//time in seconds
            lobby = new Lobby();
            //lobby._id = user.color;
            lobby.color = user.color;
            lobby.startTime = timestamp + (minutesTillStart * 60000);//add the extra minutes
            //lobby.participants = [user._id]

            lobby.save(function (err) {
                if (err){
                    res.json(err);
                }else{
                res.json({
                    message: 'New Lobby created!',
                    data: lobby
                });
            }
            });

            //#ToDo start the thread to start the game within 2 minutes
        }else{
            if(lobby.startTime > Date.now()){
                lobby.participants.push(user._id);
            }else{
                //user was too late.
            }
        }
    });
};