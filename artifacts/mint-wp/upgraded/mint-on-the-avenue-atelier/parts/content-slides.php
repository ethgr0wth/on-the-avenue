<?php
/**
 * Atelier Hero — typographic editorial split.
 * Left: huge MINT serif wordmark, tagline, and reserve CTA on parchment.
 * Right: single full-bleed image (first hp_slides panel, or fallback).
 */

$hero_image = '';

$q = new WP_Query( [
    'post_type'      => 'hp_slides',
    'posts_per_page' => 1,
    'orderby'        => 'menu_order',
    'order'          => 'ASC',
] );

if ( $q->have_posts() ) {
    while ( $q->have_posts() ) { $q->the_post();
        $bg = mint_field( 'slide_background_image' );
        if ( $bg ) {
            $hero_image = is_array( $bg ) ? ( $bg['url'] ?? '' ) : $bg;
        }
    }
    wp_reset_postdata();
}

if ( ! $hero_image ) {
    $hero_image = get_template_directory_uri() . '/assets/images/hero.png';
}

$book_url = function_exists( 'mint_phorest_url' ) ? mint_phorest_url() : 'https://phorest.com/book/salons/mintontheavenue';
?>

<section class="site-hero atelier-hero" aria-label="<?php esc_attr_e( 'Hero', 'mint-ota' ); ?>">

    <div class="hero-typo">
        <p class="hero-eyebrow micro-label fade-up" data-delay="0.15">
            <?php esc_html_e( 'Winter Park, Florida · Aveda Concept Salon', 'mint-ota' ); ?>
        </p>

        <h1 class="hero-title fade-up" data-delay="0.3">MINT</h1>

        <p class="hero-subtitle fade-up" data-delay="0.45">
            <?php esc_html_e( 'on the avenue', 'mint-ota' ); ?>
        </p>

        <p class="hero-tagline fade-up" data-delay="0.6">
            <?php esc_html_e( 'A small, considered salon devoted to the craft of hair — Aveda color, master cutting, and a quiet room to spend an hour in.', 'mint-ota' ); ?>
        </p>

        <div class="hero-actions fade-up" data-delay="0.75">
            <a class="hero-reserve" href="<?php echo esc_url( $book_url ); ?>" target="_blank" rel="noopener">
                <?php esc_html_e( 'Reserve Your Visit', 'mint-ota' ); ?>
            </a>
            <a class="hero-secondary" href="#manifesto">
                <?php esc_html_e( 'Read the Story', 'mint-ota' ); ?>
            </a>
        </div>

        <div class="hero-meta">
            <span><?php esc_html_e( 'Est. on Park Avenue', 'mint-ota' ); ?></span>
            <span><a href="tel:+14076452264">407.645.2264</a></span>
        </div>
    </div>

    <div class="hero-image" style="background-image:url('<?php echo esc_url( $hero_image ); ?>');" aria-hidden="true">
        <span class="hero-image-credit"><?php esc_html_e( '228 N Park Avenue', 'mint-ota' ); ?></span>
    </div>

</section>
