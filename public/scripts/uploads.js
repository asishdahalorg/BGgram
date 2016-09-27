/**
 * Created by Asish on 9/27/2016.
 */
// This is a separate login for uploads.js, the reason for this is because
// the firebase information is needed to access database
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
    const registerpass = document.getElementById('registerpass');
    const registerpass2 = document.getElementById('registerpass2');
    const btnlogin = document.getElementById('userlogin');
    const btnlogoff = document.getElementById('userlogoff');
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

    firebase.auth().onAuthStateChanged(function(User) {
        if (User) {
            initializePage(User);
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
        } else {
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

    function initializePage(user) {
        var arr = new Set();
        var LoadingComplete=false;

        var userData = firebase.database().ref('users/' + user.uid);
        console.log("user data" + userData);
        userData.update
        ({
            username: user.displayName,
            email: user.email,
            profile_picture: ""
        });
        var retriveData = firebase.database().ref('users/' + user.uid);
        retriveData.on('value', function (snapshot) {
            // val().email||photos||username||profilePicture
            console.log(snapshot.val().username);
        });
        retriveData = firebase.database().ref('users');

        retriveData.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // key will be the UID
                var uid = childSnapshot.key;
                var path = uid + "/";
                // childData will be the actual contents of the child
                for (var photoIndex in childSnapshot.val().photos) {
                    if (childSnapshot.val().photos.hasOwnProperty(photoIndex)) {
                        if (childSnapshot.val().photos[photoIndex].status == "public") {
                            var photoName = photoIndex.replace(/_(?!.*?_)/gi, ".");
                            var photoPath = path + photoName;
                            console.log(photoPath);
                            arr.add(photoPath);
                        }
                    }
                }
                loadingComplete = true;
            });

        });

        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();

        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        function uploadPhoto() {
            var photo = $(".fileInput")[0].files[0];
            var storageRef = storage.ref("Photo/" + user.uid);
            var imagesRef = storageRef.child(photo.name);
            updatePhotoArray(photo.name);
            imagesRef.put(photo);
            console.log("Photo Uploaded");
        }

        function getPhotos() {
            console.log(arr);
            arr.forEach(function (val) {
                var pr = storage.ref("Photo/" + val);
                var imgsrc = "";
                pr.getDownloadURL().then(function (url) {
                    // var $column = $('<div></div>').attr("class","col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb");
                    // var $link_to_image = $("<a></a>").attr("class","thumbnail imglink").attr("href",url);
                    // var $thumbnail_of_image = $("<img/>").attr("class","img-thumbnail img-responsive img-rounded page_image").attr("src",url);
                    // var $image_title = $("<div></div>").attr("class","ts").text("Photo");
                    // //the main coloumn is appended into the row
                    // $link_to_image.append($thumbnail_of_image,$image_title);
                    // $column.append($link_to_image).appendTo("#galleryrow");
                    console.log(url);
                    var im = "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-3'>" +
                                "<div class='thumbnail text-right'>" +
                                    "<a href='" + url +"'>" +
                                        "<img src='" + url+ "'>" +
                                    "</a>" +
                                    "<br>"+
                                    "<div class='caption'>" +
                                        "<p class='bottom'>" +
                                            "<a href='../index.html'><button class='btn btn-default' role='button'>Edit</button></a>" +
                                            " <button class='btn btn-default' role='button'>Save</button>" +
                                        "</p>" +
                                    "</div>" +
                                "</div>" +
                             "</div>";
                    $("#galleryrow").append(im);
                })
            });
        }

        function updatePhotoArray(name) {
            var userData = firebase.database().ref('users/' + user.uid + "/photos/" + name.replace(".", "_"));
            userData.set
            ({
                status: "public"
            });
        }

        $(".upload").click(function () {

            uploadPhoto();
            waitToLoadPhoto();
        });
        function waitToLoadPhoto() {
            var onRetriveComplete = setInterval(function () {
                if (loadingComplete) {
                    clearInterval(onRetriveComplete);
                    loadingComplete = false;
                    $("#galleryrow div").remove();
                    getPhotos();
                }

            }, 500);
        }

        waitToLoadPhoto();
    }
});