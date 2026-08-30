// A quote too long to print whole: the page caps its height in CSS and
// clicking it takes the cap off, with the heading under it saying which way
// the next click goes.
//
//     <p class="showhide" data-open-caption="Click on the above text to show less!">
//        ...
//     </p>
//     <h4>Click on the above text to show more!</h4>
//
// The heading ships the shut caption and the block names the open one. The cap
// and the transition it eases through are the page's own .showhide and .shown.
//
// Opening the block moves everything under it down the page, so where the
// reader was is put back when it closes.

$(document).ready(function () {
    $('.showhide').each(function () {
        var $block = $(this);
        var $caption = $block.siblings('h4');
        var shutCaption = $caption.text();
        var openCaption = $block.attr('data-open-caption');
        var wasAt = 0;

        $block.on('click', function () {
            var open = $block.toggleClass('shown').hasClass('shown');
            if (openCaption !== undefined) $caption.text(open ? openCaption : shutCaption);
            if (open) wasAt = $(window).scrollTop();
            else $(window).scrollTop(wasAt);
        });
    });
});
