// MAP INITIALIZATION
var map = L.map('map', {
  // zoomAnimation: false,
  // preferCanvas: true,
  center: [-2, 118],
  zoom: 6,
  zoomControl: false,
  attributionControl: false
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

// FUNCTION FOR DATA DISPLAYING
function data_gempa(feature){
  document.getElementById("mag").innerHTML = feature.properties.magnitude;
  document.getElementById("kluster").innerHTML = feature.properties.cluster;
  document.getElementById("lintang").innerHTML = feature.properties.lintang_y;
  document.getElementById("bujur").innerHTML = feature.properties.bujur_x;
  document.getElementById("rad").innerHTML = feature.properties.estimasiradius;
  document.getElementById("infra").innerHTML = feature.properties.jumlahinf;
};

function data_infrastruktur(parent, feature){
  new_row = document.createElement('div');
  new_row.className = "card card-body";
  main_info = document.createElement('div');
  main_info.className = "main-info";
  main_info.textContent = feature.properties.name;
  side_info = document.createElement('div');
  side_info.textContent = feature.properties.kota;
  side_info.className = "side-info";
  new_row.appendChild(main_info)
  new_row.appendChild(side_info)
  parent.appendChild(new_row)
};

function info_active(parent, layer) {
  if (Object.keys(layer["_layers"]).length != 0) {
    parent.style.display = "flex";
  }
}

// GET GEOJSON
var rad_gempa = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/gempa/" + id,{
  pointToLayer: function(feature, latlng) {
    if (feature.properties.estimasiradius > 4.5) {
      map.flyTo(latlng, 8,{duration: 1});
    } else {
      map.flyTo(latlng, 8);
    }
    return new L.circle (latlng, {color: '#f54242', radius: feature.properties.estimasiradius*1000, fillOpacity: 0});
  }
}).addTo(map);

var gempa = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/gempa/" + id,{
  pointToLayer: function(feature, latlng) {
    return new L.marker (latlng, {icon: iconGempa});
  },
  onEachFeature: function (feature,layer) {
    data_gempa(feature);
  }
}).addTo(map);

const info_jembatan = document.getElementById("jembatan-info")
const elemjembatan = document.getElementById("JembatanNasional")
var jembatan = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/jembatan/" + id,{
  onEachFeature: function (feature,layer) {
    layer.bindPopup(feature.properties.name).on('click', clickZoomInf)
    data_infrastruktur(elemjembatan, feature)
  },
  pointToLayer: function(feature, latlng) {
    return new L.circleMarker (latlng, {color: '#2c56de', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

const info_bendungan = document.getElementById("bendungan-info")
const elembendungan = document.getElementById("Bendungan")
var bendungan = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/bendungan/" + id,{
  onEachFeature: function (feature,layer) {
    layer.bindPopup(feature.properties.name).on('click', clickZoomInf)
    data_infrastruktur(elembendungan, feature)
},
  pointToLayer: function(feature, latlng) {
    return new L.circleMarker (latlng, {color: '#de2c2c', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

const info_tpa = document.getElementById("tpa-info")
const elemtpa = document.getElementById("TPA")
var tpa = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/tpa/" + id,{
  onEachFeature: function (feature,layer) {
    layer.bindPopup(feature.properties.name).on('click', clickZoomInf)
    data_infrastruktur(elemtpa, feature)
  },
  pointToLayer: function(feature, latlng) {
    return new L.circleMarker (latlng, {color: '#61de2c', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

var dataspam = []
var spam = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/spam/" + id,{
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
    return new L.circleMarker (latlng, {color: '#31941b', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

var dataiplt = []
var iplt = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/iplt/" + id,{
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
    return new L.circleMarker (latlng, {color: '#32341b', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

var dataipal = []
var ipal = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/ipal/" + id,{
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
    return new L.circleMarker (latlng, {color: '#87361b', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

var datarusunawa = []
var rusunawa = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/rusunawa/" + id,{
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
    return new L.circleMarker (latlng, {color: '#123987b', radius: 3, fillOpacity: 1});
  }
}).addTo(map);

var datarusus = []
var rusus = new L.GeoJSON.AJAX("http://127.0.0.1:8000/api/rusus/" + id,{
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
    return new L.circleMarker (latlng, {color: '#1b', radius: 3, fillOpacity: 1});
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

// L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

// EXTRA FEATURE
function clickZoomGempa(e) {
  map.flyTo(e.target.getLatLng());
}
function clickZoomInf(e) {
  map.flyTo(e.target.getLatLng());
}

setTimeout(function() {
  info_active(info_jembatan, jembatan)
  info_active(info_bendungan, bendungan)
}, 200);

