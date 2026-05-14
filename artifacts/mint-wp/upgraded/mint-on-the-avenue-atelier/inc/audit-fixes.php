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
 * MED-01 / OG: Default meta description fallback for pages without one.
 * SEOPress will override when present.
 * ───────────────────────────────────────────────────────────────── */
function mint_default_meta_description() {
    // If SEOPress already printed a description, skip.
    if ( defined( 'SEOPRESS_VERSION' ) ) return;

    $desc = '';
    if ( is_front_page() ) {
        $desc = 'Mint on the Avenue — a family-owned Aveda salon on Park Avenue in Winter Park, Florida. Editorial color, master cutting, and plant-based care.';
    } elseif ( is_singular() ) {
        $excerpt = get_the_excerpt();
        if ( $excerpt ) {
            $desc = wp_trim_words( wp_strip_all_tags( $excerpt ), 28, '…' );
        } else {
            $desc = wp_trim_words( wp_strip_all_tags( get_the_content() ), 28, '…' );
        }
    } else {
        $desc = get_bloginfo( 'description' );
    }
    if ( $desc ) {
        echo "\n" . '<meta name="description" content="' . esc_attr( $desc ) . '">' . "\n";
    }
}
add_action( 'wp_head', 'mint_default_meta_description', 1 );

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
