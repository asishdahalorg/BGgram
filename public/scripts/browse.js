
$(function () {
    $("#searchimagebtn").click(function () {
        $('#imgselectioncontainer').empty();
        clickfunction();
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
        var safesearch = 'true';
        var order = 'popular';
        var maxresult = '12';
        var searchinput = $("#pixabaysearch").val();
        var phototype = 'photo';
        var searchparam = '&q=' + encodeURIComponent(searchinput);
        if (searchinput == undefined || searchinput == '') {
            searchparam = '';
        }
        console.log(searchparam);

        var gallery=$("#imgselectioncontainer");
        console.log(gallery.text());
        var API_KEY = '3381729-f41882d53be3b6ccca98a6179';
        var URL = "http://pixabay.com/api/?key=" + API_KEY + searchparam + "&image_type=" + phototype +
            '&safesearch=' + safesearch + '&order=' + order + '&per_page=' + maxresult;
        console.log(URL);
        $.getJSON(URL, function (data) {
            if (parseInt(data.totalHits) > 0) {
                $.each(data.hits, function (i, hit) {
                    var pixlrcommand = "\"javascript:pixlr.overlay.show({image:'"+ data.hits[i].webformatURL+"', title:'"+"image"+data.hits[i].id+"', service:'editor'});\"";
                    var newaddition = "<div class='col-xs-6 col-sm-4 col-md-3 col-lg-3'>" +
                        "<div class='thumbnail text-right'>" +
                        "<a  href='"+ data.hits[i].webformatURL +"'>" +
                        "<img class='img-responsive img-thumbnail browseimg' src='" + data.hits[i].previewURL + "'>" +
                        "</a>" +
                        "<div class='caption'>" +
                        "<p>" +
                        "<a href="+pixlrcommand+">"+
                        "<button class='btn btn-default' role='button'>Edit</button></a>" +
                        "<button class='btn btn-default' role='button'>Save</button>" +
                        "</p>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    gallery.append(newaddition);
                });
            }
            else {
                console.log('No hits');
                var noresults = "<div class='col-lg-12 text-center'><h1>No Results, Try Again.</h1></div>";
                gallery.append(noresults);
            }
        });
    }
});
