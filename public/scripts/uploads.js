/**
 * Created by Asish on 9/27/2016.
 */
// This is a separate login for uploads.js, the reason for this is because
// the firebase information is needed to access database
var likedAmount = 0;
$(function ()
{ 
  var waitInterval = setInterval(function()
    {
        if(user)
        {
            // console.log("Initialized:"+initialized);
            clearInterval(waitInterval);
            initializePage();
        }
    },1000);


    // Shows all public pictures at start of page
    function initializePage() {
        firebase.auth().onAuthStateChanged(function (user1){
                var arr = new Set(); 
            // var likesSet = {"food":0,"cars":0,"landscape":0,"people":0};
            var userData = firebase.database().ref('users/' + user.uid);
            userData.update
            ({
                username: user.displayName,
                email: user.email,
                profile_picture: ""
            });
            var retriveData;
            retriveData = firebase.database().ref('users/');
            function loadImgs(){
            arr = new Set();
            retriveData.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    // key will be the UID
                    // This looks for photo in firebase database if hey are from user and add it to a set.
                    var uid = childSnapshot.key;
                    var path = uid + "/";
                    // childData will be the actual contents of the child
                    if(childSnapshot.key==user.uid){
                        for (var photoIndex in childSnapshot.val().photos) {
                            if (childSnapshot.val().photos.hasOwnProperty(photoIndex)) {
                                    var photoName = photoIndex.replace(/_(?!.*?_)/gi, ".");
                                    var photoPath = path + photoName;
                                    arr.add({src:photoPath,name:photoName});
                                    
                            }
                        }
                        loadingComplete=true;
                    }
                });

            });
        }
        loadImgs();
            // Get a reference to the storage service, which is used to create references in your storage bucket
            var storage = firebase.storage();

            // Create a storage reference from our storage service
            var storageRef = storage.ref();

            $(".topFile").click(function(){

                $(".fileInput").click();
            });
            function uploadPhoto(privacy, theme) {
                var photo = $(".fileInput")[0].files[0];
                var storageRef = storage.ref("Photo/" + user.uid);
                var imagesRef = storageRef.child(photo.name);
                updatePhotoArray(photo.name, privacy, theme);
                imagesRef.put(photo);
                loadImgs();
                console.log("Photo Uploaded");
            }
            //This shows the photos that are in the set 
            function getPhotos() {
                arr.forEach(function (val) {
                    var pr = storage.ref("Photo/" + val.src);
                    var imgsrc = "";
                    pr.getDownloadURL().then(function (url) {
                        var pixlrcommand = "javascript:pixlr.overlay.show({image:'"+encodeURIComponent(url)+"', title:'"+"image" +"', service:'editor'});";
                        // Temp Element acting as grid.
                        var tempElement = document.createElement('div');
                        tempElement.className= "col-lg-3 col-md-4 col-sm-6 col-xs-12 imageOuter";

                        // Rendering the element that contains the photo
                        ReactDOM.render(
                          React.createElement(PhotoContainer, {src: url,pixlrcommand:pixlrcommand,name:val.name}),
                          tempElement
                        );                   // Adding each photo to the main container.
                        $("#galleryrow").append(tempElement);
                        $(".likeLinked").unbind().click(function(){
                                 var photoName = $(this).data("name").replace(".","_");
                                 console.log(photoName);
                                 var userData = firebase.database().ref('users/' + user.uid + "/photos/" + photoName);
                                 likes = 0;
                                 userData.on('value', function (snapshot) {
                                        if(snapshot.val().like!=null)
                                            likes = snapshot.val().like;
                                   
                                   });
                                 userData.update({like:(parseInt(likes)+1)});  
                        });
                    })
                });
                
            }
            //Updating array if a photo has been uploaded. 
            function updatePhotoArray(name, privacy, theme) {
                console.log(name);
                                    console.log(name.replace(".", "_"));
                var userData = firebase.database().ref('users/' + user.uid + "/photos/" + name.replace(/\./g, "_"));
                userData.set
                ({
                    Privacy: privacy,
                    Theme: theme,
                    Like: 0
                }); 
            }

            $('#exampleModal').modal({show:false});
            $('.save').click(function (){
                    var privacy =  $("input[name='privacy']:checked").val();
                    var theme =  $("input[name='theme']:checked").val();
                    $(".imageOuter").remove();
                    uploadPhoto(privacy, theme);
                    waitToLoadPhoto();

                    $('#exampleModal').modal("hide");
            });
            // Clicking the upload button.
            $(".upload").click(function () {
             
               $('#exampleModal').modal("show");
               
            });
            // Need this to show the photo after it has been uploaded.
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
        });
    }   
   // Using React; One element containing a photo with all its properties, each photo is the, added to the 'gallery'.
    var PhotoContainer = React.createClass({
        displayName:"PhotoContainer",
        render: function(){
            return React.createElement("div",{className:"hovereffect"},//Adding each class to photos
                                       React.createElement(PhotoImg, {src: this.props.src,name:this.props.name}),
                                       React.createElement("div", {className: "overlay"},
                                           React.createElement("h2",null,
                                                 React.createElement("a",{className:"imageedit",href:this.props.src},"Full Screen") ),
                                            React.createElement("p",null,
                                                 React.createElement("a",{className:"imageedit",href:this.props.pixlrcommand},"Edit") ),
                                            React.createElement("p",null,
                                                 React.createElement("a",{className:"imageedit likeLinked","data-name":this.props.name,href:"javascript://"},"Like") )
                                           )
                                       );
        }
    });
    // For each image.
    var PhotoImg = React.createClass({
        displayName:"PhotoImg",
        render: function(){
            return React.createElement("img",{className:"img-responsive","data-name":this.props.name,src:this.props.src});
        }
    });    
});

