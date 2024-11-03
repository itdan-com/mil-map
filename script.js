// Create the map and set the initial view
var map = L.map('map').setView([37.0902, -95.7129], 5); // Replace with your desired center coordinates and zoom level

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON data
fetch('https://raw.githubusercontent.com/itdan-com/mil-map/refs/heads/main/data/base-locations.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  })
  .catch(err => console.error('Error loading GeoJSON:', err));
