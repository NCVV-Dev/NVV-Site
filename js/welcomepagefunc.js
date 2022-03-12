const wlcoverlay = document.querySelector(".welcome_overlay");

if(getCookie("FirstTime") != false){
    wlcoverlay.style.opacity = 0;
    wlcoverlay.style.display = "none";
};

function WelcomeButtonAction() {
    setTimeout(function(){ 
        wlcoverlay.style.opacity = 0;
        setCookie("FirstTime", "false", 365);
      }, 500);
      setTimeout(function(){ 
        wlcoverlay.style.display = "none";
      }, 1100);
};

function WelcomeButtonRedirect() {
    window.location.replace("/mods/");
    setCookie("FirstTime", "false", 365);
}