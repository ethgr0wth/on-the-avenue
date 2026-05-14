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
                <p><?php esc_html_e( 'An Aveda Concept Salon on Park Avenue in Winter Park, Florida. Color, cut, and care rooted in plant-based luxury.', 'mint-ota' ); ?></p>
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

            <div class="footer-col footer-visit">
                <h4><?php esc_html_e( 'Visit', 'mint-ota' ); ?></h4>
                <ul class="footer-links">
                    <li><a href="<?php echo esc_url( home_url( '/services' ) ); ?>"><?php esc_html_e( 'Services', 'mint-ota' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/about/meet-the-team/' ) ); ?>"><?php esc_html_e( 'Artists', 'mint-ota' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/blog' ) ); ?>"><?php esc_html_e( 'Journal', 'mint-ota' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>"><?php esc_html_e( 'Contact', 'mint-ota' ); ?></a></li>
                </ul>

                <a class="footer-aveda" href="https://www.aveda.com/salon/mintontheavenue" target="_blank" rel="noopener">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/aveda.png' ); ?>" alt="Aveda" width="100" />
                </a>
            </div>

            <div class="footer-col footer-connect">
                <h4><?php esc_html_e( 'Connect', 'mint-ota' ); ?></h4>
                <ul class="footer-social">
                    <li>
                        <a href="https://www.instagram.com/mintontheavenue" target="_blank" rel="noopener" aria-label="Instagram">
                            <svg class="social-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                                <path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.8.07 1.2.05 1.8.25 2.2.42.6.22 1 .5 1.5 1s.78.9 1 1.5c.17.4.37 1 .42 2.2.06 1.2.07 1.6.07 4.8s0 3.6-.07 4.8c-.05 1.2-.25 1.8-.42 2.2-.22.6-.5 1-1 1.5s-.9.78-1.5 1c-.4.17-1 .37-2.2.42-1.2.06-1.6.07-4.8.07s-3.6 0-4.8-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.22-1-.5-1.5-1s-.78-.9-1-1.5c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.05-1.2.25-1.8.42-2.2.22-.6.5-1 1-1.5s.9-.78 1.5-1c.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.7.07-1 .05-1.6.2-2 .35-.5.2-.85.43-1.2.78s-.6.7-.78 1.2c-.15.4-.3 1-.35 2-.06 1.2-.07 1.55-.07 4.7s0 3.5.07 4.7c.05 1 .2 1.6.35 2 .2.5.43.85.78 1.2s.7.6 1.2.78c.4.15 1 .3 2 .35 1.2.06 1.55.07 4.7.07s3.5 0 4.7-.07c1-.05 1.6-.2 2-.35.5-.2.85-.43 1.2-.78s.6-.7.78-1.2c.15-.4.3-1 .35-2 .06-1.2.07-1.55.07-4.7s0-3.5-.07-4.7c-.05-1-.2-1.6-.35-2-.2-.5-.43-.85-.78-1.2s-.7-.6-1.2-.78c-.4-.15-1-.3-2-.35C15.5 4 15.15 4 12 4zm0 3.05A4.95 4.95 0 1 1 12 17a4.95 4.95 0 0 1 0-9.95zm0 1.8A3.15 3.15 0 1 0 12 15.2a3.15 3.15 0 0 0 0-6.35zM18.4 6.75a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z"/>
                            </svg>
                            <span>@mintontheavenue</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/MintOnTheAvenue" target="_blank" rel="noopener" aria-label="Facebook">
                            <svg class="social-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                                <path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>
                            </svg>
                            <span>MintOnTheAvenue</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.yelp.com/biz/mint-on-the-avenue-winter-park-2" target="_blank" rel="noopener" aria-label="Yelp">
                            <svg class="social-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                                <path fill="currentColor" d="M14.7 13.4l3.6 1.2c.6.2.9.85.7 1.45a1 1 0 0 1-.2.34l-2.4 2.7a1 1 0 0 1-1.5 0L12.5 16a1.13 1.13 0 0 1 1.3-1.85zM12 11.5L8.5 9c-.55-.4-.5-1.25.1-1.55l3.1-1.5a1.1 1.1 0 0 1 1.55 1.1l-.45 4.05a1.13 1.13 0 0 1-.8.4zm-1.5 4.4l1.2-3.5c.2-.6.95-.85 1.5-.45.15.1.25.25.3.4l1.5 3.5a1.13 1.13 0 0 1-1.4 1.5l-2.55-.9a1.13 1.13 0 0 1-.55-.55zm-2.7-2.8l3.6-1.1c.6-.2 1.2.25 1.2.85a1 1 0 0 1-.1.4l-1.7 3.3a1.13 1.13 0 0 1-2.1-.45l-.9-2.4a1.13 1.13 0 0 1 0-.6zm5.95-9.6l.45 6.5a1.13 1.13 0 0 1-1.85.95l-5-4.2a1.13 1.13 0 0 1 .15-1.85l4.55-2.3a1.13 1.13 0 0 1 1.7.9z"/>
                            </svg>
                            <span>Yelp Reviews</span>
                        </a>
                    </li>
                </ul>
            </div>

        </div>

        <div class="footer-bottom">
            <p>
                &copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'An Aveda Concept Salon.', 'mint-ota' ); ?>
                &nbsp;&middot;&nbsp;
                <a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'mint-ota' ); ?></a>
            </p>
        </div>

    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
