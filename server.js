const express        = require('express');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const app            = express();

const port = 8000;

mongoose.connect('mongodb://localhost/ic');
const db = mongoose.connection;

require('./app/routes')(app);
app.listen(port, () => {
    console.log('We are live on ' + port);
});