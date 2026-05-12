<?php
/**
 * Phorest Booking Strip — anchored directly under the Atelier hero.
 * Static (no marquee/scroll) — booking is a decision moment.
 */
$url = function_exists( 'mint_phorest_url' ) ? mint_phorest_url() : 'https://phorest.com/book/salons/mintontheavenue';

$chips = [
    [ 'label' => __( 'Color',   'mint-ota' ) ],
    [ 'label' => __( 'Hair',    'mint-ota' ) ],
    [ 'label' => __( 'Texture', 'mint-ota' ) ],
    [ 'label' => __( 'Wedding', 'mint-ota' ) ],
];
?>
<section class="booking-strip" aria-label="<?php esc_attr_e( 'Book online', 'mint-ota' ); ?>">
    <div class="container booking-strip-inner">

        <div class="booking-strip-headline">
            <p class="micro-label brass"><?php esc_html_e( 'Book Online · Phorest', 'mint-ota' ); ?></p>
            <h3 class="booking-strip-h"><?php esc_html_e( 'Reserve your visit.', 'mint-ota' ); ?></h3>
        </div>

        <ul class="booking-chips">
            <?php foreach ( $chips as $c ) : ?>
                <li>
                    <a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener">
                        <?php echo esc_html( $c['label'] ); ?>
                    </a>
                </li>
            <?php endforeach; ?>
            <li class="booking-chip-more">
                <a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener">
                    <?php esc_html_e( 'View All Services', 'mint-ota' ); ?> &rarr;
                </a>
            </li>
        </ul>

        <a href="<?php echo esc_url( $url ); ?>" class="booking-strip-cta" target="_blank" rel="noopener">
            <?php esc_html_e( 'Reserve', 'mint-ota' ); ?>
        </a>

    </div>

    <p class="booking-strip-phone">
        <?php esc_html_e( 'or call', 'mint-ota' ); ?>
        <a href="tel:+14076452264">407.645.2264</a>
    </p>
</section>
