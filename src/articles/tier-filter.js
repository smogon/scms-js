// The prospect report's filter: choosing a generation from the dropdown leaves
// the players who list it and takes the rest away.
//
//     <select id="tier-filter">
//       <option value="">All</option>
//       <option value="SV">SV OU</option>
//     </select>
//     <ol class="rankings">
//       <li><div class="player"> ... <p class="tiers">Tiers: DPP OU, GSC OU</p></div>
//           <div class="tours"> ... </div></li>
//     </ol>
//
// An option's value is matched inside the entry's .tiers line, so "SV" finds
// "SV OU" and the empty value finds everything.

$(document).ready(function () {
    var $filter = $('#tier-filter');
    if ($filter.length === 0) return;

    $filter.on('change', function () {
        var wanted = this.value;
        $('.player .tiers').each(function () {
            // The whole entry, which is the player's card and the run beside it.
            $(this).closest('li').toggle(!wanted || $(this).text().indexOf(wanted) >= 0);
        });
    });
});
