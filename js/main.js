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

// Check if user is using mobile device
let isMobile;

function isUserMobile() {
    if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
        isMobile = true;
        setCookie("isMobile", "true", 365)

        return true;
    } else {
        isMobile = false;
        setCookie("isMobile", "false", 365)

        return false;
    }
}

// Replace the CSS file for mobile devices for better readability
function ApplyMobileRules() {
    if (isUserMobile()) {
        //console.log("[isMobile] User is using mobile device/agent.. Trying to inject mobile CSS rules")
        $('head').append('<link rel="stylesheet" type="text/css" href="mobile.css">');
        //console.log("[isMobile] Done!")
    }
}

// Themes functionality
if (getCookie("Theme") == 'NVV') {
    setCookie("Theme", "NVV", 365);
    document.body.setAttribute('data-theme', 'nvv')
} else {
    setCookie("Theme", "NCL", 365);
    document.body.setAttribute('data-theme', 'ncl');
}

function switchtheme() {
    if (getCookie("Theme") == 'NVV') {
        document.body.setAttribute('data-theme', 'ncl');
        setCookie("Theme", "NCL", 365);
    } else {
        document.body.setAttribute('data-theme', 'nvv');
        setCookie("Theme", "NVV", 365);
    }
}

// Page loader
function loadImages() {
    function id(v) {
        return document.getElementById(v)
    }

    let prog = id("progress"),
        img = document.images,
        loadedimages = 0,
        totalimages = img.length;
    if (totalimages == 0) {
        return doneLoading()
    }

    function imgLoaded() {
        loadedimages += 1;
        let linewidth = ((100 / totalimages * loadedimages) << 0) + "%";
        prog.style.width = linewidth;

        if (loadedimages === totalimages) {
            return doneLoading()
        }
    }

    function doneLoading() {
        setTimeout(function () {
            prog.style.opacity = "none";
            prog.style.opacity = 0
        }, 1800)
    }

    for (let i = 0; i < totalimages; i += 1) {
        let tImg = new Image();
        tImg.onload = imgLoaded;
        tImg.onerror = imgLoaded;
        tImg.src = img[i].src
    }
};

// Welcome page functionality
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
    setTimeout(function () {
        wlcoverlay.style.opacity = 0;
        setCookie("FirstTime", "false", 365);
    }, 500);
    setTimeout(function () {
        wlcoverlay.style.display = "none"
    }, 1100);
};

// Find the most downloaded config and assign icon to the tab
function findMostDownloaded() {
    let highestNumber = 0;
    document.querySelectorAll('.dwn__count').forEach(elem => {
        let downCount = parseInt(elem.innerText.trim())
        if (downCount > highestNumber)
            highestNumber = downCount;
    });

    let icon = document.createElement("em");
    icon.className = "bx bxs-hot tooltip";
    icon.style = "color: var(--buttonhover);";

    document.querySelectorAll('.dwn__count').forEach(elem => {
        if (parseInt(elem.innerText.trim()) == highestNumber) {
            elem.appendChild(icon.cloneNode(true));
        }
    });
}

// Search functionality
function search() {
    const input = document.getElementById('searchbar').value.trim().toLowerCase();
    const cfgWrappers = document.querySelectorAll('.cfg__wrapper');
    let matchFound = false;

    cfgWrappers.forEach(wrapper => {
        const content = wrapper.textContent.toLowerCase();
        if (content.includes(input)) {
            wrapper.style.display = "block";
            matchFound = true;
        } else {
            wrapper.style.display = "none";
        }
    });

    if (!matchFound && input) {
        notifyUser("No matches found!", "var(--buttonsubmitbg)", true, 3)
    }
}

let notificationLock = false;

/**
 * Sends a notification at the bottom of the screen for current user
 * @param {String} textColor
 * Defines a color for the message. var(), HEX and rgb() values
 * @param {String} textMsg
 * Message that is being sent by notification
 * @param {Boolean} lockNotification
 * Prevent notification being overwriten by the next notification until it stops showing
 * @param {Number} showDuration 
 * Duration of the notification to be shown in seconds
 */
function notifyUser(textMsg, textColor = "var(--buttonsubmitbg)", lockNotification = false, showDuration = 3) {
    // Sanity checks
    if (!textMsg || !textMsg.replace(/\s/g, '').length) {
        console.log("[Notifications] Tried to send Null/Empty/Undefined text! Stopping...", textMsg);

        return;
    } else if (notificationLock) {
        console.log("[Notifications] Tried to show a notification but previous notification is still playing. Skipping...");

        return;
    }

    // Hook the notification element
    let notifydiv = document.getElementById("nf__popup");

    // Assign the data given from parameters
    notifydiv.style.color = textColor;
    notifydiv.innerHTML = textMsg;

    // If lockNotification was set to true, the next notifications will be blocked
    if (lockNotification) {
        notificationLock = true;
    }

    notifydiv.className = "show";

    // Hook the 'show' class while it exists to assign the animation
    let $popupshowdiv = $("#nf__popup.show")
    $popupshowdiv.css('animation', 'fadein 0.5s, fadeout 0.5s ' + showDuration + 's');

    let timeout_ms = showDuration * 1000 + 300;

    // Clean up and fade out (based on a duration set)
    setTimeout(function () {
        notifydiv.className = notifydiv.className.replace("show", "");
        notificationLock = false;
        $popupshowdiv.css('animation', 'none');
    }, timeout_ms);
}

// Check if user had a visual config submission before
if (getCookie("submit") == 'success') {
    notifyUser("Visual config submitted! It will appear on the website in the next couple days!", "var(--buttonsubmitbg)", true, 7);
    eraseCookie("submit");
} else if (getCookie("submit") == 'fail') {
    notifyUser("Failed to submit your visual config. Please check if everything is right and try again.", "var(--buttonsubmitbg)", true, 7);
    eraseCookie("submit");
}

// Upload button trigger
$("#uploadTrigger").click(function () {
    $("#uploadFile").click()
});

function switchrandomizing() {
    if (getCookie("EnableShuffle") == "true") {
        setCookie("EnableShuffle", "false", 365);
        notifyUser("Visual config shuffle disabled", "var(--warn)");
    } else {
        setCookie("EnableShuffle", "true", 365);
        notifyUser("Visual config shuffle enabled");
    }
}

// Shuffling proccess
function ShuffleVisuals() {
    if (getCookie("EnableShuffle") == "true") {
        let parent = $("#randomize");
        let divs = parent.children();

        divs.sort(function (a, b) {
            return 0.5 - Math.random();
        });

        parent.append(divs);

        notifyUser("Shuffling visual configs");

    } else {
        setCookie("EnableShuffle", "false", 365)
    }
};

// Sort visual configs by name
function sortbyname() {
    let parent = $("#randomize");
    let divs = parent.children();
    let OrderedDivsByName = divs.sort(function (a, b) {
        return $(a).find(".cfg__title").text() > $(b).find(".cfg__title").text();
    });

    parent.append(OrderedDivsByName);

    notifyUser("Sorted by name!");
}

// Sort visual configs by highest downloads
function sortbymostdwnl() {
    let parent = $("#randomize");
    let divs = parent.children();
    let OrderedDivsByDwnl = divs.sort(function (a, b) {

        // Fetch raw values
        const aRaw = fetchTextNodesContent($(a).find(".dwn__count"));
        const bRaw = fetchTextNodesContent($(b).find(".dwn__count"));
        const aParsed = parseInt(aRaw);
        const bParsed = parseInt(bRaw);

        // DEBUG: Show parsed values
        // console.log('parsed values:', `a: "${aParsed}"`, `b: "${bParsed}"`);

        // DEBUG: Show raw parsed values
        // console.log('raw values:', `a: "${aRaw}"`, `b: "${bRaw}"`);

        // Compare the values
        return bParsed - aParsed;
    })
    parent.append(OrderedDivsByDwnl);

    notifyUser("Sorted by downloads!");
}

// Fetch text nodes
function fetchTextNodesContent($target) {
    return $target
        .clone()    // Clone the element
        .children() // Select all the children
        .remove()   // Remove all the children
        .end()      // Go back to selected element
        .text();
}

// NVV - Guides navbar
function hideNavbar() {
    const sidebargd = document.querySelector(".sidebargd");

    setTimeout(function () {
        sidebargd.style.transition = '.5s';
        sidebargd.style.opacity = '0';
        sidebargd.style.visibility = 'hidden';
        setCookie("manuallyClosedMenu", "true", 365);
    }, 100);
};

function showNavbar() {
    const sidebargd = document.querySelector(".sidebargd");
    setTimeout(function () {
        sidebargd.style.transition = '.5s';
        sidebargd.style.opacity = '1';
        sidebargd.style.visibility = 'visible';
        setCookie("manuallyOpenedMenu", "true", 365);
    }, 100);
};

// Text copy using Clipboard API
function copyCode(id) {
    const element = document.getElementById(id);

    if (!element) {
        console.error(`Element with ID '${id}' not found.`);
        notifyUser("Error: Element not found.", "var(--error-color)");
        return;
    }
    const textToCopy = element.textContent || element.innerText;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            notifyUser("Text copied!");
        })
        .catch((err) => {
            console.error("Failed to copy text: ", err);
            notifyUser("Failed to copy text.", "var(--error-color)");
        });
}