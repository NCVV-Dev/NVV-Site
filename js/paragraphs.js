// NVV - Guides
// Make every paragraph clickable and scroll to it on click
$(function () {
    $('p').click(function () {
        // Scroll to the clicked paragraph
        let clickParagraph = $(this).attr('id')
        clickParagraph.href = h;
        document.location.href = '#' + clickParagraph;

        let paragraph = $(this)

        // Check if paragraph is main or secondary and assign styles
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