function switchrandomizing(){
    if(getCookie("EnableShuffle") == "true"){
        setCookie("EnableShuffle", "false", 365);
        localStorage.setItem('enableshuffle', 'false');
    } else {
        setCookie("EnableShuffle", "true", 365);
        localStorage.setItem('enableshuffle', 'true');
    }
}

$(function() {
    if(getCookie("EnableShuffle") == "true" && localStorage.getItem('enableshuffle') == 'true'){
    var parent = $("#randomize");
    var divs = parent.children();
    divs.sort(function(a, b) {
      return 0.5 - Math.random();
    });
    parent.append(divs);
} else {
    localStorage.setItem('enableshuffle', 'false');
    setCookie("EnableShuffle", "false", 365)
}
});
