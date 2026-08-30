// Clicking a thumbnail loads it into the pane below the gallery, along with
// the title and the artist the thumbnail carries. Clicking the one that is
// already showing closes the pane.
//
//     <div class="gallery">
//       <img src="..." data-title="PU Victim of the Week" data-artist="Anty" />
//     </div>
//     <div class="gallery-viewer">
//       <img /><p>'<span id="art-title"></span>' by <span id="art-artist"></span></p>
//     </div>

$(document).ready(function () {
    var FADE_MS = 400;

    $('.gallery img').on('click', function () {
        var $self = $(this);
        var $viewer = $('.gallery-viewer');

        if ($self.hasClass('selected')) {
            $self.removeClass('selected');
            $viewer.hide(FADE_MS);
            return;
        }

        // The pane closes before it changes, so the reader never sees one
        // picture's title over another picture.
        $viewer.hide(FADE_MS, function () {
            $('.gallery img').removeClass('selected');
            $self.addClass('selected');
            $viewer.find('img').attr('src', $self.attr('src'));
            $viewer.find('p #art-title').text($self.data('title'));
            $viewer.find('p #art-artist').text($self.data('artist'));
            $viewer.show(FADE_MS);
        });
    });
});
