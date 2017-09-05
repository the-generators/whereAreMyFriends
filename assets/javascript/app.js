// initialize Parallax
$(document).ready(function(){
      $('.parallax').parallax();
    });

var user = "hilzery";
var queryURL = "https://igapi.ga/" + user + "/media?";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response.items);
      var i = 0;
      var lastLocation = response.items[i].location.name;
      console.log(lastLocation);

    });

// added mapbox data. JinS
	mapboxgl.accessToken = 'pk.eyJ1IjoiamlubWFwIiwiYSI6ImNqNnp2ZDJiYjAwbWcyd3A3NzRpY29xaTIifQ.TXWFGOMd3WxlGzmRXGMzRA';
	var map = new mapboxgl.Map({
	  container: 'map', // container id
	  style: 'mapbox://styles/mapbox/dark-v9', //hosted style id
	  center: [-77.38, 39], // starting position
	  zoom: 3 // starting zoom
	});
