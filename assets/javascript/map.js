// initialize Parallax
$(document).ready(function(){
      $('.parallax').parallax();
    });


mapboxgl.accessToken = 'pk.eyJ1Ijoid2F0c2VyZmFjZSIsImEiOiJjajZ4MXFsOGYxaG14MzNycGlrZjc2aTV6In0.i1eqahI6l-ClT-EXrN-PcA';

//
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-74.50, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

// var popup = new mapboxgl.Popup({closeOnClick: false})
//     .setLngLat([-74.50, 40])
//     .setHTML('<h1>Hello World!</h1>')
//     .setHTML('<img src=assets/images/instagram.jpg>')
//     .addTo(map);



map.on('load', function(coordinates, profilePic) {

    map.loadImage('https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/21373019_114988352523105_8096550142267621376_n.jpg', function(error, image) {
        if (error) throw error;
        map.addImage('profilePic', image);
        image.className = "modal-trigger";
     	
        console.log(image);
        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-74.50, 40]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "profilePic",
                "icon-size": 0.25
            }
        });
    });
    console.log('here');
    map.on('click', 'points', function(e) {
   	 $('#modal1').modal();
   	 console.log("jere");

    });
      map.on('mouseenter', 'points', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
       map.on('mouseleave', 'points', function () {
        map.getCanvas().style.cursor = '';
    });
});

 $(document).ready(function(){
     $('.modal').modal();
  });