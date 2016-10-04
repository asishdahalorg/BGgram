/**
 * Created by Asish on 9/27/2016.
 */
// This is a separate login for uploads.js, the reason for this is because
// the firebase information is needed to access database
var loadingComplete  = false;
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
    var LoadingComplete=false;
    function initializePage(user) {
        var arr = new Set();
        

        var userData = firebase.database().ref('users/' + user.uid);
        userData.update
        ({
            username: user.displayName,
            email: user.email,
            profile_picture: ""
        });
        var retriveData;
        retriveData = firebase.database().ref('users/');

        retriveData.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // key will be the UID

                var uid = childSnapshot.key;
                var path = uid + "/";
                // childData will be the actual contents of the child
                if(childSnapshot.key==user.uid){
                    for (var photoIndex in childSnapshot.val().photos) {
                        if (childSnapshot.val().photos.hasOwnProperty(photoIndex)) {
                            if (childSnapshot.val().photos[photoIndex].status == "public") {
                                var photoName = photoIndex.replace(/_(?!.*?_)/gi, ".");
                                var photoPath = path + photoName;
                                arr.add(photoPath);
                            }
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
            arr.forEach(function (val) {
                var pr = storage.ref("Photo/" + val);
                var imgsrc = "";
                pr.getDownloadURL().then(function (url) {
                    var pixlrcommand = "javascript:pixlr.overlay.show({image:'"+encodeURIComponent(url)+"', title:'"+"image" +"', service:'editor'});";
                    // Temp Element acting as grid.
                    var tempElement = document.createElement('div');
                    tempElement.className= "col-lg-3 col-md-4 col-sm-6 col-xs-12";

                    // Rendering the element that contains the photo
                    ReactDOM.render(
                      React.createElement(PhotoContainer, {src: url,pixlrcommand:pixlrcommand}),
                      tempElement
                    );                   // Adding each photo to the main container.
                    $("#galleryrow").append(tempElement);

                    // $("#galleryrow").append(a);
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
   // Using React; One element containing a photo with all its properties, each photo is the, added to the 'gallery'.
    var PhotoContainer = React.createClass({
        displayName:"PhotoContainer",
        render: function(){
            return React.createElement("div",{className:"hovereffect"},//Adding each class to photos
                                       React.createElement(PhotoImg, {src: this.props.src}),
                                       React.createElement("div", {className: "overlay"},
                                           React.createElement("h2",null,
                                                 React.createElement("a",{className:"imageedit",href:this.props.src},"Full Screen") ),
                                            React.createElement("p",null,
                                                 React.createElement("a",{className:"imageedit",href:this.props.pixlrcommand},"Edit") )
                                           )
                                       );
        }
    });
    // For each image.
    var PhotoImg = React.createClass({
        displayName:"PhotoImg",
        render: function(){
            return React.createElement("img",{className:"img-responsive",src:this.props.src});
        }
    });    
});

