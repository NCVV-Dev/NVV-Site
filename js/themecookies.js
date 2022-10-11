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