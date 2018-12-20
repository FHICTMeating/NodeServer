var async = require('async');
var calls = [];

var minutesTillStart = 1;//after the first user checks in the game should start after x minutes
var Lobby = require('../models/gameLobbyModel');
var gameEnum = require('./gamesenum');
var Player = require('../models/playerModel');
var thread = require('./lobbyThread');

module.exports.assignUserToLobby =  function (user){
    //Does the current Lobby exist?
    return new Promise((resolve, reject) => {
        let lobby;
        calls.push(Lobby.getByColor(user.color));
    
        Promise.all(calls).then((result) => {
                lobby = result[0];
                
                if (lobby.length == 0){
                    //Create the lobby with the close time within the next 'minutesTillStart' minutes.
                    let timestamp = Date.now() + 60000 * 60;//add an hour

                    lobby = new Lobby();
                    lobby.color = user.color;
                    lobby.startTime = timestamp + (minutesTillStart * 60000);//add the extra minutes

                    let currentPlayer = new Player();
                    currentPlayer.playerID = user._id;
                    currentPlayer.playerRole = "Leader";
                    currentPlayer.pushID = user.pushToken;
                    lobby.participants.push(currentPlayer)
                    
                    //determin gametype
                    lobby.gameType = gameEnum.getRandomType();

                    calls.push(lobby.save(function (err) {
                        if (err){
                            throw err;
                        }
                        
                        setTimeout(thread.scheduleGame, minutesTillStart * 60000, user.color, lobby.gameType);
                        resolve(lobby.startTime);
                    }));
                }else{
                    lobby = lobby[0];
                    if(lobby.startTime >Date.now() + 60000 * 60){
                        let currentPlayer = new Player();
                        currentPlayer.playerID = user._id;
                        currentPlayer.playerRole = "Participant";
                        currentPlayer.pushID = user.pushToken;
                        lobby.participants.push(currentPlayer)
        
                        calls.push(Lobby.update({_id: lobby._id}, lobby, function (err) {
                            if (err) {
                                throw err;
                            }
                            resolve(lobby.startTime);
                        }));
                    }else{
                        //user was too late.
                        reject("Game has already started");
                    }
                }
        
        })
    });
    
};