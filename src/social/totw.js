function toID(text) {
    text = (typeof text === 'string' || typeof text === 'number') ?
        text : text && text.id ? text.id : '';
    return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

$(document).ready(function () {
    $('#totwFiller').hide();
    var p = pkmn.sets;
    var json = window.scmsJSON;
    var authorURL = json.authorURL;
    var teambuilderURL = json.teambuilderURL;
    var gpURL = json.gpURL;
    var description = json.description +
        (json.replayLine && json.replayURL ?
            ('<br /><br /><a href="' + json.replayURL + '" target="_blank">' + json.replayLine + '</a>') : '');
    var formatid = toID(json.formatName);
    var obj = p.Teams.importTeam($("#team").text());
    obj.format = formatid;
    var team = obj.team;
    var buf = '';
    buf += '<div class="header">';
    buf += '<h1 style="font-size:x-large;display: inline-block; background: none;">' + json.formatName + ' Team of the Week: ' + json.teamName + '</h1>';
    buf += '<p class="author">';
    if (authorURL[0] === teambuilderURL[0]) {
        buf += 'Team and description by <a href="/forums/members/' + authorURL[1] + '/" target="_blank">' + authorURL[0] + '</a>';
    } else {
        buf += 'Team by <a href="/forums/members/' + teambuilderURL[1] + '/" target="_blank">' + teambuilderURL[0] + '</a> | ';
        buf += 'Description by <a href="/forums/members/' + authorURL[1] + '/" target="_blank">' + authorURL[0] + '</a>';
    }
    if (gpURL) buf += ' | Grammar checked by <a href="/forums/members/' + gpURL[1] + '/" target="_blank">' + gpURL[0] + '</a>';
    buf += '</p></div>';
    buf += '<table style="width:100%"><tbody><tr><td>';
    for (var i = 0; i < team.length; i++) {
        var set = team[i];
        buf += '<article><div class="img">';
        var gen = parseInt(formatid[3]);
        var genIdent = gen >= 6 || isNaN(gen) ? 'xy' : gen === 5 ? 'bw' : gen === 4 ? 'dp' : gen === 3 ? 'rs' : gen === 2 ? 'c' : 'rb';
        var suffix = gen > 4 || gen === 2 || isNaN(gen) ? 'gif' : 'png';
        var pkmnSprite = '/dex/media/sprites//' + genIdent + '/' + set.species.toLowerCase().replace(/\./g, '').replace(/ /g, '-') + '.' + suffix;
        buf += '<img class="img-pokemon" src="' + pkmnSprite + '" />';
        if (set.item) {
            if (set.item.includes('/')) set.item = set.item.split('/')[0].trim();
            var itemSprite = '/forums//media/minisprites/' + set.item.toLowerCase().replace(/ /g, '-') + '.png';
            buf += '<img class="img-item" src="' + itemSprite + '" />';
        }
        buf += '</div>';
        buf += '<pre>';
        buf += p.Sets.exportSet(set);
        buf += '</pre></article>';
    }
    buf += '</td><td style="max-width:400px;vertical-align: top;"><p id="description">' + description + '</p></td></tr></tbody></table>';
    $('title').html("Team of the Week: " + json.formatName + ' ' + json.teamName);
    $("#totw").html(buf);
});
