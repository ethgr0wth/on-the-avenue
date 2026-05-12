<?php
/**
 * Cinematic Hero — pulls panels from the existing `hp_slides` CPT.
 * Falls back to two default images if no slides exist.
 */

$panels = [];

$q = new WP_Query( [
    'post_type'      => 'hp_slides',
    'posts_per_page' => 4,
    'orderby'        => 'menu_order',
    'order'          => 'ASC',
] );

if ( $q->have_posts() ) :
    while ( $q->have_posts() ) : $q->the_post();
        $bg = mint_field( 'slide_background_image' );
        $tx = mint_field( 'slide_text' );
        if ( $bg ) {
            $panels[] = [
                'image' => is_array( $bg ) ? ( $bg['url'] ?? '' ) : $bg,
                'text'  => $tx,
            ];
        }
    endwhile;
    wp_reset_postdata();
endif;

if ( count( $panels ) < 2 ) {
    $defaults = [
        get_template_directory_uri() . '/assets/images/promo-welcome.jpg',
        get_template_directory_uri() . '/assets/images/promo-center.jpg',
    ];
    while ( count( $panels ) < 2 ) {
        $panels[] = [ 'image' => $defaults[ count( $panels ) ], 'text' => '' ];
    }
}
?>

<section class="site-hero" aria-label="<?php esc_attr_e( 'Hero', 'mint-ota' ); ?>">

    <div class="hero-split" aria-hidden="true">
        <?php foreach ( array_slice( $panels, 0, 2 ) as $panel ) : ?>
            <div class="hero-split__panel" style="background-image:url('<?php echo esc_url( $panel['image'] ); ?>');"></div>
        <?php endforeach; ?>
    </div>

    <div class="hero-overlay" aria-hidden="true"></div>

    <div class="hero-content">
        <div class="hero-inner">
            <p class="hero-eyebrow micro-label fade-up" data-delay="0.2">
                <?php esc_html_e( 'Winter Park, Florida', 'mint-ota' ); ?>
            </p>
            <h1 class="hero-title fade-up" data-delay="0.4">MINT</h1>
            <p class="hero-subtitle fade-up" data-delay="0.6">
                <?php esc_html_e( 'on the Avenue', 'mint-ota' ); ?>
            </p>
        </div>
    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
        <div class="scroll-line"></div>
        <span><?php esc_html_e( 'Scroll', 'mint-ota' ); ?></span>
    </div>
</section>
