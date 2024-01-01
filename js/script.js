document.addEventListener('DOMContentLoaded', function() {
    initMap();
    fetchEarthquakeData();
});

let map;

function initMap() {
    //create a Leaflet map instance and associates it with an HTML element that has the id attribute 'map'
    map = L.map('map').setView([34.0522, -118.2437], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map); //Add layer to map instance
}

function fetchEarthquakeData() {
    const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
    const latitude = 34.0522;
    const longitude = -118.2437;
    const maxRadiusKm = 100;
    const minMagnitude = 1.0;

    const url = `${baseUrl}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxRadiusKm}&minmagnitude=${minMagnitude}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data.features[0].geometry.coordinates[1])
            data.features.forEach(feature => {
                displayEarthquakes(feature)
            })
        })
        .catch(error => console.error('Error fetching earthquake data:', error));
}

function displayEarthquakes(earthquake) {
    const coords = earthquake.geometry.coordinates;
    const lat = coords[1];
    const lng = coords[0];
    const magnitude = earthquake.properties.mag;
    const time = new Date(earthquake.properties.time).toLocaleString();
    const popupText = `<b>${earthquake.properties.title}</b><br>Time: ${time}<br>Magnitude: ${magnitude}`;

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(popupText);;
}
