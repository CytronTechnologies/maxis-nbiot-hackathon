var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend', 'www')));

// socket.io
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use("*", function(req, res, next) {
    res.sendFile(path.resolve('web/www/index.html'));  
})

// start azure
require('./lib/ReadDeviceToCloudMessages')(io);

module.exports = {
    app: app,
    server: server
};
