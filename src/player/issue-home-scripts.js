/*
 *  The Player issue homepage scripts
 *  By Quarkz (http://www.smogon.com/forums/members/quarkz.206020/) and Quinella (http://www.smogon.com/forums/members/quinella.195572/)
 *  Last update by Quarkz (31/07/2014)
 */

$(document).ready(function(){
	// Toggle mobile/desktop stylesheets
	var desktopClient = true;
	$('#toggle').click(function(){
		if (desktopClient){
			// Change stylesheets
			$('<link>')
				.attr('id', 'mobile')
				.attr('rel', 'stylesheet')
				.attr('type', 'text/css')
				.attr('href', '/player/issue-home-mob.css')
				.insertAfter($('#scripts'));
			$('#desktop').remove();
			$('.leftcolumn').css({position:"inherit", margin: "0px"});
			desktopClient = false;
			$('#toggle').text('Activate Desktop Client');
			
			// Redirect clicks on .article or .star divs to the appropriate pages
			$(".article, .star").on('click', function(){
				window.location = $(this).find("a").attr("href"); 
			});
		} else {
			// Change stylesheets
			$('<link>')
				.attr('id', 'desktop')
				.attr('rel', 'stylesheet')
				.attr('type', 'text/css')
				.attr('href', '/player/issue-home.css')
				.insertAfter($('#scripts'));
			$('#mobile').remove();
			desktopClient = true;
			$('#toggle').text('Activate Mobile Client');
			// Remove the redirect
			$('.article, .star').off('click');
		}
	});
	
	// Detect if a mobile device is being used and set up the page accordingly
    if (navigator.userAgent.match(/iPad|iPhone|iPod|Android|BlackBerry|webOS/i)){
		$('#toggle').trigger('click');
		$('.leftcolumn').css({position:"inherit", margin: "0px"});
	} else {
		$('#mobile').remove();
        var $leftcolumn = $(".leftcolumn");
        var $issuebacking = $("#issuebacking");
        var spacing = $leftcolumn.offset().top - $issuebacking.offset().top;
        var top = $leftcolumn.offset().top;
		$(window).scroll(function(){
			if ($(window).scrollTop() > $issuebacking.offset().top && desktopClient){
				 $leftcolumn.css({position:"fixed", top: spacing});
			} else {
				$leftcolumn.css({position:"inherit", margin: "0px"});
			}
		});
		$('#toggle').text('Activate Mobile Client');
    }
});