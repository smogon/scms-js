/* By: Setsuna @ http://www.smogon.com/forums/member.php?u=32828 */

$(document).ready(function () {
    
    $('<div>' + '<img src="/media/competitor/logo.png" class="logo" alt="" />' + '</div>').prependTo('#section');
    $('<p>' + '<img src="/media/competitor/news_item.png" class="news" alt="" />' + '</p>').insertBefore('.article > h2').addClass('align-left');
    $('<img src="/media/competitor/date_icon.png" alt="" />').prependTo('h3').addClass('date-icon');
    $('<img src="/media/competitor/dotted_line.png" alt="" />').appendTo('.button').addClass('dotted-line');
    $('<hr />').insertAfter('.article > h2').addClass('separator');
    $('#section').css({
        'background-image': 'url("/media/competitor/background.png")',
        'background-position': '725px 40px',
        'background-repeat': 'repeat-y',
        'background-attachment': 'fixed'
    });

    // Articles hover(over, out)
    $('.article').hover(
        function () {
            $(this).addClass('article-hover');
        }, 
        function () {
            $(this).removeClass('article-hover');
        }
    );
    
    // Handle additional paragraphs and format the buttons
    $('.entry').each(function () {
            var $this = $(this),
            $pElements = $this.find('p');

        if ($pElements.length > 2) {
            $('<div/>').addClass('slide-content').appendTo(this).append($pElements.slice(2));
            $this.find('p:eq(1)').append(' [...]');
            $this.find('.button').addClass('revealer');
            $this.find('.button > a').attr('href', '#').text('Read more');
        } else if ( ($pElements.length <= 2) && ($this.find('a[href*="tournaments"]').length) ) {
            $this.find('.button > a').text('Visit the Site');
        } else if ( ($pElements.length <= 2) && ($this.find('a[href*="articles"]').length) ) {
            $this.find('.button > a').text('Read the article');
        } else if ( ($pElements.length <= 2) && ($('a[href*="forums"]', $this).length) ) {
            $this.find('.button > a').text('Visit the Thread');
        }
    });
  
    // Hide content and display it upon button click
    $('.slide-content').hide();
    $('.revealer').click(function () {
        $(this).hide();
        $(this).next().append('<hr class="bottom-line" />').fadeIn(1700);   
    });
      
    // Run Search/Replace for single instances of "[...]" upon button click
    function replace(fromParagraph) {
        
        var textReplace = fromParagraph.text();
        fromParagraph.text(textReplace.replace('[...]', '')); 
    }
    
    $('.revealer').click(function () {
        var fromParagraph = $(this).siblings().eq(1);
        replace(fromParagraph);
        return false;
    });
    
    // Check for incorrectly positioned images
    $('.article').each(function () {
        $(this).find('img').not('.news, .date-icon, .dotted-line').remove();
    });
    
    // Check for incorrectly positioned header tags
    $('.entry').each(function () {
        
        var $headerOneContent = $(this).find('h1').html();
        $(this).find('h1').replaceWith('<h4>' + $headerOneContent + '</h4>');
        
        var $headerTwoContent = $(this).find('h2').html();
        $(this).find('h2').replaceWith('<h4>' + $headerTwoContent + '</h4>');
        
        var $headerThreeContent = $(this).find('h3').html();
        $(this).find('h3').replaceWith('<h4>' + $headerThreeContent + '</h4>');
    });
    
    // Footer section
    var footerTextLeft = '<li class="left">Contact Staff: <a href="/forums/members/108993/">Jellicent</a> | <a href="/forums/members/30562/">Toast++</a> | <a href="/forums/members/110102/">Zebraiken</a> | <a href="/forums/members/79332/">Redew</a></li>';
    var footerTextMiddle = '<li class="middle"><a href="#section">Back to Top</a></li>';
    var footherTextRight = '<li class="right">Developed and designed by <a href="http://www.smogon.com/forums/member.php?u=32828">Setsuna</a> and <a href="http://www.smogon.com/forums/member.php?u=2231">Zracknel</a></li>';
    
    $('#comp-footer').html('<ul>' + footerTextLeft + footerTextMiddle + footherTextRight + '</ul>').addClass('footer-list');
    
    // Footer's positioning on load and scroll events
    $(window).bind('load', function () {       
        
        positionFooter(); 
        
        function positionFooter() {
            
            if ( $(document.body).height() + $('#comp-footer').height() > $(window).height() ) {
                $('#comp-footer').css({
                    'position': 'fixed',
                    'bottom': '0',
                    'left': '0',
                    'right': '0'
                });
            } else {
                $('#comp-footer').css({
                    'position': 'static'
                });
            }
        }
 
        $(window)
            .scroll(positionFooter)
            .resize(positionFooter);
    });
    
    $('.middle').click(function () {
        $('body, html').animate({
            scrollTop: 0}, 800);
        return false;
    });
    
    // Something to expand on in the future
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
        $('#section').removeAttr('style');
        $('div > img.logo').replaceWith('<div class="logo-ios">' + '<img src="/media/competitor/logo_ios.png" alt="" />' + '</div>');
        $('<h2>Smogon\'s Official Tournament Coverage</h2>').appendTo('div.logo-ios').addClass('ios-slogan'); 
        $('.article').css({
            'width': '820px'
        });
        $('#comp-footer').css({
            'height': '20px'
        });
    }
    
    if ( ($.browser.msie) && (parseInt($.browser.version) < 9) ) {
        $.prompt('It appears you are using an old version of Internet Explorer, so you will not be able to enjoy all the features in this page \u2014 please upgrade to IE9. However, we strongly recommend that you switch instead to the latest version of <a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a>, <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, <a href="http://www.opera.com/download/">Opera</a> or <a href="http://www.apple.com/safari/">Safari</a> to view this web page. You can now dismiss this alert.', { show: 'slideDown' });
    }
    
    // Fix For IE's width rendering
    if ($.browser.msie) {
        $('#comp-footer').css({
            'margin': '',
            'margin-left': '10px'
        });
    }

});
