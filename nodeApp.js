'use strict'

var firebase = require("firebase/");

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

app.get("'", function(req,res){
	res.send("Hello");
});
var port = process.env.PORT || 3000;
app.use('/', express.static(__dirname + '/public'));

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

	var bucket = gcloud.Storage.bucket('/bggram-d9ba0.appspot.com/Photo/'+firebase.User.uid);
	bucket.upload(photo, function(err, file) {
  
	});
    console.log('Uploaded Photo!');
    res.send("ok!")

});
