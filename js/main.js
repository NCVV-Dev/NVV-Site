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

// Theme switch functionality
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
(function () {
    function id(v) {
        return document.getElementById(v)
    }

    function loadbar() {
        let prog = id("progress"),
            img = document.images,
            c = 0,
            tot = img.length;
        if (tot == 0) {
            return doneLoading()
        }

        function imgLoaded() {
            c += 1;
            let perc = ((100 / tot * c) << 0) + "%";
            prog.style.width = perc;
            if (c === tot) {
                return doneLoading()
            }
        }

        function doneLoading() {
            setTimeout(function () {
                prog.style.opacity = "none";
                prog.style.opacity = 0
            }, 1800)
        }
        for (let i = 0; i < tot; i += 1) {
            let tImg = new Image();
            tImg.onload = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src = img[i].src
        }
    }
    document.addEventListener('DOMContentLoaded', loadbar, false)
}());

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

// Showcase random image for welcome page
// NOTE: Loads after website images 
$(function () {
    const ImageArray = [
        "https://ncvisualsvault.cc/media/menus/raizomenu.png",
        "https://ncvisualsvault.cc/media_optimized/menus/mh4menu.jpg",
        "https://ncvisualsvault.cc/media/menus/LBAmenu.png",
        "https://ncvisualsvault.cc/media/menus/animemenu.png",
        "https://ncvisualsvault.cc/media/menus/coldbluemenu.png"
    ];

    let number = Math.floor(Math.random() * ImageArray.length);
    return document.getElementById("randomimage").innerHTML = '<img src="' + ImageArray[number] + '" />';
})

// Find the most downloaded config and assign icon with text to the tab
$(function () {
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
})

// Initialize images for preview
function initpicture() {
    let e = document.querySelectorAll(".cfgvrow img"),
        c = document.querySelector("#preview"),
        r = {
            "background-size": "60%"
        };
    e.forEach((e) => {
        e.addEventListener("click", function () {
            c.style.backgroundImage = "url(" + e.src + ")";
            c.style.display = "block";
            Object.assign(c.style, r);
        });
    });
}

// Search functionality
function search() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let cfgw = document.getElementsByClassName('cfg__wrapper');

    for (let i = 0; i < cfgw.length; i++) {
        if (!cfgw[i].innerHTML.toLowerCase().includes(input)) {
            cfgw[i].style.display = "none";
        } else {
            cfgw[i].style.display = "block";
        }
    }
}

// Define pop-up for future use
let t = document.getElementById("nf__popup");

if (window.location.pathname == '/') {
    // Notification system for uploading
    $(function () {
        if (getCookie("submit") == 'success') {
            t.style.color = "var(--buttonsubmitbg)";
            t.innerHTML = "Visual config submitted.";
            t.className = "show";
            eraseCookie("submit");
        } else if (getCookie("submit") == 'fail') {
            t.style.color = "var(--warn)";
            t.innerHTML = "Failed to submit your visual config :(";
            t.className = "show";
            eraseCookie("submit");
        }

        setTimeout(function () {
            t.className = t.className.replace("show", "");
        }, 3000);
    });
}

// Upload button trigger
$("#uploadTrigger").click(function () {
    $("#uploadFile").click()
});

function switchrandomizing() {
    if (getCookie("EnableShuffle") == "true") {
        setCookie("EnableShuffle", "false", 365);

        t.style.color = "var(--warn)";
        t.innerHTML = "Visual config shuffle disabled";
        t.className = "show";
        setTimeout(function () {
            t.className = t.className.replace("show", "");
        }, 3000);
    } else {
        setCookie("EnableShuffle", "true", 365);

        t.style.color = "var(--buttonsubmitbg)";
        t.innerHTML = "Visual config shuffle enabled!";
        t.className = "show";
        setTimeout(function () {
            t.className = t.className.replace("show", "");
        }, 3000);
    }
}

// Shuffling proccess
if (window.location.pathname == '/') {
    $(function () {
        if (getCookie("EnableShuffle") == "true") {
            let parent = $("#randomize");
            let divs = parent.children();
            divs.sort(function (a, b) {
                return 0.5 - Math.random();
            });
            parent.append(divs);

            t.style.color = "var(--buttonsubmitbg)";
            t.innerHTML = "Shuffling visual configs...";
            t.className = "show";
            setTimeout(function () {
                t.className = t.className.replace("show", "");
            }, 3000);
        } else {
            setCookie("EnableShuffle", "false", 365)
        }
    });
}

// Text Animation on the Welcome Page
if (getCookie("FirstTime") != "False") {
    class Randchar {
        constructor(el) {
            this.el = el
            this.chars = '!<>-_\\/[]{}—=+*^?#________'
            this.update = this.update.bind(this)
        }

        setText(newText) {
            const oldText = this.el.innerText
            const length = Math.max(oldText.length, newText.length)
            const promise = new Promise((resolve) => this.resolve = resolve)
            this.queue = []
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || ''
                const to = newText[i] || ''
                const start = Math.floor(Math.random() * 40)
                const end = start + Math.floor(Math.random() * 40)
                this.queue.push({
                    from,
                    to,
                    start,
                    end
                })
            }
            cancelAnimationFrame(this.frameRequest)
            this.frame = 0
            this.update()
            return promise
        }

        update() {
            let output = ''
            let complete = 0
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let {
                    from,
                    to,
                    start,
                    end,
                    char
                } = this.queue[i]
                if (this.frame >= end) {
                    complete++
                    output += to
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar()
                        this.queue[i].char = char
                    }
                    output += `<span class="dud">${char}</span>`
                } else {
                    output += from
                }
            }

            this.el.innerHTML = output
            if (complete === this.queue.length) {
                this.resolve()
            } else {
                this.frameRequest = requestAnimationFrame(this.update)
                this.frame++
            }
        }
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)]
        }
    }

    const phrases = [
        'No advertisements.',
        'No popular trackers.',
        'Just for people.',
        'Completely free.'
    ]

    const el = document.querySelector('.text')
    const fx = new Randchar(el)

    let counter = 0
    const next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 800)
        })
        counter = (counter + 1) % phrases.length
    }

    next()
}

// Sort visual configs by name
function sortbyname() {
    let parent = $("#randomize");
    let divs = parent.children();

    let OrderedDivsByName = divs.sort(function (a, b) {
        return $(a).find(".cfg__title").text() > $(b).find(".cfg__title").text();
    });

    parent.append(OrderedDivsByName);

    t.style.color = "var(--buttonsubmitbg)";
    t.innerHTML = "Sorted!";
    t.className = "show";
    setTimeout(function () {
        t.className = t.className.replace("show", "");
    }, 3000);
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

    t.style.color = "var(--buttonsubmitbg)";
    t.innerHTML = "Sorted!";
    t.className = "show";
    setTimeout(function () {
        t.className = t.className.replace("show", "");
    }, 3000);
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

// Text copy
// DEPRECATED: execCommand()
function copyCode(id) {
    let str = document.getElementById(id);
    window.getSelection().selectAllChildren(str);
    document.execCommand("Copy");
    window.getSelection().removeAllRanges();
}