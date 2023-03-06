/* Made by Quite Quiet */
function createEeveeGrid(sudokuLayout) {
	$('.eeveelutions').children().remove();
	if (!sudokuLayout) return;
	var imageMap = {
		'n':'https://play.pokemonshowdown.com/sprites/bw/eevee.png',
		'j':'https://play.pokemonshowdown.com/sprites/bw/jolteon.png',
		'f':'https://play.pokemonshowdown.com/sprites/bw/flareon.png',
		'v':'https://play.pokemonshowdown.com/sprites/bw/vaporeon.png',
		'u':'https://play.pokemonshowdown.com/sprites/bw/umbreon.png',
		'e':'https://play.pokemonshowdown.com/sprites/bw/espeon.png',
		'g':'https://play.pokemonshowdown.com/sprites/bw/glaceon.png',
		'l':'https://play.pokemonshowdown.com/sprites/bw/leafeon.png',
		's':'https://play.pokemonshowdown.com/sprites/bw/sylveon.png'
	};
	var directions = {
		'up'   : 'images/eeveelutions-up.png',
		'down' : 'images/eeveelutions-down.png',
		'left' : 'images/eeveelutions-left.png',
		'right': 'images/eeveelutions-right.png'
	};

	var html = '';
	for (var i = 0; i < 19; i++) {
		html += '<div class="eeveelutions-tr">';
		for (var j = 0; j < 19; j++) {
			html += '<div class="eeveelutions-td" style="background: no-repeat center/100%';
			var item = sudokuLayout.find(function(el) { return el.x == i && el.y == j;});
			if (item) {
				html += 'url(' + directions[item.dir] + ')';
			}
			html += ';" data-index="' + i + ',' + j + '"></div>';
		}
		html += '</div>';
	}
	html += '<div class="eeveelutions-options">' + Object.values(imageMap).map(function (value) {
		return '<div class="eeveelutions-image" style="background: no-repeat  center/100% url(' + value + ');"></div>';
	}).join('');
	html += '</div>';

	$('.eeveelutions').append(html);
	
	$('.eeveelutions-td').each(function (el) {
		if ($(this).css('background-image') !== 'none') {
			$(this).addClass('eeveelutions-arrow');
		}
	});

	// now for stuff
	$('.eeveelutions-td').each(function (i, el) {
		var index = $(el).data()['index'].split(',');
		var x = index[0], y = index[1];
		if (!(x % 2 && y % 2)) return;
		if ((x > 6 && x < 12 || y > 6 && y < 12) && !(x > 6 && x < 12 && y > 6 && y < 12))
			$(this).css('background-color', '#fbb');
		else
			$(this).css('background-color', '#cdf');
	});

	interact.dynamicDrop(true);
	interact('.eeveelutions-image').draggable({
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
	interact('.eeveelutions-td').dropzone({
		accept: '.eeveelutions-image',
		overlap: 'pointer',
		ondrop: function (e) {
			var index = $(e.target).data()['index'].split(',');
			if (index.some(function (e) { return e % 2 == 0; })) return;
			$(e.target).css('background-image', $(e.interaction.element).css('background-image'));
		}
	});
	$('.eeveelutions-td:not(.eeveelutions-arrow)').click(function () {
		$(this).css('background-image', 'none');
	});
}