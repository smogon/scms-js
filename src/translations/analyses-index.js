/* /articles/articles-index.js
 * By Quite Quiet http://www.smogon.com/forums/members/196780/
 */

'use strict';

// Because IE support is fun, prototypes!
var PokemonRow = function(pokemon, tiers) {
    this.species = pokemon.species;
    this.hp = pokemon.baseStats.hp;
    this.atk = pokemon.baseStats.atk;
    this.def = pokemon.baseStats.def;
    this.spa = pokemon.baseStats.spa;
    this.spd = pokemon.baseStats.spd;
    this.spe = pokemon.baseStats.spe;
    this.abilities = pokemon.abilities;
    this.types = pokemon.types;
	this.tiers = tiers;
};

PokemonRow.prototype.getRowHtml = function() {
    var html = '<tr>';
    html += '<td><img src="/dex/media/sprites/xyicons/' + this.species.toLowerCase().replace(' ', '_') + '.png" alt="' + this.species + '"></td>';
    html += '<td class="pokeName">' + this.species + '</td><td>';
    html += this.types.map(function (type) {
        return '<li class="Type ' + type.toLowerCase() + '">' + type + '</li>';
    }).join('');
    html += '</td><td>';
    html += Object.values(this.abilities).map(function (name) {
        return '<a href="/dex/sm/abilities/' + name.toLowerCase().replace(' ', '_') + '" target="_blank">' + name + '</a>';
    }).join(' / ');
    html += '</td><td>' + this.hp + '</td>';
    html += '<td>' + this.atk + '</td>';
    html += '<td>' + this.def + '</td>';
    html += '<td>' + this.spa + '</td>';
    html += '<td>' + this.spd + '</td>';
    html += '<td>' + this.spe + '</td><td>';
    var species = this.species.replace(' ', '_').replace('.', '').toLowerCase();
    html += this.tiers.map(function (name) {
        return '<a href="' + name.toLowerCase() + '/' + species + '" target="_blank">' + name + '</a>';
    }).join(' / ');
    html += '</td></tr>';
    return html;
};

var AnalysisIndex = function (data, index) {
    this.analyses = [];
    var pokemonNames = Object.keys(index).sort();
    for (var i = 0; i < pokemonNames.length; i++) {
        this.analyses.push(new PokemonRow(data[pokemonNames[i]], index[pokemonNames[i]]));
    }
};

AnalysisIndex.prototype.buildDataIndex = function(indexData) {
    var indexTable = '';
    for (var i = 0; i < indexData.length; i++) {
        indexTable += indexData[i].getRowHtml();
    }
    return indexTable;
};

AnalysisIndex.prototype.buildIndex = function(data) {
    if (!data) data = this.analyses;
    $('#analysesIndex table').append(this.buildDataIndex(data));
}

AnalysisIndex.prototype.filterByTag = function(tag) {
    var articles = tag === 'All Tags' ? this.data : this.data.filter(function(article) { return article.tags.indexOf(tag) > -1; });
    this.buildIndex(articles);
};


$.get('/translations/pokedex-data.json', function(data) {
	$.get('index-data.json', function(index) {
		new AnalysisIndex(data, index).buildIndex();
	});
});

