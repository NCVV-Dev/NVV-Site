function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";SameSite=Lax"
}
  
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
  
function switchtheme(){
    if(localStorage.getItem('data-theme') == 'nvv') {
      document.body.setAttribute('data-theme', 'ncl');
      localStorage.setItem('data-theme', 'ncl')
      setCookie("themebtn", "pressed", 365)
    } else {
      document.body.setAttribute('data-theme', 'nvv');
      localStorage.setItem('data-theme', 'nvv');
      document.body.setAttribute('data-theme', 'nvv');
      setCookie("themebtn", "notpressed", 365)
    }
}
  
if(getCookie("themebtn") == 'pressed'){
      localStorage.setItem('data-theme', 'nvv');
      document.body.setAttribute('data-theme', 'nvv');
    } else {
      localStorage.setItem('data-theme', 'ncl');
      document.body.setAttribute('data-theme', 'ncl');
}
  