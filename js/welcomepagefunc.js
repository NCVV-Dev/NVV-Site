const wlcoverlay = document.querySelector(".welcome_overlay");
if (getCookie("FirstTime") != false) {
    wlcoverlay.style.opacity = 0;
    wlcoverlay.style.display = "none"
} else {
    wlcoverlay.style.opacity = 1;
    wlcoverlay.style.display = "block"
    setCookie("EnableShuffle", "true", 365)
    localStorage.setItem('enableshuffle', 'true');
};

function WelcomeButtonAction() {
    setTimeout(function() {
        wlcoverlay.style.opacity = 0;
        setCookie("FirstTime", "false", 365)
    }, 500);
    setTimeout(function() {
        wlcoverlay.style.display = "none"
    }, 1100)
};