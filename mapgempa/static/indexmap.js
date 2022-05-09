var map = new L.Map('mapindex',{
  zoomAnimation: false,
  attributionControl: false,
  zoomControl: false,
  minZoom: 14,
});

// BASE LAYER
var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 18});
map.addLayer(osm);

// SET VIEW MAP
map.setView(new L.LatLng(-7.280, 112.795), 16);

// INSET MAP PLUGIN
var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13});
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);

// GET GEOJSON
var geomat = L.marker([-7.280, 112.795]).bindPopup("Departemen Teknik Geomatika ITS").addTo(map);
geomat.openPopup();

// EXTRA FEATURE
function clickZoomGempa(e) {
  map.flyTo(e.target.getLatLng());
}
function clickZoomInf(e) {
  map.flyTo(e.target.getLatLng());
}