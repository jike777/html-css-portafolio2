// Script for navigation bar

var menu = document.getElementById("navbar");
var bar = document.getElementById("bar");
var close = document.getElementById("close");
bar.addEventListener("click", function () {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
  } else {
    menu.classList.add("active");
  }
});
close.addEventListener("click", function () {
  menu.classList.remove("active");
});
