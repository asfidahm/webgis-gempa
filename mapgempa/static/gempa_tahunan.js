// MAP INITIALIZATION
var map = L.map('map', {
  // zoomAnimation: false,
  preferCanvas: true,
  center: [-2, 118],
  zoom: 6
});

// BASE LAYER
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


// GET GEOJSON
var gempa_all = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/gempa/",{
  onEachFeature: function (feature,layer) {
    layer.bindPopup(feature.properties.name).on('click', clickZoomGempa)
  },
  pointToLayer: function(feature, latlng) {
    if (feature.properties.cluster === 0){
      return new L.circleMarker (latlng, {color: '#4287f5', radius: 5, fillOpacity: 1});
    } else if (feature.properties.cluster === 1) {
      return new L.circleMarker (latlng, {color: '#42f587', radius: 5, fillOpacity: 1});
    } else {
      return new L.circleMarker (latlng, {color: '#f54242', radius: 5, fillOpacity: 1});
    }
  }
}).addTo(map);

// layer control
var baseMaps = {
  "OpenstreetMap": osm,
  "ESRI Imagery": esri
};

var overlayMaps = {
  "Gempa": gempa_all,
  // "Infrastruktur Point": infrastruktur,
  // "Infrastruktur Line": infrastrukturline
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

// EXTRA FEATURE
function clickZoomGempa(e) {
  map.flyTo(e.target.getLatLng());
}
function clickZoomInf(e) {
  map.flyTo(e.target.getLatLng());
}