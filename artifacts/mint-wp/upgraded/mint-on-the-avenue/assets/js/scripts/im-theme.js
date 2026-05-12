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
// Services
*******************************/
$( ".loadtestimonials" ).click(function(e) {
    (e).preventDefault();
    var testcat = $(this).attr('href');
    if (!$(this).hasClass('active')) {
        $('.loadtestimonials').removeClass('active');
        $(this).addClass('active');
    }
    if ($('body').hasClass('mobile')) {
        $(testcat).foundation('reveal', 'open', {
          animation: 'fade',
          animation_speed: 300,
        });
    }
    else {
        if ($(testcat).is(":hidden"))  {    // you get the idea...
            $('.testimonial-content').slideUp("fast");
        }
        $(testcat).slideDown( "slow", function() {});
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