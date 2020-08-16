
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYW1jZ3Vpbm4iLCJhIjoiY2tkdG9wandhMDU3ZTJ4cGxtaG5yd2d3aiJ9.FMU72HehweqVt3eGAhkuDg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 1 // starting zoom
});

function fly() {
    map.flyTo({
        center: [
            10,
            80
        ],
        zoom: 2,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });

    var marker = new mapboxgl.Marker()
        .setLngLat([10, 80])
        .addTo(map);
}

document.getElementById("fly").addEventListener("click", function () {
    fly();
})