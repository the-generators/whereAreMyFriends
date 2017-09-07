var redirectURI = "https://the-generators.github.io/whereAreMyFriends/";
var clientID = "5108270b430c4a72a1df1ea3478f6f22";
// for temp access token: https://api.instagram.com/oauth/authorize/?client_id=5108270b430c4a72a1df1ea3478f6f22&redirect_uri=https://the-generators.github.io/whereAreMyFriends/&response_type=token
var clientSecret = "0b9dee0918c742b2905efa66af1e02de";
var getTokenURL = "https://api.instagram.com/oauth/authorize/?client_id="+ clientID + "5108270b430c4a72a1df1ea3478f6f22&redirect_uri=" + redirectURI + "&response_type=token";
var accessToken = "298408134.5108270.5e9103a09269400f832a386f5319a114";

var userId;
var profilePic;
var user;
var firstName;
// var slideShowDiv;
var sliderWrapper = $(".slider-wrapper");




	
function Slideshow( element ) {
		this.el = document.querySelector( element );
		this.init();
}
	
Slideshow.prototype = {
		init: function() {
			this.wrapper = this.el.querySelector( ".slider-wrapper" );
			this.slides = this.el.querySelectorAll( ".slide" );
			this.previous = this.el.querySelector( ".slider-previous" );
			this.next = this.el.querySelector( ".slider-next" );
			this.index = 0;
			this.total = this.slides.length;
			this.timer = null;
			
			this.action();
			this.stopStart();	
		},
		_slideTo: function( slide ) {
			var currentSlide = this.slides[slide];
			currentSlide.style.opacity = 1;
			
			for( var i = 0; i < this.slides.length; i++ ) {
				var slide = this.slides[i];
				if( slide !== currentSlide ) {
					slide.style.opacity = 0;
				}
			}
		},
		action: function() {
			var self = this;
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self._slideTo( self.index );
				
			}, 5000);
		},
		stopStart: function() {
			var self = this;
			self.el.addEventListener( "mouseover", function() {
				clearInterval( self.timer );
				self.timer = null;
				
			}, false);
			self.el.addEventListener( "mouseout", function() {
				self.action();
				
			}, false);
		}		
};
	

function getUserStats(id) {

	var queryURL2 = "https://api.instagram.com/v1/users/" + id + "/media/recent/?access_token=" + accessToken + "&callback=?";

	$.ajax({
		    url: queryURL2,
	        type: "GET",
	        dataType: "jsonp"
	}).done(function(response) {

			var latitude;
			var longitude;
			var locationName;
			var image;

			var latitudeArray = [];
			var longitudeArray = [];
			var locationNameArray = [];
			var imageArray = [];


			console.log(response)

		    if (response.data.length === 0) {
		    	alert(user + " has not gone places lately");
		    }
		    
		    else {

		    	$(".image-container").empty();
		    	$(".slider-wrapper").empty();		    	
		    	$(".first-name").text(firstName);
	    		$(".profile-img").attr("src", profilePic);



		    	for (var i = 0; i < 20; i++) {

		    		if (response.data[i].location != null) {


				    	latitude = response.data[i].location.latitude;
				        longitude = response.data[i].location.longitude;
				        locationName = response.data[i].location.name;
				        image = response.data[i].images.standard_resolution.url;

			    		latitudeArray.push(latitude);
			    		longitudeArray.push(longitude);
			    		locationNameArray.push(locationName);
			    		imageArray.push(image);

			    		slideShowDiv = $("<div class='slide-container slide' />");
			    		imgSlide = $('<img src="' + image + '" alt="First">');
			    		locSlide = $('<p>' + locationName + '</p>');
			    		slideShowDiv.append(imgSlide);
			    		slideShowDiv.append(locSlide);
			    		sliderWrapper.append(slideShowDiv);

						
			    	}
			    }
		    } 
var slider = new Slideshow( "#main-slider" );

		    var mapImage = 'url("' + profilePic + '")';

		    for (var i = 0; i < latitudeArray.length; i++) {
		    	addPin(longitudeArray[i], latitudeArray[i], mapImage);
			}
	});	
}



$("#submit-btn").on("click", function(event) {



	event.preventDefault();


	user = $("#instagram-input").val().trim();
	console.log(user);

	var queryURL1 = "https://api.instagram.com/v1/users/search?q=" + user + "&access_token=" + accessToken + "&callback=?";

    $.ajax({
    	url: queryURL1,
    	method: "GET",
    	dataType: "jsonp"
    }).done(function(response) {

    	if ((response.meta.code === 400) || (response.data.length === 0)) {
    		alert(user + " cannot be found");

    	} else {
	    	userId = response.data[0].id;
	    	profilePic = response.data[0].profile_picture;
	    	var fullName= response.data[0].full_name;
	    	firstName = fullName.split(" ")[0];


    		getUserStats(userId);
    	}


    });





});
