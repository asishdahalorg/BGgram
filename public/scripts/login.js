/**
 * Created by Asish on 9/26/2016.
*/
var user;
var initialized = false;
$(function ()
{
    // This is used by most pages to login a user
    const config = {
        apiKey: "AIzaSyChi7CPreml7IQNQ5H42gfbybfs6538bY4",
        authDomain: "bggram-d9ba0.firebaseapp.com",
        databaseURL: "https://bggram-d9ba0.firebaseio.com/",
        storageBucket: "bggram-d9ba0.appspot.com",
        messagingSenderId: "50803099095"
    };
    //  initialize app
    firebase.initializeApp(config);
    initialized = true;

    // var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    const txtEmail = document.getElementById('useremail');
    const txtpass = document.getElementById('userpass');
    const registerpass = document.getElementById('registerpass');
    const registerpass2 = document.getElementById('registerpass2');
    const btnlogin = document.getElementById('userlogin');
    const btnlogoff = document.getElementById('userlogoff');
    const loggedinmenu = $('#loggedinmenu');
    const username = $('#username');
    const loggedoutmenu = $('#login-dp');
    const logininvite = $('#logininfo');

    var logoffmenu = React.createClass({

        render: function () {
            return (
                React.createElement('li', {className: "dropdown"},
                    React.createElement("a", {className: "dropdown-toggle", 'data-toggle': "dropdown"},
                        React.createElement("b", null, 'Login'),
                        React.createElement("span", {className: 'caret'})
                    ),
                    React.createElement('ul', {className: "dropdown-menu"},
                        React.createElement('li', null,
                            React.createElement('div', {className: "row"},
                                React.createElement('div', {className: "col-md-12"},
                                    React.createElement('label', {className: "sr-only", htmlFor: "useremail"}),
                                    React.createElement('input', {
                                        className: "form-control",
                                        type: "email",
                                        id: "useremail",
                                        placeholder: "Email address",
                                        required: 'true'
                                    })
                                    // React.createElement('input',{className:"form-control",type:"email",id:"useremail", placeholder:"Email address", required:'true'},'Username / Email')
                                ),
                                React.createElement('div', {className: "col-md-12"},
                                    React.createElement('label', {className: "sr-only", htmlFor: "userpass"}),
                                    React.createElement('input', {
                                        className: "form-control",
                                        type: "password",
                                        id: "userpass",
                                        placeholder: "Password",
                                        required: 'true'
                                    })
                                ),
                                React.createElement('div', {className: "col-md-12"},
                                    React.createElement('button', {
                                        className: "btn btn-primary btn-block",
                                        id: "userlogin",
                                        type: "submit"
                                    }, 'Sign in')
                                ),
                                React.createElement('div', {className: "bottom text-center"},
                                    React.createElement('a', {href: 'register.html'},
                                        React.createElement('b', null, 'Register')
                                    )
                                )
                            )
                        )
                    )
                )
            )
        }
    });

    var loginmenu = React.createClass({

        render: function () {
            return (
                React.createElement('li', {className: "dropdown"},
                    React.createElement("a", {className: "dropdown-toggle", 'data-toggle': "dropdown"},
                        React.createElement("b", null, this.props.username),
                        React.createElement("span", {className: 'caret'})
                    ),
                    React.createElement('ul', {className: 'dropdown-menu', role: 'menu'},
                        React.createElement('li', null,
                            React.createElement('a', {href: 'uploads.html'}, 'Uploads')),
                        React.createElement('li', {className: 'divider'}),
                        React.createElement('li', null,
                            React.createElement('button', {id: 'userlogoff', className: "btn btn-primary btn-block"}, 'Sign Off')
                        )
                    )
                )
            )
        }
    });

    // Added the clicks inside because they were not working outside, now
    // all of the code from this js can be use in all pages. -Kimberly

    // Upon login/logoff, do these things
    firebase.auth().onAuthStateChanged(function (User) {
        var logmenu = document.getElementById('logmenu');
        if (User) {
            user = User;
            ReactDOM.render(
                React.createElement(loginmenu, {username: User.email}),
                logmenu
            );
            $("#userlogoff").click(function () {
                console.log('here');
                firebase.auth().signOut();
                $(document).ready(function () {
                    window.location.reload();
                });
            });

        } else {
            console.log(User);
            ReactDOM.render(
                React.createElement(logoffmenu),
                logmenu
            );
            $("#userlogin").click(function () {
                const email =  $("#useremail").val();
                const pass = $("#userpass").val();
                const auth = firebase.auth();

                const promise = auth.signInWithEmailAndPassword(email, pass);
                promise.then(function () {
                    $(document).ready(function () {
                        window.location.reload();
                    });
                });
                promise.catch(function (error) {
                    console.log(error);
                });
            });
        }
    });

});