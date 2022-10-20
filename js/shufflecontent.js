var t = document.getElementById("nf__popup");

function switchrandomizing(){
    if(getCookie("EnableShuffle") == "true"){
        setCookie("EnableShuffle", "false", 365);
        localStorage.setItem('enableshuffle', 'false');

        t.style.color="var(--warn)";
        t.innerHTML =  "Visual config shuffle disabled";
        t.className = "show";
        setTimeout(function(){ 
            t.className = t.className.replace("show", "");
        }, 3000);
    } else {
        setCookie("EnableShuffle", "true", 365);
        localStorage.setItem('enableshuffle', 'true');
        
        t.style.color="var(--buttonsubmitbg)";
        t.innerHTML =  "Visual config shuffle enabled!";
        t.className = "show";
        setTimeout(function(){ 
            t.className = t.className.replace("show", "");
        }, 3000);
    }
}

$(function() {
    if(getCookie("EnableShuffle") == "true" && localStorage.getItem('enableshuffle') == 'true'){
    let parent = $("#randomize");
    let divs = parent.children();
    divs.sort(function(a, b) {
      return 0.5 - Math.random();
    });
    parent.append(divs);

    t.style.color="var(--buttonsubmitbg)";
    t.innerHTML =  "Shuffling visual configs...";
    t.className = "show";
    setTimeout(function(){ 
        t.className = t.className.replace("show", "");
    }, 3000);
} else {
    localStorage.setItem('enableshuffle', 'false');
    setCookie("EnableShuffle", "false", 365)
}
});
