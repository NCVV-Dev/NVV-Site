$(function () {
    $('p').click(function () {
        let h = $(this).attr('id')
        h.href = h;
        document.location.href = '#' + h;

        let paragraph = $(this)

        if ($(paragraph).hasClass('gd_smaller')) {
            $(this).attr('style', 'transition: all 400ms ease-in-out; color: var(--buttonsubmithover);');
            setTimeout(function () {
                paragraph.removeAttr('style')
            }, 1500);
        } else {
            $(this).attr('class', 'paragraph_active');
            setTimeout(function () {
                paragraph.removeAttr('class')
            }, 1500);
        }
    });
});