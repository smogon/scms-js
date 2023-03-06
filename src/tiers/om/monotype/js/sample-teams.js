var teamDatabase = {
	"bug":["ft-firnen-websHO.txt","ft-sabella-offense.txt"],
	"dark":["ft-deg-balance.txt", "ft-joz-offense.txt"],
	"dragon":["ft-cc-offense.txt", "ft-stun-jack-of-blades.txt"],
	"electric":["ft-psm-balance.txt", "ft-tylacto-chilled-bolts.txt","ft-peng-mega-amphy.txt"],
	"fairy":["ft-arifeen-polaris.txt", "ft-edwins-trick-room.txt", "stun-titanium.txt"],
	"fighting":["ft-rimz-dojo-destroyers.txt","ft-gentleman-tech-showout-mHera.txt", "ft-wanka-offense.txt"],
	"fire":["ft-chleg-shame-in-flames.txt", "ft-zarif-offense.txt", "ft-kgbanter-dual-screens.txt"],
	"flying":["ft-arifeen-dissident.txt", "ft-sabella-drifting.txt", "ft-scpinion-I-Fixed-My-Internet.txt"],
	"ghost":["ft-acast-balance.txt"],
	"grass":["ft-juleo-ultimate-leaves.txt", "ft-arkenciel-balance.txt", "ft-thimo-offense.txt","ccat-sceptile-mega.txt"],
	"ground":["ft-barian-balance.txt", "ft-stun-legacy.txt", "ft-wanka-who-needs-sand.txt","ccat-zygarde.txt"],
	"ice":["ft-average-fella-north-wind.txt", "alexis-breeze-ice-ice-baby.txt", "ft-broccol1-aurorus-ice.txt", "ft-stun-offense.txt"],
	"normal":["ft-ivid-balance.txt", "ft-wanka-crooked-smile.txt", "symphonii-prestige.txt"],
	"poison":["ft-stun-drops-of-mercury.txt","ccat-plasmanta.txt"],
	"psychic":["ft-confluxx-balance.txt", "ft-demonic-ferro-generic-psy.txt", "ft-twix-offense.txt","ccat-alakazam-mega.txt"],
	"rock":["ft-bitana-balance.txt", "ft-chleg-offense.txt", "ft-sirskit-rock-your-socks.txt"],
	"steel":["ft-barian-balance.txt", "ft-scpinion-offense.txt","ccat-kitsunoh.txt","ccat-bronzong-dpp.txt"],
	"water":["ft-thimo-the-wall.txt","ft-eien-double-mega-ss.txt", "ft-scpinion-funbro.txt", "ft-wanka-balance.txt", "ft-lycan-its-calm.txt","ccat-slowking.txt"],
	
}

// ps functions
var importTeam = function (text) {
	//var text = text.split("\n");
	var team = [];
	var curSet = null;
    
	for (var i = 0; i < text.length; i++) {
		var line = $.trim(text[i]);
		if (line === '' || line === '---') {
			curSet = null;
		} else if (line.substr(0, 3) === '===') {
			team = [];
			line = $.trim(line.substr(3, line.length - 6));
			var format = '';
			var bracketIndex = line.indexOf(']');
			if (bracketIndex >= 0) {
				format = line.substr(1, bracketIndex - 1);
				line = $.trim(line.substr(bracketIndex + 1));
			}
		} else if (!curSet) {
			curSet = {name: '', species: '', gender: ''};
			team.push(curSet);
			var atIndex = line.lastIndexOf(' @ ');
			if (atIndex !== -1) {
				curSet.item = line.substr(atIndex + 3);
				if (toId(curSet.item) === 'noitem') curSet.item = '';
				line = line.substr(0, atIndex);
			}
			if (line.substr(line.length - 4) === ' (M)') {
				curSet.gender = 'M';
				line = line.substr(0, line.length - 4);
			}
			if (line.substr(line.length - 4) === ' (F)') {
				curSet.gender = 'F';
				line = line.substr(0, line.length - 4);
			}
			var parenIndex = line.lastIndexOf(' (');
			if (line.substr(line.length - 1) === ')' && parenIndex !== -1) {
				line = line.substr(0, line.length - 1);
				curSet.species = getTemplate(line.substr(parenIndex + 2)).name;
				line = line.substr(0, parenIndex);
				curSet.name = line;
			} else {
				curSet.species = getTemplate(line).name;
				curSet.name = curSet.species;
			}
		} else if (line.substr(0, 7) === 'Trait: ') {
			line = line.substr(7);
			curSet.ability = line;
		} else if (line.substr(0, 9) === 'Ability: ') {
			line = line.substr(9);
			curSet.ability = line;
		} else if (line === 'Shiny: Yes') {
			curSet.shiny = true;
		} else if (line.substr(0, 7) === 'Level: ') {
			line = line.substr(7);
			curSet.level = +line;
		} else if (line.substr(0, 11) === 'Happiness: ') {
			line = line.substr(11);
			curSet.happiness = +line;
		} else if (line.substr(0, 9) === 'Ability: ') {
			line = line.substr(9);
			curSet.ability = line;
		} else if (line.substr(0, 5) === 'EVs: ') {
			line = line.substr(5);
			var evLines = line.split('/');
			curSet.evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			for (var j = 0; j < evLines.length; j++) {
				var evLine = $.trim(evLines[j]);
				var spaceIndex = evLine.indexOf(' ');
				if (spaceIndex === -1) continue;
				var statid = BattleStatIDs[evLine.substr(spaceIndex + 1)];
				var statval = parseInt(evLine.substr(0, spaceIndex));
				if (!statid) continue;
				curSet.evs[statid] = statval;
			}
		} else if (line.substr(0, 5) === 'IVs: ') {
			line = line.substr(5);
			var ivLines = line.split(' / ');
			curSet.ivs = {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
			for (var j = 0; j < ivLines.length; j++) {
				var ivLine = ivLines[j];
				var spaceIndex = ivLine.indexOf(' ');
				if (spaceIndex === -1) continue;
				var statid = BattleStatIDs[ivLine.substr(spaceIndex + 1)];
				var statval = parseInt(ivLine.substr(0, spaceIndex));
				if (!statid) continue;
				if (isNaN(statval)) statval = 31;
				curSet.ivs[statid] = statval;
			}
		} else if (line.match(/^[A-Za-z]+ (N|n)ature/)) {
			var natureIndex = line.indexOf(' Nature');
			if (natureIndex === -1) natureIndex = line.indexOf(' nature');
			if (natureIndex === -1) continue;
			line = line.substr(0, natureIndex);
			if (line !== 'undefined') curSet.nature = line;
		} else if (line.substr(0, 1) === '-' || line.substr(0, 1) === '~') {
			line = line.substr(1);
			if (line.substr(0, 1) === ' ') line = line.substr(1);
			if (!curSet.moves) curSet.moves = [];
			if (line.substr(0, 14) === 'Hidden Power [') {
				var hptype = line.substr(14, line.length - 15);
				line = 'Hidden Power ' + hptype;
				if (!curSet.ivs && window.BattleTypeChart) {
					curSet.ivs = {};
					for (var stat in window.BattleTypeChart[hptype].HPivs) {
						curSet.ivs[stat] = window.BattleTypeChart[hptype].HPivs[stat];
					}
				}
			}
			if (line === 'Frustration') {
				curSet.happiness = 0;
			}
			curSet.moves.push(line);
		}
	}
	return team;
};

var exportTeam = function (team) {
	if (!team) return "";
	var sets = [];
	var text = '';
	var setText = '';
	for (var i = 0; i < team.length; i++) {
	    setText = '';
		var curSet = team[i];
		if (curSet.name !== curSet.species) {
			setText += '' + curSet.name + ' (' + curSet.species + ')';
		} else {
			setText += '' + curSet.species;
		}
		if (curSet.gender === 'M') text += ' (M)';
		if (curSet.gender === 'F') text += ' (F)';
		if (curSet.item) {
			setText += ' @ ' + curSet.item;
		}
		setText += "\n";
		if (curSet.ability) {
			setText += 'Ability: ' + curSet.ability + "\n";
		}
		if (curSet.level && curSet.level != 100) {
			setText += 'Level: ' + curSet.level + "\n";
		}
		if (curSet.shiny) {
			setText += 'Shiny: Yes\n';
		}
		if (typeof curSet.happiness === 'number' && curSet.happiness !== 255 && !isNaN(curSet.happiness)) {
			setText += 'Happiness: ' + curSet.happiness + "\n";
		}
		var first = true;
		if (curSet.evs) {
			for (var j in BattleStatNames) {
				if (!curSet.evs[j]) continue;
				if (first) {
					setText += 'EVs: ';
					first = false;
				} else {
					setText += ' / ';
				}
				setText += '' + curSet.evs[j] + ' ' + BattleStatNames[j];
			}
		}
		if (!first) {
			setText += "\n";
		}
		if (curSet.nature) {
			setText += '' + curSet.nature + ' Nature' + "\n";
		}
		var first = true;
		if (curSet.ivs) {
			var defaultIvs = true;
			var hpType = false;
			for (var j = 0; j < curSet.moves.length; j++) {
				var move = curSet.moves[j];
				// if (move.substr(0, 13) === 'Hidden Power ' && move.substr(0, 14) !== 'Hidden Power [') {
// 					hpType = move.substr(13);
// 					if (!exports.BattleTypeChart[hpType].HPivs) {
// 						alert("That is not a valid Hidden Power type.");
// 						continue;
// 					}
// 					for (var stat in BattleStatNames) {
// 						if ((curSet.ivs[stat] === undefined ? 31 : curSet.ivs[stat]) !== (exports.BattleTypeChart[hpType].HPivs[stat] || 31)) {
// 							defaultIvs = false;
// 							break;
// 						}
// 					}
// 				}
			}
			if (defaultIvs && !hpType) {
				for (var stat in BattleStatNames) {
					if (curSet.ivs[stat] !== 31 && typeof curSet.ivs[stat] !== undefined) {
						defaultIvs = false;
						break;
					}
				}
			}
			if (!defaultIvs) {
				for (var stat in BattleStatNames) {
					if (typeof curSet.ivs[stat] === 'undefined' || isNaN(curSet.ivs[stat]) || curSet.ivs[stat] == 31) continue;
					if (first) {
						setText += 'IVs: ';
						first = false;
					} else {
						setText += ' / ';
					}
					setText += '' + curSet.ivs[stat] + ' ' + BattleStatNames[stat];
				}
			}
		}
		if (!first) {
			setText += "\n";
		}
		if (curSet.moves && curSet.moves) for (var j = 0; j < curSet.moves.length; j++) {
			var move = curSet.moves[j];
			if (move.substr(0, 13) === 'Hidden Power ') {
				move = move.substr(0, 13) + '[' + move.substr(13) + ']';
			}
			setText += '- ' + move + "\n";
		}
		setText += "\n";
		sets[i] = setText;
		text += setText;
	}
	return sets;
};

var getTemplate = function (template) {
    if (!template || typeof template === 'string') {
        var name = template;
        var id = toId(name);
        if (!id) name = '';
        if (! pokedex)  pokedex = {};
        if (! pokedex[id]) {
            template =  pokedex[id] = {};
            for (var k in baseSpeciesChart) {
                if (id.length > k.length && id.substr(0, k.length) === k) {
                    template.baseSpecies = k;
                    template.forme = id.substr(k.length);
                }
            }
            if (id !== 'yanmega' && id.substr(id.length - 4) === 'mega') {
                template.baseSpecies = id.substr(0, id.length - 4);
                template.forme = id.substr(id.length - 4);
            } else if (id.substr(id.length - 6) === 'primal') {
                template.baseSpecies = id.substr(0, id.length - 6);
                template.forme = id.substr(id.length - 6);
            }
            template.exists = false;
        }
        template =  pokedex[id];
        if (template.species) name = template.species;
        if (template.exists === undefined) template.exists = true;
        if (!template.id) template.id = id;
        if (!template.name) template.name = name;
        if (!template.speciesid) template.speciesid = id;
        if (!template.species) template.species = name;
        if (!template.baseSpecies) template.baseSpecies = name;
        if (!template.forme) template.forme = '';
        if (!template.formeLetter) template.formeLetter = '';
        if (!template.formeid) {
            var formeid = '';
            if (template.baseSpecies !== name) {
                formeid = '-' + toId(template.forme);
                if (formeid === '-megax') formeid = '-mega-x';
                if (formeid === '-megay') formeid = '-mega-y';
            }
            template.formeid = formeid;
        }
        if (!template.spriteid) template.spriteid = toId(template.baseSpecies) + template.formeid;
        if (!template.effectType) template.effectType = 'Template';
    }
    return template;
}

// copy to clipboard
function copyToClipboardMsg(elem, msgElem) {
	  var succeed = copyToClipboard(elem);
    var msg;
    if (!succeed) {
        msg = "Copy not supported or blocked.  Press Ctrl+c to copy."
    } else {
        msg = "Text copied to the clipboard."
    }
    if (typeof msgElem === "string") {
        msgElem = document.getElementById(msgElem);
    }
    msgElem.innerHTML = msg;
    setTimeout(function() {
        msgElem.innerHTML = "";
    }, 2000);
}

function copyToClipboard(elem) {
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        //currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

var baseSpeciesChart = {
	'unown': 1,
	'castform': 1,
	'deoxys': 1,
	'burmy': 1,
	'wormadam': 1,
	'cherrim': 1,
	'shellos': 1,
	'gastrodon': 1,
	'rotom': 1,
	'giratina': 1,
	'arceus': 1,
	'shaymin': 1,
	'basculin': 1,
	'darmanitan': 1,
	'deerling': 1,
	'sawsbuck': 1,
	'meloetta': 1,
	'genesect': 1,
	'tornadus': 1,
	'thundurus': 1,
	'landorus': 1,
	'kyurem': 1,
	'keldeo': 1,
	'aegislash': 1,
	'gourgeist': 1,
	'pumpkaboo': 1,
	'meowstic': 1,
	'hoopa': 1,

	// mega evolutions
	'charizard': 1,
	'mewtwo': 1
	// others are hardcoded by ending with 'mega'
};

var BattleStatNames = { // proper style
	hp: 'HP',
	atk: 'Atk',
	def: 'Def',
	spa: 'SpA',
	spd: 'SpD',
	spe: 'Spe'
};

var BattleStatIDs = {
	HP: 'hp',
	hp: 'hp',
	Atk: 'atk',
	atk: 'atk',
	Def: 'def',
	def: 'def',
	SpA: 'spa',
	SAtk: 'spa',
	SpAtk: 'spa',
	spa: 'spa',
	SpD: 'spd',
	SDef: 'spd',
	SpDef: 'spd',
	spd: 'spd',
	Spe: 'spe',
	Spd: 'spe',
	spe: 'spe'
};
