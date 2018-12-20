var async = require('async');
var calls = [];

var Lobby = require('../models/gameLobbyModel');
var gEnum = require('./gamesenum');
var SequenceGameModel = require('../models/sequenceGameModel');
var PushNotifications = require('../expo');

//#ToDo make a table containing statements
var statement = "De studenten die voor Smart Mobile hebben gekozen zijn de enige studenten op het Fontys die niet uitkijken naar maatwerk";

function sequenceGame(lobby){
    var wordArray = statement.split(" ");
    var leader;
    var userTokens = [];
    let playerCount = lobby.participants.length;
    let leaderWordCount = playerCount + (wordArray.length % playerCount);
    let participantWordCount = (wordArray.length - (wordArray.length % playerCount)) / playerCount;
    var index = 0;
    for (var player of lobby.participants) {
        var contentArray = [];
        var amount = 0;
        if(player.playerRole == "Leader"){
            amount = leaderWordCount;
        }else{
            amount = participantWordCount;
        }
        for (i = 0; i < amount; i++) { 
            contentArray.push(wordArray[index])
            index++;
        }
        player.content = contentArray.join(" ");

        userTokens.push({pushToken: player.pushID});
    }

    var game = new SequenceGameModel();
    game.originalMessage = statement;
    game.participants = lobby.participants;
    game.save(function (err) {
        if(err){
            console.log(err);
        }else{
            
        }
    });

    //after preparing the game push a notification to all participants
    PushNotifications.sendNotification(userTokens, "The game is on!", "Open the app to get your first challenge!", {Type: 'sequence game'});
}

module.exports.scheduleGame =  function (color, gameType){
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