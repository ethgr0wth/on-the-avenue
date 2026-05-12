jQuery.noConflict();
(function($) {
$( document ).ready(function() {
// andherewego.exe



/*******************************
// mobile subnavigation
*******************************/
$('.opensub').click(function(event){
    $(this).toggleClass('open');
    $('#sidenav').slideToggle('fast');
    if($('#sidenav').hasClass('open')) {
        $('#sidenav').removeClass('open');
    } else {
        $('#sidenav').addClass('open');
    }
});
	
	


/*******************************
// instafeed
*******************************/
$('#beginfeed').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
});



// Team Page
var $grid = $('#theteam');
$('#winter-park').trigger('click');
setTimeout(function(){
    $(window).trigger('resize');
    $('#winter-park').trigger('click');
    console.log('loaded everything');
    $grid.isotope('reloadItems');
    Foundation.reInit('equalizer');
    setTimeout(function(){
        $(window).trigger('resize');
        $grid.isotope('reloadItems');
        Foundation.reInit('equalizer');
    }, 1000);
}, 2000);

// Analytics event tracking
$('.ncd.downloadimg').click(function() {
    console.log('Image Click');
    gtag('event', 'Download', {
      'event_category': 'New Guest Offer',
      'event_label': 'Specials Image'
    });
});

$('.ncd.button').click(function() {
    console.log('Button Click');
    gtag('event', 'Download', {
      'event_category': 'New Guest Offer',
      'event_label': 'Specials Button'
    });
});

$('.ncd.promo').click(function() {
    console.log('Promo Click');
    gtag('event', 'Download', {
      'event_category': 'New Guest Offer',
      'event_label': 'Promo Button'
    });
});


// end it all
});
})(jQuery);
jQuery(document).foundation();
/*
These functions make sure WordPress
and Foundation play nice together.
*/

jQuery(document).ready(function() {

    // Remove empty P tags created by WP inside of Accordion and Orbit
    jQuery('.accordion p:empty, .orbit p:empty').remove();

	 // Makes sure last grid item floats left
	jQuery('.archive-grid .columns').last().addClass( 'end' );

	// Adds Flex Video to YouTube and Vimeo Embeds
  jQuery('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').each(function() {
    if ( jQuery(this).innerWidth() / jQuery(this).innerHeight() > 1.5 ) {
      jQuery(this).wrap("<div class='widescreen flex-video'/>");
    } else {
      jQuery(this).wrap("<div class='flex-video'/>");
    }
  });

});
