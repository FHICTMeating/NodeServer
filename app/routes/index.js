const userRoute = require('./userRoute');
const sequenceGameRoute = require('./sequenceGameRoute');

module.exports = function(app) {
    userRoute(app);
    sequenceGameRoute(app);
};