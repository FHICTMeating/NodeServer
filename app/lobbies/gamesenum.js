// use it as module
var Enum = require('enum');
var supportedTypes = 1;//1 for sequence game, 2 for photo and so on

// or extend node.js with this new type
require('enum').register();
 
//define enum type without flag
var myEnum = new Enum({'Sequence': 0, 'Photo':1});
myEnum;
myEnum.isFlaggable; //=> false
 
myEnum.toJSON();
JSON.stringify(myEnum);

function generateRandomType() {
    return myEnum.get(Math.floor(Math.random() * supportedTypes));
};

module.exports = {
    getRandomType: () => generateRandomType(),
    get: (x) => myEnum.get(x)
}