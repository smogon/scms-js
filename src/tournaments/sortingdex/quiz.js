// The walk through a Sorting Dex quiz: one question on screen, the next one
// when an answer is clicked, the result when the answers run out. Both parts
// wrote this inline, and the only thing that differed between them was the
// tally kept -- part 1 counts the houses an answer feeds, part 2 adds a signed
// weight to the stat its question names.
//
// questions.js holds both question sets and sortingdex.js builds the page of
// them and prints the result. This is the walk between the two, so its tag
// goes below theirs.
//
//     [json]
//     {quiz: {kind: 'house'}}
//
// kind   'house' for part 1, 'dex' for part 2. Anything else binds nothing.
// then   HTML appended under the result. Part 1 sends the reader on to part 2
//        with it; part 2 ends there and writes none.
//
// The counter reads the question on screen. Part 1 wrote the one behind it, so
// it opened on 1 and stayed there for the first two questions.

$(document).ready(function () {
    var KINDS = {
        house: {
            questions: function () { return window.HouseQuestions; },
            build: function (questions) { return window.buildHouseQuestions(questions); },
            result: function (tally) { return window.getHouseResult(tally); },
            // The crests and portraits getHouseHtml prints, fetched while the
            // reader is still answering so the result lands whole.
            preload: ['abra-large.png', 'abraccus.png', 'dmater-large.png', 'dmater.png',
                      'victorium-large.png', 'victorium.png'],
            start: function () { return {a: 0, i: 0, v: 0}; },
            // An answer carries every house it feeds, one letter each.
            score: function (tally, $answer) {
                var houses = $answer.attr('data-house') || '';
                for (var i = 0; i < houses.length; i++) tally[houses.charAt(i)]++;
            }
        },
        dex: {
            questions: function () { return window.DexQuestions; },
            build: function (questions) { return window.buildSortingDex(questions); },
            result: function (tally) { return window.getDexResult(tally.stats, tally.tiebreakers); },
            preload: ['n.png', 'c.png', 'p.png', 'r.png', 'x.png', 'v.png', 'e.png', 'o.png'],
            start: function () {
                return {stats: {n: 0, c: 0, p: 0, r: 0, x: 0, v: 0, e: 0, o: 0}, tiebreakers: {}};
            },
            // A question names the stat it weighs; an answer carries how much.
            // A question that names none is filler and scores nothing.
            score: function (tally, $answer, question) {
                if (!question.w) return;
                var weight = parseInt($answer.attr('data-weight'), 10);
                tally.stats[question.w] += weight;
                if (question.tiebreaker) tally.tiebreakers[question.w] = weight;
            }
        }
    };

    var config = (window.scmsJSON && window.scmsJSON.quiz) || {};
    var kind = KINDS[config.kind];
    var $quiz = $('#sortingquiz');
    if (!kind || $quiz.length === 0) return;

    var questions = kind.questions();
    if (!questions) return;

    var tally = kind.start();
    window.preloadImages(kind.preload);

    $quiz.html(kind.build(questions));
    var $questions = $quiz.find('div.question');
    $questions.not(':first').hide();
    $('.progress').html('<p><span class="quiz-progress">1</span> / ' + questions.length + '</p>');

    $quiz.find('input.alternative').on('click', function () {
        var $answer = $(this);
        var $question = $answer.parent();
        // The question's id is its place in the set, which is also its place
        // among the divs that were built from it.
        var index = parseInt($question.attr('id'), 10);

        kind.score(tally, $answer, questions[index]);

        if (index + 1 < questions.length) {
            $question.hide();
            $questions.eq(index + 1).show();
            $('.quiz-progress').text(index + 2);
        } else {
            $quiz.html(kind.result(tally));
            $('.progress').remove();
            if (config.then) $quiz.append(config.then);
        }
    });
});
