// use it as module
var Enum = require('enum');
 
// or extend node.js with this new type
require('enum').register();
 
//define enum type without flag
var myEnum = new Enum({'Green': 0, 'Red':1, 'Blue': 2, 'Yellow': 3, 'Purple': 4, 'Orange': 5});
myEnum;
myEnum.isFlaggable; //=> false
 
myEnum.toJSON();
JSON.stringify(myEnum);

module.exports = {
    get: (x) => myEnum.get(x),
}