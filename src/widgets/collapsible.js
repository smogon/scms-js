// Clicking a toggle opens the section beneath it, by taking the cap off that
// section's height and letting the page's own transition run.
//
//     <button class="hideTag">Show</button>
//     <div class="content"> ... </div>
//
// The page supplies the look: `max-height: 0; overflow: hidden` with a
// transition on the section, and whatever `.active` marks the open toggle
// with. Closed is the inline max-height being empty -- never the computed
// one, which reads 0px on a closed section and would invert every click.
//
// window.scmsJSON.collapsible, both optional:
//   labels  A pair, ["closed", "open"], for a toggle whose caption is also its
//           state. Absent leaves the caption alone, which is what a toggle
//           reading "Gen 8" wants.
//   slack   Pixels added to the measured height of an open section, for a page
//           whose sections measure short.
//
// The only file here with no jQuery in it, because the ten copies it replaces
// had none either.

document.addEventListener('DOMContentLoaded', function () {
    var config = (window.scmsJSON && window.scmsJSON.collapsible) || {};
    var labels = config.labels;
    var slack = Number(config.slack) || 0;

    var toggles = document.getElementsByClassName('hideTag');
    for (var i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener('click', function () {
            var open = this.classList.toggle('active');
            if (labels && labels.length === 2) this.textContent = open ? labels[1] : labels[0];

            var content = this.nextElementSibling;
            if (!content) return;
            if (content.style.maxHeight) content.style.maxHeight = null;
            else content.style.maxHeight = content.scrollHeight + slack + 'px';
        });
    }
});
