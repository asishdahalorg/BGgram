$('#input input').unbind().keyup(function(e) {
    var value = $(this).val();
    if (value.length>3) {
        table.search(value).draw();
    } else {
        //optional, reset the search if the phrase
        //is less then 3 characters long
        table.search('').draw();
    }
});

$(document).ready(function () {
    $("#searchbutton").click(function () {
        $("#images").empty();
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            {
                tags: "car",
                tagmode: "any",
                format: "json"
            }, function (data) {
                $.each(data.items, function (i, item) {
                    $('<img/>').attr("src", item.media.m).appendTo('#images');
                    if (i == 3) return false;
                });
            });

    });
});