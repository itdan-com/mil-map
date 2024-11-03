// Create the map and set the initial view
var map = L.map('map').setView([37.0902, -95.7129], 5); // Center coordinates for the U.S. with a zoom level of 5

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load GeoJSON data
fetch('data/base-locations.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    L.geoJSON(data).addTo(map);
  })
  .catch(err => console.error('Error loading GeoJSON:', err));
