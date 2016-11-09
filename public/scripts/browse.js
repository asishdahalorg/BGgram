/*  This is the javascript file used for browse.html. It uses pixabay api to get back image json objects
    and put them in a div in the gallery.
    This also gets images from firebase database, which are images downloades from BGgram, and 
    displays them in the browse gallery if they are public.
*/
var SearchClass, searchClass, fromPxlr ;
$(function () {    
    var likesSet = {"food":0,"cars":0,"landscape":0,"people":0};
    var arr = new Set();
    fromPxlr = false;
    // Without the interval the page does not start with the photos
    var waitInterval = setInterval(function()
    {
        if(user)
        {
            clearInterval(waitInterval);
            initializePage();
        }
    },1000);


    // Initializes the user info
    function initializePage(){
        firebase.auth().onAuthStateChanged(function (user1) {
            var userData = firebase.database().ref('users/' + user1.uid);
            userData.update
            ({
                username: user1.displayName,
                email: user1.email,
                profile_picture: ""
            });
            var retriveData;
        });
        // Initially finds public photos no matter theire theme.
        showPhoto("public", null);
    }
    
// Template code from http://www.w3schools.com/howto/howto_js_progressbar.asp tutorials.
// Bar that shows the progress of getting photos to display them to user.
            beginBar();
            function beginBar() {
                var bar = document.getElementById("bar"); 
                var width = 1;
                var id = setInterval(outline, 10);
                function outline() {
                    if (width >= 100) {
                        clearInterval(id);
                    } else {
                        width++; 
                        bar.style.width = width + '%'; 
                    }
                }
            }


    // This finds photos and displays them in the browse gallery.
    function showPhoto(privacy, theme1){
            retriveData = firebase.database().ref('users/');
            arr =  new Set();
            retriveData.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    // Key will be the UID
                    var uid = childSnapshot.key;
                    var path = uid + "/";
                    var privacyType;
                    var themeType;
                    // ChildData will be the actual contents of the child
                    // This looks for photo in firebase database, depending on thier
                    // privacy info and their theme, and adds it to a set.
                    for (var photoIndex in childSnapshot.val().photos){
                        privacyType = childSnapshot.val().photos[photoIndex].Privacy;
                        themeType = childSnapshot.val().photos[photoIndex].Theme;
                        if (childSnapshot.val().photos.hasOwnProperty(photoIndex)){
                            if (privacyType == privacy) {
                                var photoName = photoIndex.replace(/_(?!.*?_)/gi, ".");
                                var photoPath = path + photoName;
                                var userData = firebase.database().ref('users/' + user.uid + "/photos/" + photoIndex);

                                if(theme1!=null && themeType==theme1){
                                    arr.add({src:photoPath,name:photoName});
                                 }
                                 else if(theme1==null){
                                     likes = 0;
                                     theme = "";
                                     userData.on('value', function (property){
                                //Counting amount of likes of each users photo and adding it by theme. 
                                        if(property.val()!=null){
                                            likes = property.val().like;
                                            theme = property.val().Theme;
                                        }
                                     });
                                 //This set will make it easier to impement the D3 Part it already has the amount of likes
                                 // of each theme. 
                                    likesSet[theme] += parseInt(likes);
                                    console.log("name "+photoName + "likes value "+likesSet[theme]);
                                    var photoPath = path + photoName;
                                    arr.add({src:photoPath,name:photoName});
                                    // console.log("in else"+arr);
                                 }
                            }
                        }
                    }
                });
                // $("#presearch").remove();
                $("#barOutline").remove();

                // In case the array of photos is null.
                if(arr==null){console.log("Empty Set");}
                // This shows the pictures that are in the set.
                arr.forEach(function (val) {
                    var storage = firebase.storage();
                    var pr = storage.ref("Photo/" + val.src);
                    var imgsrc = "";
                    pr.getDownloadURL().then(function (url) {
                        var pixlrcommand = "javascript:pixlr.overlay.show({image:'"+encodeURIComponent(url)+"', title:'"+"image" +"', service:'editor'});";
                        // Temp Element acting as grid.
                        var tempElement = document.createElement('div');
                        tempElement.className= "col-lg-3 col-md-4 col-sm-6 col-xs-12 imageOuter";

                        // Rendering the element that contains the photo.
                        ReactDOM.render(
                            React.createElement(PhotoContainer, {src: url,pixlrcommand:pixlrcommand,name:val.name}),
                          tempElement
                        ); 

                        // Adding each photo to the main container.
                        $("#imgselectioncontainer").append(tempElement);

                        $(".likeLinked").unbind().click(function(){
                             var photoName = $(this).data("name").replace(".","_");
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
            });   
    }

/*
    SearchClass is in charge of the Search button and Serch properties.
    Depending on weather the current search property is for PIXLR or 
    from BGgram, it perferms the search. Search input onKeyUp is set to perform a search
    if there is at least 3 letters or more in the input, the interval is to prevent doing
    a search too many times.
*/
       var keyTimer = null;
SearchClass = React.createClass({
    displayName:"SearchClass",
    keyUp:function(){
        if($("#pixabaysearch").val().length>2){
            clearInterval(keyTimer)
            keyTimer = setInterval(function(){
                $("#searchimagebtn").click();
                console.log("Searching....");
                clearInterval(keyTimer);
            },1000);

        }
        else{
            clearInterval(keyTimer);
        }
    },
    searchClick:function(){
        if(fromPxlr)pxlrFunciton()
        else{
            $(".imageOuter").remove();
           var theme = $("#pixabaysearch").val();
           showPhoto("public", theme);
        }
    },
    fromPIXLR:function(){
        fromPxlr = true;
    },
    fromBGgram:function(){
        fromPxlr = false;
    },
    render:function(){
       return React.createElement("div",null,
                React.createElement("input", {type:"text", className:"from-control", 
                                              id:"pixabaysearch", placeholder:"Search",onKeyUp:this.keyUp}),
                React.createElement("button", {className:"btn btn-default submit", id:"searchimagebtn",
                                              onClick:this.searchClick},"Submit"),
                React.createElement("div", {className:"btn-group"},
                    React.createElement("button", {type:"button", className:"btn btn-default dropdown-toggle", "data-toggle":"dropdown"},
                                                  "Search Options  ", React.createElement("span", {className:"caret"})),
                    React.createElement("ul", {className:"dropdown-menu", role:"menu"},
                        React.createElement("li",null,
                            React.createElement("a", {className:"bggram", href:"#", onClick: this.fromBGgram}," Photos From BGgram "),
                            React.createElement("a", {className:"pixlr", href:"#", onClick: this.fromPIXLR}," Photos From PIXLR ")
                        )
                    )
                )
            );
    }
});
var submitButton = document.getElementById("buttonHolder");
searchClass = ReactDOM.render( React.createElement(SearchClass),submitButton);

    // Shows photo from pxlr.
    function pxlrFunciton(){
        // All these options will be toggleable in the future
        var safesearch = 'true';
        var order = 'popular';
        var maxresult = '8';
        var searchinput = $("#pixabaysearch").val();
        var phototype = 'photo';
        var min_height = '700';
        var orientation = 'horizontal';
        var searchparam = '&q=' + encodeURIComponent(searchinput);
        if (searchinput == undefined || searchinput == '') {
            searchparam = '';
        }
        $(".imageOuter").remove();


        var gallery=$("#imgselectioncontainer");
        var API_KEY = '3381729-f41882d53be3b6ccca98a6179';
        var URL = "https://pixabay.com/api/?key=" + API_KEY + searchparam + "&image_type=" + phototype +
            '&safesearch=' + safesearch + '&order=' + order + '&per_page=' + maxresult +'&min_height='+ min_height +
                '&orientation=' + orientation;
        var data;
        var URL;
        $.getJSON(URL, function (data) {
            if (parseInt(data.totalHits) > 0) {
                $.each(data.hits, function (i, hit) {
                    // Pixlr api command.
                    var pixlrcommand = "javascript:pixlr.overlay.show({image:'"+encodeURIComponent(data.hits[i].webformatURL)+"', title:'"+"image" +"', service:'editor'});";
                    var tempElement = document.createElement('div');
                    tempElement.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 imageOuter";

                    // Rendering the element that contains the photo.
                    ReactDOM.render(
                        React.createElement(PhotoContainer, {src:data.hits[i].webformatURL,pixlrcommand:pixlrcommand}),
                        tempElement
                    );                   
                    // Adding each photo to the main container.
                    $("#imgselectioncontainer").append(tempElement);
                });
            }
            else {
                console.log('No hits');
                gallery.empty();
                $(document).ready();
                var noresults = "<div class='col-lg-12 text-center'><h1>No Results, Try Again.</h1></div>";
                gallery.append(noresults);
            }
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
