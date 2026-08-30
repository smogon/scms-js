// A bar of buttons behaving as tabs: the one you click takes the .cur class
// and reveals the panel it names, and the rest of that bar's panels go away.
//
//     <ul class="bar" data-tab-bar=".content.def">
//       <li><button class="button cur" value=".venusaur-mega">Mega Venusaur</button></li>
//       <li><button class="button"     value=".toxapex">Toxapex</button></li>
//     </ul>
//     <div class="content venusaur-mega def">...</div>
//     <div class="content toxapex def hidden">...</div>
//
// data-tab-bar     On the bar. Its value is the selector for the panels this
//                  bar governs, and its presence is what makes the element a
//                  bar. A page with five bars over one family of panels says
//                  which fifth belongs to each of them here.
// data-tab-effect  "slide" swaps the panels with an animation instead of the
//                  hidden class. Absent is the class.
//
// The controls are the buttons and inputs inside the bar, and each names its
// panel in its value -- invisible on both a <button>, which shows its text,
// and an <input type="image">, which shows its picture. A control that names
// nothing is left alone, which is what the blank squares in the Super Staff
// Bros rosters are.
//
// Which panel is showing when the page loads is the markup's business: one
// control carries cur and one panel does not carry hidden.

$(document).ready(function () {
    var SLIDE_MS = 500;

    $('[data-tab-bar]').each(function () {
        var $bar = $(this);
        var panels = $bar.attr('data-tab-bar');
        var slide = $bar.attr('data-tab-effect') === 'slide';
        var $controls = $bar.find('button, input');

        $controls.on('click', function () {
            var $control = $(this);
            if ($control.hasClass('cur')) return;

            var target = $control.attr('value');
            if (!target) return;

            var $panels = $(panels);
            $controls.removeClass('cur');
            $control.addClass('cur');

            if (slide) {
                // The one going away goes first, and the one arriving waits
                // for it: two panels sliding at once would push the page
                // around twice.
                $panels.filter(':visible').slideUp(SLIDE_MS, function () {
                    $(target).slideDown(SLIDE_MS);
                });
            } else {
                $panels.addClass('hidden');
                $(target).removeClass('hidden');
            }
        });
    });
});
