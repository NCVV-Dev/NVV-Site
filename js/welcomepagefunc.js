const wlcoverlay=document.querySelector(".welcome_overlay");function WelcomeButtonAction(){setTimeout(function(){wlcoverlay.style.opacity=0,setCookie("FirstTime","false",365)},500),setTimeout(function(){wlcoverlay.style.display="none"},1100)}!1!=getCookie("FirstTime")?(wlcoverlay.style.opacity=0,wlcoverlay.style.display="none"):(wlcoverlay.style.opacity=1,wlcoverlay.style.display="block",setCookie("EnableShuffle","true",365),localStorage.setItem("enableshuffle","true"));