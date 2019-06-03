var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'web', 'www')));

// socket.io
var server = require("http").Server(app);
var io = require("socket.io")(server);

module.exports = {
    app: app,
    server: server
};
