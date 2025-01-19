// Visually display the contents of data.json
function renderJSON(json) {
    //console.log("rendered", json)
    // Start with a template
    let html = `<div class="cfgvrow" id="randomize">`
    let endTime = performance.now()

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
                        <a class="cfg__dwnbtn ${!!data.contributeRole ? `${getContributorCSSClass(data)}__color` : ""}" href="https://visuals.nullcore.net/dwnl/click.php?id=${data.downloadId}" rel="noopener">Download <em class='bx bxs-download'></em></a>
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

    console.log(`Finished templating! Took us ${endTime - startTime}ms. Running remaining functions...`)

    startTime = performance.now()

    // When templating is done, run remaining functions

    // Find the most downloaded visual config and append an icon to it
    findMostDownloaded();
    // Shuffle visuals if enabled
    ShuffleVisuals();
    // Start displaying a loader
    loadImages();
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
        case "contributor8": return "contr8"
        case "contributor9": return "contr9"
        case "contributor10": return "contr10"
        case "banned": return "banned"
    }
}

// If visual config has an unique tag, display it
function getAuthorTag(data) {
    if (data.tagType == "devChoice") {
        return `<div class="tag">Devs choice <em class='bx bxs-star'></em></div>`
    } else if (data.tagType == "communityChoice") {
        return `<div class="tag">Chosen by community <em class='bx bxs-medal'></em></div>`
    } else {
        return ""
    }
}

// Larger image preview
function openPreviewImage(mediaUrl) {
    const screenPrev = document.querySelector('#preview');

    if (!screenPrev) {
        console.error("Preview element not found.");
        return;
    }

    // Ensure it's visible and styled for centering
    screenPrev.style.display = 'flex';
    screenPrev.style.justifyContent = 'center';
    screenPrev.style.alignItems = 'center';
    screenPrev.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    screenPrev.style.position = 'fixed';
    screenPrev.style.top = '0';
    screenPrev.style.left = '0';
    screenPrev.style.width = '100vw';
    screenPrev.style.height = '100vh';
    screenPrev.style.zIndex = '999';
    screenPrev.style.opacity = '0';
    screenPrev.style.transition = 'opacity 0.5s ease-in-out';

    // Create a container for the image if it doesn't exist
    // Check if this this needed
    let imgContainer = screenPrev.querySelector('.img-container');
    if (!imgContainer) {
        imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';
        imgContainer.style.position = 'relative';
        imgContainer.style.maxWidth = '90%';
        imgContainer.style.maxHeight = '80%';
        imgContainer.style.borderRadius = '8px';
        imgContainer.style.overflow = 'hidden';
        imgContainer.style.zIndex = '1000';
        screenPrev.appendChild(imgContainer);
    }

    // Adding image
    let img = imgContainer.querySelector('img');
    if (!img) {
        img = document.createElement('img');
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.borderRadius = '8px';
        imgContainer.appendChild(img);
    }
    img.src = mediaUrl;

    setTimeout(() => {
        screenPrev.style.opacity = '1';
    }, 50);

    // Close preview when clicking outside the image
    screenPrev.addEventListener('click', (event) => {
        if (!imgContainer.contains(event.target)) {
            closePreviewImage(screenPrev);
        }
    });
}

// Close the preview image
function closePreviewImage(screenPrev) {
    screenPrev.style.opacity = '0';
    setTimeout(() => {
        screenPrev.style.display = 'none';
        screenPrev.innerHTML = '';
    }, 500);
}

let startTime = performance.now()

// Fetch JSON from the file, wait for response, direct the data to renderJSON()
fetch('/js/data.json').then(response => response.json()).then(json => renderJSON(json));