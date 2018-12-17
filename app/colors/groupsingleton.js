//This singleton is used to divide the new users into groups
var tools = require("./colorsenum.js");

let participants = 0;
let groups = 6;//amount of desired groups, this can be 1 to 6

module.exports = {
  increment: () => participants++,
  getGroup: () => tools.get(participants % groups),
}