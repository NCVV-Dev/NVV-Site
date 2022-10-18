$(function() {
    let ImageArray = new Array();
    ImageArray[0] = "https://ncvisualsvault.cc/media/menus/raizomenu.png";
    ImageArray[1] = "https://ncvisualsvault.cc/media_optimized/menus/mh4menu.jpg";
    ImageArray[2] = "https://ncvisualsvault.cc/media/menus/LBAmenu.png";
    ImageArray[3] = "https://ncvisualsvault.cc/media/menus/animemenu.png";
    ImageArray[4] = "https://ncvisualsvault.cc/media/menus/coldbluemenu.png";
    let number = Math.floor(Math.random()*ImageArray.length);
    return document.getElementById("randomimage").innerHTML = '<img src="'+ImageArray[number]+'" />';
})