// Create the map and set the initial view
var map = L.map('map').setView([37.0902, -95.7129], 5); // Center coordinates for the U.S. with a zoom level of 5

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Create an object to store the state groups
var stateGroups = {};

// Load GeoJSON data
fetch('data/base-locations.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Add GeoJSON data to the map with interaction and grouping by state
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        // Check if feature properties exist
        if (feature.properties) {
          var state = feature.properties.stateNameCode;
          
          // Create a popup with relevant feature properties
          var popupContent = `
            <strong>Site Name:</strong> ${feature.properties.siteName}<br>
            <strong>Feature Name:</strong> ${feature.properties.featureName}<br>
            <strong>Operational Status:</strong> ${feature.properties.siteOperationalStatus}<br>
            <strong>State:</strong> ${state}<br>
            <strong>FIRRMA Site:</strong> ${feature.properties.isFirrmaSite}
          `;
          layer.bindPopup(popupContent);

          // Add the layer to the appropriate state group
          if (!stateGroups[state]) {
            stateGroups[state] = L.layerGroup().addTo(map);
          }
          stateGroups[state].addLayer(layer);
        }
      }
    }).addTo(map);

    // Create a control to show state group counts
    var stateCountControl = L.control({ position: 'topright' });
    stateCountControl.onAdd = function () {
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = '<h4>State Site Counts</h4>';
      Object.keys(stateGroups).forEach(state => {
        var count = stateGroups[state].getLayers().length;
        div.innerHTML += `<strong>${state}:</strong> ${count} sites<br>`;
      });
      return div;
    };
    stateCountControl.addTo(map);
  })
  .catch(err => console.error('Error loading GeoJSON:', err));
