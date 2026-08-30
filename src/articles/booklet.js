// A booklet: an article laid out as pages, one shown at a time, with a pair of
// arrows that fold one away and the next one in. Sixty-seven documents wrote
// these twenty lines, and the nineteen copies differed only in whitespace and
// in which fragment opens the second page.
//
//     <div class="page"> ... </div>
//     <div class="page" data-open-hash="puzzle"> ... </div>
//     <span class="prev">&lt;</span> <span class="next">&gt;</span>
//
// data-open-hash  On a .page: the fragment, without its #, that opens this
//                 page instead of the first one. /articles/deer-hunt's front
//                 page links to #puzzle, which is the page behind it.
//
// Which page shows first is set from here rather than from the page's <style>,
// for the reason carousel.js gives: with no script a reader gets the whole
// booklet, which reads top to bottom, and a stylesheet would leave them on
// page one with no way to turn it.

$(document).ready(function () {
    var $pages = $('.page');
    if ($pages.length === 0) return;

    var hash = window.location.hash.replace(/^#/, '');
    var start = 0;
    $pages.each(function (i) {
        if (hash !== '' && this.getAttribute('data-open-hash') === hash) start = i;
    });

    $pages.not(':eq(' + start + ')').hide();
    // Opening the second page shortens the document under a browser that has
    // already jumped to the fragment, so it lands wherever that left it.
    if (start !== 0) scroll(0, 0);

    function turn($to) {
        $('.page:visible').hide('fold', {horizFirst: true}, 300);
        $to.show('fold', {horizFirst: true}, 600);
    }
    $('.prev').click(function () { turn($('.page:visible').prev('.page')); });
    $('.next').click(function () { turn($('.page:visible').next('.page')); });
});
