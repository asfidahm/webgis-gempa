// WEBMAP
$("#list-btn").click(function() {
  openNav();
  return false;
});

function openNavLeft() {
  if ($(window).width() < 767) {
    document.getElementById("open-button-right").style.display = "none";
  }
  if ($(window).width() < 412) {
    document.getElementById("toggle-left").style.left = "75vw";
    document.getElementById("toggle-left").style.top = "82%";

    document.getElementById("sidebar-left").style.left = "0px";
    document.getElementById("map").style.left = "100vw";
    document.getElementById("close-button-left").style.display = "block";
    document.getElementById("open-button-left").style.display = "none";
  } else {
    document.getElementById("sidebar-left").style.left = "0px";
    document.getElementById("map").style.left = "300px";
    document.getElementById("close-button-left").style.display = "block";
    document.getElementById("open-button-left").style.display = "none";
  }
  map.invalidateSize();
};

function closeNavLeft() {
  if ($(window).width() < 767) {
    document.getElementById("open-button-right").style.display = "block";
  }
  if ($(window).width() < 412) {
    document.getElementById("toggle-left").style.left = "100vw";
    document.getElementById("toggle-left").style.top = null;

    document.getElementById("sidebar-left").style.left = "-100vw";
    document.getElementById("map").style.left = "0px";
    document.getElementById("close-button-left").style.display = "none";
    document.getElementById("open-button-left").style.display = "block";
  } else {
    document.getElementById("sidebar-left").style.left = "-300px";
    document.getElementById("map").style.left = "0px";
    document.getElementById("close-button-left").style.display = "none";
    document.getElementById("open-button-left").style.display = "block";
  }
  map.invalidateSize();
};

function openNavRight() {
  if ($(window).width() < 767) {
    document.getElementById("open-button-left").style.display = "none";
  }
  if ($(window).width() < 412) {
    document.getElementById("toggle-right").style.right = "75vw";
    document.getElementById("toggle-right").style.top = "82%";

    document.getElementById("sidebar-right").style.right = "0px";
    document.getElementById("map").style.right = "100vw";
    document.getElementById("close-button-right").style.display = "block";
    document.getElementById("open-button-right").style.display = "none";
  } else {
    document.getElementById("sidebar-right").style.right = "0px";
    document.getElementById("map").style.right = "300px";
    document.getElementById("close-button-right").style.display = "block";
    document.getElementById("open-button-right").style.display = "none";
  }
  map.invalidateSize();
};

function closeNavRight() {
  if ($(window).width() < 767) {
    document.getElementById("open-button-left").style.display = "block";
  }
  if ($(window).width() < 412) {
    document.getElementById("toggle-right").style.right = "100vw";
    document.getElementById("toggle-right").style.top = null;

    document.getElementById("sidebar-right").style.right = "-100vw";
    document.getElementById("map").style.right = "0px";
    document.getElementById("close-button-right").style.display = "none";
    document.getElementById("open-button-right").style.display = "block";
  } else {
    document.getElementById("sidebar-right").style.right = "-300px";
    document.getElementById("map").style.right = "0px";
    document.getElementById("close-button-right").style.display = "none";
    document.getElementById("open-button-right").style.display = "block";
  }
  map.invalidateSize();
};

function download() {
  var divContents = $("#download").html();
  var printWindow = window.open('', '', 'height=400,width=800');
  printWindow.document.write('<html><head><title>Laporan Kajian Cepat Infrastruktur Berpotensi Terdampak Kejadaian Gempa</title></head>');
  printWindow.document.write('<style>* {font-family: arial, sans-serif;} table { table-layout: fixed; width: 100%; border-collapse: collapse; width: 100%; font-size: 12px;} td, th { border: 1px solid #dddddd; text-align: left; padding:4px} th:nth-child(1) { width: 50px;} tr:nth-child(even) { background-color: #dddddd;}</style><body>');
  printWindow.document.write(divContents);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
};

// INDEX
const lightbox = GLightbox({
  touchNavigation: true,
  loop: true,
  autoplayVideos: true
});