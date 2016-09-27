/**
 * Created by Asish on 9/26/2016.
 */
$(function ()
{
    const config = {
        apiKey: "AIzaSyChi7CPreml7IQNQ5H42gfbybfs6538bY4",
        authDomain: "bggram-d9ba0.firebaseapp.com",
        databaseURL: "https://bggram-d9ba0.firebaseio.com/",
        storageBucket: "bggram-d9ba0.appspot.com",
        messagingSenderId: "50803099095"
    };
    //  initialize app
    firebase.initializeApp(config);

    // var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    const txtEmail = document.getElementById('useremail');
    const txtpass = document.getElementById('userpass');
    const registermail = document.getElementById('registeremail');
    const registerpass = document.getElementById('registerpass');
    const registerpass2 = document.getElementById('registerpass2');
    const btnlogin = document.getElementById('userlogin');
    const btnlogoff = document.getElementById('userlogoff');
    const btnusersignup = document.getElementById('usersignup');
    const loggedinmenu = $('#loggedinmenu');
    const username = $('#username');
    const loggedoutmenu = $('#login-dp');
    const logininvite = $('#logininfo');

    btnlogin.addEventListener('click',function () {
        const email = txtEmail.value;
        const pass = txtpass.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email,pass);
        promise.then(function() {
            $(document).ready(function() {
                window.location.reload();
            });
        });
        promise.catch(function (error) {
            console.log(error);
        });



    });

    btnusersignup.addEventListener('click',function () {
        const email = registermail.value;
        const mainpass = registerpass.value;
        const bcpass = registerpass2.value;
        if (mainpass != bcpass){
            $("#invalidpassword").text("Password does not match! Try again.");
        }
        else {
            const promise = firebase.auth().createUserWithEmailAndPassword(email, mainpass);
            promise.then(function() {
                btnlogin.click();
            });
            promise.catch(function (error) {
                console.log(error);
            });
        }

    });

    firebase.auth().onAuthStateChanged(function(User) {
        if (User) {
            console.log(User);
            loggedoutmenu.hide();
            logininvite.hide();
            loggedinmenu.removeAttr('display');
            loggedinmenu.removeAttr('class');
            loggedinmenu.attr('class','dropdown-menu');
            username.removeAttr('display');
            username.removeAttr('class');
            username.attr('class','dropdown-toggle');
            username.text(User.email);
            var register = $("#registerdiv");
            register.empty();
            var logmessage = "<div class='col-lg-12 text-center' style='color: #6e6b6b; font-size:40px; padding-top:50px; padding-bottom:50px;'><b>You are already logged in.</b></div>";
            register.append(logmessage);

        } else {
            console.log('here');
            loggedinmenu.hide();
            username.hide();
            loggedoutmenu.removeAttr('display');
            loggedoutmenu.removeAttr('class');
            loggedoutmenu.attr('class','dropdown-menu');
            logininvite.removeAttr('display');
            logininvite.removeAttr('class');
            logininvite.attr('class','dropdown-toggle');
            logininvite.text('Login');
        }
    });

    btnlogoff.addEventListener('click',function () {
        firebase.auth().signOut();
        $(document).ready(function() {
            window.location.reload();
        });
    });
});