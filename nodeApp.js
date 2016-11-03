'use strict'

var firebase = require("firebase/");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// var path = require('path');
// var formidable = require('formidable');
 var fs = require('fs');
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' });
let busboy = require("connect-busboy");
app.use(busboy());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));
// app.use(express.json());
// app.use(express.urlencoded());


firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://bggram-d9ba0.firebaseio.com/",
    authDomain: "bggram-d9ba0.firebaseapp.com",
    databaseURL: "https://bggram-d9ba0.firebaseio.com/",
    storageBucket: "bggram-d9ba0.appspot.com",
    messagingSenderId: "50803099095"
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
console.log("In Server");
});

// var gcloud = require('@google-cloud/storage')({
// 	projectId: "bggram-d9ba0"
// });
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
        var bucket = gcs.bucket("/bggram-d9ba0.appspot.com/");
        storage.buckets.update("/Photo/IAFy6TvT6JexjvkDRCQIMEmV76j1/"+file, function(err, file) {
        if (!err) {
                res.status(200).send("file uploaded");
            }else{
                res.status(500).send("fail to upload." + err);
            }
        });
    });
   
    
    //res.status(200).send("ok!");

    // var bucket = gcs.bucket("/bggram-d9ba0.appspot.com/Photo/"+id);
    // bucket.upload(photo, function(err, file) {
    // if (!err) {
    //         res.status(200).send("file uploaded");
    //     }else{
    //         res.status(500).send("fail to upload." + err);
    //     }
    // });
  
    // var google = require('googleapis');
    // var storage = google.storage('v1');

    // google.auth.getApplicationDefault(function(err, authClient) {
    //   if (err) {
    //     console.log('Authentication failed because of ', err);
    //     return;
    //   }
    //   if (authClient.createScopedRequired && authClient.createScopedRequired()) {
    //     var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
    //     authClient = authClient.createScoped(scopes);
    //   }

      // var request = {
      //   // TODO: Change placeholders below to appropriate parameter values for the 'update' method:

      //   // * Name of a bucket.
      //   bucket: 'bggram-d9ba0.appspot.com/Photo/'+firebase.User.uid,

      //   resource: {photo},

      //   // Auth client
      //   // auth: authClient
      // };

      // storage.buckets.update(request, function(err, result) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(result);
      //   }
      // });
// });
 //    console.log("Client wants to update.");

 //    var photo = req.body.fileInput;

	// var bucket = gcloud.Storage.bucket('/bggram-d9ba0.appspot.com/Photo/'+firebase.User.uid);
	// bucket.upload(photo, function(err, file) {
  
	// });
 //    console.log('Uploaded Photo!');
 //    res.send("ok!")

});
