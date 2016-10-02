/* This is the javascript file used for browse.html. It uses pixabay api to get back image json objects
* and put them in a div in the gallery.*/
$(function () {
    $("#searchimagebtn").click(function () {
        $('#imgselectioncontainer').empty();
        $(document).ready(function () {
            clickfunction();
        });
    });

    $("#pixabaysearch").keyup(function (event) {
        if(event.keyCode == 13){
            $("#searchimagebtn").click();
        }
        if ($("#pixabaysearch").val().length > 2) {
            $("#searchimagebtn").click();
        }

    });

    function clickfunction() {
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
        console.log(searchparam);

        var gallery=$("#imgselectioncontainer");
        console.log(gallery.text());
        var API_KEY = '3381729-f41882d53be3b6ccca98a6179';
        var URL = "http://pixabay.com/api/?key=" + API_KEY + searchparam + "&image_type=" + phototype +
            '&safesearch=' + safesearch + '&order=' + order + '&per_page=' + maxresult +'&min_height='+ min_height +
                '&orientation=' + orientation;
        console.log(URL);
        $.getJSON(URL, function (data) {
            if (parseInt(data.totalHits) > 0) {
                $.each(data.hits, function (i, hit) {
                    // Pixlr api command
                    var pixlrcommand = "\"javascript:pixlr.overlay.show({image:'"+ data.hits[i].webformatURL+"', title:'"+"image"+data.hits[i].id+"', service:'editor'});\"";

                    //new image contaier
                    var a = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">' +
                        '<div class="hovereffect">' +
                        '<img class="img-responsive" src="'+ data.hits[i].webformatURL +'" alt="">' +
                        '<div class="overlay">' +
                        '<h2><a class="imageedit" href="' + data.hits[i].webformatURL + '">Full Size</a></h2>' +
                        '<p>' +
                        '<a class="imageedit" href='+pixlrcommand+'>edit</a>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    // Div container with links surrounding the image and the buttons
                    // var newaddition = "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-3'>" +
                    //     "<div class='thumbnail text-right'>" +
                    //     "<a  href='"+ data.hits[i].webformatURL +"'>" +
                    //     "<img class='img-responsive img-thumbnail browseimg' src='" + data.hits[i].previewURL + "'>" +
                    //     "</a>" +
                    //     "<div class='caption'>" +
                    //     "<p>" +
                    //     "<a href="+pixlrcommand+">"+
                    //     "<button class='btn btn-default' role='button'>Edit</button></a>" +
                    //     "<button class='btn btn-default' role='button'>Save</button>" +
                    //     "</p>" +
                    //     "</div>" +
                    //     "</div>" +
                    //     "</div>";
                    gallery.append(a);

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
});
