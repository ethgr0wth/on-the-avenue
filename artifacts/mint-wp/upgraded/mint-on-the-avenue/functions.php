<?php
/**
 * Mint on the Avenue — functions.php
 * Built on the Imaginal Master framework. Preserves all existing
 * custom post types, ACF fields, theme options, and admin panels.
 */

defined( 'ABSPATH' ) || exit;

define( 'MINT_VERSION', '2.0.0' );

/* ─── Inherit Imaginal framework files (preserves existing CMS) ─── */
$mint_includes = [
    '/assets/functions/theme-support.php',
    '/assets/functions/cleanup.php',
    '/assets/functions/enqueue-scripts.php',
    '/assets/functions/menu.php',
    '/assets/functions/sidebar.php',
    '/assets/functions/comments.php',
    '/assets/functions/page-navi.php',
    '/assets/functions/disable-emoji.php',
    '/assets/functions/custom-post-type.php',
    '/assets/functions/theme-options.php',
];
foreach ( $mint_includes as $inc ) {
    $path = get_template_directory() . $inc;
    if ( file_exists( $path ) ) {
        require_once $path;
    }
}

/* ─── ACF Safety Helper ──────────────────────────────────────────── */
if ( ! function_exists( 'mint_field' ) ) {
    function mint_field( $name, $default = '' ) {
        if ( function_exists( 'get_field' ) ) {
            $v = get_field( $name );
            return $v !== null && $v !== false && $v !== '' ? $v : $default;
        }
        return $default;
    }
}

/* ─── Theme-options safety wrapper ───────────────────────────────── */
if ( ! function_exists( 'mint_option' ) ) {
    function mint_option( $key, $default = '' ) {
        // Imaginal stores theme options in a global $im_theme array,
        // populated in assets/functions/theme-options.php.
        global $im_theme;
        if ( is_array( $im_theme ) && isset( $im_theme[ $key ] ) && $im_theme[ $key ] !== '' ) {
            return $im_theme[ $key ];
        }
        // Fallback: try the raw 'im-' prefixed option directly
        $opt = get_option( 'im-' . $key );
        if ( $opt ) return $opt;
        return $default;
    }
}

/* ─── Booking URL Helper ─────────────────────────────────────────── */
if ( ! function_exists( 'mint_book_url' ) ) {
    function mint_book_url() {
        $custom = get_theme_mod( 'mint_booking_url' );
        if ( $custom ) return esc_url( $custom );
        return esc_url( 'https://www.fresha.com/a/mint-on-the-avenue-winter-park-228-n-park-avenue-bybduhv1/booking' );
    }
}

/* ─── Phone link in primary nav (preserved from Imaginal) ────────── */
if ( ! function_exists( 'mint_nav_phone_item' ) ) {
    function mint_nav_phone_item( $items ) {
        $phone = '<li class="phone"><a href="tel:+14076452264"><span>407.645.2264</span></a></li>';
        return $items . $phone;
    }
    add_filter( 'wp_nav_menu_primary-right_items', 'mint_nav_phone_item' );
}

/* ─── HairSalon JSON-LD on front page ────────────────────────────── */
function mint_schema_local_business() {
    if ( ! is_front_page() ) return;
    $schema = [
        '@context'    => 'https://schema.org',
        '@type'       => 'HairSalon',
        'name'        => 'Mint on the Avenue',
        'url'         => 'https://mintontheavenue.com',
        'telephone'   => '+1-407-645-2264',
        'priceRange'  => '$$$',
        'address'     => [
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
            [ '@type' => 'OpeningHoursSpecification', 'dayOfWeek' => [ 'Tuesday','Wednesday','Thursday','Friday' ], 'opens' => '09:00', 'closes' => '20:00' ],
            [ '@type' => 'OpeningHoursSpecification', 'dayOfWeek' => [ 'Saturday' ], 'opens' => '09:00', 'closes' => '18:00' ],
        ],
        'sameAs' => [
            'https://www.instagram.com/mintontheavenue',
            'https://www.facebook.com/mintontheavenue',
        ],
    ];
    echo "\n" . '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'mint_schema_local_business' );

/* ─── Customizer: booking URL + hero overrides ──────────────────── */
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
}
add_action( 'customize_register', 'mint_customizer' );

/* ─── Mint v2 asset enqueue (loads after Imaginal site-css) ─────── */
function mint_enqueue_v2_assets() {
    wp_enqueue_style(
        'mint-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter+Tight:wght@300;400;500&display=swap',
        [],
        null
    );
    wp_enqueue_style(
        'mint-v2',
        get_template_directory_uri() . '/assets/css/mint-v2.css',
        [ 'mint-fonts' ],
        MINT_VERSION
    );

    wp_enqueue_script( 'gsap',               'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',           [],          '3.12.5', true );
    wp_enqueue_script( 'gsap-scrolltrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',  [ 'gsap' ],  '3.12.5', true );
    wp_enqueue_script( 'mint-v2',            get_template_directory_uri() . '/assets/js/mint-v2.js',                     [ 'gsap', 'gsap-scrolltrigger' ], MINT_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'mint_enqueue_v2_assets', 1000 ); // priority 1000 = after Imaginal's 999

/* ─── Replace dead Instagram API call (silently) ─────────────────── */
function mint_kill_dead_instagram_call( $url ) {
    if ( strpos( $url, 'api.instagram.com/v1' ) !== false ) {
        return new WP_Error( 'mint_instagram_disabled', 'Legacy Instagram API disabled.' );
    }
    return $url;
}

/* ─── Theme support extras (hooked after Imaginal sets baseline) ── */
function mint_extra_theme_support() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ] );
    add_theme_support( 'custom-logo', [
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ] );
    add_image_size( 'mint-hero',     1920, 1080, true );
    add_image_size( 'mint-portrait',  800, 1100, true );
    add_image_size( 'mint-card',      600,  800, true );
}
add_action( 'after_setup_theme', 'mint_extra_theme_support', 20 );
