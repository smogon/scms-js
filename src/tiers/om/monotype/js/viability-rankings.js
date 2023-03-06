var vRanksText = {
    s: "These Pokemon define the type and heavily influence the metagame.",
    a: "These Pokemon fill important roles on a Monotype team, but do not influence the type as much as S ranks.",
    b: "These Pokemon fill specific roles on a Monotype team and are sometimes outclassed by Pokemon from higher ranks.",
    c: "These Pokemon fulfill niche roles on their types and are often outclassed by Pokemon from higher ranks",
    d: "These Pokemon are solely used for a particular move or ability and are almost always outclassed by Pokemon from higher ranks.",
}

var vRanksBackup = {
    "bug":{
        "s":['volcarona', 'armaldo', 'pinsir-mega', 'scizor'],
        "a":['galvantula', 'heracross', 'shuckle',  'scizor-mega', 'forretress', 'heracross-mega'],
        "b":['yanmega','scolipede', 'vivillon', ],
        "c":['beedrill-mega'],
        "d":['volbeat', 'accelgor','crustle']
    },
    "dark":{
        "s":['sableye-mega', 'mandibuzz','hoopa-unbound','tyranitar', 'bisharp'],
        "a":['hydreigon', 'crawdaunt', 'sharpedo-mega', 'tyranitar-mega', 'weavile'],
        "b":['krookodile', 'houndoom-mega', 'sableye'],
        "c":['honchkrow','absol-mega', 'zoroark', 'umbreon', 'sharpedo','cacturne'],
        "d":['drapion','spiritomb','scrafty']
    },
    "dragon":{
        "s":['dragonite', 'latios', 'kyurem-black', 'garchomp'],
        "a":['latias', 'latias-mega', 'hydreigon'],
        "b":['dragalge', 'garchomp-mega'],
        "c":['goodra', 'zygarde', 'haxorus', 'salamence', 'tyrantrum'],
        "d":['kingdra', 'druddigon', 'noivern']
    },
    "electric":{
        "s":['thundurus', 'zapdos', 'rotom-wash'],
        "a":['magnezone', 'manectric-mega', 'eelektross', 'raikou', 'ampharos-mega'],
        "b":['electivire', 'luxray'],
        "c":['thundurus-therian'],
        "d":['galvantula']
    },
    "fairy":{
        "s":['clefable', 'diancie-mega', 'azumarill','klefki'],
        "a":['gardevoir', 'togekiss', 'gardevoir-mega'],
        "b":['whimsicott', 'slurpuff', 'sylveon'],
        "c":['florges','diancie'],
        "d":['granbull','aromatisse','carbink']
    },
    "fighting":{
        "s":['keldeo', 'terrakion', 'medicham-mega', 'gallade-mega'],
        "a":['breloom', 'cobalion', 'heracross', 'infernape' ],
        "b":['conkeldurr','hawlucha', 'lucario'],
        "c":['scrafty', 'chesnaught', 'heracross-mega', 'pangoro'],
        "d":['hitmontop', 'mienshao', 'toxicroak', 'machamp', 'virizion']
    },
    "fire":{
        "s":['charizard-mega-y'],
        "a":['darmanitan', 'entei', 'torkoal', 'victini', 'infernape', 'heatran', 'volcarona','rotom-heat',],
        "b":['volcanion', 'chandelure', 'fletchinder'],
        "c":['arcanine', 'houndoom-mega', 'ninetales'],
        "d":['camerupt-mega']
    },
    "flying":{
        "s":['skarmory', 'zapdos', 'landorus', 'gyarados-mega'],
        "a":['charizard-mega-y', 'thundurus', 'landorus-therian','togekiss', 'thundurus-therian', 'dragonite', 'tornadus-therian'],
        "b":['mandibuzz', 'gyarados', 'aerodactyl'],
        "c":['articuno', 'hawlucha', 'honchkrow','pidgeot-mega','salamence','staraptor','aerodactyl-mega'],
        "d":['sigilyph', 'xatu']
    },
    "ghost":{
        "s":['gengar', 'sableye-mega'],
        "a":['chandelure', 'jellicent', 'golurk'],
        "b":['doublade', 'gourgeist-super', 'hoopa'],
        "c":['trevenant', 'shedinja', 'rotom'],
        "d":['cofagrigus', 'banette-mega', 'misdreavus']
    },
    "grass":{
        "s":['venusaur-mega', 'ferrothorn'],
        "a":['breloom', 'serperior', 'cradily', 'whimsicott'],
        "b":['celebi', 'rotom-mow','gourgeist'],
        "c":['ludicolo','roserade','sceptile-mega','shiftry'],
        "d":['leavanny','abomasnow','tangrowth','chesnaught']
    },
    "ground":{
        "s":['excadrill','landorus', 'hippowdon'],
        "a":['mamoswine', 'garchomp', 'gastrodon','camerupt-mega','garchomp-mega','seismitoad'],
        "b":['gliscor', 'landorus-therian', 'krookodile'],
        "c":['quagsire', 'nidoking', 'steelix-mega'],
        "d":['nidoqueen', 'dugtrio', 'rhyperior', 'swampert-mega', 'golem']
    },
    "ice":{
        "s":['kyurem-black', 'avalugg', 'mamoswine'],
        "a":['weavile', 'piloswine', 'cloyster'],
        "b":['articuno', 'abomasnow-mega', 'rotom-frost', 'froslass', 'lapras', 'walrein'],
        "c":['glalie-mega', 'cryogonal'],
        "d":['jynx','regice','aurorus']
    },
    "normal":{
        "s":['chansey', 'staraptor', 'porygon2'],
        "a":['diggersby', 'meloetta', 'lopunny-mega', 'pidgeot-mega'],
        "b":['miltank', 'ditto', 'heliolisk', 'porygonz', 'audino-mega', 'snorlax'],
        "c":['smeargle', 'exploud'],
        "d":['blissey', 'cinccino', 'furfrou', 'kecleon', 'pyroar', 'slaking']
    },
    "poison":{
        "s":['venusaur-mega', 'gengar', 'scolipede'],
        "a":['crobat', 'skuntank', 'drapion', 'nidoqueen', 'nidoking'],
        "b":['golbat', 'dragalge', 'beedrill-mega', 'tentacruel'],
        "c":['toxicroak', 'weezing','amoonguss','roserade'],
        "d":['qwilfish',]
    },
    "psychic":{
        "s":['gardevoir-mega', 'mew', 'victini', 'slowbro', 'hoopa-unbound'],
        "a":['gardevoir','meloetta', 'latios', 'gallade-mega', 'medicham-mega'],
        "b":['azelf', 'deoxys-speed', 'alakazam-mega','alakazam','latias-mega','latias', 'starmie','jirachi', 'gothitelle'],
        "c":['uxie','cresselia','celebi','deoxys-defense','metagross','gallade'],
        "d":['reuniclus','sigilyph','bronzong','wobbuffet','espeon','malamar','delphox']
    },
    "rock":{
        "s":['terrakion', 'aggron-mega', 'tyranitar', 'diancie-mega'],
        "a":['cradily', 'omastar', 'shuckle'],
        "b":['aerodactyl-mega', 'diancie', 'rhyperior', 'tyrantrum'],
        "c":['tyranitar-mega', 'aerodactyl'],
        "d":['archeops', 'aurorus', 'golem', 'armaldo', 'kabutops', 'crustle']
    },
    "steel":{
        "s":['heatran', 'skarmory', 'scizor-mega'],
        "a":['doublade', 'excadrill', 'ferrothorn', 'bisharp', 'magnezone'],
        "b":['jirachi', 'empoleon', 'durant', 'klefki'],
        "c":['lucario','cobalion','scizor','bronzong'],
        "d":['forretress', 'magneton', 'steelix-mega','metagross','registeel']
    },
    "water":{
        "s":['keldeo', 'azumarill', 'manaphy'],
        "a":['alomomola', 'cloyster', 'empoleon', 'lanturn', 'gyarados-mega', 'sharpedo-mega', 'starmie', 'swampert', 'gyarados', 'volcanion'],
        "b":['politoed', 'feraligatr', 'suicune', 'tentacruel','swampert-mega','quagsire','kingdra','slowbro','kabutops'],
        "c":['sharpedo','crawdaunt','ludicolo'],
        "d":['jellicent','blastoise-mega','vaporeon','mantine','seismitoad','gastrodon']
    }
}