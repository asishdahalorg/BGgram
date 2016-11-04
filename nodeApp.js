'use strict';

var firebase = require("firebase/");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

let busboy = require("connect-busboy");
app.use(busboy());

// Setting up node

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));
firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://bggram-d9ba0.firebaseio.com/",
    authDomain: "bggram-d9ba0.firebaseapp.com",
    databaseURL: "https://bggram-d9ba0.firebaseio.com/",
    storageBucket: "bggram-d9ba0.appspot.com",
    messagingSenderId: "50803099095"
});
app.set("port",(process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
var path = require('path');
app.get('/',function(req,res){
	res.sendFile('index.html');
});
// To know if the server is on
app.listen(app.get("port"), function(){
console.log("In Server");
});

var google = require('googleapis');
var storage = google.storage('v1');

app.post('/uploads',  function(req, res){
    var fstream;
    var photo = req.body.uploads;
    var type = req.body.typeId;
    var privacy = req.body.privacyId;
    var id = req.body.userId;

    req.pipe(req.busboy);


    req.busboy.on("file",function(fieldName,file,fileName){
        console.log(fileName);

         var request = {
            // TODO: Change placeholders below to appropriate parameter values for the 'update' method:

            // * Name of a bucket.
            bucket: "bggram-d9ba0.appspot.com/Photo/IAFy6TvT6JexjvkDRCQIMEmV76j1/"+file,

            resource: {}
          };

        storage.buckets.update(request, function(err, result) {
        if (!err) {
                res.status(200).send("File uploaded"+result);
            }else{
                res.status(500).send("fail to upload." + err);
            }
        });
    });
});
