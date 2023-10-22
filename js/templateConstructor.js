function renderJSON(json) {
    //console.log("rendered", json)

    let html = `<div class="cfgvrow" id="randomize">`

    for (const data of json) {
        html += `
        <div class="cfg__wrapper animate__animated animate__fadeIn">
            <div class="cfg__tab ${!!data.contributeRole ? `${getContributorCSSClass(data)}__tabstyle` : ""}">
                ${getAuthorTag(data)}
                <div class="cfg__image__wrapper">
                    <img class="cfg__image" id="cfg__image" loading="lazy" src="${data.media}" onerror="this.src='/media/in-progress.png';" alt="" onclick="openPreviewImage('${data.media}')">
                </div>
                <div class="cfg__body">
                    <div class="cfg__title">
                        ${data.title}
                    </div>
                    <div class="cfg__author">
                        ${renderAuthorField(data)}
                    </div>
                    <div class="cfg__descr ${!!data.description ? "" : "not__provided"}">
                        ${!!data.description ? data.description : "(No description provided)"}
                    </div>
                    <div class="cfg__downloadbtn">
                        <a class="cfg__dwnbtn ${!!data.contributeRole ? `${getContributorCSSClass(data)}__color` : ""}" href="https://ncvisualsvault.cc/dwnl/click.php?id=${data.downloadId}" rel="noopener">Download <em class='bx bxs-download'></em></a>
                        <div class="dwn__count">
                            ${ccount[data.downloadId]['c'].formatThousands("<?php echo $ccount_settings['notation']; ?>")}
                            <em class='bx bxs-download'></em>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    // Create a closing </div> when done
    html += `</div>`

    // Put all JSON entries converted into HTML inside the div element
    document.getElementById("templatecontainer").innerHTML = html;

    var endTime = performance.now()

    console.log(`Finished templating! Took us ${endTime - startTime}ms. Running remaining functions...`)

    startTime = performance.now()

    // Find most downloaded visual config and append an icon to it
    findMostDownloaded();
    ShuffleVisuals();
    loadImages();
    ApplyMobileRules();
    
    endTime = performance.now()
    console.log(`All done! Took us ${endTime - startTime}ms.`)
}

// If there's no profile URL given, <span> is used instead
// <span> is always used for banned users
function renderAuthorField(data) {
    if (getContributorCSSClass(data) == "banned") {
        return `Uploader: <span class="${data.contributeRole}">${data.author} ${renderAuthorAdditions(data)}</span>`
    } else if (data.steamUrl) {
        return `Uploader: <a class="default__link ${data.contributeRole}" href="${data.steamUrl}" target="_blank" rel="noopener">${data.author} ${renderAuthorAdditions(data)}</a>`
    } else {
        return `Uploader: <span class="default__link ${data.contributeRole}">${data.author} ${renderAuthorAdditions(data)}</span>`
    }
}

// If user has an contributor icon, append it next to his username
// If user is banned, display a small text box next to his username
function renderAuthorAdditions(data) {
    if (getContributorCSSClass(data) == "banned") {
        return `<span class='banned__textbox'>BANNED</span>`
    }

    if (data.authorIconClass) {
        return `<em class='${data.authorIconClass}'></em>`
    } else {
        return ""
    }
}

// Appends tab style classes even if they don't exist
function getContributorCSSClass(data) {
    switch (data.contributeRole) {
        case "v952": return "v952"
        case "contributor": return "contr"
        case "contributor2": return "contr2"
        case "contributor3": return "contr3"
        case "contributor4": return "contr4"
        case "contributor5": return "contr5"
        case "contributor6": return "contr6"
        case "contributor7": return "contr7"
        case "contributor8": return "contr8"
        case "contributor9": return "contr9"
        case "contributor10": return "contr10"
        case "banned": return "banned"
    }
}

function getAuthorTag(data) {
    if(data.tagType == "devChoice"){
        return `<div class="tag">Devs choice <em class='bx bxs-star'></em></div>`
    } else if(data.tagType == "communityChoice"){
        return `<div class="tag">Chosen by community <em class='bx bxs-medal'></em></div>`
    } else {
        return ""
    }
}

// Larger image preview on click
// TODO: Don't define background-size in JS, find a better way of scaling images on click
function openPreviewImage(mediaUrl) {
    const screenprev = document.querySelector('#preview');
    let backgroundstyles = {
        "background-size": 'auto',
        "opacity": '0'
    };

    if(isUserMobile() == true){
        backgroundstyles = {
            "background-size": '100%',
            "opacity": '0'
        };
    }

    screenprev.style.display = 'block';
    Object.assign(screenprev.style, backgroundstyles);

    setTimeout(function () {
        screenprev.style.opacity = 1
    }, 100);

    screenprev.style.backgroundImage = `url(${mediaUrl})`;
}

// Fades out image preview on click
function fadeOutPreviewImage() {
    const previewelem = document.querySelector("#preview");

    setTimeout(function () {
        previewelem.style.opacity = 0;
    }, 100);

    setTimeout(function () {
        previewelem.style.display = "none"
    }, 500);
}

var startTime = performance.now()

// Fetch JSON from the file, wait for response, direct the data to renderJSON()
fetch('/js/data.json').then(response => response.json()).then(json => renderJSON(json));