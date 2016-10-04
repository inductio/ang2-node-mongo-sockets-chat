var url = require('url');
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/public', express.static('public'));

http.listen(8080, function () {
    console.log("App started on localhost:8080");
});
