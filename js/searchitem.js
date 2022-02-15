var $block = $('.not-found');
$("#searchbar").keyup(function() {
    var val = $(this).val();
    var isMatch = false;
    
    $(".column").each(function(i) {
        var content = $(this).html();
        if(content.toLowerCase().indexOf(val) == -1) {
            $(this).hide();    
        } else {
            isMatch = true;
            $(this).show();
        }
    });
    $block.toggle(!isMatch);
});