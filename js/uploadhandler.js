function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

$(function() {
    var t = document.getElementById("nf__popup");

    if(getCookie("submit") == 'success'){
        t.style.color="var(--buttonsubmitbg)";
        t.innerHTML =  "Visual config submitted!";
        t.className = "show";
        eraseCookie("submit");
    } else if(getCookie("submit") == 'fail') {
        t.style.color="var(--warn)";
        t.innerHTML = "Failed to submit your visual config :(";
        t.className = "show";
        eraseCookie("submit");
    }

    setTimeout(function(){ 
        t.className = t.className.replace("show", "");
    }, 3000);
})

