var modal = document.getElementById("upl__modal");
var btn = document.getElementById("openmodal");
var nofound = document.getElementById("nofoundmod");
var span = document.getElementsByClassName("close")[0];
var overlay = document.getElementById("modal__overlay");

btn.onclick = function() {
  //modal.style.display = "block";
  //overlay.style.display = "block";
  $("#upl__modal").slideToggle(500);
  $("#modal__overlay").slideToggle(500);
}

nofound.onclick = function() {
  //modal.style.display = "block";
  //overlay.style.display = "block";
  $("#upl__modal").slideToggle(500);
  $("#modal__overlay").slideToggle(500);
}

span.onclick = function() {
   // modal.style.display = "none";
   //overlay.style.display = "none";
   $("#upl__modal").slideToggle(500);
   $("#modal__overlay").slideToggle(500);
}

window.onclick = function(event) {
  if (event.target == modal) {
      $("#upl__modal").slideToggle(500);
      $("#modal__overlay").slideToggle(500);
      //modal.style.display = "none";
      //overlay.style.display = "none";
  }
} 