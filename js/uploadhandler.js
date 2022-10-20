function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

$(function() {
    let t = document.getElementById("nf__popup");

    if(getCookie("submit") == 'success'){
        t.style.color="var(--buttonsubmitbg)";
        t.innerHTML =  "Visual config submitted!";
        t.className = "show";
    } else if(getCookie("submit") == 'fail') {
        t.style.color="var(--warn)";
        t.innerHTML = "Something went wrong :(";
        t.className = "show";
    }

    eraseCookie("submit");

    setTimeout(function(){ 
        t.className = t.className.replace("show", "");
    }, 3000);
})

