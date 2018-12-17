const registrationRoute = require('./registrationRoute');

module.exports = function(app) {
    registrationRoute(app);
};