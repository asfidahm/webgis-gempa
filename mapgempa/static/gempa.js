// MAP INITIALIZATION
var map = L.map('map', {
  // zoomAnimation: false,
  // preferCanvas: true,
  center: [-2, 118],
  zoom: 6
});

// GET URL PARAMETERS
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const num = urlParams.get('id')
const id = num || 1;

// BASE LAYER
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// ICON
var iconGempa = L.icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/natural-disasters/512/earthquake-512.png',
  iconSize: [40, 40],
});

// // LIST INFRASTRUKTUR TABLE
// function GenerateTable(data) {
//   //Create a HTML Table element.
//  var table = document.createElement("TABLE");
//  table.border = "1";

//  //Add the header row.
//  var row = table.insertRow(-1);
//      var headerCell = document.createElement("TH");
//      headerCell.innerHTML = "NAME";  //Fieldname
//      row.appendChild(headerCell);
//      var headerCell = document.createElement("TH");
//      headerCell.innerHTML = "LINTANG";   //Fieldname
//      row.appendChild(headerCell);
//      var headerCell = document.createElement("TH");
//      headerCell.innerHTML = "BUJUR";   //Fieldname
//      row.appendChild(headerCell);

//  //Add the data rows. 
//  for (var i = 0; i < datajembatan.length; i++) {
//      row = table.insertRow(-1);

//          var cell = row.insertCell(-1);
//          cell.innerHTML = datajembatan[i].NAME;
//          var cell = row.insertCell(-1);
//          cell.innerHTML = datajembatan[i].LINTANG;
//          var cell = row.insertCell(-1);
//          cell.innerHTML = datajembatan[i].BUJUR;
//          var cell = row.insertCell(-1);
//  }

//  var dvTable = document.getElementById("dvTable");
//  dvTable.innerHTML = "";
//  dvTable.appendChild(table);
// }

// FUNCTION FOR DATA DISPLAYING
function data_gempa(datagempa){
  document.getElementById("lokasi").innerHTML = datagempa[0].NAME;
  document.getElementById("magnitude").innerHTML = datagempa[0].MAG;
  document.getElementById("radius").innerHTML = datagempa[0].RAD;
  document.getElementById("kluster").innerHTML = datagempa[0].CLUSTER;
};

// GET GEOJSON
var rad_gempa = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/gempa/" + id,{
  pointToLayer: function(feature, latlng) {
    map.flyTo(latlng, 9);
    return new L.circle (latlng, {color: '#f54242', radius: feature.properties.estimasiradius*1000, fillOpacity: 0});
  }
}).addTo(map);

datagempa = []
var gempa = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/gempa/" + id,{
  pointToLayer: function(feature, latlng) {
    return new L.marker (latlng, {icon: iconGempa});
  },
  onEachFeature: function (feature,layer) {
    datagempa.push({
      NAME: feature.properties.name,
      LINTANG : feature.properties.lintang_y,
      BUJUR : feature.properties.bujur_x,
      MAG : feature.properties.magnitude,
      RAD : feature.properties.estimasiradius,
      DATE : feature.properties.datetime,
      CLUSTER : feature.properties.cluster,
      INF : feature.properties.jumlahinf,
    })
    // data_gempa(datagempa);
  }
}).addTo(map);

var datajembatan = []
var jembatan = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/jembatan/" + id,{
  onEachFeature: function (feature,layer) {
    layer.bindPopup(feature.properties.name).on('click', clickZoomInf)
    datajembatan.push({
      NAME: feature.properties.name,
      LINTANG : feature.properties.lintang_y.toFixed(3),
      BUJUR : feature.properties.bujur_x.toFixed(3),
      NOMOR : feature.properties.nomor_jembatan,
    })
    // GenerateTable(datajembatan)
  },
  pointToLayer: function(feature, latlng) {
    return new L.circleMarker (latlng, {color: '#2c56de', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

var databendungan = []
var bendungan = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/bendungan/" + id,{
  onEachFeature: function (feature,layer) {
    layer.bindPopup(feature.properties.name).on('click', clickZoomInf)
    databendungan.push({
      NAME: feature.properties.name,
      LINTANG : feature.properties.lintang_y.toFixed(3),
      BUJUR : feature.properties.bujur_x.toFixed(3),
      PROV : feature.properties.provinsi,
      KOT : feature.properties.kota,
    })
  },
  pointToLayer: function(feature, latlng) {
    return new L.circleMarker (latlng, {color: '#de2c2c', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

var datatpa = []
var tpa = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/tpa/" + id,{
  onEachFeature: function (feature,layer) {
    layer.bindPopup(feature.properties.name).on('click', clickZoomInf)
    datatpa.push({
      NAME: feature.properties.name,
      LINTANG : feature.properties.lintang_y.toFixed(3),
      BUJUR : feature.properties.bujur_x.toFixed(3),
      PROV : feature.properties.provinsi,
      KOT : feature.properties.kota,
    })
  },
  pointToLayer: function(feature, latlng) {
    return new L.circleMarker (latlng, {color: '#61de2c', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

// layer control
var baseMaps = {
  "OpenstreetMap": osm,
  "ESRI Imagery": esri
};

var overlayMaps = {
  "Gempa": gempa,
  "Bendungan": bendungan,
  "TPA" : tpa,
  "Jembatan Nasional": jembatan
};

L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

// EXTRA FEATURE
function clickZoomGempa(e) {
  map.flyTo(e.target.getLatLng());
}
function clickZoomInf(e) {
  map.flyTo(e.target.getLatLng());
}