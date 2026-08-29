// A button that shows one block and hides it again, wearing the word for what
// it will do next. The corpus writes this 67 separate times, once per numbered
// team, battle or ranking, and the only thing that ever changes is which block
// and which two words:
//
//     <input type="button" value="Show Team" data-show-hide="#team111"
//            data-show-hide-caption="Hide Team" />
//     <div class="team" id="team111"> ... </div>
//
// The caption the markup ships is the closed one; data-show-hide-caption is
// the open one. A page whose buttons all agree says so once instead:
//
//     [json]
//     {showHide: {speed: 800, caption: 'Hide Team'}}
//
// Which blocks start hidden is a display rule and belongs in the page's own
// <style>. Hiding them from here would mean hiding them at ready, one paint
// too late, and the reader would watch them close.

$(document).ready(function () {
    var page = (window.scmsJSON && window.scmsJSON.showHide) || {};

    function caption($control) {
        return $control.is('input') ? $control.val() : $control.text();
    }

    function recaption($control, text) {
        if ($control.is('input')) $control.val(text);
        else $control.text(text);
    }

    function setting($control, name, fallback) {
        var own = $control.attr('data-show-hide-' + name);
        if (own !== undefined) return own;
        return page[name] === undefined ? fallback : page[name];
    }

    $('[data-show-hide]').each(function () {
        var $control = $(this);
        var $panel;
        try {
            $panel = $($control.attr('data-show-hide'));
        } catch (e) {
            // A selector the page got wrong is one dead button, not a dead page.
            return;
        }
        if ($panel.length === 0) return;

        var closed = caption($control);
        var opened = setting($control, 'caption', null);
        // 0 is the instant show/hide, which is what the pages that swap tables
        // rather than prose do.
        var speed = Number(setting($control, 'speed', 0));

        $control.on('click', function () {
            var open = !$panel.is(':visible');
            if (speed > 0) $panel.toggle(speed);
            else $panel.toggle();
            if (opened !== null) recaption($control, open ? opened : closed);
        });
    });
});
