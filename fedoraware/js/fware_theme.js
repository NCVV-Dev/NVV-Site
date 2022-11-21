function setCookie(e, t, n) {
    let i = new Date();
    i.setTime(i.getTime() + 864e5 * n);
    let o = "expires=" + i.toGMTString();
    document.cookie = e + "=" + t + ";" + o + ";path=/;SameSite=Lax";
}
function getCookie(e) {
    let t = e + "=",
        n = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < n.length; i += 1) {
        let o = n[i];
        for (; " " == o.charAt(0); ) o = o.substring(1);
        if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
    }
    return "";
}

localStorage.setItem('data-theme', 'fware');
document.body.setAttribute('data-theme', 'fware');