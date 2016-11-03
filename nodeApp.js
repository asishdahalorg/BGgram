'use strict';

var firebase = require("firebase/");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var path = require('path');
 var fs = require('fs');
let busboy = require("connect-busboy");
app.use(busboy());

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

app.set('html',__dirname + '/html');
app.set("view engine", "ejs");

var path = require('path');
app.get('/',function(req,res){
	res.render('index.html');
});

app.listen(app.get("port"), function(){
console.log("In Server");
});

var storage = require('@google-cloud/storage');
var gcs = storage({
  projectId: "bggram-d9ba0",
  keyFilename: 'privkey.json'
});



var fs = require('fs');
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
        // fstream = fs.createWriteStream("/bggram-d9ba0.appspot.com/Photo/IAFy6TvT6JexjvkDRCQIMEmV76j1/"+fileName);
        // file.pipe(fstream);
        // fstream.on("close",function(){
        //     res.redirect('back');
        // });
        var bucket = gcs.bucket("bggram-d9ba0.appspot.com");
        storage.buckets.update("/Photo/IAFy6TvT6JexjvkDRCQIMEmV76j1/"+file, function(err, file) {
        if (!err) {
                res.status(200).send("file uploaded");
            }else{
                res.status(500).send("fail to upload." + err);
            }
        });
    });


});
