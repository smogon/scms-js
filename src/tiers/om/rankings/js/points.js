// page to generate a leaderboard that "dynamically" updates as seasonals (or some other tour) progresses.

// How this works:
// 1. Ensure your OPs are formatted so the script can recognize the matchups (in general, it recognizes the standard format most people use on Smogon)
// 2. supply the script with the thread ids from the forums using the scms (see below)
// 3. Maintain your threads just as you normally would. The page will automatically update for any threads you've told it to check.

/* **************************************** */
/* Formatting the OPs for Tournament Rounds */
/* **************************************** */
// see this thread for an actual example: /forums/threads/monotype-summer-seasonal-round-7.3581731/

// Intro stuff and text
//
// Winners Bracket
// player vs player
// player vs player

// Losers Bracket
// player vs player
// player vs player

// winners bracket should be excluded from the OP in losers only rounds

// Bold the players that win
// make sure to bold just the player's name, not the full "tag"
// This is ok: [USER=123456][B]scpinion[/B][/USER]
// This is NOT ok: [B][USER=123456]scpinion[/USER][/B]

// Handling a Round Robin Final (3 participants)
// List all three matches
// Once the matches are over, move the matchup between people that didn't win to the top and don't bold the winner (assuming they even played).
// Bold the other two as you normally would.
// example:
// player2 vs player3  <--don't bold a winner, player 1 won the round robin!
// [B]player1[/B] vs player2
// [B]player1[/B] vs player3

// Handling Coinflips
// Inevitiably, there are coinflips. Many formats don't award points for rounds with coin tosses
// unless the player wins in a subsequent round. To identify matches that shouldn't be scored,
// mark the matchup with [*DNP]

// Example:
// [B]player[/B] vs player [*DNP]

/* ********************************* */
/* Telling the script where to look! */
/* ********************************* */
// List the thread ids for each round of each seasonal below.
// As the tour progresses, edit in the new threads via the scms.

// Example thread: /forums/threads/monotype-summer-seasonal-round-7.3581731/
// The thread id is the number after the period: 3581731

// Leave threadInfo as an empty object. The script will populate it.

// you must also specify the "scoring-type". This determines how points will be awarded.
// options:
// single: grand slam scoring for two finalists
// single-rr: grand slam scoring for 3 finalists (round robin finals)
// link to grand slam scoring format: /tournaments/grandslam/rules#point

// double: 2 points for winner's bracket win, 1 point for loser's bracket win, 1 point for 1st round win.

// if tour is ongoing, make sure isComplete is set to false.
// isComplete is used to award an extra point to a player that goes undefeated in a double elim tour
// i.e. their final win should count as a "winner's bracket win", which awards two points, not one.

function toID(text) {
    text = text + '';
    return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}
// the good stuff
$(document).ready(function () {
    var seasonals = window.scmsJSON.seasonals;
    var ssnlOrder = Object.keys(seasonals);
    var playerDatabase = window.scmsJSON.playerDatabase || {};
    var useOldScoring = window.scmsJSON.useOldScoring;

    $('#show').click(function () {
        $("#help").show(600);
        $("#show").hide(600);
    });

    $('#hide').click(function () {
        $("#help").hide(600);
        $("#show").show(600);
    });

    var deffereds = [];
    $.each(seasonals, function (seasonalKey, seasonal) {
        if (seasonal.threads.length) {
            $.each(seasonal.threads, function (threadIndex, thread) {
                var p = $.ajax({
                    url: "/forums/threads/" + thread,
                    async: true,
                    dataType: 'html'
                }).done(function (data) {
                    // find the HTML for the OP
                    var foo = $(data).find('.message .message-body').html();

                    // split it into lines
                    foo = foo.replace(/<br>/g, "");
                    foo = foo.split("\n");

                    // save it for later use
                    seasonals[seasonalKey].threadInfo[thread] = foo;
                });
                deffereds.push(p)
            });
        }
    });

    if (!deffereds.length) {
        $('#loading').html('<h2>OM Grand Slam hasn\'t started yet. Please bear with us!</h2>');
        return;
    }

    Promise.all(deffereds).then(function () {
        var roundSizes = {};
        // All the threads are loaded, lgi!
        $.each(seasonals, function (seasonalKey, seasonal) {
            if (!roundSizes[seasonalKey]) roundSizes[seasonalKey] = [];
            $.each(seasonal.threads, function (threadIndex, thread) {
                var threadInfo = seasonal.threadInfo[thread];

                // parse the thread line by line
                for (var l = 0; l < threadInfo.length; l++) {
                    var line = threadInfo[l];

                    // drop the line in a hidden div to find elements by class
                    $('#line-to-test').html(line);

                    // take a line of the post
                    // figure out if it is a actually a matchup
                    // figure out who won
                    // figure out if it was an activity decision
                    try {
                        // all "tags" on smogon come with a 'username' class in the html
                        // the "find" command throws an error if there isn't at least 1 tagged user in the line
                        var players = $('#line-to-test').find('.username');

                        if (players.length < 1) continue;

                        // skip lines that contain a tag, but don't contain 'vs' or 'bye'
                        if (toID(line).indexOf('vs') < 0 && toID(line).indexOf('bye') < 0) {
                            continue;
                        }

                        // initialization
                        var playerIds = ['0','0'];
                        if (!roundSizes[seasonalKey][threadIndex]) roundSizes[seasonalKey][threadIndex] = 0;
                        roundSizes[seasonalKey][threadIndex] += 2;
                        var playerNames = ['', ''];
                        var winner = -1;
                        var isCoinflip = false;

                        // players[0].dataset.user looks like: "502938, name", "502938, [B]name[/B]" if they won
                        var playerId = players[0].dataset.userId;
                        var playerName = players[0].firstChild.textContent;

                        if (players[0].firstChild.nodeName === "B") winner = 0;
                        playerIds[0] = playerId;
                        playerNames[0] = playerName.replace("[B]", "").replace("[/B]", "");

                        // if there is a 2nd player, get their info (byes don't have a 2nd player)
                        if (players[1]) {
                            playerId = players[1].dataset.userId;
                            playerName = players[1].firstChild.textContent;
                            if (players[1].firstChild.nodeName === "B") winner = 1;
                            playerIds[1] = playerId;
                            playerNames[1] = playerName.replace("[B]","").replace("[/B]","");
                        }

                        if (line.indexOf("[*DNP]") > -1) isCoinflip = true;

                        // add info from this line to the playerDatabase
                        // create entry for player/seasonal if it doesn't already exist
                        for (var i = 0; i < 2; i++) {
                            if (!playerDatabase[playerIds[i]]) {
                                playerDatabase[playerIds[i]] = {name: playerNames[i], seasons: {}, enforceBFL: false};
                            }
                            if (!playerDatabase[playerIds[i]].seasons[seasonalKey]) {
                                playerDatabase[playerIds[i]].seasons[seasonalKey] = {
                                    results: [], // list of results
                                };
                            }
                            playerDatabase[playerIds[i]]["name"] = playerNames[i];
                        }

                        if (window.scmsJSON.BFL) {
                            for (var i in playerDatabase) {
                                let openCount = 0;
                                for (var ssnlKey in playerDatabase[i].seasons) {
                                    openCount++;
                                }
                                if (openCount > window.scmsJSON.BFL) playerDatabase[i].enforceBFL = true;
                            }
                        }

                        // update info
                        if (winner > -1) {
                            if (isCoinflip) {
                                playerDatabase[playerIds[0]].seasons[seasonalKey].results[threadIndex] = winner === 0 ? "c" : "l";
                                playerDatabase[playerIds[1]].seasons[seasonalKey].results[threadIndex] = winner === 1 ? "c" : "l";
                            } else {
                                playerDatabase[playerIds[0]].seasons[seasonalKey].results[threadIndex] = winner === 0 ? "w" : "l";
                                playerDatabase[playerIds[1]].seasons[seasonalKey].results[threadIndex] = winner === 1 ? "w" : "l";
                            }
                        } else {
                            // we don't know who won. log that the match happened, but it is possible no points were awarded
                            playerDatabase[playerIds[0]].seasons[seasonalKey].results[threadIndex] = "u";
                            playerDatabase[playerIds[1]].seasons[seasonalKey].results[threadIndex] = "u";
                            console.log('Didn\'t record a result for: ' + playerNames[0] + ' vs ' + playerNames[1] + '(round ' + (threadIndex + 1) + ', ' + seasonalKey + ')');
                        }
                    } catch (e) {
                        console.error(e, e.stack);
                    }
                }
            });
        });

        // parse the playerDatabase
        var standings = [];
        delete playerDatabase['0'];
        $.each(playerDatabase, function (playerId, playerData) {
            // create an array of 'playerScores' to sort: [[playerId, total, ssnl1, ssnl2, ...], ...]
            var playerScore = [playerId, 0];
            // only show the seasons in ssnlOrder
            for (var s = 0; s < ssnlOrder.length; s++) {
                var ssnlName = ssnlOrder[s];
                if (ssnlName in playerData.seasons) {
                    /*
                    if (playerData.enforceBFL) {
                        var runs = [];
                        for (var x in playerData.seasons) {
                            var ssnl = playerData.seasons[x];
                            runs.push({ssnl: x, run: ssnl.results.length});
                        }
                        runs.sort((a, b) => b.run - a.run);
                        while (runs.length > window.scmsJSON.BFL) {
                            runs.splice(runs.length - 1, 1);
                        }
                        if (runs.findIndex(x => x.ssnl === ssnlName) < 0) {
                            playerData.seasons[ssnlName].results = [];
                        }
                    }
                    */
                    var points = 0;
                    var results = playerData.seasons[ssnlName].results;
                    for (var r=0; r<results.length; r++) {
                        if (!results[r]) results[r] = '-';
                    }
                    switch (seasonals[ssnlName]["scoring-type"]) {
                        case 'single':
                        case 'single-rr':
                            var lastWin = results.lastIndexOf("w");
                            if (useOldScoring) {
                                var pointValues = [1, 2, 3, 5, 7, 9, 11, 13, 15, 17, 19];
                                if (lastWin > -1 && lastWin < pointValues.length) points = points + pointValues[lastWin];
                            } else {
                                if (roundSizes[ssnlName]) {
                                    console.log(roundSizes[ssnlName]);
                                    for (var q = 0; q < roundSizes[ssnlName].length; q++) {
                                        var roundSize = roundSizes[ssnlName][q];
                                        if (results[q]) {
                                            if (results[q] === 'u' || results[q] === 'l' || (results[q] === 'c' && results[q + 1] && results[q + 1] !== 'w')) continue;
                                            points += 1;
                                            if (roundSize <= (seasonals[ssnlName]["scoring-type"] === 'single-rr' ? 48 : 32)) {
                                                points += 1;
                                            }
                                        }
                                    }
                                }
                            }
                            // extra point for RR champion
                            if (seasonals[ssnlName]["scoring-type"] === 'single-rr' &&
                                lastWin + 1 === seasonals[ssnlName]["threads"].length && seasonals[ssnlName]["isComplete"]) {
                                points++;
                            }

                            // replace any activity wins with actual wins if player won later in tour
                            for (var r = 0; r < lastWin; r++) {
                                if (results[r] in {"c": 1}) results[r] = "cw";
                            }
                            break;
                        case 'double':
                            // replace any activity wins with actual wins if player won later in tour
                            var lastWin = results.lastIndexOf("w");
                            for (var r = 0; r < lastWin; r++) {
                                if (results[r] in {"c": 1}) results[r] = "cw";
                            }
                            for (var r = 0; r < results.length; r++) {
                                if (results[r] in {"w": 1, "-": 1, "cw": 1}) points++;
                            }

                            // if player didn't lose a single round and tour is complete, they get an extra point for winning in "winner's bracket" of finals
                            if (results.indexOf("l") < 0 && seasonals[ssnlName]["isComplete"]) points++;

                            // fix for Monotype Spring 2016 Seasonal
                            // a fill-in host messed up brackets, which screwed up tournament flow
                            // need to add a point to all players that won in the winner's bracket of round 5
                            if (results.slice(0,4).indexOf("l") < 0 && ssnlName in {"Spring 2016":1}) points++;
                            break;

                        default:
                            points = playerData.seasons[ssnlName].results.length;
                            break;
                    }

                    // Ensure points are never negative
                    if (points < 0) points = 0;
                    if (playerData.enforceBFL) {
                        var sortedScores = playerScore.slice(2).map(a => a === '--' ? 0 : a).sort((a, b) => b - a);
                        if (sortedScores.length >= window.scmsJSON.BFL) {
                            if (points > sortedScores[window.scmsJSON.BFL - 1]) {
                                // replace lowest score
                                playerScore[1] -= sortedScores[window.scmsJSON.BFL - 1];
                                playerScore[playerScore.lastIndexOf(sortedScores[window.scmsJSON.BFL - 1])] = 0;
                            } else {
                                points = 0;
                            }
                        }
                    }
                    playerScore.push(points);
                    playerScore[1] = playerScore[1] + points; // total points
                } else {
                    playerScore.push("--");
                }
            }
            standings.push(playerScore);
        });

        // sort the standings
        standings.sort(function (a, b) {
            var foo;
            if (a[1]===b[1]) {
                // sort alphabetically
                var p1 = playerDatabase[a[0]]["name"].toUpperCase();
                var p2 = playerDatabase[b[0]]["name"].toUpperCase();
                foo = p1 > p2 ? 1 : -1;
            } else {
                foo = a[1] > b[1] ? -1 : 1;
            }
            return foo;
        });

        // make a table!
        var text = "<thead><tr>";
        text += "<th>Rank</th>";
        text += "<th>Name</th>";
        for (var s = 0; s < ssnlOrder.length; s++) {
            if (s < ssnlOrder.length) {
                text += '<th>' + ssnlOrder[s] + '</th>';
            }
        }
        text += "<th id=\"total\">Total</th>";
        text += "</tr></thead><tbody>";

        var currentRank = 1;
        var previousScore = standings[0][1];
        $.each(standings, function (index, playerScore) {
            if (previousScore > playerScore[1]) currentRank = index + 1;
            previousScore = playerScore[1];
            // TODO: Make customizable with window JSON
            text += "<tr class=\"row" + (currentRank <= 8 ? " top8" : "") + "\">";
            text += "<td class=\"rank\">" + currentRank + ".</td>";
            text += "<td class=\"name\"><a href=\"/forums/members/" + playerScore[0] + "/\" target=\"_blank\">" + playerDatabase[playerScore[0]]["name"] + "</a></td>";

            for (var s = 0; s < playerScore.length - 2; s++) {
                var ssnlName = ssnlOrder[s];

                if (playerDatabase[playerScore[0]].seasons[ssnlName]) {
                    var results = playerDatabase[playerScore[0]].seasons[ssnlName].results;

                    text += " <td title=\"" + results.join(', ') + "\">" + playerScore[s + 2] + "</td>";
                } else {
                    text += " <td>" + playerScore[s + 2] + "</td>";
                }

            }
            text += " <td class=\"total\">" + playerScore[1] + "</td>";
            text += "</tr>";
            });
            text+= "</tbody>";
            $("#loading").fadeOut(500);
            $("#standings").html(text)

            var newTableObject = document.getElementById("standings")
            sorttable.makeSortable(newTableObject);

            var myTH = document.getElementById("total");
            sorttable.innerSortFunction.apply(myTH, []);
            sorttable.innerSortFunction.apply(myTH, []);
    });
});
