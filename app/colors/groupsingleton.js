//This singleton is used to divide the new users into groups
var User = require('../models/userModel');

var tools = require("./colorsenum");

let participants = 0;
let groups = 1;//amount of desired groups, this can be 1 to 6

function determineCurrentParticipants(){
    User.count({}, function(err, c) {
      if(err){
        participants = 0;
      }else{
        participants = c;
      }
    });
}
determineCurrentParticipants();

function getNextGroup(){
  let color = tools.get(participants % groups)
  participants++;
  return color;
}

module.exports = {
  getGroup: () => getNextGroup(),
}