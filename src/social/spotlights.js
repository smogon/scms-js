function toID(text) {
    text = (typeof text === 'string' || typeof text === 'number') ?
        text : text && text.id ? text.id : '';
    return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

// A sprite file's name: the forum's and the dex's are the lowercased name
// with spaces as dashes and nothing else.
function spriteName(text) {
    return ('' + text).toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
}

// Every value here is the author's: it goes into the page as text or as an
// attribute value, never parsed as html.
function el(tag, attrs, children) {
    var node = document.createElement(tag);
    for (var key in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, key)) node.setAttribute(key, attrs[key]);
    }
    for (var i = 0; i < children.length; i++) {
        node.appendChild(typeof children[i] === 'string' ? document.createTextNode(children[i]) : children[i]);
    }
    return node;
}

function member(pair, role) {
    return [' | ' + role + ' by ',
            el('a', {href: '/forums/members/' + encodeURIComponent(String(pair[1])) + '/', target: '_blank'}, [String(pair[0])])];
}

$(document).ready(function () {
    $('#spotlightFiller').hide();
    var json = window.scmsJSON;
    var formatid = toID(json.formatName);
    var obj = pkmn.sets.Teams.importTeam($("#set").text());
    obj.format = formatid;
    var set = obj.team[0];

    var title = json.formatName + ' Set Spotlight: ' + json.setName + ' ' + set.species;
    var h1 = el('h1', {style: 'font-size:x-large;display: inline-block;'}, [title]);
    h1.style.background = "url('/forums//media/minisprites/" + spriteName(set.species.replace(/\./g, '')) + ".png') no-repeat left";

    var author = el('p', {'class': 'author'}, ['Written by ',
        el('a', {href: '/forums/members/' + encodeURIComponent(String(json.authorURL[1])) + '/', target: '_blank'}, [String(json.authorURL[0])])]);
    if (json.qcURL) member(json.qcURL, 'Quality checked').forEach(function (n) { author.appendChild(typeof n === 'string' ? document.createTextNode(n) : n); });
    if (json.gpURL) member(json.gpURL, 'Grammar checked').forEach(function (n) { author.appendChild(typeof n === 'string' ? document.createTextNode(n) : n); });

    var gen = parseInt(formatid[3]);
    var genIdent = gen >= 6 || isNaN(gen) ? 'xy' : gen === 5 ? 'bw' : gen === 4 ? 'dp' : gen === 3 ? 'rs' : gen === 2 ? 'c' : 'rb';
    var suffix = gen > 4 || gen === 2 || isNaN(gen) ? 'gif' : 'png';
    var pkmnSprite = '/dex/media/sprites//' + genIdent + '/' + spriteName(set.species.replace(/\./g, '')) + '.' + suffix;
    if (!set.item) set.item = "No Item";
    if (set.item.includes('/')) set.item = set.item.split('/')[0].trim();
    var itemSprite = '/forums//media/minisprites/' + spriteName(set.item) + '.png';

    var description = el('div', {id: 'description'}, [el('br', {}, []), String(json.description)]);
    if (json.replayLine && json.replayURL) {
        var replay = String(json.replayURL);
        if (/^(https?:)?\/\//i.test(replay) || replay.charAt(0) === '/') {
            description.appendChild(el('br', {}, []));
            description.appendChild(el('br', {}, []));
            description.appendChild(el('a', {href: replay, target: '_blank'}, [String(json.replayLine)]));
        }
    }

    var article = el('article', {}, [
        el('div', {'class': 'img'}, [
            el('img', {'class': 'img-pokemon', src: pkmnSprite}, []),
            el('img', {'class': 'img-item', src: itemSprite}, [])]),
        el('pre', {}, [pkmn.sets.Sets.exportSet(set), description])]);

    document.title = "Social Media Spotlight: " + title;
    var spotlight = document.getElementById('spotlight');
    spotlight.textContent = '';
    spotlight.appendChild(el('div', {'class': 'header'}, [h1, author]));
    spotlight.appendChild(article);
});
