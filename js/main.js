// Cookies
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax"
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

function eraseCookie(e) {
    document.cookie = e + "=; Max-Age=-99999999;";
}

// Page Loader
document.addEventListener(
    "DOMContentLoaded",
    function e() {
        let t = document.getElementById("progress"),
            n = document.images,
            o = 0,
            r = n.length;
        if (0 == r) return l();
        function i() {
            let e = (((100 / r) * (o += 1)) << 0) + "%";
            if (((t.style.width = e), o === r)) return l();
        }
        function l() {
            setTimeout(function () {
                (t.style.opacity = "none"), (t.style.opacity = 0);
            }, 1800);
        }
        for (let s = 0; s < r; s += 1) {
            let $ = new Image();
            ($.onload = i), ($.onerror = i), ($.src = n[s].src);
        }
    },
    !1
);

// Welcome Page Functionality
const wlcoverlay = document.querySelector(".welcome_overlay");
if (getCookie("FirstTime") != false) {
    wlcoverlay.style.opacity = 0;
    wlcoverlay.style.display = "none"
} else {
    wlcoverlay.style.opacity = 1;
    wlcoverlay.style.display = "block";
    setCookie("EnableShuffle", "true", 365);
};

function WelcomeButtonAction() {
    setTimeout(function() {
        wlcoverlay.style.opacity = 0;
        setCookie("FirstTime", "false", 365);
    }, 500);
    setTimeout(function() {
        wlcoverlay.style.display = "none"
    }, 1100);
};

// Random Image for Welcome Page
$(function() {
    let ImageArray = new Array();
    ImageArray[0] = "https://ncvisualsvault.cc/media/menus/raizomenu.png";
    ImageArray[1] = "https://ncvisualsvault.cc/media_optimized/menus/mh4menu.jpg";
    ImageArray[2] = "https://ncvisualsvault.cc/media/menus/LBAmenu.png";
    ImageArray[3] = "https://ncvisualsvault.cc/media/menus/animemenu.png";
    ImageArray[4] = "https://ncvisualsvault.cc/media/menus/coldbluemenu.png";
    let number = Math.floor(Math.random()*ImageArray.length);
    return document.getElementById("randomimage").innerHTML = '<img src="'+ImageArray[number]+'" />';
})

// Theme Switch Functionality
if (getCookie("themebtn") == 'pressed') {
    localStorage.setItem('data-theme', 'ncl');
    document.body.setAttribute('data-theme', 'ncl')
} else {
    localStorage.setItem('data-theme', 'nvv');
    document.body.setAttribute('data-theme', 'nvv')
}

function switchtheme() {
    if (localStorage.getItem('data-theme') == 'nvv') {
        document.body.setAttribute('data-theme', 'ncl');
        localStorage.setItem('data-theme', 'ncl');
        setCookie("themebtn", "pressed", 365)
    } else {
        document.body.setAttribute('data-theme', 'nvv');
        localStorage.setItem('data-theme', 'nvv');
        setCookie("themebtn", "notpressed", 365)
    }
}

// Find the most downloaded config and assign icon with text to the tab
let highestNumber = 0;
document.querySelectorAll('.dwn__count').forEach(elem => {
    let downCount = parseInt(elem.innerText.trim())
    if (downCount > highestNumber)
        highestNumber = downCount
});

let icon = document.createElement("em");
const popular = document.createElement('div');
popular.textContent = 'Popular!';
popular.style = "position: absolute; font-size: 13px; text-align: center; color: var(--buttonhover); font-weight: 600;";
icon.className = "bx bxs-hot tooltip";
icon.style = "color: var(--buttonhover);";

document.querySelectorAll('.dwn__count').forEach(elem => {
  if (parseInt(elem.innerText.trim()) == highestNumber)
  {
    elem.appendChild(popular.cloneNode(true));
    elem.appendChild(icon.cloneNode(true));
  }
});

// Init every picuture for preview
function initpicture() {
    let e = document.querySelectorAll(".cfgvrow img"),
        c = document.querySelector("#preview"),
        r = { "background-size": "60%" };
    e.forEach((e) => {
        e.addEventListener("click", function () {
            (c.style.backgroundImage = "url(" + e.src + ")"), (c.style.display = "block"), Object.assign(c.style, r);
        });
    });
}

// Prevent Accidental Submit (TODO: REWORK)
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Search Functionality
function search() {
	let input = document.getElementById('searchbar').value
	input=input.toLowerCase();
	let cfgw = document.getElementsByClassName('cfg__wrapper');
	
	for (i = 0; i < cfgw.length; i++) {
		if (!cfgw[i].innerHTML.toLowerCase().includes(input)) {
			cfgw[i].style.display="none";
		}
		else {
			cfgw[i].style.display="block";				
		}
	}
}

// Notification System
$(function () {
    let e = document.getElementById("nf__popup");
    "success" == getCookie("submit")
        ? ((e.style.color = "let(--buttonsubmitbg)"), (e.innerHTML = "Visual config submitted!"), (e.className = "show"))
        : "fail" == getCookie("submit") && ((e.style.color = "var(--warn)"), (e.innerHTML = "Something went wrong :("), (e.className = "show")),
        eraseCookie("submit"),
        setTimeout(function () {
            e.className = e.className.replace("show", "");
        }, 3e3);
});

// Trigger for upload button
$("#uploadTrigger").click(function(){$("#uploadFile").click()});