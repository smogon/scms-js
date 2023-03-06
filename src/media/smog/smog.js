$(document).ready(function () {

	// Transitions
	$(function(){
			if(typeof($.browser.msie) !== 'undefined')
			{
				//for browsers without transitions - IE!
				$('.issue img').hover(function() {
					$(this).animate({
						//This reflects .issue-cover:hover
	        			"width" : "110%",
	        			"margin": "-5%"
	    			}, 200)
				}, function() {
	    			$(this).animate({
	    				//This reflects #past-issues .issue img
	        			"width" : "100%",
	        			"margin": "0%"
	    			}, 200)
				});
			} else {
				$('.issue img').addClass("issue-cover").addClass("transition");
			}
		});
});