'use strict'

var firebase = require("firebase/");
var auth = require("firebase/auth");
var database = require("firebase/database");
var storage = require("firebase/storage");

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

var path = require('path');
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'html/','index.html'))
});

app.listen(port, function(){
console.log("Example");
});

var gcloud = require('@google-cloud/storage')({
	projectId: "bggram-d9ba0"
});



app.put('/uploads', function (req, res) {
    console.log("Client wants to update.");

    var photo = req.body.fileInput;
	var gcs = gcloud.storage();
	var bucket = gcs.bucket('gs://bggram-d9ba0.appspot.com/'+firebase.User.uid);
	bucket.upload(photo, function(err, file) {
  
	});


    // var storageRef = storage.ref("Photo/" + firebase.User.uid);
    // var imagesRef = storageRef.child(photo.name);
    // // updateDatabase(photo.name, privacy, theme);
    // imagesRef.put(photo).then(function(snapshot) {
    //       console.log('Uploaded Photo!');
    //       window.location.reload();
    //     });
    console.log('Uploaded Photo!');

    res.send("ok!")

});
// app.get('/static/scripts/uploads.js',function(req,res){
// 	console.log("here");
// 	global.snapshot = etriveData.on(function (snapshot) {return snapshot;});
// 	res.send(snapshot);
// });

