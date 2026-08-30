// The bar charts of "Shafted by Design", off the article and its four
// translations. Each is one Google Charts call over one table of types, and
// the only thing the article's own code did beyond drawing was bold a single
// row's label -- which is the article's argument.
//
//     [json]
//     {typeBarCharts: {
//         bold: 'Ice',
//         charts: [
//             {element: 'strongest-move-physical',
//              rows: [['Type (Strongest Move)', 'Base Power', {role: 'style'}],
//                     ['Normal (Explosion)', 250, 'a6ab76'],
//                     ['Ice (Icicle Crash)', 85, '87dcda']]}
//         ]}}
//
// rows is what arrayToDataTable takes: a header, then a label, a value and a
// bar colour per row. A value may be {v: 250, f: '250 (Boomburst - 140)'} where
// the number sorts and the text is what the tooltip shows. The horizontal axis
// is titled by the header's second cell, which is what every chart here does.
//
// bold is matched against the start of a row's label, and the row it finds
// keeps the bold once the chart is drawn. Absent bolds nothing.
//
// charts-loader.js is the tag above this one; it defines google.charts.

$(document).ready(function () {
    var config = (window.scmsJSON && window.scmsJSON.typeBarCharts) || {};
    var charts = config.charts || [];
    if (charts.length === 0) return;

    // The label of the row to bold sits six <text> nodes after the axis
    // furniture the chart draws first.
    var LABEL_OFFSET = 6;

    function emphasize(container, data) {
        if (!config.bold) return;
        var labels = container.getElementsByTagName('text');
        for (var row = 0; row < data.getNumberOfRows(); row++) {
            if (data.getValue(row, 0).indexOf(config.bold) !== 0) continue;
            var label = labels[row + LABEL_OFFSET];
            if (label) label.setAttribute('font-weight', 'Bold');
            return;
        }
    }

    function draw() {
        for (var i = 0; i < charts.length; i++) {
            var spec = charts[i];
            var container = document.getElementById(spec.element);
            if (!container || !spec.rows || spec.rows.length === 0) continue;

            var data = google.visualization.arrayToDataTable(spec.rows);
            var chart = new google.visualization.BarChart(container);
            // The listener is bound per chart, so each closes over its own
            // container and table rather than the loop's last.
            google.visualization.events.addListener(chart, 'ready',
                (function (c, d) { return function () { emphasize(c, d); }; })(container, data));

            chart.draw(data, {
                title: '',
                chartArea: {width: '50%'},
                hAxis: {title: spec.rows[0][1], minValue: 0},
                vAxis: {title: ''},
                width: 900,
                height: 400
            });
        }
    }

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(draw);
});
