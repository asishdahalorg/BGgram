var user;
var initialized = false;
var firebase;
var finmenu;
var firebase = require("firebase");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var snapshot;
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://bggram-d9ba0.firebaseio.com/"
});


var port = process.env.PORT || 3000;

path = require('path');
app.use(express.static(path.join(__dirname + '/public'));

app.listen(port, function(){
console.log("On Server");
});

var retriveData = firebase.database().ref('uers/');

app.get('/uploads', function (req, res) {
    console.log("Client wants to get");
    retriveData.on('value', function (snapShot){
    	snapshot = snapShot;
    }).catch(function(){
        res.status(403);
        res.send();
    });
});

// app.get('/emptyHtml.html', function (req, res) {
//     console.log("Requested empty html");
//     res.send("OK!");
// });