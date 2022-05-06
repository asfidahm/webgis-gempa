// MAP INITIALIZATION
var map = L.map('mappage', {
  zoomAnimation: false,
  preferCanvas: true,
  center: [-2, 118],
  minZoom : 4,
  zoom: 5
});

// BASE LAYER
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


var base_url = window.location.origin;

// GET GEOJSON
var gempa_all = new L.GeoJSON.AJAX(base_url + "/api/gempa/",{
  onEachFeature: function (feature,layer) {
    layer.bindPopup('<table class="table"><thead><tr><th scope="col">Lokasi</th scope="col"><th scope="col">Kluster</th><th scope="col">Magnitudo</th></tr></thead><tbody><tr><td>'+feature.properties.name+'</td><td>'+feature.properties.cluster+'</td><td>'+feature.properties.magnitude+'</td></tr></tbody></table> <div class="d-flex justify-content-center"><button class="btn btn-primary btn-sm" onclick=window.open("/infrastruktur-terdampak?id='+feature.id+'");>Go To</button></div>').on('click', clickZoomGempa)
  },
  pointToLayer: function(feature, latlng) {
    if (feature.properties.cluster === 0){
      return new L.circleMarker (latlng, {color: '#4287f5', radius: 4, fillOpacity: 1});
    } else if (feature.properties.cluster === 1) {
      return new L.circleMarker (latlng, {color: '#42f587', radius: 4, fillOpacity: 1});
    } else {
      return new L.circleMarker (latlng, {color: '#f54242', radius: 4, fillOpacity: 1});
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
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

// EXTRA FEATURE
function clickZoomGempa(e) {
  map.flyTo(e.target.getLatLng());
}
function clickZoomInf(e) {
  map.flyTo(e.target.getLatLng());
}