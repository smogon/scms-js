// A <select> picks which block of the article you are looking at. The select
// names the container it swaps inside of, and each option names the block it
// stands for:
//
//     <select class="div-toggle" data-target=".sets">
//       <option data-show=".band">Choice Band</option>
//       <option data-show=".eviolite">Eviolite</option>
//     </select>
//     <div class="sets"> <ul class="band">...</ul> <ul class="eviolite">...</ul> </div>
//
// A page that writes the selector in the option's value instead, and has no
// one container to swap inside of, is spelled the same way minus data-target:
// the blocks to hide are then everything the options between them name.
//
//     [json]
//     {selectToggle: {duration: 0}}
//
// Which block is showing when the page loads is the markup's business, not
// this file's: whatever the selected option names is the thing CSS should
// leave visible.

$(document).ready(function () {
    // How long the swap takes. The corpus animates at 800ms where the blocks
    // are prose and swaps instantly where they are screenshots.
    var duration = 800;
    var configured = window.scmsJSON && window.scmsJSON.selectToggle;
    if (configured && typeof configured.duration === 'number') duration = configured.duration;

    // 0 is the instant show/hide rather than an animation of no length, which
    // is what lets the browser follow an href="#anchor" into a block that was
    // hidden a moment ago.
    function conceal($set) { if (duration > 0) $set.hide(duration); else $set.hide(); }
    function reveal($set) { if (duration > 0) $set.show(duration); else $set.show(); }

    // What an option stands for: its own data-show, or its value where the
    // page writes the selector there.
    function selectorOf(option) {
        var show = $(option).attr('data-show');
        return show === undefined ? $(option).attr('value') : show;
    }

    $('select.div-toggle').on('change', function () {
        var $select = $(this);
        var target = $select.attr('data-target');
        var show = selectorOf($('option:selected', this));

        if (target === undefined) {
            // Nothing containing them to hide wholesale, so the blocks to put
            // away are the ones the other options name.
            var named = [];
            $select.find('option').each(function () {
                var selector = selectorOf(this);
                if (selector) named.push(selector);
            });
            conceal($(named.join(', ')));
            reveal($(show));
        } else {
            var $target = $(target);
            conceal($target.children());
            reveal($(show, $target));
        }
    });

    // A link that makes the choice for the reader, so the prose can point at a
    // block that isn't showing. It doesn't stop the click: an href alongside
    // it still takes them there.
    $('[data-select-value]').on('click', function () {
        var $link = $(this);
        $($link.attr('data-select-target')).val($link.attr('data-select-value')).change();
    });
});
