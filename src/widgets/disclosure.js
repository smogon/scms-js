// A trigger names a panel and clicking it opens that panel. The legacy article
// corpus grew this widget twenty separate times; this is the one copy.
//
//     <input type="button" value="Threats" data-show-target="s1" />
//     <div data-target="s1"> ... </div>
//
// Every knob is defaulted to the spelling the corpus uses most, so a page that
// writes it that way loads this and says nothing else. A page that spells it
// differently says so in [json]:
//
//     [json]
//     {disclosure: {trigger: 'data-show-link', panel: 'data-link',
//                   mode: 'independent', duration: 0}}
//
// or gives an array of those, for a page that pairs more than one set of
// attributes.
//
// Read at ready, not at parse: window.scmsJSON is assigned at the end of
// [head], after this file's own <script src> has run.

$(document).ready(function () {
    var DEFAULTS = {
        // The attribute a trigger writes its panel's name in, and the one the
        // panel answers to.
        trigger: 'data-show-target',
        panel: 'data-target',
        // accordion:   one panel open at a time, page-wide, sliding the open
        //              one shut before the new one opens.
        // independent: each panel minds only itself.
        // siblings:    opening a panel hides the ones beside it, and the
        //              trigger beside the others wears activeClass.
        mode: 'accordion',
        // Slide length in ms. 0 is the instant show/hide, not a slide of no
        // duration.
        duration: 500,
        // Slide length in ms for a panel going shut, where the page closes at
        // a different pace than it opens. accordion mode only, because the
        // other two close with the same slideToggle that opens. null is
        // duration.
        closeDuration: null,
        // Worn by the trigger whose panel is open. siblings mode only.
        activeClass: null,
        // Classes carried by the trigger's <i> children: the first is worn
        // while the panel is closed, the rest while it is open. Markup that
        // ships only a right caret therefore loses it when the panel opens,
        // and markup that ships a down caret too swaps between the two.
        iconClass: null,
        // The thumbnail blow-up: the trigger's own src, shown full size in the
        // .img-large block that precedes the table the trigger sits in.
        preview: false
    };

    // What may be interpolated into a selector. A group naming anything else
    // is skipped rather than trusted.
    var ATTRIBUTE = /^data-[a-z0-9-]+$/;

    function settings(spec) {
        var s = {}, key;
        for (key in DEFAULTS) {
            if (Object.prototype.hasOwnProperty.call(DEFAULTS, key)) {
                s[key] = Object.prototype.hasOwnProperty.call(spec, key) ? spec[key] : DEFAULTS[key];
            }
        }
        return s;
    }

    // The panel an author named, found by reading the attribute rather than by
    // pasting the author's value into a selector: a value with a quote in it
    // can then break nothing.
    function named($set, attribute, value) {
        return $set.filter(function () {
            return $(this).attr(attribute) === value;
        });
    }

    function labelOf($trigger) {
        return $trigger.is('input') ? $trigger.val() : $trigger.text();
    }

    function relabel($trigger, text) {
        if ($trigger.is('input')) $trigger.val(text);
        else $trigger.text(text);
    }

    // Everything a trigger shows about the state of its panel. Each part is
    // inert when the markup for it is absent, so a page opts in by writing the
    // markup and out by not writing it.
    function decorate($trigger, s, open) {
        $trigger.children('.toggle-open').toggle(!open);
        $trigger.children('.toggle-close').toggle(open);

        if (s.iconClass) {
            var classes = s.iconClass.split(/\s+/);
            var $icon = $trigger.children('i');
            $icon.toggleClass(classes[0], !open);
            for (var n = 1; n < classes.length; n++) $icon.toggleClass(classes[n], open);
        }

        var opened = $trigger.attr('data-open-label');
        if (opened !== undefined) {
            relabel($trigger, open ? opened : $trigger.data('closedLabel'));
        }

        if (s.activeClass) $trigger.toggleClass(s.activeClass, open);
    }

    // The thumbnail blow-up, bound to the trigger that was clicked: its src is
    // the picture and the .img-large block before its table is the frame.
    function preview($trigger, s) {
        var src = $trigger.attr('src');
        var $frame = $trigger.closest('table').prev();

        function fill() {
            $frame.html($('<img id="large-img" />').attr('src', src)).hide().slideDown(s.duration);
        }

        return {
            // Switching panels while a picture is already up: cross-fade it.
            // Switching in from nothing: clear whatever other frame is holding
            // a picture and slide this one down.
            swap: function () {
                if ($frame.html()) {
                    $frame.fadeTo(s.duration, 0);
                } else {
                    $('.img-large').has('img').slideUp(s.duration, function () { $(this).html(''); });
                    fill();
                }
            },
            open: function () {
                if (!$frame.html()) fill();
            },
            reveal: function () {
                $frame.find('img').attr('src', src);
                $frame.fadeTo(s.duration, 1);
            },
            close: function () {
                $frame.slideUp(s.duration, function () { $frame.html(''); });
            }
        };
    }

    function accordion($triggers, s) {
        // The panel standing open, by the name its trigger gave it. Empty
        // means none, which is also the name no panel can have.
        var current = '';
        var closing = s.closeDuration === null ? s.duration : s.closeDuration;

        $triggers.on('click', function (evt) {
            evt.preventDefault();
            evt.stopPropagation();

            var $trigger = $(this);
            var $panels = $('[' + s.panel + ']');
            var target = $trigger.attr(s.trigger);
            var picture = s.preview ? preview($trigger, s) : null;

            if (target === current) {
                named($panels, s.panel, current).slideUp(closing);
                if (picture) picture.close();
                decorate(named($triggers, s.trigger, current), s, false);
                current = '';
                return;
            }

            var $open = named($panels, s.panel, current);
            var was = current;
            var show = function () {
                named($panels, s.panel, target).slideDown(s.duration);
                if (picture) picture.reveal();
                decorate($trigger, s, true);
                current = target;
            };

            if ($open.length > 0) {
                if (picture) picture.swap();
                decorate(named($triggers, s.trigger, was), s, false);
                $open.slideUp(closing, show);
            } else {
                if (picture) picture.open();
                show();
            }
        });
    }

    function independent($triggers, s) {
        $triggers.on('click', function (evt) {
            evt.preventDefault();
            evt.stopPropagation();

            var $trigger = $(this);
            var $panel = named($('[' + s.panel + ']'), s.panel, $trigger.attr(s.trigger));
            var open = !$panel.is(':visible');

            if (s.duration > 0) $panel.slideToggle(s.duration);
            else $panel.toggle();

            decorate($trigger, s, open);
        });
    }

    function siblings($triggers, s) {
        $triggers.on('click', function (evt) {
            evt.preventDefault();
            evt.stopPropagation();

            var $trigger = $(this);
            var $panel = named($('[' + s.panel + ']'), s.panel, $trigger.attr(s.trigger));
            var open = !$panel.is(':visible');

            if (s.duration > 0) $panel.slideToggle(s.duration);
            else $panel.toggle();
            $panel.siblings().hide();

            if (s.activeClass) $trigger.siblings().removeClass(s.activeClass);
            decorate($trigger, s, open);
        });
    }

    var MODES = {accordion: accordion, independent: independent, siblings: siblings};

    var groups = window.scmsJSON && window.scmsJSON.disclosure;
    if (groups === undefined || groups === null) groups = {};

    $.each([].concat(groups), function (_, spec) {
        var s = settings(spec);
        var bind = MODES[s.mode];

        if (!bind || !ATTRIBUTE.test(s.trigger) || !ATTRIBUTE.test(s.panel)) return;

        var $triggers = $('[' + s.trigger + ']');
        if ($triggers.length === 0) return;

        $('[' + s.panel + ']').hide();
        $triggers.each(function () {
            var $trigger = $(this);
            $trigger.data('closedLabel', labelOf($trigger));
            decorate($trigger, s, false);
        });

        bind($triggers, s);
    });
});
