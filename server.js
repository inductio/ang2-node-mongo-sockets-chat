var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
mongoose.connect("mongodb://jsmp_chatdb:jsmp_chatdb@ds035016.mlab.com:35016/jsmp_chatdb");

var Message = mongoose
    .model("Message", new mongoose
        .Schema({text: String})
    );

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get("/api/messages", function (req, res) {
    Message
        .find({})
        .lean()
        .exec()
        .then(function (messages) {
            res.json(messages);
        });
});

app.use('/public', express.static('public'));

io.on('connection', function (socket) {
    socket.on('message receive', function (msg) {
        io.emit('message receive', msg);
        if (msg) Message.create({text: msg});
    });
});

http.listen(8080, function () {
    console.log("App started on localhost:8080");
});
