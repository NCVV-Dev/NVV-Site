$(function () {
    $('p').click(function () {
        let h = $(this).attr('id')
        h.href = h;
        document.location.href = '#' + h;
    });
});