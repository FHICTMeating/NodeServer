// use it as module
var Enum = require('enum');
 
// or extend node.js with this new type
require('enum').register();
 
//define enum type without flag
var myEnum = new Enum({'Yellow': 0, 'Red':1, 'Blue': 2, 'Green': 3, 'Purple': 4, 'Orange': 5});
myEnum; //=>  Enum {_options: Object, enums: Array[6], None: EnumItem, Black: EnumItem, Red: EnumItem…........}
myEnum.isFlaggable; //=> false
 
myEnum.toJSON(); // returns {'None': 0, 'Black':1, 'Red': 2, 'Red2': 3, 'Green': 4, 'Blue': 5}
JSON.stringify(myEnum); // returns '{"None":0,"Black":1,"Red":2,"Red2":3,"Green":4,"Blue":5}'
 
/*for(var i=0; i<=5; i++){ console.log(myEnum.get(i).value + '=> '+ myEnum.get(i).key)}
    0=> None
    1=> Black
    2=> Red
    3=> Red2
    4=> Green
    5=> Blue*/
 

    module.exports = {
        get: (x) => myEnum.get(x),
      }