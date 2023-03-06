function buildSortingDex(questions) {
    if (!questions) questions = [];

    var page = '';
    for (var i = 0; i < questions.length; i++) {
        var next = questions[i];
        page += '<div class="question" id="' + i + '">';
        page += '<h2>' + next.q + '</h2>'; // question
        // alternatives
        page += '<input class="alternative" type="button" value="Strongly Agree" data-weight="+2" />';
        page += '<input class="alternative" type="button" value="Agree" data-weight="+1" />';
        if (!questions[i].skipu) page += '<input class="alternative" type="button" value="Uncertain" data-weight="0" />';
        page += '<input class="alternative" type="button" value="Disagree" data-weight="-1" />';
        page += '<input class="alternative" type="button" value="Strongly Disagree" data-weight="-2" />';
        page += '</div>';
    }
    return page;
}

function getDexResult(weights, tiebreakers = {n:0, r:0, v:0}) {
    var result = '', html = '<div class="img-center">', even;
    if (weights.n > weights.c || (weights.n === weights.c && tiebreakers.n > 0)) {
        html += '<img src="images/n.png" alt="N" />'; result += 'n';
    } else {
        html += '<img src="images/c.png" alt="C" />'; result += 'c';
    }
    if (weights.r > weights.p || (weights.r === weights.p && tiebreakers.r > 0)) {
        html += '<img src="images/r.png" alt="R" />'; result += 'r';
    } else {
        html += '<img src="images/p.png" alt="P" />'; result += 'p';
    }
    if (weights.v > weights.x || (weights.v === weights.x && tiebreakers.v > 0)) {
        html += '<img src="images/v.png" alt="V" />'; result += 'v';
    } else {
        html += '<img src="images/x.png" alt="X" />'; result += 'x';
    }
    html += '</div>';
    switch (result) {
        case 'crx': html += '<p>You play this game with a calculated game plan; you operate on reaction; and you trust safe options on your team.</p><p>You are the ultimate defensive and "hard-to-beat" player. You value getting the win above all else, it matters not whether you have to go through a 300 turn stall fest. You consider the "Standard" and "Meta" to be the most reliable, and you seldom deviate from the plays or Mons that give you the highest chances of winning. You think very hard and cover a lot of ground with your mid-ground plays and solid teams, making an embarrassing loss a rare occasion. Your lucky item is <strong>Eviolite</strong>.</p>';
        break;
        case 'crv': html += '<p>You play this game with a calculated game plan; you operate on reaction; and you believe in being different in your team choice.</p><p>You use your reliability like bait; your opponents will always know what to expect yet they can nevertheless never beat it, perhaps your "safe"-ness isn\'t what it really is. You prefer to think long term, set traps (even as far back as in teambuilding), and let your opponents play themselves into a disadvantage. You are the ultimate tactician, being both predictable and unpredictable meaning that you are near impossible to outplay. Your lucky item is <strong>Assault Vest</strong>.</p>';
        break;
        case 'cpx': html += '<p>You play this game with a calculated game plan; you operate on aggression; and you trust safe options on your team.<p/><p>You are a player who knows your risk and reward excellently. You take calculated risks but walk within the fine lines of convention. You are first and foremost a thinker, you plan things out very well and that makes the combination of a solid, standard team alongside your aggression such a consistently potent threat to face. Your lucky item is <strong>Choice Scarf</strong>.</p>';
        break;
        case 'cpv': html += '<p>You play this game with a calculated game plan; you operate on aggression; and you believe in being different in your team choice.</p><p>You are innovative both in the way you build and the way you play. You are at your best when your creativity is unshackled, when your unpredictable plays and teams combine for Whoos and Wows from the crowd. You are the line between safe and risky - your versatility keeps your opponent guessing. You are the ultimate "good" Pok&eacute;mon player type because there is no countering either your style or your team. Your lucky item is <strong>Z-Crystal</strong>.</p>';
        break;
        case 'nrx': html += '<p>You play this game with your heart and your instinct; you operate on reaction; and you trust safe options on your team.</p><p>You are considered a rather "safe" and consistent player but you know what plays you are capable of making. Momentum is automatic once you gain it, just like in Volturn. You prefer to let your opponent be the aggressors while playing off them because you believe in the superiority of you skill and/or teambuilding. You don\'t plan things out that much because the game very much depends on how your opponent plays, so being versatile and flexible is the best game plan. Your lucky item is <strong>Rocky Helmet</strong>.</p>';
        break;
        case 'nrv': html += '<p>You play this game with your heart and your instinct; you operate on reaction; and you believe in being different in your team choice.</p><p>You are an enigma. Who knows what your next play will be or what weird looking team you are going to bring, but somehow even the weirdest looking stuff can be played to counter standard meta in your capable hands. You are very good at making reads, which is the reason you utilize the unorthodox approach to your advantage: because how good everything is is purely relative. You believe in your plays and your techs every game. Your lucky item is Expert Belt</strong>.</p>';
        break;
        case 'npx': html += '<p>You play this game with your heart and your instinct; you operate on aggression; and you trust safe options on your team.</p><p>You are a player who aims to and enjoys outplaying your opponents. You take pride in the fact that you can have a mirror match-up and still win. That is the reason why you value hazards, so you get\'em up ASAP. You are bold, risky, but the rewards of your plays can often pay off. However, you believe that the basis of your plays is a solid team that you can fall back on. Your lucky item is Focus Sash</strong>.</p>';
        break;
        case 'npv': html += '<p>You play this game with your heart and your instinct; you operate on aggression; and you believe in being different in your team choice.</p><p>You are the ultimate offensive player. You love to stunt on your opponents with various types of Pok&eacute;mon, regardless of convention. You consider the "Standard" and "Meta" to be boring and predictable, and you often even consider it inferior. You believe in having fun in this game, and nothing pleases you more than when your plays and niche teams hit. Your lucky item is Life Orb</strong>.</p>';
        break;
    }
    if (weights.e > weights.o) {
        html += '<div class="img-center"><img src="images/e.png" alt="Even" /></div><p>Your sign is <strong>Even</strong>. You are logical but you believe luck is more than just probability. Your sign reveals the faith in yourself to overcome the inevitabilities of "the game".</p>';
    } else {
        html += '<div class="img-center"><img src="images/o.png" alt="Odd" /></div><p>Your sign is <strong>Odd</strong>. You trust math and logic, but you also trust your luck. Your sign reveals the resolve you have in the universe and in "the game".</p>';
    }
    return html;
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}

function buildHouseQuestions(questions) {
    if (!questions) questions = [];

    var page = '';
    for (var i = 0; i < questions.length; i++) {
        var next = questions[i];
        page += '<div class="question" id="' + i + '">';
        page += '<h2>' + next.q + '</h2>'; // question
        // alternatives
        for (var alternative in next.a) {
            page += '<input class="alternative" type="button" value="' + escapeHtml(alternative) +'" data-house="' + next.a[alternative] + '" />';
        }
        page += '</div>';
    }
    return page;
}

function getHouseResult(weights) {
    var max, house;
    for (var w in weights) {
        if (weights.hasOwnProperty(w)) {
            if (!max) {
                max = weights[w];
                house = w;
            } else if (weights[w] > max) {
                max = weights[w];
                house = w;
            }
        }
    }
    console.log(house);
    return getHouseHtml(house);
}

function getHouseHtml(house) {
    var houseHtml = '';
    switch (house) {
    case 'a':
    houseHtml = '<img src="images/abra-large.png" alt="Abraccus House" /><h2 class="pink-text house-name">Abraccus School for the Gifted</h2><p class="lore-text">After a long day of work, your shoulders sag with the weight of the world. Your mind is unable to rest, constantly turning and thinking of new and different possibilities and optimizations. Your eyes beg to close as weariness creeps into your skull, but your brain pushes back vehemently&mdash;now is not the time for rest, there is still more work to be done, there is still steps closer to perfection that can be taken.</p><p class="lore-text">The fire burns not in your heart but in your mind as you approach the dormitory. There is never an easy moment&emdash;the idea of leisure is anathema to you and your classmates, and even at home, in the school, you find yourself constantly looking for ways to refine your trade and technique.</p><p class="lore-text">You approach the modern-styled building with your mind fully alert. Through the glass doors there is an extensive hallway, leading to a laboratory. As you lay your bags down and open your devices you feel at ease&emdash;every tweaked stat, every combination thought of eases the mind as your next challenge approaches. Students around you are busy at work, more than eager to share their ideas, wanting to show their prescience and intellect. Despite the aura of competitiveness you feel at home&emdash;in your mind there is indeed a perfect match, a perfect play and a perfect team and you will reach it one day or another.</p><p>Welcome to Smogon University\'s very own <span class="pink-text">Abraccus School for the Gifted</span>. The school mascot is Alakazam, and the program\'s signature types are Psychic and Steel.</p><p>This modern and technologically advanced department is the brain of Smogon and represents its future; here we celebrate intelligence, creativity, patience, and above all, learning. We consider the intellectual aspect of Pok&eacute;mon to be central to its infrastructure. The thesis of this school is simple to grasp but hard to master&emdash;a cerebral view of one\'s own play is necessary to succeed in this academy. Understanding where mistakes are made and how to avoid them mathematically in the future is key to graduating with honors&emdash;without the ability to comprehend a misplay, you will have no chance of distinguishing yourself in this school.</p><p>The Abraccus School for the Gifted believes that the battle starts not when the challenge is issued, but when the team is created. Without an emphasis on any specific opponent, this school endorses the concept of the solid team&emdash;one the user feels confident wielding regardless of the circumstances, regardless of what the opponent happens to bring. This philosophy requires, above all, an intricate and time-tested knowledge of the given tier at hand&emdash;talent at battling takes backseat to hard work and thoughtfulness.</p><p>The institute\'s colors are <span class="pink-text">Pink</span> and <span class="grey-text">Metallic Grey</span>.</p><p>The Institute headmaster is <strong>Professor <a href="/forums/members/223276/" target="_blank">ABR</a></strong>.</p><p class="lore-text">Mind over didn\'t matter.</p><img src="images/abraccus.png" alt="Abraccus Crest" />';
    break;
    case 'v':
    houseHtml = '<img src="images/victorium-large.png" alt="Victorium House" /><h2 class="midnight-text house-name">Victorium Hall</h2><p class="lore-text">You lay in bed in a lonely room with nothing but your thoughts to keep you company. Tonight is like every night, visions of the past haunt you and rattle your mind. The loss sticks in your brain, the feeling never truly going away, and should you focus upon it for even a second, it as if it happened just now. You remember the jeers of the crowd, the laughs had at your expense and shudder. The very thought of that happening again tomorrow fills you with complete dread&emdash;a fire is lit from your heart to avoid this at all costs.</p><p class="lore-text">What is born from this torture is a relentless champion&emdash;one who is undeterred by anything in pursuit of everlasting victory. To you, there is no end to the art of combat. To you, every victory must be followed by another one. At no point do you feel comfortable in your skin, in your standing with others, but this has molded a man made of steel. When your competition views you fear coats their skeletons.</p><p class="lore-text">You walk down the hallway in the morning with the cheers from the crowd a distant echo. During this time you pass magnificent portraits of X and Y, hanging proudly. Newer players look to you in admiration, as if you are some sort of mythical figure, despite knowing yourself that you are still all too human, all too defined by what happens in your next match. To keep them in awe, to live up to the dreams of the masses&emdash;that is the responsibility shouldered only by champions!</p><p class="lore-text">You put on the face of a superstar and swing open the massive doors leading inside your hall. With glittering gold surrounding you, you look to the audience, cheering your name and begging for your victory. You will not let them down.</p><p>Welcome to Smogon University\'s very own <span class="midnight-text">Victorium Hall</span>. The establishment\'s mascot is Victini, and its signature types are Fire and Dark.<p>The assembly hall/trophy dungeon reflects Smogon\'s precious legacy and grandeur. Here we commemorate ambition, leadership, cunning, resourcefulness. Within these walls the names of champions will be preserved and celebrated for eternity; we applaud excellence and shun mediocrity.</p><p>To win at all costs is the desire of each member of this hall. Incomplete devotion to victory is the mark of a coward or a fraud, and should you display that, you deserve no place in this house. There are no circumstances in which one will not seek a win&emdash;there is no honor to be found in the game aside from a bolded name.</p><p>Favor and luck are cruel mistresses, but ones you beg to take you in. To win is to be validated, your existence is contingent upon victory itself. What drives you inside and outside any particular match is this thirst, this desire&emdash;without the want for win you are just another face in the crowd; but with this passion you can&emdash;and will&emdash;distinguish yourself above all others.</p><p>The institute\'s colors are <span class="orange-text">Orange</span> and <span class="midnight-text">Midnight</span>.</p><p>The hall\'s headmaster is <strong>Professor <a href="/forums/members/27854/" target="_blank">reyscarface</a></strong>.</p><p class="lore-text">History is for VictorSss.</p><img src="images/victorium.png" alt="Victorium Crest" />';
    break;
    case 'i':
    houseHtml = '<img src="images/dmater-large.png" alt="D\'Mater House" /><h2 class="crimson-text house-name">Institute D\'Mater</h2><p class="lore-text">Midnight is long gone as you continue to goof off with your buddies. There is an important exam, a match tomorrow that your opponent has sweated about for a week straight, yet you drink and laugh as if there isn\'t a care in the world.</p><p class="lore-text">While you love winning, the outcome of a given match or given moment isn\'t important. But what you are participating in&emdash;the fraternity, the friendship, the bonds and the shared experience&emdash;is. To play the game, to participate in combat in meaningless to you unless there are allies around to share in your victories and lament your defeats. Similarly, you feel as if you share one heart with those clinking their beers in the air with you. Brotherhood is the common theme for you all&emdash;while it would never be explicitly said, you feel at ease regardless of your results outside so long as they are there.</p><p class="lore-text">You awake the next morning hungover and out of shape. You\'re minute away from your challenge, yet this causes you no stress that aspirin won\'t fix. The challenge comes and goes, what happens hardly sticks in your mind so long as you have a funny moment that your brothers witnessed with you. You are just about always content with your actions&emdash;the fire that motivates you burns from the stomach and overrides careful consideration. Risk and reward are concepts for the fearful, and only you and your brothers know this.</p><p class="lore-text">As you slowly shuffle down the street you arrive at a mansion looking a little worse for wear, but the sight of it warms your heart in all situations. You pass through the picket fence with a smile on your face, ready to tell the team about another wild adventure.</p><p>Welcome to Smogon University\'s very own <span class="crimson-text">Institute D\'Mater</span>. The institute mascot is Kangaskhan, and the institute\'s signature types are Normal and Fighting.</p><p>This institute-fraternity is Smogon\'s social hub and commons grounds; here we cherish happiness, friendship, loyalty, and justice above all. We take pride in creating a family within our ecosystem because this game is founded on passion and companionship. Above all else, we prize loyalty&emdash;your position in the family should be considered more important than any outside obligation. This school is your home if you feel genuine pride when your brothers win, and partake in their pain when they lose. If you have had moments where you are more happy to see someone else win a trophy than win in your own tournament match, you will fit in here.</p><p>At the Institute we believe that talent, instinct and skill are the primary factors to success. Some are born with talent in this game and some simply aren\'t. We tend to surround ourselves with other strong players due to the desire to compete, and form lasting bonds through our shared success in the tournament scene. Creating a name, being a leader and inspiring others with legendary play is more important to members of the Institute than strictly winning&emdash;a fraud is still a fraud even if they have a trophy.</p><p>In the teambuilder, we prize ourselves on creativity and pushing the metagame to the highest level. New techniques are preferred over recycling standard weaponry. Winning a match due to a unique synergy or creative move is the highest honor, and is greatly prized over being able to competently win using tried and true methods.</p><p>The institute\'s colors are <span class="begie-text">Beige</span> and <span class="crimson-text">Crimson</span>.</p><p>The Institute headmaster is <strong>Professor <a href="/forums/members/164153/" target="_blank">CTC</a></strong>.</p><p class="lore-text">Together we flexxtand.</p><img src="images/dmater.png" alt="D\'Mater Crest" />';
    break;
    }
    return houseHtml;
}

// All this does is make it a bit prettier as the browser have already cached all images before they are used
// It does delay the page a short bit but it's not too bad.
var preloadedImages = []
function preloadImages(listOfImages) {
    for (var i = 0; i < listOfImages.length; i++) {
        var img = new Image();
        img.src = 'images/' + listOfImages[i];
        preloadedImages.push(img);
    }
}
