var async = require('async');
var calls = [];

var Lobby = require('../models/gameLobbyModel');
var gEnum = require('./gamesenum');
var SequenceGameModel = require('../models/sequenceGameModel');
var PushNotifications = require('../expo');

//#ToDo make a table containing statements
var statement = "De studenten die voor Smart Mobile hebben gekozen zijn de enige studenten op het Fontys die niet uitkijken naar maatwerk";

function sequenceGame(lobby){
    console.log('starting sequence game');
    console.log(lobby);
    var wordArray = statement.split(" ");
    var leader;
    var userTokens = [];
    for (var player of lobby.participants) {
        console.log('current player: ', player);
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
        userTokens.push(player.pushID);
    }
    leader.content = wordArray.join(" ");

    var game = new SequenceGameModel();
    game.originalMessage = statement;
    game.participants = lobby.participants;
    console.log("game: ", game);
    game.save(function (err) {
        if(err){
            console.log(err);
        }else{
            console.log('scheduled the sequence game!');
        }
    });

    //after preparing the game push a notification to all participants
    PushNotifications.sendNotification(userTokens, "Start Game", "Het spel waarvoor u zich heeft ingeschreven is begonnen", "Type: sequence game");
}

module.exports.scheduleGame =  function (color, gameType){
    //The game started get the player count
    calls.push(Lobby.getByColor(color));

    Promise.all(calls).then((result) => {
        lobby = result;
        lobby = lobby[0][0];
        if(lobby.gameType == gEnum.get(0).key){
            console.log(lobby);
            sequenceGame(lobby);
        }
    });

    //Determine the game type and assign the specific pieces to the different users

    //Sent a notification to the users that the game has started
}