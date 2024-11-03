// Create the map and set the initial view
var map = L.map('map').setView([37.0902, -95.7129], 5); // Center coordinates for the U.S. with a zoom level of 5

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Create a marker cluster group
var markers = L.markerClusterGroup();

// Load GeoJSON data
fetch('data/base-locations.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Add GeoJSON data to the marker cluster group with interaction
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        // Check if feature properties exist
        if (feature.properties) {
          // Create a popup with relevant feature properties
          var popupContent = `
            <strong>Site Name:</strong> ${feature.properties.siteName}<br>
            <strong>Feature Name:</strong> ${feature.properties.featureName}<br>
            <strong>Operational Status:</strong> ${feature.properties.siteOperationalStatus}<br>
            <strong>State:</strong> ${feature.properties.stateNameCode}<br>
            <strong>FIRRMA Site:</strong> ${feature.properties.isFirrmaSite}
          `;
          layer.bindPopup(popupContent);
        }
        // Add the layer to the cluster group
        markers.addLayer(layer);
      }
    });

    // Add the marker cluster group to the map
    map.addLayer(markers);
  })
  .catch(err => console.error('Error loading GeoJSON:', err));
