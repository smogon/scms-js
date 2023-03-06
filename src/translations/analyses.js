function statBarColor(statValue) {
    function to_hex(c){return ("0" + c.toString(16)).substr(-2);}
    let cstat = Math.floor(Math.min(Math.max(statValue - 50, 0), 100) * 2.55)
    let r = to_hex(Math.min((255 - cstat) * 2, 255))
    let g = to_hex(Math.min(cstat * 2, 255))
    let b = to_hex(Math.floor(Math.min(Math.max(statValue - 140, 0), 60) * (255 / 60)))
    return '#' + r + g + b;
}

function getPokemonHtml(pokemonData) {
    var stats = {'hp':'HP','atk':'Attack','def':'Defense','spa':'Sp. Atk','spd':'Sp. Def','spe':'Speed'};
    var html = '';
    if (pokemonData.baseSpecies) {
        html += '<h2>' + pokemonData.species.substring(pokemonData.baseSpecies.length + 1) + '</h2>';
    }
    html += '<div class="pokemonSpriteSection"><div id="model" style="background-image:url(/dex/media/sprites/xy/' + pokemonData.species.toLowerCase().replace(' ', '_').replace('.', '') + '.gif);"></div></div>';
    html += '<div class="pokemonInfoSection"><table>';
    html += '<tr><th class="pokemonTypes">Types:</th><td><ul class="TypeList">';
    html += pokemonData.types.map(function (type) {
        return '<li class="Type ' + type.toLowerCase() + '">' + type + '</li>';
    }).join('');
    html += '</ul></td></tr><tr><th class="pokemonAbilities">Abilities:</th><td><ul class="abilitiesList">';
    html += Object.values(pokemonData.abilities).map(function(ability) {
        return '<li><a href="/dex/sm/abilities/' + ability.toLowerCase().replace(' ', '_') + '" target="_blank">' + ability + '</a></li>';
    }).join('');
    html += '</ul></td></tr></table></div>';
    html += '<div class="pokemonStatSection"><table>';
    for (var stat in pokemonData.baseStats) {
        var statValue = pokemonData.baseStats[stat];
        html += '<tr><th>' + stats[stat] + ':</th><td style="width:15%;">' + statValue + '</td><td style="width:70%;"><div class="pokemonStatBar" style="width: ' + (Math.max(Math.min(statValue * 2, 400), 18) / 400 * 100) + '%;background-color:' + statBarColor(statValue) + ';"></div></td></tr>';
    }
    html += '</table></div>';
    return html;
}

$(function(){
    //models and pokemon data
    $.get('/translations/pokedex-data.json', function (data) {
        var skipFormes = {'Busted':1,'Totem':1,'Busted-Totem':1,'Black':1,'White':1};
        var pokemonName = $('h1').text();
        var pokemonData = data[pokemonName.replace(/[^a-z0-9]/gi, '').toLowerCase()];

        var html = getPokemonHtml(pokemonData);
        for (var forme in pokemonData.otherFormes) {
            var pokemon = data[pokemonData.otherFormes[forme]];
            forme = pokemon.species.substring(pokemon.baseSpecies.length + 1);
            if (skipFormes[forme]) continue;
            html += getPokemonHtml(pokemon);
        }

        $('.pokemon-info').html(html);
    });

	//name linking
    $('.move-name').each(function(index, elem){
    	var name = elem.innerHTML;
    	if (!name) return;
    	elem.innerHTML=('<a href="/dex/sm/moves/' + name.toLowerCase().replace(' ', '_') + '" target="_blank">' + name + '</a>');
    });

	//ability linking
    $('.ability-name').each(function(index, elem){
    	var name = elem.innerHTML;
    	elem.innerHTML=('<a href="/dex/sm/abilities/' + name.toLowerCase().replace(' ', '_') + '" target="_blank">' + name + '</a>');
    });
    
    //item linking
    $('.item-name').each(function(index, elem){
    	var name = elem.innerHTML;
    	if (!name) return;
    	elem.innerHTML=('<img src="/dex/media/sprites/xyitems/' + name.toLowerCase().replace(' ', '_') + '.png" alt="' + name + '" />&nbsp;<a href="/dex/sm/items/' + name.toLowerCase().replace(' ', '_') + '" target="_blank">' + name + '</a>');
    });
    
    //nature hovertext
    $.get('/translations/nature-data.json', function (data) {
    $('.nature').each(function(el) {
        var html = "";
        var natureName = $(this).text();
        var natureData = data[natureName];
        
        var natureInfo = natureData.summary;
        
        html += '<span title="' + natureInfo + '">' + natureName + '</span>';
        
        $(this).html(html);
    });
    });
    
    $('.export-button').click(function(e) {
        var $parent = $(this).parent();
        if ($parent.find('.importable').length) {
            $parent.find('.importable').remove();
            return;
        }
        var importable = $('h1').text();
        var item = $parent.find('.item-name').first().text().trim();
        var evs = $parent.find('.ev').text();
        var nature = $parent.find('.nature').first().text();
        if (item) importable += ' @ ' + item;
        importable += '\nAbility: ' + $parent.find('.ability-name').text();
        if (evs) importable += '\nEVs: ' + $parent.find('.ev').text();
        if (nature) importable += '\n' + nature + ' Nature';
        $parent.find('tr > td > span.move-name:first-child').each(function () {
            importable += '\n- ' + $(this).text();
        });
        
        $parent.find('.set').append('<textarea class="importable" style="width:100%" rows="' + (importable.match(/\n/g).length + 1) + '"></textarea>');
        $parent.find('.importable').text(importable);
    });
});