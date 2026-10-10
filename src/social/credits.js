// The contributor list links every name to its forum profile. A name is
// usually its own profile path, so the page carries only the ones that are
// not, and this reads them from [json]:
//
//     [json]
//     {credits: {'Toast++': '30562', 'Halcyon.': '171894'}}
//
// A <dt> marked .skip-link is a heading rather than a name and is left alone.
//
// The page also carries a #to-top link, which slides in once the reader is far
// enough down to want it.

$(document).ready(function () {
    var exceptions = (window.scmsJSON && window.scmsJSON.credits) || {};

    $('#content_wrapper dt').not('.skip-link').each(function () {
        var name = this.textContent;
        // hasOwnProperty rather than a truth test: a contributor called
        // "constructor" would otherwise link to Object's.
        var member = Object.prototype.hasOwnProperty.call(exceptions, name)
            ? encodeURIComponent(String(exceptions[name])) : encodeURI(name);
        // The name's own nodes move into the link; nothing is parsed as html.
        var link = document.createElement('a');
        link.href = '/forums/members/' + member;
        link.target = '_blank';
        while (this.firstChild) link.appendChild(this.firstChild);
        this.appendChild(link);
    });

    // Pixels scrolled before the link is worth offering.
    var CUTOFF = 500;

    var $document = $(document);
    var $toTop = $('#to-top');
    var showing = false;

    $document.on('scroll', function () {
        if ($document.scrollTop() > CUTOFF) {
            if (!showing) $toTop.slideDown(200, function () { showing = true; });
        } else {
            $toTop.slideUp(200, function () { showing = false; });
        }
    });
});
