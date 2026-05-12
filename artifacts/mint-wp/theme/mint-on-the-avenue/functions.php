<?php
/**
 * Mint on the Avenue — functions.php
 * WP Engine compatible · Yoast SEO ready
 */

defined( 'ABSPATH' ) || exit;

define( 'MINT_VERSION', '2.0.0' );
define( 'MINT_DIR', get_template_directory() );
define( 'MINT_URI', get_template_directory_uri() );

/* ─── Theme Support ──────────────────────────────────────────────── */
function mint_setup() {
        load_theme_textdomain( 'mint-ota', MINT_DIR . '/languages' );

        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ] );
        add_theme_support( 'customize-selective-refresh-widgets' );
        add_theme_support( 'wp-block-styles' );
        add_theme_support( 'align-wide' );
        add_theme_support( 'editor-styles' );
        add_theme_support( 'responsive-embeds' );

        add_theme_support( 'custom-logo', [
                'height'      => 60,
                'width'       => 200,
                'flex-height' => true,
                'flex-width'  => true,
        ] );

        register_nav_menus( [
                'primary'   => __( 'Primary Navigation', 'mint-ota' ),
                'footer'    => __( 'Footer Navigation', 'mint-ota' ),
                'social'    => __( 'Social Links', 'mint-ota' ),
        ] );

        add_image_size( 'hero-full', 1920, 1080, true );
        add_image_size( 'editorial-portrait', 800, 1100, true );
        add_image_size( 'lookbook-card', 600, 800, true );
}
add_action( 'after_setup_theme', 'mint_setup' );

/* ─── Content Width ───────────────────────────────────────────────── */
function mint_content_width() {
        $GLOBALS['content_width'] = 1440;
}
add_action( 'after_setup_theme', 'mint_content_width', 0 );

/* ─── Enqueue Assets ─────────────────────────────────────────────── */
function mint_scripts() {
        // Google Fonts
        wp_enqueue_style(
                'mint-fonts',
                'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter+Tight:wght@300;400;500&display=swap',
                [],
                null
        );

        // Theme stylesheet
        wp_enqueue_style( 'mint-style', MINT_URI . '/assets/css/theme.css', [ 'mint-fonts' ], MINT_VERSION );

        // GSAP for scroll animations (replaces Framer Motion)
        wp_enqueue_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', [], '3.12.5', true );
        wp_enqueue_script( 'gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', [ 'gsap' ], '3.12.5', true );

        // Theme JS
        wp_enqueue_script( 'mint-theme', MINT_URI . '/assets/js/theme.js', [ 'gsap', 'gsap-scrolltrigger' ], MINT_VERSION, true );

        // Pass PHP data to JS
        wp_localize_script( 'mint-theme', 'MintData', [
                'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
                'nonce'     => wp_create_nonce( 'mint_nonce' ),
                'themeUri'  => MINT_URI,
                'isHome'    => is_front_page(),
        ] );

        if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
                wp_enqueue_script( 'comment-reply' );
        }
}
add_action( 'wp_enqueue_scripts', 'mint_scripts' );

/* ─── Editor Styles ──────────────────────────────────────────────── */
function mint_editor_styles() {
        add_editor_style( [
                'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter+Tight:wght@300;400;500&display=swap',
                'assets/css/theme.css',
        ] );
}
add_action( 'after_setup_theme', 'mint_editor_styles' );

/* ─── Widgets ────────────────────────────────────────────────────── */
function mint_widgets_init() {
        register_sidebar( [
                'name'          => __( 'Footer — Column 1', 'mint-ota' ),
                'id'            => 'footer-1',
                'description'   => __( 'First footer column widget area.', 'mint-ota' ),
                'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<h4 class="footer-widget__title micro-label">',
                'after_title'   => '</h4>',
        ] );
        register_sidebar( [
                'name'          => __( 'Footer — Column 2', 'mint-ota' ),
                'id'            => 'footer-2',
                'description'   => __( 'Second footer column widget area.', 'mint-ota' ),
                'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<h4 class="footer-widget__title micro-label">',
                'after_title'   => '</h4>',
        ] );
}
add_action( 'widgets_init', 'mint_widgets_init' );

/* ─── Local Business Schema (SEO) ────────────────────────────────── */
function mint_schema_local_business() {
        if ( ! is_front_page() ) return;
        $schema = [
                '@context'        => 'https://schema.org',
                '@type'           => 'HairSalon',
                'name'            => 'Mint on the Avenue',
                'url'             => 'https://mintontheavenue.com',
                'logo'            => MINT_URI . '/assets/images/logo.png',
                'image'           => MINT_URI . '/assets/images/hero.jpg',
                'description'     => 'An Aveda lifestyle salon on Park Avenue in Winter Park, Florida — color, cut, and care rooted in plant-based luxury.',
                'telephone'       => '+1-407-645-2264',
                'priceRange'      => '$$$',
                'servesCuisine'   => null,
                'address'         => [
                        '@type'           => 'PostalAddress',
                        'streetAddress'   => '228 N Park Ave',
                        'addressLocality' => 'Winter Park',
                        'addressRegion'   => 'FL',
                        'postalCode'      => '32789',
                        'addressCountry'  => 'US',
                ],
                'geo' => [
                        '@type'     => 'GeoCoordinates',
                        'latitude'  => 28.5996,
                        'longitude' => -81.3493,
                ],
                'openingHoursSpecification' => [
                        [
                                '@type'     => 'OpeningHoursSpecification',
                                'dayOfWeek' => [ 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ],
                                'opens'     => '09:00',
                                'closes'    => '20:00',
                        ],
                        [
                                '@type'     => 'OpeningHoursSpecification',
                                'dayOfWeek' => [ 'Saturday' ],
                                'opens'     => '09:00',
                                'closes'    => '18:00',
                        ],
                ],
                'sameAs' => [
                        'https://www.instagram.com/mintontheavenue',
                        'https://www.facebook.com/mintontheavenue',
                        'https://www.yelp.com/biz/mint-on-the-avenue-winter-park',
                ],
        ];
        echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ) . '</script>' . "\n";
}
add_action( 'wp_head', 'mint_schema_local_business' );

/* ─── Open Graph / Social Meta ──────────────────────────────────── */
function mint_social_meta() {
        if ( function_exists( 'wpseo_init' ) ) return; // Yoast handles it
        global $post;
        $title       = is_front_page() ? get_bloginfo( 'name' ) : get_the_title();
        $description = is_front_page()
                ? 'An Aveda lifestyle salon on Park Avenue in Winter Park, Florida.'
                : get_the_excerpt();
        $image       = is_singular() && has_post_thumbnail()
                ? get_the_post_thumbnail_url( $post->ID, 'hero-full' )
                : MINT_URI . '/assets/images/og-default.jpg';
        ?>
        <meta property="og:type"        content="<?php echo is_singular() ? 'article' : 'website'; ?>">
        <meta property="og:title"       content="<?php echo esc_attr( $title ); ?>">
        <meta property="og:description" content="<?php echo esc_attr( $description ); ?>">
        <meta property="og:image"       content="<?php echo esc_url( $image ); ?>">
        <meta property="og:url"         content="<?php echo esc_url( is_singular() ? wp_get_canonical_url() : home_url( add_query_arg( null, null ) ) ); ?>">
        <meta property="og:site_name"   content="Mint on the Avenue">
        <meta name="twitter:card"       content="summary_large_image">
        <?php
}
add_action( 'wp_head', 'mint_social_meta' );

/* ─── Excerpt Length ─────────────────────────────────────────────── */
function mint_excerpt_length( $length ) { return 28; }
add_filter( 'excerpt_length', 'mint_excerpt_length', 999 );

function mint_excerpt_more( $more ) { return '&thinsp;&hellip;'; }
add_filter( 'excerpt_more', 'mint_excerpt_more' );

/* ─── Remove Emoji Bloat ─────────────────────────────────────────── */
remove_action( 'wp_head',             'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles',     'print_emoji_styles' );
remove_action( 'admin_print_styles',  'print_emoji_styles' );
remove_filter( 'the_content_feed',    'wp_staticize_emoji' );
remove_filter( 'comment_text_rss',    'wp_staticize_emoji' );
remove_filter( 'wp_mail',             'wp_staticize_emoji_for_email' );

/* ─── Security Hardening (WP Engine safe) ───────────────────────── */
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );

/* ─── Booking CTA Helper ─────────────────────────────────────────── */
function mint_book_url() {
        return esc_url( get_theme_mod( 'mint_booking_url', 'https://www.fresha.com/a/mint-on-the-avenue-winter-park-228-n-park-avenue-bybduhv1/booking' ) );
}

/* ─── Customizer ─────────────────────────────────────────────────── */
function mint_customizer( $wp_customize ) {
        $wp_customize->add_section( 'mint_options', [
                'title'    => __( 'Mint Theme Options', 'mint-ota' ),
                'priority' => 30,
        ] );

        $wp_customize->add_setting( 'mint_booking_url', [
                'default'           => 'https://www.fresha.com/a/mint-on-the-avenue-winter-park-228-n-park-avenue-bybduhv1/booking',
                'sanitize_callback' => 'esc_url_raw',
        ] );
        $wp_customize->add_control( 'mint_booking_url', [
                'label'   => __( 'Booking URL (Fresha / Booksy)', 'mint-ota' ),
                'section' => 'mint_options',
                'type'    => 'url',
        ] );

        $wp_customize->add_setting( 'mint_hero_left_image', [ 'sanitize_callback' => 'esc_url_raw' ] );
        $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'mint_hero_left_image', [
                'label'   => __( 'Hero — Left Image', 'mint-ota' ),
                'section' => 'mint_options',
        ] ) );

        $wp_customize->add_setting( 'mint_hero_right_image', [ 'sanitize_callback' => 'esc_url_raw' ] );
        $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'mint_hero_right_image', [
                'label'   => __( 'Hero — Right Image', 'mint-ota' ),
                'section' => 'mint_options',
        ] ) );

        $wp_customize->add_setting( 'mint_hero_eyebrow', [
                'default'           => 'Winter Park, Florida',
                'sanitize_callback' => 'sanitize_text_field',
        ] );
        $wp_customize->add_control( 'mint_hero_eyebrow', [
                'label'   => __( 'Hero Eyebrow Text', 'mint-ota' ),
                'section' => 'mint_options',
                'type'    => 'text',
        ] );
}
add_action( 'customize_register', 'mint_customizer' );
