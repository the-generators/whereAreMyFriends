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

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  user = obj.username;

}


getAllUrlParams();

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
		    	$(".first-name").text(firstName);
	    		$(".profile-img").attr("src", profilePic);



		    	for (var i = 0; i < 20; i++) {

		    		if (response.data[i].location != null) {


				    	latitude = response.data[i].location.latitude;
				        longitude = response.data[i].location.longitude;
				        locationName = response.data[i].location.name;
				        image = response.data[i].images.standard_resolution.url;
				        console.log(image);

			    		latitudeArray.push(latitude);
			    		longitudeArray.push(longitude);
			    		locationNameArray.push(locationName);
			    		imageArray.push(image);

			    		if (imageArray.length <= 10) {
				    		var div = $("<div class='inline'>");
				    		var img = $("<img src='" + image + "' height=150 width=150>");
				    		var loc = $("<p>" + locationName + "</p>");
				    		div.append(img);
				    		div.append(loc);
				    		$(".image-container").append(div);
				    		
				    	}
			    	}
			    }
		    } 
	});	
}


$(document).ready(function(){

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