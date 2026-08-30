// The Smeargle galleries: every picture is served full size, shrunk to a
// thumbnail here, and clicking one puts the full size back on screen over the
// page until the next click anywhere puts it away.
//
//     <img src="/__uploads/....png" class="img-1" data-shrink="2.5" />
//
// data-shrink   What to divide the picture's own width by. The attribute is
//               what opts a picture in; a picture without it is left alone.
//
// The page supplies the look: .tooltip is the "Click for full version" ribbon
// this prepends beside a picture on hover, and .card-large is the blown-up
// copy it appends to div#body.

$(document).ready(function () {
    var TOOLTIP_MS = 100;
    var FADE_MS = 200;

    var viewing = false;

    function hide() {
        $('.card-large').hide('fade', FADE_MS, function () {
            $(this).remove();
            viewing = false;
        });
    }

    $('img[data-shrink]').each(function () {
        var image = this;
        var divisor = parseFloat($(image).attr('data-shrink'));
        if (!(divisor > 0)) return;

        // What the picture measures before it is shrunk, which is the size the
        // blown-up copy is shown at.
        var fullWidth = 0, fullHeight = 0;

        function shrink() {
            fullWidth = image.width;
            fullHeight = image.height;
            $(image).css('width', fullWidth / divisor);
            $(image).parent().prepend($('<div class="tooltip">Click for full version</div>').hide());
            $(image).hover(function () {
                var $tooltip = $(this).parent().find('.tooltip');
                $tooltip.css({left: $(this).offset().left, width: this.width - 2});
                $tooltip.slideDown(TOOLTIP_MS);
            }, function () {
                $(this).parent().find('.tooltip').slideUp(TOOLTIP_MS);
            });
        }

        // A picture already in the cache has loaded before this file has, and
        // its load event is not coming: on those visits the galleries used to
        // render at full size and open a blow-up positioned at NaN.
        if (image.complete) shrink();
        else $(image).on('load', shrink);

        $(image).on('click', function (e) {
            if (viewing) {
                e.stopPropagation();
                hide();
            }
            var $card = $('<div class="card-large"></div>')
                .append($('<img />').attr('src', this.src))
                .css({
                    width: fullWidth,
                    height: fullHeight,
                    top: $(this).offset().top - fullHeight / 2,
                    left: $(this).offset().left - fullWidth / 2
                })
                .hide();
            $('div#body').append($card);
            $card.show('fade', FADE_MS, function () { viewing = true; });
            $card.on('click', hide);
        });
    });

    $('html').on('click', function () {
        if (!viewing) return;
        hide();
    });
});
