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
          // Create content for the tooltip/popup with relevant feature properties
          var content = `
            <strong>${feature.properties.siteName}</strong><br>
            <strong>Type:</strong> ${feature.properties.siteReportingComponent}<br>
            <strong>Operational:</strong> ${feature.properties.siteOperationalStatus}<br>
            <strong>FIRRMA:</strong> ${feature.properties.isFirrmaSite}<br>
            <strong>State:</strong> ${feature.properties.stateNameCode}
          `;

          // Bind a tooltip that shows on hover
          layer.bindTooltip(content, {
            permanent: false,
            direction: 'top',
            opacity: 0.9
          });

          // Bind a popup that stays open on click
          layer.bindPopup(content);

          // Open the tooltip on mouseover
          layer.on('mouseover', function (e) {
            this.openTooltip();
          });

          // Close the tooltip on mouseout
          layer.on('mouseout', function (e) {
            if (!this.isPopupOpen()) {
              this.closeTooltip();
            }
          });

          // Open the popup on click
          layer.on('click', function (e) {
            this.openPopup();
          });
        }

        // Add the layer to the cluster group
        markers.addLayer(layer);
      }
    });

    // Add the marker cluster group to the map
    map.addLayer(markers);
  })
  .catch(err => console.error('Error loading GeoJSON:', err));
