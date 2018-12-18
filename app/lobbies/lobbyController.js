var async = require('async');
var calls = [];

var minutesTillStart = 5;//after the first user checks in the game should start after x minutes
var Lobby = require('../models/gameLobbyModel');


module.exports.assignUserToLobby =  function (user){
    //Does the current Lobby exist?
    return new Promise((resolve, reject) => {
        let lobby;
        calls.push(Lobby.getByColor(user.color));
    
        Promise.all(calls).then((result) => {
                lobby = result[0];
                
                if (lobby.length == 0){
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
                        
                        resolve();
                    }));
        
                    //#ToDo start the thread to start the game within 2 minutes
                }else{
                    lobby = lobby[0];
                    if(lobby.startTime > Date.now()){
                        lobby.participants.push(user._id);
        
                        calls.push(Lobby.update({_id: lobby._id}, lobby, function (err) {
                            if (err) {
                                throw err;
                            }

                            resolve();
                        }));
                    }else{
                        //user was too late.
                        reject("Game has already started");
                    }
                }
        
        })
    });
    
};