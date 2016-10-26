var user;
var initialized = false;
var firebase;
var finmenu;
var firebase = require("firebase");
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://bggram-d9ba0.firebaseio.com/"
});
// var fireRef = firebase.database().ref('todos');
app.get("'", function(req,res){
	res.send("Hello");
});
var port = process.env.PORT || 3000;
app.use('/static', express.static(__dirname + '/public'));
path = require('path');
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'html/','index.html'))
});

app.listen(port, function(){
console.log("Example");
});