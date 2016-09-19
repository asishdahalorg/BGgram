
var dataArray = [{"src":"images/home1.jpg","alt":"photo1"},
				 {"src":"images/home2.jpg","alt":"photo2"},
				 {"src":"images/home3.jpg","alt":"photo3"},
				 {"src":"images/home4.jpg","alt":"photo4"},
				 {"src":"images/home5.jpg","alt":"photo5"},
				 {"src":"images/home6.jpg","alt":"photo6"},
				 {"src":"images/home7.jpg","alt":"photo7"},
				 {"src":"images/home8.jpg","alt":"photo8"},
				 {"src":"images/home9.jpg","alt":"photo9"}
				];
$(function(){
	//Initialazing the slide show, adding photos.
	function bigPhotos(){
	var photos = '<div class="item"><img src="#src" alt="#alt"></div>';
	var thumbPhotos = '<div class="img-t"  data-photo="#data-photo#"><img src="#src" alt="#alt"/></div>';
	for(var i = 0; i<dataArray.length; i++)
	{
		var newSlide = photos.replace("#src",dataArray[i].src).replace("#alt",dataArray[i].alt);
		$(".slideShow").append(newSlide);
		var newThumbnails = thumbPhotos.replace("#src",dataArray[i].src).replace("#alt",dataArray[i].alt).replace("#data-photo#",i);
		$(".thumbnails .thumbnailsSingle").append(newThumbnails);
	}
	// Adding class active to virst photo on slide show.
	$(".slideShow div:first").addClass("active");
	$(".thumbnailsSingle div:first").addClass("active");

	//When clicking the thumbnails, it changes the slide show photo to the one clicked
	// It also changes the opacity on the thumbnail photo.
	$(".thumbnailsSingle div.img-t").click(
	function(){
		clearInterval(slideShowTimeOut);
		var index = $(this).attr("data-photo");
		$(".slideShow .active").removeClass("active");
		$(".thumbnailsSingle .active").removeClass("active");
		$(".slideShow div").eq(index).addClass("active");
		$(".thumbnailsSingle div").eq(index).addClass("active");
		slideShowTimeOut = setInterval(function(){leftFunct();},5000);
	});

}
bigPhotos();
//Right button function.
function rightFunct(){
	var active = $(".slideShow .active");
	var activeThumb = $(".thumbnailsSingle .active");
	var nexLength = $(".slideShow .active").next().length;
	if(nexLength==0)
	{
		active.removeClass("active");
		$(".slideShow div:first").addClass("active");
		activeThumb.removeClass("active");
		$(".thumbnailsSingle div:first").addClass("active");
	}
	else 
	{
		active.removeClass("active").next().addClass("active");
		activeThumb.removeClass("active").next().addClass("active");
	}
}
//Left button function.
function leftFunct(){
	var active = $(".slideShow .active");
	var activeThumb = $(".thumbnailsSingle .active");
	var prevLength = $(".slideShow .active").prev().length;
	if(prevLength==0)
	{
		active.removeClass("active");
		$(".slideShow div:last").addClass("active");
		activeThumb.removeClass("active");
		$(".thumbnailsSingle div:last").addClass("active");
	}
	else 
	{
		active.removeClass("active").prev().addClass("active");
		activeThumb.removeClass("active").prev().addClass("active");
	}
}
// When rigth button is clicked it changes 
// the slide show photo and the opacity of thumbnail.
$(".right").click(
	function()
	{
		clearInterval(slideShowTimeOut);
		rightFunct();
		slideShowTimeOut = setInterval(function(){leftFunct();},5000);
	});
// When left button is clicked it changes 
// the slide show photo and the opacity of thumbnail.
$(".left").click(
	function()
	{
		clearInterval(slideShowTimeOut);
		leftFunct();
		slideShowTimeOut = setInterval(function(){leftFunct();},5000);
	});

	var slideShowTimeOut = setInterval(function(){rightFunct();},5000);
});
