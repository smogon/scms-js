// Up up down down left right left right B A, and the note from the editor
// fills with emoticons: one per 40,000 square pixels of window, each drifting
// to a new place and a new face every second or three.
//
// The page supplies #emoticons to put them in and .emote-style-0 through -3 to
// dress them.

$(document).ready(function () {
    var KONAMI = '38,38,40,40,37,39,37,39,66,65';
    var FACES = [':O!', '^_^', 'u_u!', 'xD', ':p', '!_!', '-_-', '>_>!', '.-.',
                 '9.9', '?_?', ':O!!!!!!!', '*_*', '._.', '?_?', ':D', ':)'];

    var $swarm = $('#emoticons');
    if ($swarm.length === 0) return;

    var placed = 0;

    function emote() {
        var index = placed++;
        $swarm.append('<div id="emote-' + index + '" class="emote-style-' + (index % 4) + '"></div>');
        var $element = $('#emote-' + index);

        function cycle() {
            $element.hide({duration: 250, complete: function () {
                $element.html(FACES[Math.floor(Math.random() * FACES.length)]);
                $element.css('top', Math.floor(Math.random() * document.documentElement.clientHeight))
                        .css('left', Math.floor(Math.random() * document.documentElement.clientWidth));
                $element.show({duration: 250, complete: function () {
                    setTimeout(cycle, Math.floor(Math.random() * 2000 + 1000));
                }});
            }});
        }

        cycle();
    }

    var pressed = [];
    $(document).on('keydown', function listen(e) {
        pressed.push(e.keyCode);
        if (pressed.toString().indexOf(KONAMI) >= 0) {
            $(document).off('keydown', listen);
            var count = Math.floor(document.documentElement.clientHeight *
                                   document.documentElement.clientWidth / 40000);
            for (var i = 0; i < count; i++) emote();
        } else if (pressed.length > 100) {
            // Keep the tail: the code could be spread across the last of it.
            pressed = pressed.slice(89);
        }
    });
});
