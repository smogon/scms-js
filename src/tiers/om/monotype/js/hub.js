var typeSelectorScaleValue = 1;
var currentType = "bug";
var currentSection = "sample teams";

$(document).ready(function () {
    google.charts.load('current', {packages: ['corechart', 'bar']});
    $(function() {
        $( "#sets-container" ).tabs();
      });
    
    //handle click on type hex
    $(".type-hex-inner").click(function() {
        //var width = ( 100 * parseFloat($('#type-menu').css('width')) / parseFloat($('#type-menu').parent().css('width')) )
        $(".type-hex-image").hide(500);
        $('.type-hex-inner > h2').hide(500);
        $('.type-hex-inner > p').hide(500);
        if (typeSelectorScaleValue === 1) {
            //handle initial type selection
            $("#welcome-text").css("position","absolute")
            $("#welcome-text").fadeOut(1000);
            var promise1 = $("#navigation").fadeIn(1500);
            currentType = $(this).data('type');
            $.when(promise1).done(function() {
                
                //update stuff
                console.log(currentType);
                updateVRSection(currentType);
                updateSampleTeams(currentType);
                updateRCSection(currentType);
                //updateAnalysisSelection(currentType)
                $('.section[data-section="' + currentSection + '"]').show(1000);
                
                //highlight the correct professor
                $('.professor').removeClass("clickedBG");
                $('.professor[data-section="' + currentSection + '"]').addClass("clickedBG");
            })
            
            //hide the type menu
            $("#type-select-container")
            .css({position: 'absolute'})
            .css({transformOrigin: '0px 0px'})
            .transition({scale: 0.1, x: "250px", y: "-800px"}, 1000, "easeOutSine")
            .transition({}, 1000, "easeOutSine")
            typeSelectorScaleValue = 0.1;
            
            
        } else {
            $('.section[data-section="' + currentSection + '"]').hide(800);
            $(".type-hex-inner").blur()
            $(".type-hex-image").show(500);
            $('.type-hex-inner > h2').show(500);
            $('.type-hex-inner > p').show(500);
            $("#type-select-container")
            .css({position: 'relative'})
            .transition({ scale: 1,x: "0px", y: "0px" }, 1000, "easeInSine")
            typeSelectorScaleValue = 1;
        }
    }) 
   
    $('.professor').click(function(e) {
        var $openinfo = $('.section:visible');
        $openinfo.hide(800);
     
        currentSection = $(this).data('section');
        if (!$openinfo.length || currentSection !== $openinfo.data('section')) {
            $('.section[data-section="' + $(this).data('section') + '"]').show(800);
        }
        
        $('.professor').removeClass("clickedBG");
        $('.professor[data-section="' + currentSection + '"]').addClass("clickedBG");
    });
    
    //sample team ui
    $('#sample-teams-container').on("click", ".show-importable", function(e) {
        $('.importable[data-num="' + $(this).data('num') + '"]').fadeIn(800);
        $('.hide-importable[data-num="' + $(this).data('num') + '"]').fadeIn(800);
        $('.importable[data-num="' + $(this).data('num') + '"]').select();
    });
    $('#sample-teams-container').on("click", ".hide-importable", function(e) {
        $('.importable[data-num="' + $(this).data('num') + '"]').fadeOut(800);
        $('.hide-importable[data-num="' + $(this).data('num') + '"]').fadeOut(800);
    });
    
    $('#sample-teams-container').on("click", ".show-sets", function(e) {
        $('.st-sprite[data-num="' + $(this).data('num') + '"]').fadeOut(800);
        $('.st-set-text[data-num="' + $(this).data('num') + '"]').fadeIn(800);
        $('.show-sets[data-num="' + $(this).data('num') + '"]').fadeOut(200);
        $('.hide-sets[data-num="' + $(this).data('num') + '"]').fadeIn(200);
    });
    $('#sample-teams-container').on("click", ".hide-sets", function(e) {
        $('.st-sprite[data-num="' + $(this).data('num') + '"]').fadeIn(800);
        $('.st-set-text[data-num="' + $(this).data('num') + '"]').fadeOut(800);
        $('.show-sets[data-num="' + $(this).data('num') + '"]').fadeIn(100);
        $('.hide-sets[data-num="' + $(this).data('num') + '"]').fadeOut(100);
    });
    $('#sample-teams-container').on("dblclick", ".sample-team-hex", function(e) {
        $(this).find('.st-sprite').toggle(400);
        $(this).find('.st-set-text').toggle(400);
    })
    
    //analysis section ui
    // $("#analyses-container").on("click",".analysis-hex-inner", function() {
    //     updateAnalysis($(this).data('species'))
    // });
    
    // vr section ui
    $("#viability-rankings-container").on("click",".vr-hex-inner", function() {
        var win = window.open("http://www.smogon.com/dex/xy/pokemon/" + $(this).data('species') + "/monotype/", "_blank");
        if (win) {
            win.focus();
        } else {
            alert("Please allow popups on the monotype hub to link to analyses");
        }
    });
    
    // rc section ui
    $("#role-compendium-container").on("click",".rc-hex-inner", function() {
        var win = window.open("http://www.smogon.com/dex/xy/pokemon/" + $(this).data('species') + "/monotype/", "_blank");
        if (win) {
            win.focus();
        } else {
            alert("Please allow popups on the monotype hub to link to analyses");
        }
    });
});

function updateVRSection(type) {
    var vRanks;
    var text = "";
    text += "<h3 class=\"section-intro\">The Viability Rankings is a community-driven project that ranks the Pok&eacute;mon from each type based on their effectiveness in the Monotype metagame. <br/><span style=\"font-weight: normal\">To contribute, or suggest a change, please see <a href=\"http://www.smogon.com/forums/threads/monotype-viability-rankings-v2.3575778/\" target=\"_blank\">this thread</a> on the forums.</span></h3>"
    $.ajax({ 
        url: "/forums/threads/monotype-next-best-thing.3545441/page-3#post-6376792", 
        async: false,
        dataType: 'html'
    }).done(function(data) {
        var foo = $(data).find('#post-6376792 .messageText').html();
        foo = foo.replace(/<br>/g,"");
        //console.log(foo)
        try {
            vRanks = JSON.parse(foo);
        } catch(e) {
            vRanks = vRanksBackup;
            alert("Error parsing Viability Rankings from the Monotype sub-forum. A previous revision will be displayed. Please let scpinion know about this error.")
            console.log("in catch")
            console.log(e)
        }
        //console.log(vRanks)
        for(var rank in vRanks[type]) {
            text += "<div class=\"vr-section-container\">"
            text += "   <h2>" + capFL(rank) + " Rank</h2>"
            text += "   <p>" + vRanksText[rank] + "</p>"
            text += "   <ul class=\"vr-section\">";
            
            for (var i in vRanks[type][rank]){
                var mon = vRanks[type][rank][i];
                
                var template = getTemplate(mon)
                var num = template["num"];
                if (num < 100) num = paddy(num,3)
                if (template["forme"]) num += "-" + template["formeLetter"].toLowerCase()
                if (template["forme"]==="Mega-X") num += "-x";
                if (template["forme"]==="Mega-Y") num += "-y";
                
                text += "<li class=\"" + type +"-hover vr-hex\">";
                text += "   <div class=\"" + type +"-hover vr-hex-inner\" href=\"#\" data-species=\"" + mon + "\">";
                text += "       <img class=\"" + template["id"] + "\" src=\"https://dl.dropboxusercontent.com/u/101452974/smogon/images/dreamworld/" + num + ".png\" alt=\"" + template["species"] + "\" />";
                text += "   </div>";
                text += "</li>";
            }
            text += "</ul></div>";
        }
        $("#viability-rankings-container").html(text);
    }).fail(function(e) {
        vRanks = vRanksBackup;
        console.log(e)
        for(var rank in vRanks[type]) {
            text += "<div class=\"vr-section-container\">"
            text += "   <h2>" + capFL(rank) + " Rank</h2>"
            text += "   <p>" + vRanksText[rank] + "</p>"
            text += "   <ul class=\"vr-section\">";
            
            for (var i in vRanks[type][rank]){
                var mon = vRanks[type][rank][i];
                
                var template = getTemplate(mon)
                var num = template["num"];
                if (num < 100) num = paddy(num,3)
                if (template["forme"]) num += "-" + template["formeLetter"].toLowerCase()
                if (template["forme"]==="Mega-X") num += "-x";
                if (template["forme"]==="Mega-Y") num += "-y";
                
                text += "<li class=\"" + type +"-hover vr-hex\">";
                text += "   <div class=\"" + type +"-hover vr-hex-inner\" href=\"#\" data-species=\"" + mon + "\">";
                text += "       <img class=\"" + template["id"] + "\" src=\"https://dl.dropboxusercontent.com/u/101452974/smogon/images/dreamworld/" + num + ".png\" alt=\"" + template["species"] + "\" />";
                text += "   </div>";
                text += "</li>";
            }
            text += "</ul></div>";
        }
        $("#viability-rankings-container").html(text);
    })
}

function updateSampleTeams(type) {
    var usText = [];//html for user submitted teams
    var ftText = [];//html for featured teams
    // $.post( "/tiers/om/monotype/sample-teams/get-teams.php", { "type": type})
    // .done(function( data ) {
    //     var teams = JSON.parse(data);
    //     console.log(teams)
        var teams = teamDatabase[type];
        for(var t in teams) {
            t = teams[t];
            $.ajax({ 
                url: "/tiers/om/monotype/sample-teams/" + type + "/" + t, 
                async: false,
                dataType: 'text',
                success: function(data) {
                    var lines = data.split("\n");
                    //line 1 is team name
                    //line 2 is link to team
                    //line 3 is the creator of the team
                    var text = "";
                    var team = importTeam(lines.slice(3,lines.length))
                    text += "<div class=\"sample-team-container\">"
                    text += "  <div class=\"show-importable\" data-num=\"" + t + "\">Importable</div>"
                    text += "  <div class=\"hide-importable\" data-num=\"" + t + "\">Hide</div>"
                    text += "  <div class=\"show-sets\" data-num=\"" + t + "\">Show Sets</div>"
                    text += "  <div class=\"hide-sets\" data-num=\"" + t + "\">Hide Sets</div>"
                    text += "  <p class=\"importable\" data-num=\"" + t + "\">"
                    var foo = lines.slice(3,lines.length);
                    for(var l in foo){
                        text += foo[l] + "<br/>"
                    }
                    
                    text += "  </p>"
                    text += "  <a href=\"" + lines[1] + "\"><h2>" + lines[0] + "</h2></a>"
                    text += "  <p class=\"created-by-text\">Created by " + lines[2] + "</p>"
                    text += "  <p class=\"dbl-click-text\">double click to see a set</p>"
                    text += "  <ul id=\"sample-team-entry\">"
                    
                    for (var m in team) {
                        var mon = team[m];
                        
                        var template = getTemplate(mon["species"])
                        //check for forme
                        var num = template["num"];
                        if (num < 100) num = paddy(num,3)
                        
                        if (template["forme"]) num += "-" + template["formeLetter"].toLowerCase()
                        if (template["forme"]==="Mega-X") num += "-x";
                        if (template["forme"]==="Mega-Y") num += "-y";
                        
                        text += "    <li class=\""+ type + " sample-team-hex\">"
                        text += "      <div class=\""+ type + " sample-team-hex-inner\" data-type=\""+ type + "\">"
                        text += "        <img class=\"st-sprite " + template["id"] + "\" data-num=\"" + t + "\" src=\"https://dl.dropboxusercontent.com/u/101452974/smogon/images/dreamworld/" + num + ".png\" alt=\"" + template["species"] + "\" />";
                        text += "        <p class=\"st-set-text\" data-num=\"" + t + "\">";
                        text +=             mon["item"] + "<br/>";
                        text +=             mon["ability"] + "<br />";
                        var evText = ""
                        for (var stat in mon["evs"]){
                            if(mon["evs"][stat] > 0) evText += mon["evs"][stat] + " " + stat + " / ";
                        }
                        text += evText.substring(0,evText.length - 2) + "<br />";
                        text += mon["nature"] + " Nature <br />";
                        for (var move in mon["moves"]) {
                            text += "- " + mon["moves"][move] + "<br/>"
                        }
                        text += "        </p>";
                        text += "      </div>";
                        text += "    </li>";
                    }
                    text += "  </ul>";
                    text += "</div>";
                    
                    if (t.substring(0,2) === "ft") {
                        ftText.push(text);
                    } else {
                        usText.push(text)
                    }
                } 
            });
        }
        text = "";
        text += "<h2 class=\"sample-team-section-header\">Featured Teams</h2>"
        for (var j=0; j < ftText.length; j++) {
            text += ftText[j];
        }
        text += "<h2 class=\"sample-team-section-header\">User-Submitted Teams</h2><p>If you have an RMT that you'd like featured here, please pm <a href=\"http://www.smogon.com/forums/members/scpinion.239869/\" target=\"_blank\">scpinion</a> or another member of the Monotype room staff.</p>"
        for (var j=0; j < usText.length; j++) {
            text += usText[j];
        }
        $("#sample-teams-container").html(text);
    // });
}

function updateRCSection(type) {
    var text = "";
    var rcSects = [];
    var roleComp;
    $.ajax({ 
        url: "/forums/threads/monotype-resources.3550310/page-3#post-6817551", 
        async: false,
        dataType: 'html'
    }).done(function(data) {
        var foo = $(data).find('#post-6817551 .messageText').html();
        foo = foo.replace(/<br>/g,"");
        console.log(foo)
        try {
            roleComp = JSON.parse(foo);
            console.log(roleComp)
        } catch(e) {
            roleComp = roleCompBackup;
            alert("Error parsing Role Compendium from the Monotype sub-forum. A previous revision will be displayed. Please let scpinion know about this error.")
            // console.log("in catch")
            console.log(e)
        }
        //console.log(roleComp)
    
        for(var category in roleComp[type]) {
            if (roleComp[type][category].length < 1) continue;
            text = ""
            text += "<div class=\"rc-section-container\">"
            text += "   <h2>" + category + "</h2>"
            
            //text += "   <p>" + vRanksText[rank] + "</p>"
            text += "   <ul class=\"rc-section\">";
            
            for (var i in roleComp[type][category]){
                var mon = roleComp[type][category][i];
                
                var template = getTemplate(mon)
                var num = template["num"];
                if (num < 100) num = paddy(num,3)
                if (template["forme"]) num += "-" + template["formeLetter"].toLowerCase()
                if (template["forme"]==="Mega-X") num += "-x";
                if (template["forme"]==="Mega-Y") num += "-y";
                
                text += "<li class=\"" + type +"-hover rc-hex\">";
                text += "   <div class=\"" + type +"-hover rc-hex-inner\" href=\"#\" data-species=\"" + mon + "\">";
                text += "       <img class=\"" + template["id"] + "\" src=\"https://dl.dropboxusercontent.com/u/101452974/smogon/images/dreamworld/" + num + ".png\" alt=\"" + template["species"] + "\" />";
                text += "   </div>";
                text += "</li>";
            } 
            text += "</ul></div>";
            rcSects.push([roleComp[type][category].length, text])
        }
        // sort
        rcSects.sort(function(a, b) {
            return b[0] - a[0];
        });
        text = "";
        text += "<h3 class=\"section-intro\">The Role Compendium contains a variety of roles one might want on their team, and lists Pokemon that fulfill them for their types.<br/><span style=\"font-weight: normal\">This section is based on <a href=\"http://www.smogon.com/forums/threads/.3577465/\" target=\"_blank\">this thread</a> from the forums. To suggest a change, please post to that thread.</span></h3>"
        for (var j=0; j < rcSects.length; j++) {
            text += rcSects[j][1];
        }
        $("#role-compendium-container").html(text);
    }).fail(function(e) {
        roleComp = roleCompBackup;
        console.log(e)
        for(var category in roleComp[type]) {
            if (roleComp[type][category].length < 1) continue;
            text = ""
            text += "<div class=\"rc-section-container\">"
            text += "   <h2>" + category + "</h2>"
            
            //text += "   <p>" + vRanksText[rank] + "</p>"
            text += "   <ul class=\"rc-section\">";
            
            for (var i in roleComp[type][category]){
                var mon = roleComp[type][category][i];
                
                var template = getTemplate(mon)
                var num = template["num"];
                if (num < 100) num = paddy(num,3)
                if (template["forme"]) num += "-" + template["formeLetter"].toLowerCase()
                if (template["forme"]==="Mega-X") num += "-x";
                if (template["forme"]==="Mega-Y") num += "-y";
                
                text += "<li class=\"" + type +"-hover rc-hex\">";
                text += "   <div class=\"" + type +"-hover rc-hex-inner\" href=\"#\" data-species=\"" + mon + "\">";
                text += "       <img class=\"" + template["id"] + "\" src=\"https://dl.dropboxusercontent.com/u/101452974/smogon/images/dreamworld/" + num + ".png\" alt=\"" + template["species"] + "\" />";
                text += "   </div>";
                text += "</li>";
            } 
            text += "</ul></div>";
            rcSects.push([roleComp[type][category].length, text])
        }
        // sort
        rcSects.sort(function(a, b) {
            return b[0] - a[0];
        });
        text = "";
        text += "<h3 class=\"section-intro\">The Role Compendium contains a variety of roles one might want on their team, and lists Pokemon that fulfill them for their types.<br/><span style=\"font-weight: normal\">This section is based on <a href=\"http://www.smogon.com/forums/threads/.3565122/\">this thread</a> from the forums. To suggest a change, please post to that thread.</span></h3>"
        for (var j=0; j < rcSects.length; j++) {
            text += rcSects[j][1];
        }
        $("#role-compendium-container").html(text);
    });
}

function colorStats(stat) {
    if (stat < 40) return "darkred";
    if (stat < 55) return "orangered";
    if (stat < 70) return "coral";
    if (stat < 85) return "orange";
    if (stat < 100.1) return "gold";
    if (stat < 121) return "limegreen";
    if (stat < 161) return "springGreen";
    return "aquamarine";
}

function toId(text) {
	if (text === '') return text;
	return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function capFL(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function paddy(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}


// function updateAnalysisSelection(type) {
//     $.ajax({ 
//         url: "/forums/threads/monotype-resources.3550310/#post-6435015", 
//         async: false,
//         dataType: 'html'
//     }).done(function(data) {
//         var foo = $(data).find('#post-6435015 .messageText').html();
//         foo = foo.replace(/<br>/g,"");
//         // vRanks = JSON.parse(foo);
//         var text = "<ul id=\"analysis-selection-menu\">";
//         for(var rank in vRanks[type]) {
//             for (var i in vRanks[type][rank]){
//                 var mon = vRanks[type][rank][i];
                
//                 var template = getTemplate(mon)
//                 var num = template["num"];
//                 if (num < 100) num = paddy(num,3)
//                 if (template["forme"]) num += "-" + template["formeLetter"].toLowerCase()
//                 if (template["forme"]==="Mega-X") num += "-x";
//                 if (template["forme"]==="Mega-Y") num += "-y";
                
//                 text += "<li class=\"" + type +"-hover analysis-hex\">";
//                 text += "   <div class=\"" + type +"-hover analysis-hex-inner\" data-species=\"" + mon + "\">";
//                 text += "       <img class=\"" + template["id"] + "\" src=\"https://dl.dropboxusercontent.com/u/101452974/smogon/images/dreamworld/" + num + ".png\" alt=\"" + template["species"] + "\" />";
//                 text += "   </div>";
//                 text += "</li>";
//             }
//         }
//         text += "</ul>";
//         $("#analysis-selection-container").html(text);
//         updateAnalysis(vRanks[currentType]["s"][0]);
//     }).fail(function(){
//         var text = "<ul id=\"analysis-selection-menu\">";
//         for(var rank in vRanks[type]) {
//             for (var i in vRanks[type][rank]){
//                 var mon = vRanks[type][rank][i];
                
//                 var template = getTemplate(mon)
//                 var num = template["num"];
//                 if (num < 100) num = paddy(num,3)
//                 if (template["forme"]) num += "-" + template["formeLetter"].toLowerCase()
//                 if (template["forme"]==="Mega-X") num += "-x";
//                 if (template["forme"]==="Mega-Y") num += "-y";
                
//                 text += "<li class=\"" + type +"-hover analysis-hex\">";
//                 text += "   <div class=\"" + type +"-hover analysis-hex-inner\" data-species=\"" + mon + "\">";
//                 text += "       <img class=\"" + template["id"] + "\" src=\"https://dl.dropboxusercontent.com/u/101452974/smogon/images/dreamworld/" + num + ".png\" alt=\"" + template["species"] + "\" />";
//                 text += "   </div>";
//                 text += "</li>";
//             }
//         }
//         text += "</ul>";
//         $("#analysis-selection-container").html(text);
//         updateAnalysis(vRanks[currentType]["s"][0])
//     })
// }

// function updateAnalysis(species) {
//     var template = getTemplate(species)
    
//     //sprite
//     $("#sprite-container").html("<img src=\"http://play.pokemonshowdown.com/sprites/xyani/" + template["spriteid"] + ".gif\" alt=\""+ species + "\" />");
    
//     var text = "";
//     //abilities
//     text += "<div>";
//     for (var tag in template["abilities"]) {
//         var ability = template["abilities"][tag];
//         var abilityLink = ability.split(' ').join('_').toLowerCase()
//         text += "   <a href=\"http://www.smogon.com/dex/xy/abilities/" + abilityLink + "\">" + ability  + "</a>";
//     }
//     text += "</div>";
//     $("#abilities-container").html(text);
    
//     //stats
//     google.charts.setOnLoadCallback(drawAxisTickColors);
//     function drawAxisTickColors() {
//           var data = google.visualization.arrayToDataTable([
//             ['Stat', 'Value',{ role: 'style' }],
//             ['HP: ' + template["baseStats"]["hp"], template["baseStats"]["hp"], colorStats(template["baseStats"]["hp"])],
//             ['Atk: ' + template["baseStats"]["atk"], template["baseStats"]["atk"], colorStats(template["baseStats"]["atk"])],
//             ['Def: ' + template["baseStats"]["def"], template["baseStats"]["def"], colorStats(template["baseStats"]["def"])],
//             ['SpA: ' + template["baseStats"]["spa"], template["baseStats"]["spa"], colorStats(template["baseStats"]["spa"])],
//             ['SpD: ' + template["baseStats"]["spd"], template["baseStats"]["spd"], colorStats(template["baseStats"]["spd"])],
//             ['Spe: ' + template["baseStats"]["spe"], template["baseStats"]["spe"], colorStats(template["baseStats"]["spe"])]
//           ]);
    
//           var options = {
//             chartArea: {width: 800, left: "80",},
//             axisTitlesPosition: "none",
//             backgroundColor: "transparent",
//             legend: { position: "none"},
//             enableInteractivity: false,
//             hAxis: {
//               minValue: 0,
//               gridlines: {
//                   count: 5
//               },
//               viewWindow: {
//                   max: 180,
//               }
//             },
//             vAxis: {
//               title: 'City',
//               baselineColor: "red",
//               textStyle: {
//                 fontSize: 14,
//                 bold: true,
//                 color: 'black'
//               },
//             }
//           };
//           var chart = new google.visualization.BarChart(document.getElementById('stats-container'));
//           chart.draw(data, options);
//     }
    
//     // analysis info
//     $.get("/tiers/om/monotype/analyses/" + currentType + "/" + species + "/overview.txt")
//     .done(function (data){
//         var text = "<h3>Overview</h3><p>" + data + "</p>";
//         $("#overview-container").html(text);
        
//         //sets
//         // $.post( "/tiers/om/monotype/analyses/get-sets.php", { "type": currentType, "mon": species})
//         // .done(function(data) {
        
//             // var sets = JSON.parse(data);
//             var sets = analyses[currentType][species]["sets"];
//             var tabs = $("#sets-container").tabs();
            
//             var text = "";
//             for(var s in sets) {
//                 text += "<li><a href=\"analyses/" + currentType + "/" + species + "/sets/" + sets[s] + "\">" + sets[s].replace(".txt","").split("_").join(" ") + "</a> </li>";
//             }
//             text += "<li><a href=\"analyses/contribute.txt\">Contribute!</a></li>";
//             $("#sets-container ul").html(text);
//             tabs.tabs( "refresh" );
//             $("#sets-container").tabs({ active: 0 });
//         // }).fail(function(e){
//         //     console.log(e)
//         // })
        
//         //checks
//         // $.post( "/tiers/om/monotype/analyses/get-checks.php", { "type": currentType, "mon": species})
//         // .done(function(data) {
//             // var checks = JSON.parse(data);
//             var checks = analyses[currentType][species]["checks"];
//             var text = "<h3>Checks and Counters</h3>";
//             for(var c in checks) {
//                 var file = checks[c];
//                 var type = file.substring(0,file.length-4).split('_')[0]
//                 var mon = file.substring(0,file.length-4).split('_')[1]
//                 text += "<div class=\"check-container " + type + "\">"
//                 text += "   <img src=\"http://play.pokemonshowdown.com/sprites/xy/" + mon + ".png\" alt=\"" + mon + "\"/>"
//                 $.ajax({ 
//                     url: "/tiers/om/monotype/analyses/" + currentType + "/" + species + "/checks/" + file, 
//                     async: false,
//                     dataType: 'text',
//                     success: function(response) {
//                         text += "   <p>" + response + "</p>"
//                     }
//                 });
//                 text += "</div>";
//             }
//             $("#checks-container").html(text);
//         // }).fail(function(e){
//         //     console.log(e)
//         // })
//     })
//     .fail(function (e) {
//         $("#overview-container").html("<h3>We currently don't have an analysis for this Pok&eacute;mon.</h3><p>Check out <a href=\"http://www.smogon.com/forums/threads/monotype-analyses-mega-thread.3572885/\">this thread</a> on the forums to contribute to this project.");
//         $("#sets-container ul").html("");
//         $("#sets-container").tabs({ active: -1 });
//         $("#checks-container").html("");
//     })
// }