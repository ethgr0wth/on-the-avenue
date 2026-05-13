</div><!-- /#main-wrapper -->

<!-- ─── Sticky Reserve Pill (desktop) ──────────────────────── -->
<a class="reserve-pill" href="<?php echo mint_phorest_url(); ?>" target="_blank" rel="noopener" aria-label="<?php esc_attr_e( 'Reserve appointment online', 'mint-ota' ); ?>">
    <span class="reserve-pill-dot" aria-hidden="true"></span>
    <span class="reserve-pill-label"><?php esc_html_e( 'Reserve', 'mint-ota' ); ?></span>
</a>

<!-- ─── Sticky Mobile CTA (audit CRO P1) ──────────────────── -->
<a class="mint-mobile-cta" href="<?php echo mint_phorest_url(); ?>" target="_blank" rel="noopener" aria-label="<?php esc_attr_e( 'Book an appointment', 'mint-ota' ); ?>">
    <?php esc_html_e( 'Book Appointment', 'mint-ota' ); ?>
</a>

<!-- ─── Site Footer ─────────────────────────────────────────── -->
<footer class="site-footer" role="contentinfo">
    <div class="container">

        <div class="footer-top">

            <div class="footer-brand">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <?php
                    $logo = mint_option( 'logo', '' );
                    if ( $logo ) :
                    ?>
                        <img id="footer-logo" src="<?php echo esc_url( $logo ); ?>" alt="<?php bloginfo( 'name' ); ?>" />
                    <?php else : ?>
                        <span class="wordmark"><?php bloginfo( 'name' ); ?></span>
                    <?php endif; ?>
                </a>
                <p><?php esc_html_e( 'An Aveda lifestyle salon on Park Avenue in Winter Park, Florida. Color, cut, and care rooted in plant-based luxury.', 'mint-ota' ); ?></p>
                <address>
                    228 N Park Ave<br>
                    Winter Park, FL 32789<br>
                    <a href="tel:+14076452264">407.645.2264</a>
                </address>
            </div>

            <div class="footer-col">
                <h4><?php esc_html_e( 'Hours', 'mint-ota' ); ?></h4>
                <ul>
                    <li><?php esc_html_e( 'Tuesday — Friday · 9 — 8', 'mint-ota' ); ?></li>
                    <li><?php esc_html_e( 'Saturday · 9 — 6', 'mint-ota' ); ?></li>
                    <li><?php esc_html_e( 'Sunday — Monday · Closed', 'mint-ota' ); ?></li>
                </ul>
                <?php if ( is_active_sidebar( 'footer1' ) ) dynamic_sidebar( 'footer1' ); ?>
            </div>

            <div class="footer-col">
                <h4><?php esc_html_e( 'Visit', 'mint-ota' ); ?></h4>
                <?php if ( is_active_sidebar( 'footer2' ) ) {
                    dynamic_sidebar( 'footer2' );
                } else { ?>
                <ul>
                    <li><a href="<?php echo esc_url( home_url( '/services' ) ); ?>"><?php esc_html_e( 'Services', 'mint-ota' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/about/meet-the-team/' ) ); ?>"><?php esc_html_e( 'Artists', 'mint-ota' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/gallery' ) ); ?>"><?php esc_html_e( 'Lookbook', 'mint-ota' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>"><?php esc_html_e( 'Visit', 'mint-ota' ); ?></a></li>
                </ul>
                <?php } ?>

                <a class="footer-aveda" href="https://www.aveda.com/salon/mintontheavenue" target="_blank" rel="noopener">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/aveda.png' ); ?>" alt="Aveda" width="100" />
                </a>
            </div>

        </div>

        <div class="footer-bottom">
            <p>
                &copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'An Aveda Lifestyle Salon.', 'mint-ota' ); ?>
                &nbsp;&middot;&nbsp;
                <a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'mint-ota' ); ?></a>
            </p>
        </div>

    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
