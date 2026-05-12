<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link" href="#main-content"><?php esc_html_e( 'Skip to content', 'mint-ota' ); ?></a>

<!-- ─── Site Header ─────────────────────────────────────────── -->
<header class="site-header" role="banner">
  <div class="header-inner">

    <!-- Wordmark -->
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="wordmark" rel="home" aria-label="<?php bloginfo( 'name' ); ?> — Home">
      <?php
      if ( has_custom_logo() ) :
        the_custom_logo();
      else :
        echo esc_html( get_bloginfo( 'name' ) );
      endif;
      ?>
    </a>

    <!-- Desktop Nav -->
    <nav class="header-nav" aria-label="<?php esc_attr_e( 'Primary navigation', 'mint-ota' ); ?>">
      <?php
      wp_nav_menu( [
        'theme_location' => 'primary',
        'menu_class'     => '',
        'container'      => false,
        'depth'          => 1,
        'fallback_cb'    => 'mint_fallback_nav',
      ] );
      ?>
    </nav>

    <!-- Header Actions -->
    <div class="header-actions">
      <a href="<?php echo mint_book_url(); ?>" class="header-book" target="_blank" rel="noopener">
        <?php esc_html_e( 'Book Appointment', 'mint-ota' ); ?>
      </a>

      <!-- Hamburger / Menu Toggle -->
      <button class="menu-toggle" aria-expanded="false" aria-controls="drawer-menu" aria-label="<?php esc_attr_e( 'Open menu', 'mint-ota' ); ?>">
        <span class="hide-mobile"><?php esc_html_e( 'Menu', 'mint-ota' ); ?></span>
        <span class="menu-toggle-bars" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
      </button>
    </div>

  </div><!-- .header-inner -->
</header><!-- .site-header -->

<!-- ─── Drawer / Full-Screen Menu ──────────────────────────── -->
<div class="drawer-overlay" id="drawer-menu" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Site menu', 'mint-ota' ); ?>">
  <nav class="drawer-nav" aria-label="<?php esc_attr_e( 'Drawer navigation', 'mint-ota' ); ?>">
    <?php
    wp_nav_menu( [
      'theme_location' => 'primary',
      'menu_class'     => '',
      'container'      => false,
      'depth'          => 1,
      'fallback_cb'    => 'mint_fallback_nav',
    ] );
    ?>
    <a href="<?php echo mint_book_url(); ?>" target="_blank" rel="noopener"><?php esc_html_e( 'Book Appointment', 'mint-ota' ); ?></a>
  </nav>
  <div class="drawer-footer">
    <p><?php echo esc_html( '228 N Park Ave · Winter Park, FL · 407.645.2264' ); ?></p>
    <p><?php echo esc_html( 'An Aveda Lifestyle Salon' ); ?></p>
  </div>
</div><!-- .drawer-overlay -->

<?php
/**
 * Fallback nav when no menu is assigned.
 */
function mint_fallback_nav() {
  echo '<ul>';
  echo '<li><a href="' . esc_url( home_url( '/services' ) ) . '">Services</a></li>';
  echo '<li><a href="' . esc_url( home_url( '/artists' ) ) . '">Artists</a></li>';
  echo '<li><a href="' . esc_url( home_url( '/lookbook' ) ) . '">Lookbook</a></li>';
  echo '<li><a href="' . esc_url( home_url( '/reviews' ) ) . '">Reviews</a></li>';
  echo '<li><a href="' . esc_url( home_url( '/visit' ) ) . '">Visit</a></li>';
  echo '</ul>';
}
?>
