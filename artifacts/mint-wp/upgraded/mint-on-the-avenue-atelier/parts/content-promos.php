<?php
/**
 * Promo Buttons block — safe rewrite of Imaginal's content-promos.php.
 * Pulls from the existing `promo_btn` CPT and ACF fields, but uses
 * WP_Query (not destructive query_posts) and escapes all output.
 */

$promo_q = new WP_Query( [
    'post_type'      => 'promo_btn',
    'posts_per_page' => 1,
    'orderby'        => 'menu_order',
    'order'          => 'ASC',
    'no_found_rows'  => true,
] );

if ( ! $promo_q->have_posts() ) { return; }

while ( $promo_q->have_posts() ) : $promo_q->the_post();

    $tiles = [
        [ 'image' => mint_field( 'promo_image' ),          'link' => mint_field( 'promo_cta' ),          'text' => mint_field( 'promo_text' )          ],
        [ 'image' => mint_field( 'promo_image_center' ),   'link' => mint_field( 'promo_link_center' ),  'text' => mint_field( 'promo_text_center' )   ],
        [ 'image' => mint_field( 'promo_image_center_2' ), 'link' => mint_field( 'promo_link_center_2' ),'text' => mint_field( 'promo_text_center_2' ) ],
        [ 'image' => mint_field( 'promo_image_right' ),    'link' => mint_field( 'promo_link_right' ),   'text' => mint_field( 'promo_text_right' )    ],
    ];
?>
<div id="promoWrapper" class="mint-promo-wrapper">
    <?php foreach ( $tiles as $tile ) :
        $img  = is_array( $tile['image'] ) ? ( $tile['image']['url'] ?? '' ) : $tile['image'];
        $link = $tile['link'];
        $text = $tile['text'];
        if ( ! $img && ! $text ) continue;
    ?>
    <div class="mint-promo-tile">
        <div class="promo_inner">
            <div class="promo_img_holder">
                <?php if ( $img ) : ?>
                    <img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( wp_strip_all_tags( $text ) ); ?>" loading="lazy" />
                <?php endif; ?>
                <?php if ( $link ) : ?>
                    <a target="_blank" rel="noopener" href="<?php echo esc_url( $link ); ?>" class="promo_link"></a>
                <?php endif; ?>
                <?php if ( $text ) : ?>
                    <div class="mask">
                        <?php if ( $link ) : ?>
                            <a target="_blank" rel="noopener" href="<?php echo esc_url( $link ); ?>"><?php echo wp_kses_post( $text ); ?></a>
                        <?php else : ?>
                            <span><?php echo wp_kses_post( $text ); ?></span>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
</div>
<?php
endwhile;
wp_reset_postdata();
