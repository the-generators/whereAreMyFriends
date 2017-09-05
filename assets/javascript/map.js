mapboxgl.accessToken = 'pk.eyJ1Ijoid2F0c2VyZmFjZSIsImEiOiJjajZ4MXFsOGYxaG14MzNycGlrZjc2aTV6In0.i1eqahI6l-ClT-EXrN-PcA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-74.50, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

var popup = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat([-74.50, 40])
    .setHTML('<h1>Hello World!</h1>')
    .addTo(map);