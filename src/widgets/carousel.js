// A row of blocks shown one at a time, with a pair of arrows either side that
// drop the next one in and the old one out.
//
//     <div class="carousel">
//       <div class="container"><div class="item">...</div><div class="item">...</div></div>
//       <div class="carousel-keys"><span class="left">&lt;</span><span class="right">&gt;</span></div>
//     </div>
//
// Which item shows first is set from here rather than from the page's <style>
// because these items are floated and display:inline: hidden by a stylesheet,
// jQuery would put the div back as a block and the row would come apart.

$(document).ready(function () {
    var DROP_MS = 600;

    var $items = $('.carousel > .container > .item');
    if ($items.length === 0) return;

    $items.hide();
    $('.carousel > .container > .item:first-child').show();

    function step(forward) {
        return function () {
            var $carousel = $(this).closest('.carousel');
            var $all = $carousel.find('.item');
            var $visible = $carousel.find('.item:visible');

            var next = $all.index($visible) + (forward ? 1 : -1);
            if (next >= $all.length) next = 0;
            if (next < 0) next = $all.length - 1;

            $visible.hide('drop', {direction: forward ? 'left' : 'right'}, DROP_MS);
            $all.eq(next).show('drop', {direction: forward ? 'right' : 'left'}, DROP_MS);
        };
    }

    $('.carousel-keys > .right').on('click', step(true));
    $('.carousel-keys > .left').on('click', step(false));
});
