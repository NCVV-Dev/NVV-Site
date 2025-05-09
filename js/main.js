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

// Check for if user uploaded
checkForUpload();

function showNotification(title, message, isSuccess = true) {
    const notification = document.getElementById('notification');
    const notificationTitle = document.getElementById('notification-title');
    const notificationMessage = document.getElementById('notification-message');

    notificationTitle.textContent = title;
    notificationMessage.textContent = message;


    notification.className = 'notification show';
    if (!isSuccess) {
        notification.classList.add('failure');
    }

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.className = 'notification hidden';
        }, 500);
    }, 5000);
}

function checkForUpload() {
    const uploadStatus = getCookie('upload_status');

    // Success
    if (uploadStatus === 'success') {
        const fileName = getCookie('file_name');
        const authorName = getCookie('author_name');

        showNotification(
            'File was submittied successfully!',
            `File: ${fileName}\nUploader: ${authorName}`,
            true
        );

        // Play audio
        const audio = new Audio('/media/ding.mp3');
        audio.volume = 0.4;
        audio.play();

    } else if (uploadStatus === 'failure') {
        // Fail
        const errMsg = getCookie("error_message");
        // Play audio
        const audio = new Audio('/media/fail.mp3');
        audio.volume = 0.4;
        audio.play();

        let resultMsg = errMsg.replaceAll("+", " ");
        showNotification(
            'Error trying to submit your visual config!',
            `Reason: ${resultMsg}`,
            false
        );
    }

    eraseCookie("upload_status");
    eraseCookie("error_message");
    eraseCookie("file_name");
    eraseCookie("author_name")
}

// Prevent from soft-lock if spamming
let opened;

// Submit pop up modal
function openUploadModal() {
    if (opened == 1) {
        return
    }

    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');

    modal.classList.add('active');
    overlay.style.display = 'block';

    setTimeout(function () {
        overlay.classList.add('active');
    }, 50);

    // Close on click
    overlay.addEventListener('click', closeUploadModal);
    opened = 1;
}

function closeUploadModal() {
    if (opened == 0) {
        return
    }

    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');

    overlay.classList.remove('active');
    modal.classList.remove('active');

    setTimeout(function () {
        overlay.style.display = 'none';
        opened = 0;
    }, 500);
}

// Themes
function updateThemeButton() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('.theme-text');

    if (getCookie("Theme") == 'NVV') {
        themeIcon.classList.remove('bxs-sun');
        themeIcon.classList.add('bxs-moon');
        themeText.textContent = 'Dark Mode';
        themeToggle.classList.add('active-theme');
    } else {
        themeIcon.classList.remove('bxs-moon');
        themeIcon.classList.add('bxs-sun');
        themeText.textContent = 'Light Mode';
        themeToggle.classList.remove('active-theme');
    }
}

if (getCookie("Theme") == 'NVV') {
    setCookie("Theme", "NVV", 365);
    document.body.setAttribute('data-theme', 'nvv');
} else {
    setCookie("Theme", "NCL", 365);
    document.body.setAttribute('data-theme', 'ncl');
}
updateThemeButton();

function switchtheme() {
    if (getCookie("Theme") == 'NVV') {
        document.body.setAttribute('data-theme', 'ncl');
        setCookie("Theme", "NCL", 365);
    } else {
        document.body.setAttribute('data-theme', 'nvv');
        setCookie("Theme", "NVV", 365);
    }

    updateThemeButton();
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
    const input = document.getElementById('searchbar');
    const filter = input.value.toUpperCase();
    const items = document.querySelectorAll('.cfg__wrapper');
    const clearBtn = document.getElementById('searchClear');
    clearBtn.classList.toggle('visible', filter.length > 0);

    if (filter.length === 0) {
        items.forEach(item => {
            item.classList.remove('hidden-by-search');
        });
        return;
    }

    let foundResults = false;

    items.forEach(item => {
        const title = item.querySelector('.cfg__title').textContent.toUpperCase();
        const desc = item.querySelector('.cfg__descr').textContent.toUpperCase();
        const author = item.querySelector('.cfg__author').textContent.toUpperCase();

        if (title.includes(filter) || desc.includes(filter) || author.includes(filter)) {
            item.classList.remove('hidden-by-search');
            foundResults = true;
        } else {
            item.classList.add('hidden-by-search');
        }
    });

    if (!foundResults) {
        notifyUser("No results found for '" + input.value + "'", "var(--warn)");
    }
}

function clearSearch() {
    const input = document.getElementById('searchbar');
    input.value = '';
    input.focus();
    search(); // trigger search to show all items (hacky)
    document.getElementById('searchClear').classList.remove('visible');
}

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
const notificationQueue = [];
let isNotificationShowing = false;
let notificationCount = 0;
const notificationMargin = 50;

function notifyUser(textMsg, textColor = "var(--buttonsubmitbg)", lockNotification = false, showDuration = 3) {
    if (!textMsg || !textMsg.replace(/\s/g, '').length) return;

    const notifyElement = document.createElement('div');
    notifyElement.className = 'notification-message';
    notifyElement.style.color = textColor;
    notifyElement.innerHTML = textMsg;
    notifyElement.dataset.id = Date.now();

    if (lockNotification) {
        notifyElement.classList.add('lock-notification');
    }

    const currentPosition = notificationCount * notificationMargin;
    notifyElement.style.bottom = `${20 + currentPosition}px`;

    document.body.appendChild(notifyElement);
    notificationCount++;

    setTimeout(() => {
        notifyElement.classList.add('show');
    }, 10);

    // Deleting the notification after showing
    setTimeout(() => {
        notifyElement.classList.remove('show');

        // after animation end
        setTimeout(() => {
            notifyElement.remove();
            notificationCount--;
            updateNotificationsPosition();
        }, 500);
    }, showDuration * 1000);
}

function updateNotificationsPosition() {
    const notifications = document.querySelectorAll('.notification-message');
    notifications.forEach((notify, index) => {
        notify.style.bottom = `${20 + (index * notificationMargin)}px`;
    });
}

function processNotificationQueue() {
    if (notificationQueue.length === 0) {
        isNotificationShowing = false;
        return;
    }

    isNotificationShowing = true;
    const notification = notificationQueue.shift();

    // create new element
    const notifyElement = document.createElement('div');
    notifyElement.className = 'notification-message';
    notifyElement.style.color = notification.textColor;
    notifyElement.innerHTML = notification.textMsg;

    const offset = 60 * document.querySelectorAll('.notification-message').length;
    notifyElement.style.bottom = `${20 + offset}px`;

    document.body.appendChild(notifyElement);

    setTimeout(() => {
        notifyElement.classList.add('show');
    }, 10);

    const timeout = notification.showDuration * 1000;
    setTimeout(() => {
        notifyElement.classList.remove('show');
        setTimeout(() => {
            notifyElement.remove();
            processNotificationQueue();
        }, 500);
    }, timeout);
}

// Check if user had a visual config submission before
if (getCookie("submit") == 'success') {
    notifyUser("Visual config submitted! It will appear on the website in 1-6 bussiness days", "var(--buttonsubmitbg)", true, 7);
    eraseCookie("submit");
} else if (getCookie("submit") == 'fail') {
    notifyUser("Failed to submit your visual config. Please check if everything is right and try again.", "var(--buttonsubmitbg)", true, 7);
    eraseCookie("submit");
}

// Upload button trigger
$("#uploadTrigger").click(function () {
    $("#uploadFile").click()
});

// Toggle sort menu visibility
function toggleSortMenu() {
    const menu = document.getElementById('sortMenu');
    const toggle = document.querySelector('.sort-toggle');
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    const sortControls = document.querySelector('.sort-controls');
    if (!sortControls.contains(event.target)) {
        document.getElementById('sortMenu').classList.remove('active');
        document.querySelector('.sort-toggle').classList.remove('active');
    }
});

// Update shuffle toggle state
function updateShuffleToggle() {
    const toggle = document.getElementById('shuffleToggle');
    if (getCookie("EnableShuffle") == "true") {
        toggle.classList.add('active');
    } else {
        toggle.classList.remove('active');
    }
}

function switchrandomizing() {
    if (getCookie("EnableShuffle") == "true") {
        setCookie("EnableShuffle", "false", 365);
        notifyUser("Visual config shuffle disabled", "var(--warn)");
    } else {
        setCookie("EnableShuffle", "true", 365);
        ShuffleVisuals();
    }

    updateShuffleToggle();
}

// toggle state on load
document.addEventListener('DOMContentLoaded', function () {
    updateShuffleToggle();
});

// Shuffling proccess
function ShuffleVisuals() {
    if (getCookie("EnableShuffle") == "true") {
        let parent = $("#randomize");
        let divs = parent.children();

        divs.sort(function (a, b) {
            return 0.5 - Math.random();
        });

        parent.append(divs);

        notifyUser("Visual config shuffle is enabled! Shuffled configs");

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