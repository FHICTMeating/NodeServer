const express        = require('express');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const app            = express();

const port = 8000;

mongoose.connect('mongodb://meating:maatwerk1@ds135844.mlab.com:35844/ic');
const db = mongoose.connection;

require('./app/routes')(app);
app.listen(port, () => {
    console.log('We are live on ' + port);
});