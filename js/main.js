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

// Snowflakes!
var snowflakes = [];

// Global variables to store our browser's window size
var browserWidth;
var browserHeight;

// Specify the number of snowflakes you want visible
var numberOfSnowflakes = 70;

// Flag to reset the position of the snowflakes
var resetPosition = false;

// Handle accessibility
var enableAnimations = true;
var reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

// Handle animation accessibility preferences 
function setAccessibilityState() {
  if (reduceMotionQuery.matches) {
    enableAnimations = false;
  } else { 
    enableAnimations = true;
  }
}

setAccessibilityState();
reduceMotionQuery.addListener(setAccessibilityState);

function setup() {
  if (enableAnimations) {
    window.addEventListener("DOMContentLoaded", generateSnowflakes, false);
    window.addEventListener("resize", setResetFlag, false);
  }
}
setup();

function Snowflake(element, speed, xPos, yPos) {
  // set initial snowflake properties
  this.element = element;
  this.speed = speed;
  this.xPos = xPos;
  this.yPos = yPos;
  this.scale = 1;

  // declare variables used for snowflake's motion
  this.counter = 0;
  this.sign = Math.random() < 0.5 ? 1 : -1;

  // setting an initial opacity and size for our snowflake
  this.element.style.opacity = (.1 + Math.random()) / 3;
}

Snowflake.prototype.update = function () {
  // using some trigonometry to determine our x and y position
  this.counter += this.speed / 5000;
  this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
  this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
  this.scale = .5 + Math.abs(10 * Math.cos(this.counter) / 20);

  // setting our snowflake's position
  setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element);

  // if snowflake goes below the browser window, move it back to the top
  if (this.yPos > browserHeight) {
    this.yPos = -50;
  }
}

function setTransform(xPos, yPos, scale, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
}

function generateSnowflakes() {

  // get our snowflake element from the DOM and store it
  var originalSnowflake = document.querySelector(".snowflake");

  // access our snowflake element's parent container
  var snowflakeContainer = originalSnowflake.parentNode;
  snowflakeContainer.style.display = "block";

  // get our browser's size
  browserWidth = document.documentElement.clientWidth;
  browserHeight = document.documentElement.clientHeight;

  // create each individual snowflake
  for (var i = 0; i < numberOfSnowflakes; i++) {

    // clone our original snowflake and add it to snowflakeContainer
    var snowflakeClone = originalSnowflake.cloneNode(true);
    snowflakeContainer.appendChild(snowflakeClone);

    // set our snowflake's initial position and related properties
    var initialXPos = getPosition(50, browserWidth);
    var initialYPos = getPosition(50, browserHeight);
    var speed = 5 + Math.random() * 40;

    // create our Snowflake object
    var snowflakeObject = new Snowflake(snowflakeClone,
      speed,
      initialXPos,
      initialYPos);
    snowflakes.push(snowflakeObject);
  }

  // remove the original snowflake because we no longer need it visible
  snowflakeContainer.removeChild(originalSnowflake);

  moveSnowflakes();
}


function moveSnowflakes() {

  if (enableAnimations) {
    for (var i = 0; i < snowflakes.length; i++) {
      var snowflake = snowflakes[i];
      snowflake.update();
    }      
  }

  // Reset the position of all the snowflakes to a new value
  if (resetPosition) {
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;

    for (var i = 0; i < snowflakes.length; i++) {
      var snowflake = snowflakes[i];

      snowflake.xPos = getPosition(50, browserWidth);
      snowflake.yPos = getPosition(50, browserHeight);
    }

    resetPosition = false;
  }

  requestAnimationFrame(moveSnowflakes);
}

function getPosition(offset, size) {
  return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

function setResetFlag(e) {
  resetPosition = true;
}