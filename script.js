// Create the map and set the initial view
var map = L.map('map').setView([latitude, longitude], zoomLevel); // Replace with your desired center coordinates and zoom level

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON data
fetch('data/base-locations.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  })
  .catch(err => console.error('Error loading GeoJSON:', err));