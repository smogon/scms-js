// The call that makes a table sortable, which thirty-seven documents -- the
// speed tiers, the tournament standings, the article indexes and the RNG
// spread tables -- each wrote out for themselves:
//
//     <table class="sortable" id="tier0_tbl" data-sortable data-sort-skip="1 3 4 5">
//
// data-sortable   Presence is the whole hook, spelled the way libclient marks
//                 a sortable table everywhere else on the site. A table that
//                 only carries class="sortable" is styled and not sorted,
//                 which is what the ten reference tables on
//                 /resources/competitive/dp/hiddenpower_combos want: their
//                 rows group under a heading row that sorting would scatter.
// data-sort-skip  The columns whose header does nothing, space separated.
//                 Absent sorts by every column. A speed tier skips the four
//                 that are prose.
//
// The zebra widget and the complex extraction are not knobs. Every copy asked
// for both: the stripes are classes rather than :nth-child, so reordering rows
// would otherwise leave them where they were, and a cell holds a link rather
// than bare text.
//
// Neither is the starting order. Three tables passed a sortList; on two of
// them it named columns the table does not have and threw before it could
// sort, and on the third it asked for the order the rows were already in.

// The tables are collected with querySelectorAll rather than with jQuery:
// /__scms-js/media/jquery.js, which is what every one of these pages loads, is
// jQuery 1.1.3.1, and its selector engine spells an attribute `[@attr]` and
// finds nothing under the modern one. jQuery is here for the plugin alone.

$(document).ready(function () {
    var tables = document.querySelectorAll('table[data-sortable]');
    for (var i = 0; i < tables.length; i++) {
        var headers = {};
        var skip = (tables[i].getAttribute('data-sort-skip') || '').split(/\s+/);
        for (var j = 0; j < skip.length; j++) {
            if (skip[j] !== '') headers[skip[j]] = {sorter: false};
        }
        $(tables[i]).tablesorter({widgets: ['zebra'], textExtraction: 'complex', headers: headers});
    }
});
