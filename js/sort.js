jQuery.fn.orderBy = function(keySelector)
{
    return this.sort(function(a,b)
    {
        a = keySelector.apply(a);
        b = keySelector.apply(b);
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    });
};

$(".cfg__wrapper").orderBy(function() {return +$(this).text();}).appendTo(".cfgvrow");