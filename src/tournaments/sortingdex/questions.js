HouseQuestions = [
    {'q':'1. Which of the following is most impressionable from your early memory of Pok&eacute;mon','a':{'Evolving through trade':'i','Learning about EV\'s':'a','Shiny Hunting':'v'}},
    {'q':'2. If you were to reminisce the most fun place to play Pokemon, it would be','a':{'At home in bed':'v','On long car rides':'i','At school under the table':'a'}},
    {'q':'3. What type of figure describes you in the community','a':{'A vocal leader of discussion, people listen to what you have to say':'v','A neutral moderator who is good at managing relations':'i','A silent observer who, through a few words, get people thinking':'a'}},
    {'q':'4. Three Pok&eacute;balls are placed before you. Which would you open?','a':{'The glowing masterball in which you can hear heavy breathing, and is violently shaking':'v','The very still ultraball labeled "lvl 100____ EV trained for Professor ___", upon which some text are smudged':'a','The slightly budging pokéball within which you can almost hear the squeaking of your childhood starter':'i'}},
    {'q':'5. Your opponent DC\'s in an important tour game, what\'s your first reaction','a':{'Take the win':'v','Allow him to recreate':'i','Wait for TDs to decide':'a'}},
    {'q':'6. When catching Pok&eacute;mon for your ingame roster, you refuse to use Pok&eacute;mon who have bad','a':{'Aesthetics':'i','Base Stats':'v','Nature':'a'}},
    {'q':'7. You have an important tour game later today, right now you are','a':{'Chilling like any other day':'i','Building and preparing for the game':'a','Scouting for replays and alts':'v'}},
    {'q':'8. How would you like newer players to consider you','a':{'A brilliant player who is still competitively feared':'a','An accomplished great with many accolades':'v','An influential vet that people like and look up to':'i'}},
    {'q':'9. What do you least want your friends to think about you','a':{'That you have lost your skill and are now washed up':'a','That you have become too busy for them':'i','That you were never really that good':'v'}},
    {'q':'10. Which of the following can you relate to the most','a':{'I consider myself better than my reputation says about me':'v','My records don\'t lie':'a','I care too much about how others see me':'i'}},
    {'q':'11. If someone I hold to a high regard calls me out on my skill level, I will','a':{'Consider it a personal attack and feel betrayed':'i','Lash out at them because I don\'t care whose opinion it is, I know I\'m good':'v','Try to understand where he\'s coming from and see if I really can improve':'a'}},
    {'q':'12. For an important tour game, which of the following fits me the most','a':{'I will get my hands on every piece of information to counterstyle':'v','I will bring something I am comfortable with and built myself':'a','I\'ll use a friend\'s team or ask them for advice':'i'}},
    {'q':'13. How would you like to be seen by your peers','a':{'Imitated':'a','Praised':'iv','Liked':'i','Envied':'av'}},
    {'q':'14. Ranking them in order, seeing your non-competitive friend have these mons in their in-game party irks you the most (assuming he doesn\'t know why any of these is bad)','a':{'First an HM slave Charizard, then a neverstone Magikarp, finally a physical Alakazam':'iv','First a physical Alakazam, then an HM slave Charizard, finally a neverstone Magikarp':'ai','First a neverstone Magikarp, then a physical Alakazam, finally an HM slave Charizard':'av','First an HM slave Charizard, then a physical Alakazam, finally a neverstone Magikarp':'ai','First a neverstone Magikarp, then an HM slave Charizard, finally a physical Alakazam':'av','First a physical Alakazam, then a neverstone Magikarp, finally an HM slave Charizard':'av'}},
    {'q':'15. Which argument would you most agree with in a debate about which of these three is the best','a':{'Elite Four because my favorite typing is among them':'i','Champion because the Champions always have more competitively sound teams':'a','Giovanni because he\'s a boss':'v'}},
    {'q':'16. The best starter of the bunch is','a':{'Infernape in Diamond Pearl':'i','Swampert in Ruby Sapphire':'a','Venusaur in Fire Red Leaf Green':'v'}},
    {'q':'17. Which group is better','a':{'Fire Red, Ruby, Black, X, Sun':'iv','Leaf Green, Sapphire, White, Y, Moon':'a'}},
    {'q':'18. Which of the following do you prefer','a':{'Double Switching (where you switch expecting a switch)':'a','Double Attacking (where you attack expecting a switch)':'iv'}},
    {'q':'19. What is your preference?', 'a':{'Building':'ai','Playing':'v'}},
    {'q':'20. Pick a Pok&eacute;mon plushy that you will carry on your keychain','a':{'Squirtle':'i','Rampardos':'v','Pangoro':'i','Cosmoem':'a','Xerneas':'v','Azumarill':'a'}},
];
DexQuestions = [
    {q:'You prefer to act immediately rather than speculate about various options', w:'c', skipu:1, tiebreaker:1},
    {q:'I\'d rather have a 7/10 pok&eacute;girl than a 10/10 dream girl who made me quit the game (vice versa if you are a girl)'},
    {q:'Strict observance of the established thought is likely to prevent a competitive edge', w:'v', skipu:1,  tiebreaker:1},
    {q:'As a rule, you proceed only when you have a clear and detailed plan', w:'c'},
    {q:'You are often flustered by luck not going your way', w:'n'},
    {q:'It took me a relatively long time to get good competitively'},
    {q:'I always build my own teams because I don\'t want to use what everybody else is using', w:'v'},
    {q:'You like to be engaged in an active and fast paced game', w:'n'},
    {q:'You think its unnecessary to stray from the teambuilding conventions', w:'x'},
    {q:'You look to usage stats when building/choosing teams because some Mons are used for a reason', w:'x'},
    {q:'You easily see why certain Mons perform better because of their inherent superiority, rather than attributing it to team structure', w:'x'},
    {q:'Pok&eacute;mon is a game of punishing mistakes, so it\'s better to wait for an opening than risk slipping up first', w:'r', skipu:1, tiebreaker:1},
    {q:'You are inclined to rely more on improvisation than on planning', w:'n'},
    {q:'You find it difficult to set aside impulse/instinct', w:'n'},
    {q:'You tend to rely on what you have had success with rather than on theoretical alternatives', w:'x'},
    {q:'You rarely deviate from your "Staples"', w:'x'},
    {q:'You think that almost everything can be analyzed: matches, teams, players', w:'c'},
    {q:'You trust reason more than gut', w:'c'},
    {q:'You believe the best play is one which can be easily changed', w:'c'},
    {q:'You tend to agree with the general opinion of what is good and bad in the meta', w:'x'},
    {q:'You feel that the game is founded on aggression. If you don\'t take an inch you will lose a mile', w:'p'},
    {q:'You get bored in slow, drawn out battles', w:'n'},
    {q:'If it came down to it, you would not be against using Baton Pass if it meant giving you an advantage'},
    {q:'The longer your opponent takes, the more likely you are to cancel your move', w:'r'},
    {q:'You would rather play a top tier player than an unknown player', w:'p'},
    {q:'You feel it impossible to account for all the possible plays and sets in any given game', w:'n'},
    {q:'For you, no surprises is better than surprises - bad or good', w:'c'},
    {q:'You\'d like to be considered a trendsetter', w:'v'},
    {q:'You often find yourself caught off guard by your opponents', w:'n'},
    {q:'You prefer having to hit 2 focus blasts (assuming 50% probability) rather than winning a 50/50', w:'o', skipu: 1},
];
