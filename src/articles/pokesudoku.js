/* Made by Quite Quiet */
function createGrid(sudokuLayout) {
	$('.pokesudoku').children().remove();
	if (!sudokuLayout) return;
	var imageMap = {
		'd':'https://play.pokemonshowdown.com/sprites/bw/durant.png',
		'h':'https://play.pokemonshowdown.com/sprites/bw/heatmor.png',
		'z':'https://play.pokemonshowdown.com/sprites/bw/zangoose.png',
		's':'https://play.pokemonshowdown.com/sprites/bw/seviper.png',
		'o':'https://play.pokemonshowdown.com/sprites/bw/oranguru.png',
		'p':'https://play.pokemonshowdown.com/sprites/bw/passimian.png',
		't':'https://play.pokemonshowdown.com/sprites/bw/tauros.png',
		'm':'https://play.pokemonshowdown.com/sprites/bw/miltank.png',
		'b':'https://play.pokemonshowdown.com/sprites/bw/bouffalant.png',
		' ':''
	};

	var html = '';
	for (var i = 0; i < 9; i++) {
		html += '<div class="pokesudoku-tr">';
		for (var j = 0; j < 9; j++) {
			html += '<div class="pokesudoku-td" style="background: no-repeat center/100%';
			if (imageMap[sudokuLayout[i][j]]) html += 'url(' + imageMap[sudokuLayout[i][j]] + ')'
			html += ';"></div>';
		}
		html += '</div>';
	}
	html += '<div class="pokesudoku-options">' + Object.values(imageMap).map(function (value) {
		if (!value) return;
		return '<div class="pokesudoku-image" style="background: no-repeat  center/100% url(' + value + ');"></div>';
	}).join('');
	html += '</div>';

	$('.pokesudoku').append(html);

	// now for stuff
	$('.pokesudoku-td').each(function (el) {
		if ($(this).css('background-image') !== 'none') {
			$(this).addClass('pokesudoku-original');
			$(this).css('background-color', '#ddd');
		}
	});

	interact.dynamicDrop(true);
	interact('.pokesudoku-image').draggable({
		manualStart: true,
		restrict: {
			restriction: window
		},
		onmove: function (e) {
			var target = e.target,
			// keep the dragged position in the data-x/data-y attributes
			x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx,
			y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;
			// translate the element
			target.style.webkitTransform =
			target.style.transform =
				'translate(' + x + 'px, ' + y + 'px)';
			// update the posiion attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		onend: function (e) {
			$(e.currentTarget).remove();
		}
	}).on('move', function (e) {
		var interaction = e.interaction;
		if (interaction.pointerIsDown && !interaction.interacting() && e.currentTarget.getAttribute('clonable') != 'false') {
			var original = e.currentTarget;
			var clone = e.currentTarget.cloneNode(true);
			var x = clone.offsetLeft;
			var y = clone.offsetTop;
			clone.setAttribute('clonable', 'false');
			clone.style.position = "absolute";
			clone.style.left = original.offsetLeft + 'px';
			clone.style.top = original.offsetTop + 'px';
			clone.style.border = '0';
			original.parentElement.appendChild(clone);
			interaction.start({name: 'drag'}, e.interactable, clone);
		}
	});
	interact('.pokesudoku-td:not(.pokesudoku-original)').dropzone({
		accept: '.pokesudoku-image',
		overlap: 'pointer',
		ondrop: function (e) {
			$(e.target).css('background-image', $(e.interaction.element).css('background-image'));
		}
	});
	$('.pokesudoku-td:not(.pokesudoku-original)').click(function () {
		$(this).css('background-image', 'none');
	});
}