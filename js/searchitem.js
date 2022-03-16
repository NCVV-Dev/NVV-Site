function search() {
    var $block = $('.not-found');
    var isMatch = false;
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('column');
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        } else {
            x[i].style.display = "inline";
            isMatch = true;
        }
    }
    $block.toggle(!isMatch);
}