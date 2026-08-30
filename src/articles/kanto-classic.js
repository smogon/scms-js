// The Kanto Classic's roster is one sprite sheet, and every Pokemon on it is
// an empty .green-sprite carrying its name as an id. This puts the right cell
// of the sheet behind each one.
//
//     [json]
//     {kantoClassic: {sheet: 'https://www.smogon.com/__uploads/....png',
//                     columns: 5, cell: 56,
//                     order: ['venusaur', 'charizard', 'blastoise']}}
//
// order is the sheet read left to right and top to bottom. A .green-sprite
// whose id is not in it keeps whatever the page gave it.

$(document).ready(function () {
    var config = (window.scmsJSON && window.scmsJSON.kantoClassic) || {};
    var order = config.order || [];
    if (!config.sheet || order.length === 0) return;

    var columns = Number(config.columns) || 5;
    var cell = Number(config.cell) || 56;

    $('.green-sprite').each(function () {
        var at = order.indexOf(this.id);
        if (at < 0) return;
        $(this).css({
            'background-image': 'url(' + config.sheet + ')',
            'background-position': -(at % columns) * cell + 'px ' +
                                   -Math.floor(at / columns) * cell + 'px'
        });
    });
});
