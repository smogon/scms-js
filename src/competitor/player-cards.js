// A player's card in an OST wrap-up: the button widens it and reveals the note
// under it, and says how to put it back. Two articles wrote this, the older of
// them with a class per player and thirteen copies of the same four lines.
//
//     <div class="player">
//       <div>
//         <p class="name">Floppy</p>
//         <input type="button" value="Expand" data-expand="Close" />
//         <div class="info"> ... </div>
//       </div>
//     </div>
//
// The button ships the shut caption and data-expand names the open one. The
// card is the button's parent and the note is the button's next sibling, which
// is how both articles laid it out.
//
// window.scmsJSON.playerCards, both optional:
//   closed  The card's width while shut, in px. Default 200.
//   open    The card's width while open, in px. Default 500.
//
// The note starts hidden in the page's own CSS rather than from here: hiding
// at ready is one paint too late, and the reader would watch it close.

$(document).ready(function () {
    var config = (window.scmsJSON && window.scmsJSON.playerCards) || {};
    var closed = Number(config.closed) || 200;
    var open = Number(config.open) || 500;

    $('[data-expand]').each(function () {
        var $button = $(this);
        var $card = $button.parent();
        var $note = $button.next();
        var shutCaption = $button.val();
        var openCaption = $button.attr('data-expand');

        $button.on('click', function () {
            var opening = $button.val() === shutCaption;
            $card.animate({width: opening ? open : closed});
            $note.toggle(opening);
            $button.val(opening ? openCaption : shutCaption);
        });
    });
});
