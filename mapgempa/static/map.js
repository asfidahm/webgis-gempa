// MAP INITIALIZATION
var map = new L.Map('map',{
    zoomAnimation: false,
    attributionControl: false,
    zoomControl: false,
});

// BASE LAYER
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 18});
map.addLayer(osm);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

// SET VIEW MAP
map.setView(new L.LatLng(-2, 118), 5);

// INSET MAP PLUGIN
var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13});
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);

// DATA PROCESSING
// DATE PARSING
function dateparse(dateString){
    var reggie = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
    var dateArray = reggie.exec(dateString); 
    var now = new Date(
        (+dateArray[1]),
        (+dateArray[2])-1,
        (+dateArray[3]),
        (+dateArray[4]),
        (+dateArray[5]),
        (+dateArray[6]));

        const offsetMs = now.getTimezoneOffset() * 60 * 1000;
        const dateLocal = new Date(now.getTime() - offsetMs);
        const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");

    return str;
};

// FUNCTION FOR DATA DISPLAYING
// INFORMASI DATA GEMPA
function data_gempa(feature){
    document.getElementById("mag").innerHTML = feature.properties.magnitude;   
    document.getElementById("kluster").innerHTML = feature.properties.cluster;
    document.getElementById("lintang").innerHTML = feature.properties.lintang_y + "°";
    document.getElementById("bujur").innerHTML = feature.properties.bujur_x + "°";
    document.getElementById("rad").innerHTML = feature.properties.estimasiradius + " Km";    
    document.getElementById("infra").innerHTML = feature.properties.jumlahinf;

    document.getElementById("title-gempa").innerHTML = feature.properties.name;
    document.getElementById("mag-unduh").innerHTML = feature.properties.magnitude;
    document.getElementById("lintang-unduh").innerHTML = feature.properties.lintang_y + "°";
    document.getElementById("bujur-unduh").innerHTML = feature.properties.bujur_x + "°";
    document.getElementById("waktu-unduh").innerHTML = feature.properties.datetime;
    document.getElementById("kedalaman-unduh").innerHTML = feature.properties.depth;
    document.getElementById("rad-unduh").innerHTML = feature.properties.estimasiradius;
    document.getElementById("inf-unduh").innerHTML = feature.properties.jumlahinf;
    document.getElementById("kluster-unduh").innerHTML = feature.properties.cluster;
};
// INFORMASI DATA JEMBATAN
function data_jembatan(parent, feature){
    new_row = document.createElement('div');
    new_row.className = "card card-body";

    main_info = document.createElement('div');
    main_info.className = "main-info";
    main_info.textContent = feature.properties.name;

    side_info = document.createElement('div');
    side_info.textContent = feature.properties.nomor_jembatan;
    side_info.className = "side-info";

    new_row.addEventListener("click", function(e) {
      var latlng = L.latLng(feature.properties.lintang_y, feature.properties.bujur_x);
      map.setView(latlng, 14);
      var popup = L.popup()
          .setLatLng(latlng)
          .setContent('<table class="table"><thead><tr><th scope="col">Nama</th scope="col"><th scope="col">Kode Jembatan</th></tr></thead><tbody><tr><td>'+feature.properties.name+'</td><td>'+feature.properties.nomor_jembatan+'</td></tr></tbody></table>')
          .openOn(map);
    }, false);

    new_row.appendChild(main_info);
    new_row.appendChild(side_info);
    parent.appendChild(new_row);
};
// INFORMASI DATA INFRASTRUKTUR LAIN
function data_infrastruktur(parent, feature){
    new_row = document.createElement('div');
    new_row.className = "card card-body";

    main_info = document.createElement('div');
    main_info.className = "main-info";
    main_info.textContent = feature.properties.name;

    side_info = document.createElement('div');
    side_info.textContent = feature.properties.kota;
    side_info.className = "side-info";

    new_row.addEventListener("click", function(e) {
      if ($(window).width() < 376) {
        closeNavRight()
      }
      var latlng = L.latLng(feature.properties.lintang_y, feature.properties.bujur_x);
      map.setView(latlng, 14);
      var popup = L.popup()
          .setLatLng(latlng)
          .setContent('<table class="table"><thead><tr><th scope="col">Nama</th scope="col"><th scope="col">Provinsi</th><th scope="col">Kota</th></tr></thead><tbody><tr><td>'+feature.properties.name+'</td><td>'+feature.properties.provinsi+'</td><td>'+feature.properties.kota+'</td></tr></tbody></table>')
          .openOn(map);
    }, false);

    new_row.appendChild(main_info);
    new_row.appendChild(side_info);
    parent.appendChild(new_row);
};

var base_url = window.location.origin;

// INFORMASI DATA GEMPA LAIN
$.ajax({
    type: "GET",
    url: base_url + "/api/gempa",
    dataType: "json",
    success: function(response) {
      list_items = response
      DisplayList(list_items.features, rows, current_page);
    }
});

let current_page = 1;
let rows = 15;

function DisplayList(items, rows_per_page, page) {
    const list_gempa = document.getElementById('list-gempa');
    const current = document.getElementById('current-page');
    const next = document.getElementById('next-page');
    const previous = document.getElementById('previous-page');
    
    current.textContent = page;
    page_count = Math.ceil(items.length / rows_per_page);

    if (page > 1) {
        previous.classList.remove("disabled");
    } else {
        previous.classList.add("disabled");
    }

    if (page ==  Math.ceil(items.length / rows_per_page)) {
        next.classList.add("disabled");
    } else {
        next.classList.remove("disabled");
    }

    list_gempa.innerHTML = '';
    let count = page - 1;

    let start = rows_per_page * count;
    let end = start + rows_per_page;

    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
        new_row = document.createElement('div');
        
        container = document.createElement('div');
        container.className = "btn btn-primary gempa-container";
        
        mag_info = document.createElement('div');
        mag_info.textContent = paginatedItems[i].properties.magnitude;
        mag_info.className = "gempa-mag text-center"
        
        details = document.createElement('div');
        details.className = "gempa-details"
        
        place_gempa = document.createElement('div');
        place_gempa.className = "gempa-name"
        place_gempa.textContent = paginatedItems[i].properties.name;      

        date_gempa = document.createElement('div');
        date_gempa.className = "gempa-date"
        date_gempa.textContent = dateparse(paginatedItems[i].properties.datetime);
        
        new_row.addEventListener("click", function(e) {
        location.href="/infrastruktur-terdampak?id=" + paginatedItems[i].id;
        }, false);

        details.appendChild(place_gempa);
        details.appendChild(date_gempa);
        container.appendChild(mag_info);
        container.appendChild(details);
        new_row.appendChild(container);
        new_row.className = "panel-info";
        list_gempa.appendChild(new_row);
    };
};

// CHECK GEMPA
function check(parent, response, name) {
    if (response.features.length != 0) {
      parent.style.display = "flex";

      const download = document.getElementById('download');

      div = document.createElement('div');

      title = document.createElement('h4');
      title.textContent = name;
      div.appendChild(title);

      table = document.createElement('table');
      div.appendChild(table);

      tr = document.createElement('tr');
      table.appendChild(tr);

      th1 = document.createElement('th');
      th1.textContent = "No";
      th1.style.maxWidth = "50px";
      tr.appendChild(th1);
      
      th2 = document.createElement('th');
      th2.textContent = "Nama Infrastruktur";
      tr.appendChild(th2);
  
      th3 = document.createElement('th');
      th3.textContent = "Kota";
      tr.appendChild(th3);

      th4 = document.createElement('th');
      th4.textContent = "Provinsi";
      tr.appendChild(th4);
  
      th5 = document.createElement('th');
      th5.textContent = "Koordinat";
      tr.appendChild(th5);
  
      download.appendChild(div);
      for (let i = 0; i < response.features.length; i++) {
        tr2 = document.createElement('tr');

        td1 = document.createElement('td');
        td1.textContent = i + 1;
        tr2.appendChild(td1);
        
        td2 = document.createElement('td');
        td2.textContent = response.features[i].properties.name;
        tr2.appendChild(td2);

        td3 = document.createElement('td');
        td3.textContent = response.features[i].properties.kota;
        tr2.appendChild(td3);

        td4 = document.createElement('td');
        td4.textContent = response.features[i].properties.provinsi;
        tr2.appendChild(td4);

        td5 = document.createElement('td');
        td5.textContent = response.features[i].properties.lintang_y.toFixed(3) + '° ,' + response.features[i].properties.bujur_x.toFixed(3) + '°';
        tr2.appendChild(td5);
        
        table.appendChild(tr2);
      }
    }
};

// CHECK GEMPA
function checkjembatan(parent, response, name) {
  if (response.features.length != 0) {
    parent.style.display = "flex";

    const download = document.getElementById('download');

    div = document.createElement('div');

    title = document.createElement('h4');
    title.textContent = name;
    div.appendChild(title);

    table = document.createElement('table');
    div.appendChild(table);

    tr = document.createElement('tr');
    table.appendChild(tr);

    th1 = document.createElement('th');
    th1.textContent = "No";
    th1.style.maxWidth = "50px";
    tr.appendChild(th1);
    
    th2 = document.createElement('th');
    th2.textContent = "Nama Jembatan";
    tr.appendChild(th2);

    th3 = document.createElement('th');
    th3.textContent = "Nomor Jembatan";
    tr.appendChild(th3);

    th4 = document.createElement('th');
    th4.textContent = "Panjang";
    tr.appendChild(th4);

    th5 = document.createElement('th');
    th5.textContent = "Lebar";
    tr.appendChild(th5);

    th6 = document.createElement('th');
    th6.textContent = "Koordinat";
    tr.appendChild(th6);

    download.appendChild(div);
    for (let i = 0; i < response.features.length; i++) {
      tr2 = document.createElement('tr');

      td1 = document.createElement('td');
      td1.textContent = i + 1;
      tr2.appendChild(td1);
      
      td2 = document.createElement('td');
      td2.textContent = response.features[i].properties.name;
      tr2.appendChild(td2);

      td3 = document.createElement('td');
      td3.textContent = response.features[i].properties.nomor_jembatan;
      tr2.appendChild(td3);

      td4 = document.createElement('td');
      td4.textContent = response.features[i].properties.panjang + " Km";
      tr2.appendChild(td4);

      td5 = document.createElement('td');
      td5.textContent = response.features[i].properties.lebar + " Km";
      tr2.appendChild(td5);

      td6 = document.createElement('td');
      td6.textContent = response.features[i].properties.lintang_y.toFixed(3) + '° ,' + response.features[i].properties.bujur_x.toFixed(3) + '°';
      tr2.appendChild(td6);
      
      table.appendChild(tr2);
    }
  }
};

// ICON
var iconGempa = L.icon({
    iconUrl: "static/assets/img/earthquake.png",
    iconSize: [40, 40],
});

// GET URL PARAMETERS
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const num = urlParams.get('id')
const id = num || 1;


// GET GEOJSON DATA
$.ajax({
    type: "GET",
    url: base_url + "/api/gempa/" + id,
    dataType: "json",
    success: function(response) {
      
      var rad_gempa = new L.geoJSON(response, {
        pointToLayer: function(feature, latlng) {
          if (feature.properties.magnitude < 5) {
            map.setView(latlng, 9);
          } else if(feature.properties.magnitude < 6) {
            map.setView(latlng, 8);
          } else {
            map.setView(latlng, 7);
          }
          return new L.circle (latlng, {color: '#f54242', radius: feature.properties.estimasiradius*1000, fillOpacity: 0, weight: 2});
        }
      }).addTo(map);

      var pusat_gempa = L.geoJSON(response, {
        pointToLayer: function(feature, latlng) {
          return new L.marker (latlng, {icon: iconGempa});
        },
        onEachFeature: function (feature, layer) {
          data_gempa(feature);
        }
      }).addTo(map);
    }
});

const info_jembatan = document.getElementById("jembatan-info");
const elemjembatan = document.getElementById("JembatanNasional");
$.ajax({
  type: "GET",
  url: base_url + "/api/jembatan/" + id,
  dataType: "json",
  success: function(response) {
    var jembatan = new L.geoJSON(response, {
      onEachFeature: function (feature,layer) {
        layer.bindPopup(feature.properties.name).on('click', clickZoomInf);
        data_jembatan(elemjembatan, feature);
      },
      pointToLayer: function(feature, latlng) {
        return new L.circleMarker (latlng, {color: '#FB010B', radius: 3, fillOpacity: 1});
      }
    }).addTo(map);
    checkjembatan(info_jembatan, response, "Jembatan Nasional");
  }
});

const info_bendungan = document.getElementById("bendungan-info");
const elembendungan = document.getElementById("Bendungan");
$.ajax({
  type: "GET",
  url: base_url + "/api/bendungan/" + id,
  dataType: "json",
  success: function(response) {
    var bendungan = new L.geoJSON(response, {
      onEachFeature: function (feature,layer) {
        layer.bindPopup(feature.properties.name).on('click', clickZoomInf);
        data_infrastruktur(elembendungan, feature);
      },
      pointToLayer: function(feature, latlng) {
        return new L.circleMarker (latlng, {color: '#F500BC', radius: 3, fillOpacity: 1});
      }
    }).addTo(map);
    check(info_bendungan, response, "Bendungan");
  }
});

const info_tpa = document.getElementById("tpa-info");
const elemtpa = document.getElementById("TPA");
$.ajax({
  type: "GET",
  url: base_url + "/api/tpa/" + id,
  dataType: "json",
  success: function(response) {
    var tpa = new L.geoJSON(response, {
      onEachFeature: function (feature,layer) {
        layer.bindPopup(feature.properties.name).on('click', clickZoomInf);
        data_infrastruktur(elemtpa, feature);
      },
      pointToLayer: function(feature, latlng) {
        return new L.circleMarker (latlng, {color: '#868487', radius: 3, fillOpacity: 1});
      }
    }).addTo(map);
    check(info_tpa, response, "Tempat Pembuangan Akhir");
  }
});

const info_spam = document.getElementById("spam-info");
const elemspam = document.getElementById("SPAM");
$.ajax({
  type: "GET",
  url: base_url + "/api/spam/" + id,
  dataType: "json",
  success: function(response) {
    var spam = new L.geoJSON(response, {
      onEachFeature: function (feature,layer) {
        layer.bindPopup(feature.properties.name).on('click', clickZoomInf);
        data_infrastruktur(elemspam, feature);
      },
      pointToLayer: function(feature, latlng) {
        return new L.circleMarker (latlng, {color: '#07B3F5', radius: 3, fillOpacity: 1});
      }
    }).addTo(map);
    check(info_spam, response, "IPA SPAM");
  }
});

const info_iplt = document.getElementById("iplt-info");
const elemiplt = document.getElementById("IPLT");
$.ajax({
  type: "GET",
  url: base_url + "/api/iplt/" + id,
  dataType: "json",
  success: function(response) { 
    var iplt = new L.geoJSON(response, {
      onEachFeature: function (feature,layer) {
        layer.bindPopup(feature.properties.name).on('click', clickZoomInf);
        data_infrastruktur(elemiplt, feature);
      },
      pointToLayer: function(feature, latlng) {
        return new L.circleMarker (latlng, {color: '#FFF900', radius: 3, fillOpacity: 1});
      }
    }).addTo(map);
    check(info_iplt, response, "IPLT");
  }
});

const info_ipal = document.getElementById("ipal-info");
const elemipal = document.getElementById("IPAL");
$.ajax({
  type: "GET",
  url: base_url + "/api/ipal/" + id,
  dataType: "json",
  success: function(response) { 
    var ipal = new L.geoJSON(response, {
      onEachFeature: function (feature,layer) {
        layer.bindPopup(feature.properties.name).on('click', clickZoomInf);
        data_infrastruktur(elemipal, feature);
      },
      pointToLayer: function(feature, latlng) {
        return new L.circleMarker (latlng, {color: '#87361b', radius: 3, fillOpacity: 1});
      }
    }).addTo(map);
    check(info_ipal, response, "IPAL");
  }
});

const info_rusunawa = document.getElementById("rusunawa-info");
const elemrusunawa = document.getElementById("Rusunawa");
$.ajax({
  type: "GET",
  url: base_url + "/api/rusunawa/" + id,
  dataType: "json",
  success: function(response) { 
    var rusunawa = new L.geoJSON(response, {
      onEachFeature: function (feature,layer) {
        layer.bindPopup(feature.properties.name).on('click', clickZoomInf);
        data_infrastruktur(elemrusunawa, feature);
      },
      pointToLayer: function(feature, latlng) {
        return new L.circleMarker (latlng, {color: '#E89507', radius: 3, fillOpacity: 1});
      }
    }).addTo(map);
    check(info_rusunawa, response, "Rumah Susun");
  }
});

const info_rusus = document.getElementById("rusus-info");
const elemrusus = document.getElementById("Rusus");
$.ajax({
  type: "GET",
  url: base_url + "/api/rusus/" + id,
  dataType: "json",
  success: function(response) { 
    var rusus = new L.geoJSON(response, {
      onEachFeature: function (feature,layer) {
        layer.bindPopup(feature.properties.name).on('click', clickZoomInf);
        data_infrastruktur(elemrusus, feature);
      },
      pointToLayer: function(feature, latlng) {
        return new L.circleMarker (latlng, {color: '#292DB2', radius: 3, fillOpacity: 1});
      }
    }).addTo(map);
    check(info_rusus, response, "Rumah Khusus");
  }
});

// EXTRA FEATURE
function clickZoomGempa(e) {
    map.setView(e.target.getLatLng());
};
function clickZoomInf(e) {
    map.setView(e.target.getLatLng());
};

function changebasemap(basemap) {
  map.removeLayer(osm);
  map.removeLayer(esri);
  map.removeLayer(Esri_WorldTopoMap);
  map.addLayer(basemap);
  if ($(window).width() < 412) {
    closeNavRight()
  }
}
