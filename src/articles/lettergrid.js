function createLetterGrid(){$(".lettergrid").children().remove(),lettergrid||(lettergrid=[""]);for(var t="<table>",e=0,r=lettergrid.length;e<r;e++){t+="<tr>";for(var l=0,i=lettergrid[e].length;l<i;l++)t+='<td class="lettergrid-click">'+lettergrid[e][l].toUpperCase()+"</td>";t+="</tr>"}t+="</table>",t+='<div style="text-align: center"><button onclick="createLetterGrid()">Reset Puzzle</button></div>',$(".lettergrid").append(t);var o="rgba(44, 44, 128, 0.5)",c=!1;$(".lettergrid-click").mousedown(function(t){t.preventDefault(),t.stopPropagation(),c=!0}),$("lettergrid-click").mouseup(function(){c=!1}),$("body").mouseup(function(){c=!1}),$(".lettergrid-click").mouseenter(function(t){c&&(this.style.backgroundColor=o)}),$(".lettergrid-click").mouseleave(function(t){c&&(this.style.backgroundColor=o)}),$(".lettergrid-click").click(function(){this.style.backgroundColor?this.style.backgroundColor="":this.style.backgroundColor=o})}createLetterGrid();