<?php
function site_scripts() {
  global $wp_styles; // Call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way

    // Load What-Input files in footer
    wp_enqueue_script( 'what-input', get_template_directory_uri() . '/vendor/what-input/what-input.min.js', array(), '', true );
    
    // Adding Foundation scripts file in the footer
    wp_enqueue_script( 'foundation-js', get_template_directory_uri() . '/assets/js/foundation.js', array( 'jquery' ), '6.2', true );

    // Comment reply script for threaded comments
    if ( is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
      wp_enqueue_script( 'comment-reply' );
    }



    /*****************************
    ***** Optional Resources *****
    *****************************/

    // Foxycart (gift cards / deals)
   /* wp_enqueue_script( 'validate-js', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.1/jquery.validate.min.js', array( 'jquery' ), '6.2', true );
    wp_enqueue_script( 'foxy-js', get_template_directory_uri() . '/assets/js/foxy.js', array( 'jquery' ), '', true );
    function foxycart_load() {
        echo '<script src="//cdn.foxycart.com/jolidayspa/loader.js" async defer></script>';
    } add_action('wp_footer', 'foxycart_load');*/

    // Isotope (filtering)
    wp_enqueue_script( 'isotope-js',  'https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.2.2/isotope.pkgd.min.js', array( 'jquery' ), '1.0', true );

    // Cycle 2 (carousel / slideshow)
    wp_enqueue_script( 'jcycle-js', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.cycle2/2.1.6/jquery.cycle2.min.js', array( 'jquery' ), '', true );
/*
    // Featherlight (lightbox / gallery)
    wp_enqueue_script( 'featherlight-js', 'https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.5.0/featherlight.min.js', array( 'jquery' ), '', true );
    wp_enqueue_style( 'featherlight-css', 'https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.5.0/featherlight.min.css', array(), '', 'all' );
    wp_enqueue_script( 'feathergallery-js', 'https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.5.0/featherlight.gallery.min.js', array( 'jquery' ), '', true );
    wp_enqueue_style( 'feathergallery-css', 'https://cdnjs.cloudflare.com/ajax/libs/featherlight/1.5.0/featherlight.gallery.min.css', array(), '', 'all' );*/

    // Slick (carousel / slideshow)
    wp_enqueue_script( 'slick-js', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.7.1/slick.min.js', array( 'jquery' ), '', true );
    wp_enqueue_style( 'slick-css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.7.1/slick.min.css', array(), '', 'all' );

    // IMAGINAL THEMES
    
    // Adding scripts file in the footer
    wp_enqueue_script( 'site-js', get_template_directory_uri() . '/assets/js/scripts.min.js', array( 'jquery' ), '', true );
   
    // Register main stylesheet
    wp_enqueue_style( 'site-css', get_stylesheet_directory_uri() . '/assets/css/style.min.css', array(), '', 'all' );

    // Register theme stylesheet
    wp_enqueue_style( 'theme-css', get_template_directory_uri() . '/assets/css/im-theme-styles.css', array(), '', 'all' );



}
add_action('wp_enqueue_scripts', 'site_scripts', 999);