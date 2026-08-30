// A row of thumbnails, and clicking one opens the panel that goes with it and
// closes whichever panel was open. Clicking the open panel's own thumbnail
// closes it and opens nothing.
//
//     <tr class="themons" data-panel-picker=".mon">
//       <td><input type="image" src=".../snorlax.png" alt="Snorlax" data-id="0" /></td>
//       <td><input type="image" src=".../clefable.png" alt="Clefable" data-id="1" /></td>
//     </tr>
//     <div class="mon" data-id="0"> ... </div>
//     <div class="mon" data-id="1"> ... </div>
//
// data-panel-picker   On the container. Its value is the selector for the
//                     panels that container drives, and its presence is what
//                     makes the element a container.
// data-panel-trigger  Selector for the triggers inside it. Default "input".
// data-panel-key      The data-* name the trigger and its panel share.
//                     Default "id".
//
// The panels are looked for across the whole document rather than inside the
// container, which is load-bearing: scavengers-room has eight containers over
// one set of answers, and opening an answer from the eighth has to close the
// one the first opened.
//
// Which panels start closed is a display rule and belongs in the page's own
// <style>.

$(document).ready(function () {
    // Every snippet this replaces animated at 800ms, so there is nothing for a
    // knob to choose between.
    var DURATION = 800;

    $('[data-panel-picker]').each(function () {
        var $container = $(this);
        var panels = $container.attr('data-panel-picker');
        var key = $container.attr('data-panel-key') || 'id';
        var $triggers = $container.find($container.attr('data-panel-trigger') || 'input');

        // .data rather than the attribute on both sides: jQuery reads data-id="0"
        // back as the number 0, and the comparison has to see the same value
        // from the trigger as from the panel.
        function keyed($set, value) {
            return $set.filter(function () { return $(this).data(key) === value; });
        }

        $triggers.on('click', function () {
            var wanted = $(this).data(key);
            var $open = $(panels).filter(':visible');

            $open.hide(DURATION);
            // The panel that was open is the one this trigger names: it has
            // just been told to close, and nothing takes its place.
            if ($open.length && $open.data(key) === wanted) return;

            // Not queued behind the close: the two animations overlap, as
            // they did when this was written out once per article.
            keyed($(panels), wanted).show(DURATION);
        });
    });
});
