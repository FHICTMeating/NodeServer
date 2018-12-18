var async = require('async');
var calls = [];

var Lobby = require('../models/gameLobbyModel');
var gEnum = require('./gamesenum');
var SequenceGameModel = require('../models/sequenceGameModel');

//#ToDo make a table containing statements
var statement = "De studenten die voor Smart Mobile hebben gekozen zijn de enige studenten op het Fontys die niet uitkijken naar maatwerk";

function sequenceGame(lobby){
    console.log('scheduled the sequence game!');

    var wordArray = statement.split(" ");
    var leader;
    for (var player in lobby.participants) {
        if(player.playerRole == "Leader"){
            leader = player;
        }else{
            let myWordIndex = Math.floor(Math.random() * wordArray.length)

            //#ToDo do shuffle method instead of this, this can create an inf loop
            while(wordArray[myWordIndex] == "[x]"){
                myWordIndex = Math.floor(Math.random() * wordArray.length)
            }

            player.content = wordArray[myWordIndex];
            wordArray[myWordIndex] = "[x]";
        }
    }
    leader.content = wordArray.join(" ");

    var game = new SequenceGameModel();
    game.originalMessage = statement;
    game.participants = lobby.participants;
    game.save(function (err) {
        if(err){
            console.log(err);
        }
    });

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
            sequenceGame(lobby);
        }
    });

    //Determine the game type and assign the specific pieces to the different users

    //Sent a notification to the users that the game has started
}