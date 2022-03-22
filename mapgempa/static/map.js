$("#list-btn").click(function() {
  openNav();
  return false;
});

// $("#sidebar-hide-btn").click(function() {
//   closeNav();
//   return false;
// });

// $("#sidebar-hide-btn").click(function() {
//   animateSidebarRight();
//   return false;
// });

function openNavLeft() {
  document.getElementById("sidebar-left").style.left = "0px";
  document.getElementById("close-button-left").style.display = "block";
  document.getElementById("open-button-left").style.display = "none";
  if ($(window).width() < 767) {
    document.getElementById("open-button-right").style.display = "none";
  }
}
function closeNavLeft() {
  document.getElementById("sidebar-left").style.left = "-300px";
  document.getElementById("close-button-left").style.display = "none";
  document.getElementById("open-button-left").style.display = "block";
  if ($(window).width() < 767) {
    document.getElementById("open-button-right").style.display = "block";
  }
}

function openNavRight() {
  document.getElementById("sidebar-right").style.right = "0px";
  document.getElementById("close-button-right").style.display = "block";
  document.getElementById("open-button-right").style.display = "none";
  if ($(window).width() < 767) {
    document.getElementById("open-button-left").style.display = "none";
  }
}
function closeNavRight() {
  document.getElementById("sidebar-right").style.right = "-300px";
  document.getElementById("close-button-right").style.display = "none";
  document.getElementById("open-button-right").style.display = "block";
  if ($(window).width() < 767) {
    document.getElementById("open-button-left").style.display = "block";
  }
}


// function animateSidebar() {
//   $("#sidebar").animate({
//     width: "0"
//   }, 250, function() {
//     map.invalidateSize();
//   })
//   $("#toggle").animate({
//     left: "0"
//   }, 250)
// }

// function animateSidebarRight() {
//   $("#sidebar-right").animate({
//     width: "toggle"
//   }, 350, function() {
//     map.invalidateSize();
//   });
// }
