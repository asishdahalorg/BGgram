/**
* Created by Asish on 9/26/2016.
*/
var user;
var initialized = false;
var firebase;
var finmenu;
var ModalPanel,RenderedModalPanel;
$(function () {


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

    var panelState = false;
    ModalPanel = React.createClass({
        displayName:"ModalPanel",
        state:this.state,
        getInitialState:function(){
            return {showModal:false};
        },
        statics:{
            getState:function(){
                return state.showModal;
            }
        },
        close:function(){
            panelState = false;
            this.setState({showModal:false});
        },
        open:function(){
            panelState = true;
            this.setState({showModal:true});
        },
        save:function(){
            this.setState({showModal:false});
            onSave();
        },
        render: function(){
            return React.createElement("div",null,
                React.createElement("button",{
                    className: "btn btn-default upload1",
                    onClick:this.open
                },"Upload a Photo"),
                React.createElement(ReactBootstrap.Modal,{show:this.state.showModal,onHide:this.close},
                    React.createElement(ReactBootstrap.Modal.Header,null,
                        React.createElement("b",null,"Upload a New Photo"),
                        React.createElement("br")),
                    React.createElement(ReactBootstrap.Modal.Body,null,
                        React.createElement("div",null,
                            React.createElement("b",null,"Privacy:"),
                            React.createElement("br"),
                            React.createElement("label",{className:"radioLabel"},"Private ",
                                React.createElement("input",{type:"radio",name:"privacy",value:"private"})
                            ),
                            React.createElement("label",{className:"radioLabel"},"Public ",
                                React.createElement("input",{type:"radio",name:"privacy",value:"public"})
                            ),
                            React.createElement("br",null),
                            React.createElement("b",null,"Type:"),
                            React.createElement("br"),
                            React.createElement("label",{className:"radioLabel"},"Food ",
                                React.createElement("input",{type:"radio",name:"type",value:"food"})
                            ),
                            React.createElement("label",{className:"radioLabel"},"Landscape ",
                                React.createElement("input",{type:"radio",name:"type",value:"landscape"})
                            ),
                            React.createElement("label",{className:"radioLabel"},"Cars ",
                                React.createElement("input",{type:"radio",name:"type",value:"cars"})
                            ),
                            React.createElement("label",{className:"radioLabel"},"People ",
                                React.createElement("input",{type:"radio",name:"type",value:"people"})
                            )
                        )
                    ),
                    React.createElement(ReactBootstrap.Modal.Footer,null,
                        React.createElement("button",{
                            className: "btn btn-default cancel",
                            onClick:this.close
                        },"Cancel"),
                        React.createElement("button",{
                            className: "btn btn-default save",
                            onClick:this.save
                        },"Upload")
                    )
                )
            );

        }
    });

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
        state:this.state,
        getInitialState:function(){
            return {profile:this.props.username};
        },

        get_profile_pic:function(){
            this.setState({profile:this.props.username});
        },

        get_username:function () {
            return firebase.auth.username
        },
        render: function () {
            return (
                React.createElement('li', {className: "dropdown"},
                    React.createElement("a", {className: "dropdown-toggle", 'data-toggle': "dropdown"},
                        React.createElement("b", null,this.state.profile),
                        React.createElement("span", {className: 'caret'})
                    ),
                    React.createElement('ul', {className: 'dropdown-menu', role: 'menu'},
                        React.createElement('li', {className:"text-center"},
                            React.createElement('label',{className: 'btn btn-default btn-file',style:{}},
                            'Browse',
                            React.createElement('input',{type:'file',style:{display:'none'}})),
                            React.createElement('button', {
                                onClick:this.get_profile_pic,
                                id: 'uploadProfilePic',
                                className: "btn btn-primary btn-block"
                            }, 'Update Profile Picture')
                        ),
                        React.createElement('li', {className: 'divider'}),
                        React.createElement('li', null,
                            React.createElement('a', {href: 'uploads.html'}, 'Uploads')),
                        React.createElement('li', {className: 'divider'}),
                        React.createElement('li', null,
                            React.createElement('button', {
                                id: 'userlogoff',
                                className: "btn btn-primary btn-block"
                            }, 'Sign Off')
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
            finmenu = ReactDOM.render(
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

            function uploadPhoto(privacy, theme) {
                var photo = $(".fileInput")[0].files[0];
                var storageRef = firebase.storage().ref("profile/" + user.uid);
                var imagesRef = storageRef.child(photo.name);
                updateDatabase(photo.name, privacy, theme);
                imagesRef.put(photo).then(function(snapshot) {
                    console.log('Uploaded Photo!');
                    window.location.reload();
                });
            }

            //Updating firebase database if a new photo has been uploaded.
            function updateDatabase(name, privacy, theme) {
                var userData = firebase.database().ref('users/' + user.uid + "/profile/" + name.replace(/\./g, "_"));
                userData.set
                ({
                    Privacy: privacy,
                    Theme: theme,
                    Like: 0
                });
            }

        } else {
            finmenu = ReactDOM.render(
                React.createElement(logoffmenu),
                logmenu
            );
            $("#userlogin").click(function () {
                const email = $("#useremail").val();
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
//
//
// "use strict";
// var config = {
//     apiKey: "AIzaSyChi7CPreml7IQNQ5H42gfbybfs6538bY4",
//     authDomain: "bggram-d9ba0.firebaseapp.com",
//     databaseURL: "https://bggram-d9ba0.firebaseio.com/",
//     storageBucket: "bggram-d9ba0.appspot.com",
//     messagingSenderId: "50803099095"
// };
// var firebase;
//
// var Loginmenu = React.createClass({
//
//     render: function () {
//         return (
//             React.createElement('li', {className: "dropdown"},
//                 React.createElement("a", {className: "dropdown-toggle", 'data-toggle': "dropdown"},
//                     React.createElement("b", null, this.props.username),
//                     React.createElement("span", {className: 'caret'})
//                 ),
//                 React.createElement('ul', {className: 'dropdown-menu', role: 'menu'},
//                     React.createElement('li', null,
//                         React.createElement('a', {href: 'uploads.html'}, 'Uploads')),
//                     React.createElement('li', {className: 'divider'}),
//                     React.createElement('li', null,
//                         React.createElement('button', {
//                             id: 'userlogoff',
//                             className: "btn btn-primary btn-block"
//                         }, 'Sign Off')
//                     )
//                 )
//             )
//         );
//     }
// });
//
// var Logoffmenu = React.createClass({
//
//     render: function () {
//         return (
//             React.createElement('li', {className: "dropdown"},
//                 React.createElement("a", {className: "dropdown-toggle", 'data-toggle': "dropdown"},
//                     React.createElement("b", null, 'Login'),
//                     React.createElement("span", {className: 'caret'})
//                 ),
//                 React.createElement('ul', {className: "dropdown-menu"},
//                     React.createElement('li', null,
//                         React.createElement('div', {className: "row"},
//                             React.createElement('div', {className: "col-md-12"},
//                                 React.createElement('label', {className: "sr-only", htmlFor: "useremail"}),
//                                 React.createElement('input', {
//                                     className: "form-control",
//                                     type: "email",
//                                     id: "useremail",
//                                     placeholder: "Email address",
//                                     required: 'true'
//                                 })
//                                 // React.createElement('input',{className:"form-control",type:"email",id:"useremail", placeholder:"Email address", required:'true'},'Username / Email')
//                             ),
//                             React.createElement('div', {className: "col-md-12"},
//                                 React.createElement('label', {className: "sr-only", htmlFor: "userpass"}),
//                                 React.createElement('input', {
//                                     className: "form-control",
//                                     type: "password",
//                                     id: "userpass",
//                                     placeholder: "Password",
//                                     required: 'true'
//                                 })
//                             ),
//                             React.createElement('div', {className: "col-md-12"},
//                                 React.createElement('button', {
//                                     className: "btn btn-primary btn-block",
//                                     id: "userlogin",
//                                     type: "submit"
//                                 }, 'Sign in')
//                             ),
//                             React.createElement('div', {className: "bottom text-center"},
//                                 React.createElement('a', {href: 'register.html'},
//                                     React.createElement('b', null, 'Register')
//                                 )
//                             )
//                         )
//                     )
//                 )
//             )
//         );
//     }
// });
//
// var LoginApp = React.createClass({
//     displayName:"LoginApp",
//     state:this.state,
//     fb: function () {
//         this.setState({firebase: firebase.initializeApp(config)})
//     },
//     checkLogin: function () {
//         this.fb();
//         this.state.firebase.auth().onAuthStateChanged(function (User) {
//             if (User) {
//                 this.setState({loggedin: true});
//                 this.setState({user: User.email});
//             }
//             else {
//                 this.setState({loggedin: false});
//                 this.setState({user: null});
//             }
//         });
//     },
//     render: function () {
//         this.checkLogin();
//         if (this.state.loggedin == true){
//             return(
//                 React.createElement(Loginmenu,{username:this.state.user})
//             );
//         }
//         else{
//             return(
//                 React.createElement(Logoffmenu)
//             );
//         }
//     }
// });
//
// ReactDOM.render(React.createElement(LoginApp), document.createElement("div"));
