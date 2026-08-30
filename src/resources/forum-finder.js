// The questionnaire on /resources/beginner/: a stack of steps, one showing at
// a time, ending in a list of the forums that match what the reader said.
//
//     <div class="tab"><h3>I'm most interested in:</h3>
//       <input type="button" value="Competitive"  data-goto="1" />
//       <input type="button" value="Socializing"  data-forum-links="social" />
//     </div>
//     <button id="prevBtn" data-goto-back><span> Back</span></button>
//     <div id="linkOut"></div>
//
// data-goto        The step this button leads to, counting from zero.
// data-goto-back   The button that walks the history back.
// data-forum-links The key in scmsJSON.forumFinder whose links to print.
//
// window.scmsJSON.forumFinder is the table: a key per answer, each an array of
// {href, text}. It is data rather than markup because it is a table of forums
// -- nothing about it is on the page until somebody answers a question.

document.addEventListener('DOMContentLoaded', function () {
    var table = (window.scmsJSON && window.scmsJSON.forumFinder) || {};

    var steps = document.getElementsByClassName('tab');
    var out = document.getElementById('linkOut');
    if (steps.length === 0 || !out) return;

    var back = document.querySelector('[data-goto-back]');
    var current = 0;
    // The steps walked through to get here, so Back can retrace them. The
    // questionnaire branches, so this is a stack and not `current - 1`.
    var history = [];

    function show(n) {
        for (var i = 0; i < steps.length; i++) steps[i].style.display = i === n ? 'block' : 'none';
        out.innerHTML = '';
        if (back) back.style.display = n === 0 ? 'none' : 'inline';
        current = n;
    }

    function outputLinks(key) {
        out.innerHTML = '';
        var heading = document.createElement('h3');
        heading.textContent = 'Matched Results';
        out.appendChild(heading);

        var found = table[key] || [];
        for (var i = 0; i < found.length; i++) {
            var link = document.createElement('a');
            link.href = found[i].href;
            link.target = '_blank';
            link.textContent = found[i].text;
            out.appendChild(link);
            if (i < found.length - 1) out.appendChild(document.createElement('br'));
        }
    }

    var controls = document.querySelectorAll('[data-goto], [data-goto-back], [data-forum-links]');
    for (var c = 0; c < controls.length; c++) {
        controls[c].addEventListener('click', function () {
            var links = this.getAttribute('data-forum-links');
            if (links !== null) { outputLinks(links); return; }

            if (this.hasAttribute('data-goto-back')) {
                if (history.length === 0) return;
                show(history.pop());
                return;
            }

            var next = Number(this.getAttribute('data-goto'));
            // Only a step forward is worth retracing.
            if (current <= next) history.push(current);
            show(next);
        });
    }

    show(0);
});
