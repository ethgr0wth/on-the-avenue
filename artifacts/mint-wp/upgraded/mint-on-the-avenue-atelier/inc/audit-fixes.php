<?php
/**
 * Mint on the Avenue — Audit Fixes (v2.5.0)
 * Addresses CTO audit findings that are fixable at the theme layer.
 * Items requiring WP-admin / content edits are documented in AUDIT-CHECKLIST.md.
 */

defined( 'ABSPATH' ) || exit;

/* ─────────────────────────────────────────────────────────────────
 * CRIT-04: Security headers
 * Sent on every front-end response. WP-admin is excluded so it does
 * not interfere with the Block Editor / Customizer iframes.
 * ───────────────────────────────────────────────────────────────── */
function mint_security_headers() {
    if ( is_admin() || ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) return;
    if ( headers_sent() ) return;

    header( 'X-Content-Type-Options: nosniff' );
    header( 'X-Frame-Options: SAMEORIGIN' );
    header( 'Referrer-Policy: strict-origin-when-cross-origin' );
    header( 'Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()' );
    header( 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload' );

    // CSP — permissive enough for WP, Phorest, Aveda, Google Fonts, GA, Instagram.
    // If you add a tag manager or new third-party, append its host here.
    $csp = implode( '; ', [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.phorest.com https://*.googletagmanager.com https://*.google-analytics.com https://cdnjs.cloudflare.com https://www.instagram.com https://platform.instagram.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: blob: https: http:",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self' https://*.phorest.com https://*.google-analytics.com https://*.googletagmanager.com",
        "frame-src 'self' https://*.phorest.com https://www.google.com https://www.youtube.com https://www.instagram.com",
        "frame-ancestors 'self'",
        "form-action 'self' https://*.phorest.com",
        "base-uri 'self'",
        "object-src 'none'",
    ] );
    header( 'Content-Security-Policy: ' . $csp );
}
add_action( 'send_headers', 'mint_security_headers' );

/* ─────────────────────────────────────────────────────────────────
 * CRIT-01: REST API namespace lockdown
 * Block dangerous namespaces for unauthenticated users.
 * Public read of posts/pages/media remains intact for Gutenberg, embeds,
 * and search.
 * ───────────────────────────────────────────────────────────────── */
function mint_rest_lockdown( $result ) {
    if ( ! empty( $result ) ) return $result;
    if ( is_user_logged_in() ) return $result;

    $route = isset( $GLOBALS['wp']->query_vars['rest_route'] ) ? $GLOBALS['wp']->query_vars['rest_route'] : '';
    if ( ! $route ) return $result;

    /* Allowlist: only these prefixes are publicly readable. */
    $allowed_prefixes = [
        '/wp/v2/posts',
        '/wp/v2/pages',
        '/wp/v2/media',
        '/wp/v2/categories',
        '/wp/v2/tags',
        '/wp/v2/search',
        '/oembed/',
        '/contact-form-7/',
        '/wpcf7/',
    ];
    foreach ( $allowed_prefixes as $prefix ) {
        if ( strpos( $route, $prefix ) === 0 ) {
            return $result;
        }
    }
    /* Everything else (wordfence, wpe, seopress, users, plugin endpoints) → blocked. */
    return new WP_Error(
        'rest_forbidden',
        __( 'Authentication required for this endpoint.', 'mint-ota' ),
        [ 'status' => 401 ]
    );
}
add_filter( 'rest_authentication_errors', 'mint_rest_lockdown', 99 );

/* Block the REST API index from listing all routes (info disclosure). */
function mint_rest_hide_index( $response, $handler, $request ) {
    if ( is_user_logged_in() ) return $response;
    if ( $request->get_route() === '/' ) {
        $data = $response->get_data();
        if ( isset( $data['routes'] ) ) {
            $allowed = [];
            foreach ( $data['routes'] as $r => $v ) {
                if ( strpos( $r, '/wp/v2/posts' ) === 0
                  || strpos( $r, '/wp/v2/pages' ) === 0
                  || strpos( $r, '/oembed' )      === 0 ) {
                    $allowed[ $r ] = $v;
                }
            }
            $data['routes'] = $allowed;
            $response->set_data( $data );
        }
    }
    return $response;
}
add_filter( 'rest_post_dispatch', 'mint_rest_hide_index', 10, 3 );

/* Disable user enumeration via ?author=N */
function mint_block_author_enum() {
    if ( is_admin() ) return;
    if ( isset( $_GET['author'] ) && ! is_user_logged_in() ) {
        wp_safe_redirect( home_url( '/' ), 301 );
        exit;
    }
}
add_action( 'template_redirect', 'mint_block_author_enum' );

/* Remove WP version meta tag (info disclosure). */
remove_action( 'wp_head', 'wp_generator' );
add_filter( 'the_generator', '__return_empty_string' );

/* ─────────────────────────────────────────────────────────────────
 * CRIT-05: 301 redirect /our-artists → /about/meet-the-team/
 * Also catches a few other legacy paths that surfaced in the audit.
 * ───────────────────────────────────────────────────────────────── */
function mint_legacy_redirects() {
    if ( is_admin() ) return;
    $request = isset( $_SERVER['REQUEST_URI'] ) ? strtok( $_SERVER['REQUEST_URI'], '?' ) : '';
    $request = rtrim( $request, '/' );

    $map = [
        '/our-artists'             => '/about/meet-the-team/',
        '/artists'                 => '/about/meet-the-team/',
        '/services/mens'           => '/services/mint-men/',
        '/services/color'          => '/services/hair-color/',
        '/specials/new-guests'     => '/services/new-guest-special/',
    ];
    if ( isset( $map[ $request ] ) ) {
        wp_safe_redirect( home_url( $map[ $request ] ), 301 );
        exit;
    }
}
add_action( 'template_redirect', 'mint_legacy_redirects', 1 );

/* ─────────────────────────────────────────────────────────────────
 * CRIT-06: Email obfuscation in content
 * Replaces plaintext emails inside the_content with WP's antispambot()
 * encoding. Does NOT touch admin / nav / template strings.
 * ───────────────────────────────────────────────────────────────── */
function mint_obfuscate_emails( $content ) {
    if ( is_admin() || is_feed() ) return $content;
    return preg_replace_callback(
        '/([\w\.\-\+]+@[\w\-]+(\.[\w\-]+)+)/i',
        function ( $m ) { return antispambot( $m[1] ); },
        $content
    );
}
add_filter( 'the_content', 'mint_obfuscate_emails', 20 );
add_filter( 'widget_text', 'mint_obfuscate_emails', 20 );

/* ─────────────────────────────────────────────────────────────────
 * MED / Mixed-content: rewrite http://imaginalhosting.com → https
 * and force https on any http://mintontheavenue.com URLs in content.
 * ───────────────────────────────────────────────────────────────── */
function mint_fix_mixed_content( $content ) {
    if ( is_admin() ) return $content;
    $content = str_replace( 'http://imaginalhosting.com',  'https://imaginalhosting.com',  $content );
    $content = str_replace( 'http://mintontheavenue.com',  'https://mintontheavenue.com',  $content );
    $content = str_replace( 'http://www.mintontheavenue.com', 'https://www.mintontheavenue.com', $content );
    return $content;
}
add_filter( 'the_content',           'mint_fix_mixed_content', 25 );
add_filter( 'post_thumbnail_html',   'mint_fix_mixed_content', 25 );
add_filter( 'widget_text_content',   'mint_fix_mixed_content', 25 );

/* ─────────────────────────────────────────────────────────────────
 * MIN-05 / A11Y: External links open safely in new tab.
 * Also enforces native lazy-loading on below-the-fold content images.
 * ───────────────────────────────────────────────────────────────── */
function mint_safer_external_links( $content ) {
    if ( is_admin() || is_feed() ) return $content;
    $home = wp_parse_url( home_url(), PHP_URL_HOST );
    return preg_replace_callback(
        '/<a\s+([^>]*?)href=(["\'])(https?:\/\/([^\/"\'\s]+)[^"\']*)\2([^>]*)>/i',
        function ( $m ) use ( $home ) {
            $host = $m[4];
            if ( stripos( $host, $home ) !== false ) return $m[0];
            $attrs_before = $m[1];
            $attrs_after  = $m[5];
            $all = $attrs_before . ' ' . $attrs_after;
            $target = ( stripos( $all, 'target=' ) === false ) ? ' target="_blank"' : '';
            $rel    = ( stripos( $all, 'rel=' )    === false ) ? ' rel="noopener noreferrer"' : '';
            return '<a ' . $attrs_before . 'href=' . $m[2] . $m[3] . $m[2] . $attrs_after . $target . $rel . '>';
        },
        $content
    );
}
add_filter( 'the_content', 'mint_safer_external_links', 30 );

function mint_force_lazy_images( $content ) {
    if ( is_admin() || is_feed() ) return $content;
    if ( strpos( $content, '<img' ) === false ) return $content;
    return preg_replace_callback(
        '/<img\b([^>]*?)>/i',
        function ( $m ) {
            $attrs = $m[1];
            if ( stripos( $attrs, 'loading=' ) === false ) {
                $attrs .= ' loading="lazy"';
            }
            if ( stripos( $attrs, 'decoding=' ) === false ) {
                $attrs .= ' decoding="async"';
            }
            return '<img' . $attrs . '>';
        },
        $content
    );
}
add_filter( 'the_content',          'mint_force_lazy_images', 35 );
add_filter( 'post_thumbnail_html',  'mint_force_lazy_images', 35 );

/* ─────────────────────────────────────────────────────────────────
 * A11Y-01: Default alt-text fallback for images missing alt.
 * Uses the image filename as a last-resort descriptive alt.
 * ───────────────────────────────────────────────────────────────── */
function mint_default_alt_text( $attr, $attachment ) {
    if ( empty( $attr['alt'] ) ) {
        $title = $attachment ? get_the_title( $attachment ) : '';
        $attr['alt'] = $title ? $title : get_bloginfo( 'name' );
    }
    return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'mint_default_alt_text', 10, 2 );

/* ─────────────────────────────────────────────────────────────────
 * MED-01 (v2.9.1): Per-page meta descriptions — overrides SEOPress.
 * CTO V2.1: every page was showing "Winter Park, FL" only. Map of
 * route → unique 140-160 char description, keyed by request path.
 * ───────────────────────────────────────────────────────────────── */
function mint_meta_description_map() {
    return [
        '/'                                => 'Mint on the Avenue — family-owned Aveda salon on Park Avenue, Winter Park FL. Editorial color, precision cutting, and plant-based care for five years and counting.',
        '/about/'                          => 'A family-owned Aveda Concept Salon on Park Avenue in Winter Park, Florida. Five years of devoted color, master cutting, and Aveda plant-based care.',
        '/about/meet-the-team/'            => 'Meet the master stylists, colorists, and educators of Mint on the Avenue — a family-owned Aveda team practicing on Park Avenue, Winter Park FL.',
        '/services/'                       => 'Editorial color, master cutting, balayage, lived-in highlights, extensions, smoothing, and Aveda spa services on Park Avenue in Winter Park, FL.',
        '/services/new-guest-special/'     => 'New to Mint? Enjoy 20% off your first visit at our Aveda salon on Park Avenue in Winter Park, FL. Color, cut, or care — your choice.',
        '/services/hair-color/'            => 'Editorial color at Mint on the Avenue — balayage, lived-in highlights, gloss, gray blending, and bespoke Aveda color in Winter Park, Florida.',
        '/services/haircuts/'              => 'Master cutting and precision styling at Mint on the Avenue. Aveda-trained stylists on Park Avenue, Winter Park FL.',
        '/services/extensions/'            => 'Premium hair extensions and lengthening services at our Aveda salon on Park Avenue, Winter Park, Florida.',
        '/services/smoothing-treatments/'  => 'Keratin and Aveda Botanical Repair smoothing treatments for sleek, healthier hair. Mint on the Avenue, Winter Park FL.',
        '/services/spa-services/'          => 'Aveda facials, scalp treatments, and spa rituals on Park Avenue, Winter Park, Florida. Plant-based, pure, and personal.',
        '/contact/'                        => 'Visit Mint on the Avenue at 228 N Park Avenue, Winter Park, FL 32789. Call 407.645.2264 or book online — Aveda Concept Salon on Park Avenue.',
        '/blog/'                           => 'Notes, education, and behind-the-chair from Mint on the Avenue — an Aveda salon on Park Avenue, Winter Park FL.',
        '/gift-cards/'                     => 'Give the gift of editorial color and Aveda care. Mint on the Avenue gift cards — Park Avenue, Winter Park, Florida.',
        '/shop/'                           => 'Shop Aveda professional hair, skin, and scalp care from Mint on the Avenue — curated by Aveda-trained stylists in Winter Park, FL.',
        '/privacy-policy/'                 => 'Mint on the Avenue privacy policy — how we handle visitor and client information for our Aveda salon in Winter Park, Florida.',
    ];
}

function mint_meta_description_for_request() {
    $path = isset( $_SERVER['REQUEST_URI'] ) ? strtok( $_SERVER['REQUEST_URI'], '?' ) : '/';
    $path = '/' . ltrim( $path, '/' );
    if ( substr( $path, -1 ) !== '/' && strpos( $path, '.' ) === false ) {
        $path .= '/';
    }
    $map = mint_meta_description_map();
    if ( isset( $map[ $path ] ) ) {
        return $map[ $path ];
    }
    // Fallback: try root collapse to '/'
    if ( $path === '/index.php/' || $path === '/index.html/' ) {
        return $map['/'];
    }
    // Singular fallback: excerpt → content
    if ( is_singular() ) {
        $excerpt = get_the_excerpt();
        $base = $excerpt ? $excerpt : get_the_content();
        $base = wp_trim_words( wp_strip_all_tags( $base ), 28, '…' );
        if ( $base ) return $base;
    }
    // Last-resort default (never the generic "Winter Park, FL")
    return 'Mint on the Avenue — family-owned Aveda Concept Salon on Park Avenue in Winter Park, Florida. Editorial color, precision cutting, plant-based care.';
}

/* ─────────────────────────────────────────────────────────────────
 * v2.9.4: Rewrite '#' hrefs on Services parent menu item to /services/.
 * Many WP menus set parent items to '#'; we always want the click to
 * navigate to the Services index page.
 * ───────────────────────────────────────────────────────────────── */
function mint_fix_services_menu_href( $items, $args ) {
    foreach ( $items as $item ) {
        $url   = isset( $item->url )   ? trim( $item->url )   : '';
        $title = isset( $item->title ) ? strtolower( $item->title ) : '';
        $is_empty_href = ( $url === '' || $url === '#' || substr( $url, -2 ) === '/#' || substr( $url, -1 ) === '#' );
        if ( $is_empty_href && strpos( $title, 'service' ) !== false ) {
            $item->url = home_url( '/services/' );
        }
    }
    return $items;
}
add_filter( 'wp_nav_menu_objects', 'mint_fix_services_menu_href', 10, 2 );

/* Override SEOPress description so our per-page copy wins. */
add_filter( 'seopress_titles_desc',         'mint_meta_description_for_request', 99 );
add_filter( 'seopress_social_og_desc',      'mint_meta_description_for_request', 99 );
add_filter( 'seopress_social_twitter_desc', 'mint_meta_description_for_request', 99 );

/* Print our description in wp_head if SEOPress isn't active or didn't output one. */
function mint_default_meta_description() {
    if ( defined( 'SEOPRESS_VERSION' ) ) return; // SEOPress will print via its own hook.
    $desc = mint_meta_description_for_request();
    if ( $desc ) {
        echo "\n" . '<meta name="description" content="' . esc_attr( $desc ) . '">' . "\n";
    }
}
add_action( 'wp_head', 'mint_default_meta_description', 1 );

/* Belt-and-suspenders: strip any duplicate generic "Winter Park, FL" meta. */
function mint_strip_generic_description( $buffer ) {
    if ( stripos( $buffer, '<meta name="description"' ) === false ) return $buffer;
    // Remove any meta description tag whose content is exactly "Winter Park, FL" or similar 1-line generics.
    $buffer = preg_replace(
        '#<meta\s+name=["\']description["\']\s+content=["\']\s*(Winter Park,?\s*FL\.?|Winter Park, Florida\.?)\s*["\']\s*/?>#i',
        '',
        $buffer
    );
    return $buffer;
}
function mint_start_meta_ob() {
    if ( is_admin() ) return;
    ob_start( 'mint_strip_generic_description' );
}
function mint_flush_meta_ob() {
    if ( is_admin() ) return;
    if ( ob_get_level() > 0 ) @ob_end_flush();
}
add_action( 'template_redirect', 'mint_start_meta_ob', 0 );
add_action( 'shutdown',          'mint_flush_meta_ob', 0 );

/* ─────────────────────────────────────────────────────────────────
 * MED-09: Extra schema — Organization sitewide + BreadcrumbList on inner.
 * ───────────────────────────────────────────────────────────────── */
function mint_schema_organization() {
    if ( is_front_page() ) return; // HairSalon already covers this on home.
    $schema = [
        '@context' => 'https://schema.org',
        '@type'    => 'Organization',
        'name'     => 'Mint on the Avenue',
        'url'      => home_url( '/' ),
        'logo'     => get_template_directory_uri() . '/assets/images/mint-stacked-wordmark.png',
        'sameAs'   => [
            'https://www.instagram.com/mintontheavenue',
            'https://www.facebook.com/mintontheavenue',
        ],
    ];
    echo "\n" . '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'mint_schema_organization' );

/* ─────────────────────────────────────────────────────────────────
 * Helper: standardized phone number — single source of truth.
 * Use mint_phone() in templates instead of hardcoding.
 * ───────────────────────────────────────────────────────────────── */
if ( ! function_exists( 'mint_phone' ) ) {
    function mint_phone( $format = 'display' ) {
        $tel  = '+14076452264';
        $disp = '407.645.2264';
        if ( $format === 'tel' )    return $tel;
        if ( $format === 'pretty' ) return '(407) 645-2264';
        return $disp;
    }
}
if ( ! function_exists( 'mint_text_number' ) ) {
    function mint_text_number( $format = 'display' ) {
        $tel  = '+18333900226';
        $disp = '833.390.0226';
        if ( $format === 'tel' )    return $tel;
        if ( $format === 'pretty' ) return '(833) 390-0226';
        return $disp;
    }
}
