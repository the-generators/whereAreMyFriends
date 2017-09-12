// initialize Parallax
$(document).ready(function(){
      $('.parallax').parallax();
    });


mapboxgl.accessToken = 'pk.eyJ1IjoiaGlsbGFyeWVsbGlzMzciLCJhIjoiY2o3aDBxejVyMWNrYzJ2cGp5ZGgycmQ1bSJ9.0_KVw461XpanOuz5xrLRMQ';

var geojson = {
    "type": "FeatureCollection",
    "features": [

    ]
};

/*// Sets bounds to United States
var us_bounds = [
     [-128.71582031000003, 22.5995379928176], // Southwest coordinates
     [-57.172851560000026, 51.667418018116805]  // Northeast coordinates
];*/

// Sets bounds to the World
var world_bounds = [
	[-180,-90],
	[180,90]
]



var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/hillaryellis37/cj7h31mzu4ahr2ro0uw68r30p',
  	//center: [,] // starting position [lng, lat]
    zoom: 0, // starting zoom
    maxBounds: world_bounds
});


// disable map rotation using right click + drag
map.dragRotate.disable();

// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();




function addPin(longitude, latitude, image) {
    var geojson2 = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": locationName,
                "iconSize": [17, 17]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    longitude,
                    latitude
                ]
            }
        }

        
        ]
    };

    geojson2.features.forEach(function(marker) {

    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = image;
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';
   

    el.addEventListener('click', function() {
        window.modal(marker.properties.message);
    });

    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});

}



   
    //   map.on('mouseenter', 'points', function () {
    //     map.getCanvas().style.cursor = 'pointer';
    // });
    //    map.on('mouseleave', 'points', function () {
    //     map.getCanvas().style.cursor = '';
    // });


 // $(document).ready(function(){
 //     $('.modal').modal();
 //  });
