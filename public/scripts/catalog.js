"use strict";

var arr = new Set();
var loadingComplete  = false;
$(function()
{
   var waitInterval = setInterval(function()
   {
        if(initialized)
        {
            console.log("Initialized:"+initialized);
            clearInterval(waitInterval);
            initializePage();
        }
    
   },1000);
   function initializePage()
   {
        
        var userData = firebase.database().ref('users/'+user.uid);
        userData.update
        ({
            username: user.displayName,
            email: user.email,
            profile_picture : ""
        });
        var retriveData = firebase.database().ref('users/'+user.uid);
        retriveData.on('value', function(snapshot) 
        {
            // val().email||photos||username||profilePicture
             console.log(snapshot.val().username);
        });
        retriveData = firebase.database().ref('users');
        
        retriveData.on('value', function(snapshot) 
        {
              snapshot.forEach(function(childSnapshot) 
              {
                // key will be the UID
                var uid = childSnapshot.key;
                var path = uid+"/";
                // childData will be the actual contents of the child
                for (var photoIndex in childSnapshot.val().photos) 
                {
                    if (childSnapshot.val().photos.hasOwnProperty(photoIndex)) 
                    {
                        if(childSnapshot.val().photos[photoIndex].status=="public")
                        {
                           var photoName = photoIndex.replace(/_(?!.*?_)/gi,".");
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
        function uploadPhoto()
        {
            var photo = $(".fileInput")[0].files[0];
            var storageRef = storage.ref("Photo/"+user.uid);
            var imagesRef = storageRef.child(photo.name);
            updatePhotoArray(photo.name);
            imagesRef.put(photo);
            console.log("Photo Uploaded");
        }
        function getPhotos()
        {
            console.log(arr);
            arr.forEach(function(val)
            {
                var pr = storage.ref("Photo/"+val);
                var imgsrc="";
                pr.getDownloadURL().then(function(url)                             
                {    
                    // var $column = $('<div></div>').attr("class","col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb");
                    // var $link_to_image = $("<a></a>").attr("class","thumbnail imglink").attr("href",url);
                    // var $thumbnail_of_image = $("<img/>").attr("class","img-thumbnail img-responsive img-rounded page_image").attr("src",url);
                    // var $image_title = $("<div></div>").attr("class","ts").text("Photo");
                    // //the main coloumn is appended into the row
                    // $link_to_image.append($thumbnail_of_image,$image_title);
                    // $column.append($link_to_image).appendTo("#galleryrow");
                    console.log(url);
                    var im = "<div id='photoDiv' class='col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb'>"+
                                "<a class='thumbnail imglink'><img class='img-thumbnail img-responsive img-rounded page_image' src='"+url+"'/></a>"+
                             "</div>";
                    $("#galleryrow").append(im);
                })
            }); 
        }
        function updatePhotoArray(name)
        {
            var userData = firebase.database().ref('users/'+user.uid+"/photos/"+name.replace(".","_"));
            userData.set
            ({
                status: "public"
            });
        }
        $(".upload").click(function()
        {
             
            uploadPhoto();
            waitToLoadPhoto();
            
        });
        function waitToLoadPhoto(){
           var onRetriveComplete = setInterval(function()
           {
                if(loadingComplete)
                {
                    clearInterval(onRetriveComplete);
                    loadingComplete = false;
                    $("#galleryrow div").remove();
                    getPhotos();
                }
            
           },500);
        }
        waitToLoadPhoto();
        
   //  //The top 2 lines make sure that syntax is strictly controlled
   //  //and that all elements are ready to be used before the script begins
   //  //A function to insert one single tile of image
   //      function insert_img_thumbnail_into_gallery(i,link,title) 
   //      {
   //          //this makes it easier to see how the structure is being created
   //          var $column = $('<div></div>').attr("class","col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb");
   //          var $link_to_image = $("<a></a>").attr("class","thumbnail imglink" +i).attr("href",link);
   //          var $thumbnail_of_image = $("<img/>").attr("class","img-thumbnail img-responsive img-rounded page_image").attr("src",link);
   //          var $image_title = $("<div></div>").attr("class","ts").text(title);

   //          //the main coloumn is appended into the row
   //          $link_to_image.append($thumbnail_of_image,$image_title);
   //          $column.append($link_to_image).appendTo("#galleryrow");
   //      }
   }
});
