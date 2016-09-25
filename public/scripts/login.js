"use strict";
  var usersInfo;
  var initialized =  false;
  var user;
  var token;


    var config ={
        apiKey: "AIzaSyChi7CPreml7IQNQ5H42gfbybfs6538bY4",
        authDomain: "bggram-d9ba0.firebaseapp.com",
        databaseURL: "https://bggram-d9ba0.firebaseio.com",
        storageBucket: "bggram-d9ba0.appspot.com",
        messagingSenderId: "50803099095"
      };
    firebase.initializeApp(config);

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    

    firebase.auth().signInWithPopup(provider).then(function(result) 
    {
           initialized = true;
           token = result.credential.accessToken
           user = result.user

    }).catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
    });