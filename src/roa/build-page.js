/* By Kris */

'use strict';

// Polyfill for String.startsWith
Object.defineProperty(String.prototype, 'startsWith', {
    value: function(search, pos) {
        return this.substring(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
});

Object.defineProperty(String.prototype, 'endsWith', {
    value: function(search, this_len) {
        if (this_len === undefined || this_len > search.length) {
          this_len = search.length;
        }
        return this.substring(this_len - search.length, this_len) === search;
    }
});

const FORMATS = [
    'gen11v1', 'gen1lc', 'gen1nu', 'gen1ou', 'gen1stadiumou', 'gen1ubers', 'gen1uu', 'gen1nintendocup1997', 'gen1tradebacksou', 'gen1lcl100', 'gen1middlecup', 'gen21v1', 'gen2lc', 'gen2nu', 'gen2ou', 'gen2pu', 'gen2ubers', 'gen2uu', 'gen31v1', 'gen3lc', 'gen3nu', 'gen3ou', 'gen3pu', 'gen3ubers', 'gen3uu', 'gen3zu', 'gen41v1', 'gen4lc', 'gen4monotype', 'gen4nu', 'gen4ou', 'gen4pu', 'gen4ubers', 'gen4uu', 'gen4zu', 'gen51v1', 'gen5lc', 'gen5nu', 'gen5ou', 'gen5pu', 'gen5ru', 'gen5ubers', 'gen5uu', 'gen5zu', 'gen61v1', 'gen6lc', 'gen6monotype', 'gen6nu', 'gen6ou', 'gen6pu', 'gen6ru', 'gen6ubers', 'gen6uu', 'gen6zu', 'gen71v1', 'gen7lc', 'gen7letsgoou', 'gen7monotype', 'gen7nu', 'gen7ou', 'gen7pu', 'gen7ru', 'gen7ubers', 'gen7uu', 'gen1monotype', 'index', 'gen2zu', 'gen5monotype', 'gen8ubers',
];

function reformatFileToFormatName(str) {
    if (str === 'gen7letsgoou') return '[Gen 7 Let\'s Go] OU';
    if (str === 'gen1stadiumou') return '[Gen 1] Stadium OU';
    if (str === 'gen1tradebacksou') return '[Gen 1] Tradebacks OU';
    if (str === 'gen1nintendocup1997') return '[Gen 1] Nintendo Cup 1997';
    if (str === 'gen1lcl100') return '[Gen 1] LC L100';
    if (str === 'gen1middlecup') return '[Gen 1] Middle Cup';
    var gen;
    if (str.slice(4).length > 2) {
        gen = '[Gen ' + str.slice(3, 4) + '] ' + str.slice(4, 5).toUpperCase() + str.slice(5);
    } else {
        gen = '[Gen ' + str.slice(3, 4) + '] ' + str.slice(4).toUpperCase();
    }
    return gen;
};

function getFormat() {
    var format = false;
    var q = window.location.search.substring(1).split('&');
    for (var i = 0; i < q.length; i++) {
        var p = q[i].split('=');
        if (p[0] === 'format') {
            format = p[1];
            break;
        }
    }
    return format;
}

function goToTeams(formatid) {
    window.location = window.location.pathname + (!formatid ? '?format=index' : '?format=' + formatid);
}

function allTeamButtons(format, homePage) {
    var buf = [];
    if (!homePage) buf.push('<details style="overflow:auto"><summary>Metagame Navigation</summary>');
    buf.push('<table class="table">');
    var gen1 = [], gen2 = [], gen3 = [], gen4 = [], gen5 = [], gen6 = [], gen7 = [], gen8 = [];
    for (var i = 0; i < FORMATS.sort().length; i++) {
        var formatid = FORMATS[i];
        if (formatid === 'index') continue;
        var event = (format && formatid === format ? 'disabled' : 'onclick="goToTeams(\'' + formatid + '\')"');
        var button = '<button class="button" ' + event + '>' + reformatFileToFormatName(formatid) + '</button>';
        if (formatid.startsWith('gen1')) gen1.push(button);
        if (formatid.startsWith('gen2')) gen2.push(button);
        if (formatid.startsWith('gen3')) gen3.push(button);
        if (formatid.startsWith('gen4')) gen4.push(button);
        if (formatid.startsWith('gen5')) gen5.push(button);
        if (formatid.startsWith('gen6')) gen6.push(button);
        if (formatid.startsWith('gen7')) gen7.push(button);
        if (formatid.startsWith('gen8')) gen8.push(button);
    }
    if (gen1.length) buf.push('<tr><th>RBY</th><td>' + gen1.join('</td><td>') + '</td></tr>');
    if (gen2.length) buf.push('<tr><th>GSC</th><td>' + gen2.join('</td><td>') + '</td></tr>');
    if (gen3.length) buf.push('<tr><th>ADV</th><td>' + gen3.join('</td><td>') + '</td></tr>');
    if (gen4.length) buf.push('<tr><th>DPP</th><td>' + gen4.join('</td><td>') + '</td></tr>');
    if (gen5.length) buf.push('<tr><th>BW</th><td>' + gen5.join('</td><td>') + '</td></tr>');
    if (gen6.length) buf.push('<tr><th>ORAS</th><td>' + gen6.join('</td><td>') + '</td></tr>');
    if (gen7.length) buf.push('<tr><th>SM</th><td>' + gen7.join('</td><td>') + '</td></tr>');
    if (gen8.length) buf.push('<tr><th>SS</th><td>' + gen8.join('</td><td>') + '</td></tr>');
    buf.push('</table>');
    if (!homePage) buf.push('</details>');
    return buf.join('');
}

function generateDescriptionBox(format, teamName) {
    var desc = Descriptions[format];
    if (!desc) return '';
    desc = desc[teamName];
    if (!desc) return '';
    var lines = desc.split('\n');
    var broken = false;
    for (var i = 0; i < lines.length; i++) {
        if (/^\[bull(et)?\]/gi.test(lines[i])) {
            var openIndex = lines[i].search(/^\[bull(et)?\]/gi);
            var closeIndex = lines[i].search(/\[\/bull(et)?\]$/gi);
            if (closeIndex < 0 || closeIndex < openIndex) {
                broken = 'Contact Kris or Links; open [bull] or [BULL] tag found but no closing [/bull] or [/BULL] tag found.';
                break;
            }
            // var newLine = lines[i].replace(/\[bull(et)?\]/gi, '<li>').replace(/\[\/bull(et)?\]/gi, '</li>').trim();
            var newLine = '&bullet; ' + lines[i].replace(/\[bull(et)?\]/gi, '').replace(/\[\/bull(et)?\]/gi, '').trim();
            lines[i] = newLine;
        }
        if (/\[b\]/gi.test(lines[i])) {
            var openIndex = lines[i].search(/\[b\]/gi);
            var closeIndex = lines[i].search(/\[\/b\]/gi);
            if (closeIndex < 0 || closeIndex < openIndex) {
                broken = 'Contact Kris or Links; open [b] or [B] tag found but no closing [/b] or [/B] tag found.';
                break;
            }
            var newLine = lines[i].replace(/\[b\]/gi, '<b>').replace(/\[\/b\]/gi, '</b>');
            lines[i] = newLine;
        }
    }
    if (broken) return broken;
    var newLines = lines;
    /*for (var i = 0; i < newLines.length; i++) {
        if (newLines[i].startsWith('<li>')) {
            if (!newLines[i - 1]) {
                newlines[i] = '<ul>' + newLines[i];
            } else {
                if (newLines[i - 1].startsWith('<li>')) continue;
                if (!newLines[i - 1].endsWith('<ul>')) {
                    newLines[i - 1] += '<ul>';
                }
            }
            if (!newLines[i + 1]) {
                newlines[i] += '</ul>';
            } else {
                if (newLines[i + 1].startsWith('<li>')) continue;
                if (!newLines[i + 1].endsWith('</ul>')) {
                    newLines[i + 1] += '</ul>';
                }
            }
        }
    }*/
    var buf = [];
    buf.push('<h3>Description</h3>');
    buf.push('<p>' + newLines.join('</p><p>').replace(/<p><\/p>/g, '') + '</p>');
    return buf.join('');
}

function buildPage(teamStr, format) {
    var buf = [];
    buf.push('<div id="t" style="text-align:center;margin:12px 0;">');
    buf.push(allTeamButtons(teamStr === 'INDEX' ? false : format, teamStr === 'INDEX'));
    if (teamStr === 'INDEX') {
        return buf.join('') + '</div>';
    }
    buf.push('<h2>' + reformatFileToFormatName(format) + ' teams</h2>');
    var teams = pkmn.sets.Teams.importTeams(teamStr);
    buf.push('<p class="hide" id="allteams">' + escapeHTML(pkmn.sets.Teams.exportTeams(teams), true) + '</p>');
    buf.push('<div><button class="button" onclick="copyElement(\'#allteams\', \'Successfully copied all teams!\')">Copy All Teams</button></div>');
    for (var i = 0; i < teams.length; i++) {
        var skip = false;
        if (teams[i].name.indexOf('SEPARATOR [') >= 0) {
            buf.push('<h3>' + teams[i].name.slice(11, teams[i].name.length - 1) + '</h3>');
            skip = true;
        }
        if (!skip) buf.push('<div>');
        for (var j = 0; j < teams[i].team.length; j++) {
            if (skip) continue;
            var mon = teams[i].team[j];
            if (teams.length > 10) {
                var spriteid = mon.species.toLowerCase().replace(/ /g, '-').replace(/[^-a-z0-9]+/g, '');
                if (spriteid.startsWith('gourgeist')) spriteid = 'gourgeist';
                buf.push('<img src="/forums//media/minisprites/' + spriteid + '.png" alt="' + mon.species + '" />');
            } else {
                var genNum = parseInt(format.slice(3, 4));
                var directory = genNum < 5 ? format.slice(0, 4) : (genNum === 5 ? 'gen5ani' : 'ani');
                var spriteid = mon.species.toLowerCase().replace(/[^-a-z0-9]+/g, '');
                var split = spriteid.split('-');
                var baseName = split[0];
                if (split.length > 2) {
                    spriteid = baseName + '-' + split.slice(1).join('');
                } else if (split.length === 2) {
                    spriteid = baseName + '-' + split[1];
                } else {
                    spriteid = baseName;
                }
                if (spriteid === 'ho-oh') spriteid === 'hooh';
                buf.push('<img src="//play.pokemonshowdown.com/sprites/' + directory + '/' + spriteid + '.' + (genNum < 5 ? 'png' : 'gif') + '" alt="' + mon.species + '" />');
            }
        }
        if (!skip) {
            buf.push('</div>');
            buf.push('<button class="button" style="margin-bottom:-10px;" onclick="copyElement(\'#' + teams[i].name.toLowerCase().replace(/[^-a-z0-9]+/g, '') + '\', \'Successfully copied team!\')">Copy Team</button> ');
            buf.push('<details><summary>' + teams[i].name + '</summary>');
            buf.push('<p id="' + teams[i].name.toLowerCase().replace(/[^-a-z0-9]+/g, '') + '">' + escapeHTML(teams[i].export(), true) + '</p>')
            buf.push(generateDescriptionBox(format, teams[i].name.trim()));
            buf.push('</details>');
        }
    }
    buf.push('</div>');
    return buf.join('');
}

function copyElement(element, msg) {
    copyText($(element).text(), msg);
}

function copyText(text, msg) {
    var $t = $('<textarea>');
    $('#b').append($t);
    $t.val(text.replace(/<br \/>/g, '')).select();
    document.execCommand("copy");
    $t.remove();
    if (msg) alert(msg);
}

function escapeHTML(str, importable) {
	if (!str) return '';
	str = ('' + str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
		.replace(/\//g, '&#x2f;');
	if (importable) str = str.replace(/\n/g, '\r\n<br />');
	return str;
}

var format = getFormat();
if (!format || FORMATS.indexOf(format.toLowerCase().replace(/[^a-z0-9]+/g, '')) < 0) format = 'index';
$.get('sample-files/' + format + '.txt', function (data) {
    $('#b').html(buildPage(data, format));
});
