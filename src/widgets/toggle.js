// One button, one block, and clicking the first shows or hides the second.
// The corpus wrote these four lines twenty-three separate times, once per
// sample team, alternate set or hall-of-fame table:
//
//     <button id="button" data-toggle-target="#record">Show Record</button>
//     <div id="record" class="score"> ... </div>
//
// The target is a selector, so a button that swaps one block for another names
// both: data-toggle-target="#set-1, #set-2" toggles each in turn, which shows
// whichever was hidden and hides whichever was not.
//
// data-toggle-duration   Animation length in ms. Absent is the instant swap.
// data-toggle-effect     "slide" animates height alone. Absent animates
//                        height, width and opacity together.
//
// Which blocks start hidden is a display rule and belongs in the page's own
// <style>, for the same reason it does in show-hide.js: hiding them from here
// would mean hiding them at ready, one paint too late.

$(document).ready(function () {
    $('[data-toggle-target]').each(function () {
        var $control = $(this);
        var $target;
        try {
            $target = $($control.attr('data-toggle-target'));
        } catch (e) {
            // A selector the page got wrong is one dead button, not a dead page.
            return;
        }
        if ($target.length === 0) return;

        // .data rather than .attr: the effects wrapper wants a number, and it
        // treats a string duration as no duration at all.
        var duration = $control.data('toggleDuration');
        var slide = $control.attr('data-toggle-effect') === 'slide';

        $control.on('click', function () {
            if (slide) $target.slideToggle(duration);
            else $target.toggle(duration);
        });
    });
});
