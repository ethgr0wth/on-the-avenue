<!-- ─── Site Footer ─────────────────────────────────────────── -->
<footer class="site-footer" role="contentinfo">
  <div class="container">

    <div class="footer-top">

      <!-- Brand Column -->
      <div class="footer-brand">
        <span class="wordmark"><?php bloginfo( 'name' ); ?></span>
        <p><?php esc_html_e( 'An Aveda lifestyle salon on Park Avenue in Winter Park, Florida. Color, cut, and care rooted in plant-based luxury.', 'mint-ota' ); ?></p>
        <address>
          228 N Park Ave<br>
          Winter Park, FL 32789<br>
          <a href="tel:+14076452264">407.645.2264</a>
        </address>
      </div>

      <!-- Nav Column -->
      <div class="footer-col">
        <h4><?php esc_html_e( 'Navigate', 'mint-ota' ); ?></h4>
        <?php
        wp_nav_menu( [
          'theme_location' => 'footer',
          'menu_class'     => '',
          'container'      => 'ul',
          'depth'          => 1,
          'fallback_cb'    => function() {
            echo '<ul>';
            $links = [
              'Services'   => '/services',
              'Artists'    => '/artists',
              'Lookbook'   => '/lookbook',
              'New Guests' => '/new-guests',
              'Reviews'    => '/reviews',
              'Visit'      => '/visit',
              'Gift Cards' => '/gift-cards',
            ];
            foreach ( $links as $label => $path ) {
              printf( '<li><a href="%s">%s</a></li>', esc_url( home_url( $path ) ), esc_html( $label ) );
            }
            echo '</ul>';
          },
        ] );
        ?>
      </div>

      <!-- Hours Column -->
      <div class="footer-col">
        <h4><?php esc_html_e( 'Hours', 'mint-ota' ); ?></h4>
        <ul>
          <li><?php esc_html_e( 'Tuesday — Friday · 9:00 — 8:00', 'mint-ota' ); ?></li>
          <li><?php esc_html_e( 'Saturday · 9:00 — 6:00', 'mint-ota' ); ?></li>
          <li><?php esc_html_e( 'Sunday — Monday · Closed', 'mint-ota' ); ?></li>
        </ul>

        <?php if ( is_active_sidebar( 'footer-2' ) ) : ?>
          <?php dynamic_sidebar( 'footer-2' ); ?>
        <?php endif; ?>
      </div>

    </div><!-- .footer-top -->

    <!-- Footer Bottom Bar -->
    <div class="footer-bottom">
      <p>
        &copy; <?php echo esc_html( date( 'Y' ) ); ?>
        <?php bloginfo( 'name' ); ?>.
        <?php esc_html_e( 'An Aveda Lifestyle Salon.', 'mint-ota' ); ?>
      </p>
      <p>
        <a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>"><?php esc_html_e( 'Privacy', 'mint-ota' ); ?></a>
        &nbsp;&middot;&nbsp;
        <a href="<?php echo esc_url( home_url( '/accessibility' ) ); ?>"><?php esc_html_e( 'Accessibility', 'mint-ota' ); ?></a>
      </p>
    </div>

  </div><!-- .container -->
</footer><!-- .site-footer -->

<?php wp_footer(); ?>
</body>
</html>
