// The call that draws a crossword, off the seventeen documents that each
// pasted its own puzzle in beside it. The seventeen calls were identical; what
// differed was the word list, and a word list is the puzzle rather than code,
// so it moves to [json]:
//
//     {"crossword": [
//         {"word": "xxxxxxxxx", "clue": "Fishy business ... (9)",
//          "location": {"column": 7, "row": 1}, "direction": "across"}
//     ]}
//
// A clue is HTML. crossword.min.js writes it into the list with innerHTML, and
// a handful of them lean on that for an accented letter or an em dash.
//
// No jQuery: seven of these pages load none, and this needs none. The tag goes
// where the snippet was, in [page] below the #puzzle it fills and below the
// library it calls, so the element, the constructor and window.scmsJSON are
// all there by the time it runs -- which is why there is no ready wrapper.

(function () {
    var words = window.scmsJSON && window.scmsJSON.crossword;
    var element = document.getElementById('puzzle');
    if (!words || !element) return;
    // autosort:false: the clues are listed in the order the document wrote
    // them, which is the order they are numbered in.
    new Crossword({words: words, element: element, autosort: false});
})();
