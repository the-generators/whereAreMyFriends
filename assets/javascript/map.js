// initialize Parallax
$(document).ready(function(){
      $('.parallax').parallax();
    });


mapboxgl.accessToken = 'pk.eyJ1Ijoid2F0c2VyZmFjZSIsImEiOiJjajZ4MXFsOGYxaG14MzNycGlrZjc2aTV6In0.i1eqahI6l-ClT-EXrN-PcA';

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

//set the bounds based on the photos
function setMaxBounds(){

    console.log("latitude ", latitudeArray);
    console.log("longitude ", longitudeArray);

    var minLat = Math.min.apply(null,latitudeArray);
    var maxLat = Math.max.apply(null, latitudeArray);
    var minLng = Math.min.apply(null, longitudeArray);
    var maxLng = Math.max.apply(null, longitudeArray);

    console.log("lat min ", minLat);
    console.log("lat max ", maxLat);

    console.log("lng min ", minLng);
    console.log("lng max ", maxLng);

    world_bounds = [
        [minLng,minLat], //Southwest coordinates
        [maxLng,maxLat]  //Northeast coordinates 
    ];

};


function buildMap(){
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/basic-v9',
        //center: [,] // starting position [lng, lat]
        zoom: 0, // starting zoom
        maxBounds: world_bounds

    });
    // disable map rotation using right click + drag
    map.dragRotate.disable();

    // disable map rotation using touch rotation gesture
    map.touchZoomRotate.disableRotation();

};

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
    console.log(el.style.backgroundImage);
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
