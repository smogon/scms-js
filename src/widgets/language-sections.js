// The rules and privacy pages carry every translation at once, and this picks
// which one you are looking at: the one the URL fragment names, or the one
// your browser asks for, or English.
//
//     <ul class="lang-sel"><li><a href="#fr">Francais</a></li>...</ul>
//     <div class="language" id="en"> ... </div>
//     <div class="language" id="fr"> ... </div>
//
// The showing section wears `visible` and its link wears the id `current`;
// both are what the page's own stylesheet reads, so neither is this file's to
// rename.
//
// The sections are hidden from here rather than from the page's <style> on
// purpose. Every one of these documents says it has to work with scripting
// off, and that story is exactly "all the translations are on the page, and
// <a href="#fr"> is a fragment link to <div id="fr">". A display rule would
// take it away.

$(document).ready(function () {
    var $sections = $('.language');
    if ($sections.length === 0) return;

    $sections.hide();

    var language = window.location.hash
        ? window.location.hash.substring(1)
        : (window.navigator.userLanguage || window.navigator.language).substr(0, 2);

    var $shown = $('#' + language);
    if (!$shown.length) {
        $shown = $('#en');
        language = 'en';
    }
    $shown.addClass('visible').show();
    $('.lang-sel a[href="#' + language + '"]').attr('id', 'current');

    $('.lang-sel a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var href = $(this).attr('href');
        var $wanted = $(href);
        if ($wanted.hasClass('visible')) return;

        $('.visible').slideToggle(500, function () {
            $(this).removeClass('visible');
        });
        $wanted.addClass('visible').slideToggle(500);
        $('.lang-sel a[id="current"]').removeAttr('id');
        $('.lang-sel a[href="' + href + '"]').attr('id', 'current');
    });
});
