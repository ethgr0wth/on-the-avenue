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

        <h1 class="hero-title hero-title-logo fade-up" data-delay="0.3">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mint-stacked-wordmark.png' ); ?>"
                 alt="<?php esc_attr_e( 'Mint on the Avenue — An Aveda Salon', 'mint-ota' ); ?>"
                 class="hero-wordmark-img" />
        </h1>

        <p class="hero-tagline fade-up" data-delay="0.6">
            <?php esc_html_e( 'A family-owned and operated Aveda salon on Park Avenue — celebrating five years of devoted color and master cutting.', 'mint-ota' ); ?>
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
