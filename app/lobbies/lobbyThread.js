var async = require('async');
var calls = [];

var Lobby = require('../models/gameLobbyModel');
var gEnum = require('./gamesenum');

function sequenceGame(){
    console.log('scheduled the sequence game!');

    //after preparing the game push a notification to all participants
}

module.exports.scheduleGame =  function (color, gameType){
    console.log('in thread ', color, ' ', gameType);
    //The game started get the player count
    calls.push(Lobby.getByColor(color));

    Promise.all(calls).then((result) => {
        lobby = result;
        lobby = lobby[0][0];

        if(lobby.gameType == gEnum.get(0).key){
            sequenceGame();
        }
    });

    //Determine the game type and assign the specific pieces to the different users

    //Sent a notification to the users that the game has started
}