var user;
var initialized = false;
var firebase;
var finmenu;
const FirebaseREST = require("firebase-rest").default;
var express = require('express');
var uploads = require('uploads.js');
var app = express();
var bodyParser = require('body-parser');
global.snapshot = require("snapshot")

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
console.log("here");
FirebaseREST.client("https://bggram-d9ba0.firebaseio.com/",{auth:'SECRET'});


var port = process.env.PORT || 3000;

path = require('path');
app.use(express.static(path.join(__dirname + '/public')));



var retriveData = FirebaseREST.database().ref('uers/');

app.get('/static/scripts/uploads.js',function(req,res){
	sys.puts(sys.inspect(req));
	req.body.snapshot = etriveData.on(function (snapshot) {return snapshot;});
	res.send(snapshot);
});

// app.get(function(){
// 	$get(retriveData,function(req,res){
// 		global.snapshot = req;
// 		console.log(res);
// 	});
// });
// FirebaseREST.get('retriveData').then(function(){
// 	snapshot = body;
// }).fail(function(){
// 	console.log(err);
// });

// app.get('/emptyHtml.html', function (req, res) {
//     console.log("Requested empty html");
//     res.send("OK!");
// });