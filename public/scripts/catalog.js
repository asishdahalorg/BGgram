"use strict";
$(document).ready(function(){

   // var firebase = require("firebase");
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyChi7CPreml7IQNQ5H42gfbybfs6538bY4",
    authDomain: "bggram-d9ba0.firebaseapp.com",
    databaseURL: "https://bggram-d9ba0.firebaseio.com",
    storageBucket: "bggram-d9ba0.appspot.com",
    messagingSenderId: "50803099095"
  };
  firebase.initializeApp(config);

  var database = firebase.database().ref("bggram-d9ba0");

//The top 2 lines make sure that syntax is strictly controlled
//and that all elements are ready to be used before the script begins

// A mock database of images for catalog. This is NOT used for HW2. We ended up using the Flickr public api instead
var images =   [{"src":"../images/catalog1.jpg","alt":"photo1","tag":"food"},
                {"src":"../images/catalog2.jpg","alt":"photo2","tag":"food"},
                {"src":"../images/catalog3.jpg","alt":"photo3","tag":"food"},
                {"src":"../images/catalog4.jpg","alt":"photo4","tag":"food"},
                {"src":"../images/catalog5.jpg","alt":"photo5","tag":"food"},
                {"src":"../images/catalog6.jpg","alt":"photo6","tag":"food"},
                {"src":"../images/catalog7.jpg","alt":"photo7","tag":"food"},
                {"src":"../images/catalog8.jpg","alt":"photo8","tag":"food"},
                {"src":"../images/catalog9.jpg","alt":"photo9","tag":"food"},
                {"src":"../images/catalog2.jpg","alt":"photo10","tag":"food"},
                {"src":"../images/catalog10.jpg","alt":"photo11","tag":"food"},
                {"src":"../images/catalog11.jpg","alt":"photo12","tag":"food"},
                {"src":"../images/catalog12.jpg","alt":"photo13","tag":"food"},
                {"src":"../images/catalog13.jpg","alt":"photo14","tag":"food"},
                {"src":"../images/catalog14.jpg","alt":"photo15","tag":"food"},
                {"src":"../images/catalog15.jpg","alt":"photo16","tag":"food"},
                {"src":"../images/catalog16.jpg","alt":"photo17","tag":"food"}];

//A function to insert one single tile of image
function insert_img_thumbnail_into_gallery(i,link,title) {
    $(document).ready();
    //this makes it easier to see how the structure is being created
    var $column = $('<div></div>').attr("class","col-lg-3 col-md-4 col-sm-6 col-xs-12 thumb");
    var $link_to_image = $("<a></a>").attr("class","thumbnail imglink" +i).attr("href",link);
    var $thumbnail_of_image = $("<img/>").attr("class","img-thumbnail img-responsive img-rounded page_image").attr("src",link);
    var $image_title = $("<div></div>").attr("class","ts").text(title);

    //the main coloumn is appended into the row
    $link_to_image.append($thumbnail_of_image,$image_title);
    $column.append($link_to_image).appendTo("#galleryrow");

}

function flickr() {
    //redundant? check to make sure elements are all set
    $(document).ready();
    $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {   //I tried to implement a search functionality by
            //accessing $("#search_bar).val() which is the input value from catalog page.
            //however, the tag does not seem to like this, or rather, it does not evaluate the string
            //before being parsed.
            //The good news is, leaving tags blank acts as sort of a dice roll so clicking search will
            //still cause dynamic change
            tags: "",
            tagmode: "any",
            format: "json"
        }, function (data){
            //a jquery forloop over data returned by flickr
            $.each(data.items,function (i,item){
                //for each image, insert a set of elements
                insert_img_thumbnail_into_gallery(i,item.media.m,item.title)
            });

        });
}

flickr();

});



