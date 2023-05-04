function toID(text) {
    text = (typeof text === 'string' || typeof text === 'number') ?
        text : text && text.id ? text.id : '';
    return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

$(document).ready(function () {
    $('#spotlightFiller').hide();
    var json = window.scmsJSON;
    var authorURL = json.authorURL;
    var gpURL = json.gpURL;
    var qcURL = json.qcURL;
    var description = json.description +
        (json.replayLine && json.replayURL ?
            ('<br /><br /><a href="' + json.replayURL + '" target="_blank">' + json.replayLine + '</a>') : '');
    var formatid = toID(json.formatName);
    var obj = PokemonTeams.importTeam($("#set").text());
    obj.format = formatid;
    var set = obj.team[0];
    var buf = '';
    buf += '<div class="header">';
    buf += '<h1 style="font-size:x-large;display: inline-block; background: url(/forums//media/minisprites/' + set.species.toLowerCase().replace(/\./g, '').replace(/ /g, '-') + '.png) no-repeat left;">' + json.formatName + ' Set Spotlight: ' + json.setName + ' ' + set.species + '</h1>';
    buf += '<p class="author">Written by <a href="/forums/members/' + authorURL[1] + '/" target="_blank">' + authorURL[0] + '</a>';
    if (qcURL) buf += ' | Quality checked by <a href="/forums/members/' + qcURL[1] + '/" target="_blank">' + qcURL[0] + '</a>';
    if (gpURL) buf += ' | Grammar checked by <a href="/forums/members/' + gpURL[1] + '/" target="_blank">' + gpURL[0] + '</a>';
    buf += '</p></div>';
    // image handling
    buf += '<article><div class="img">';
    var gen = parseInt(formatid[3]);
    var genIdent = gen >= 6 || isNaN(gen) ? 'xy' : gen === 5 ? 'bw' : gen === 4 ? 'dp' : gen === 3 ? 'rs' : gen === 2 ? 'c' : 'rb';
    var suffix = gen > 4 || gen === 2 || isNaN(gen) ? 'gif' : 'png';
    var pkmnSprite = '/dex/media/sprites//' + genIdent + '/' + set.species.toLowerCase().replace(/\./g, '').replace(/ /g, '-') + '.' + suffix;
    buf += '<img class="img-pokemon" src="' + pkmnSprite + '" />';
    if (set.item.includes('/')) set.item = set.item.split('/')[0].trim();
    var itemSprite = '/forums//media/minisprites/' + set.item.toLowerCase().replace(/ /g, '-') + '.png';
    buf += '<img class="img-item" src="' + itemSprite + '" /></div>';
    buf += '<pre>' + $("#set").text().trim().replace(/\n/g, '<br />');
    buf += '<div id="description"><br />' + description + '</div></pre>';
    buf += '</article>';
    $('title').html("Social Media Spotlight: " + json.formatName + ' ' + json.setName + ' ' + set.species);
    $("#spotlight").html(buf);
});
