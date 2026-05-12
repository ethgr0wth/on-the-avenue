<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php if ( ! function_exists( 'has_site_icon' ) || ! has_site_icon() ) : ?>
        <link rel="icon" href="<?php echo esc_url( get_template_directory_uri() . '/favicon.png' ); ?>">
        <link rel="apple-touch-icon" href="<?php echo esc_url( get_template_directory_uri() . '/assets/images/apple-icon-touch.png' ); ?>">
    <?php endif; ?>

    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <?php wp_head(); ?>

    <?php
    // Preserved from Imaginal: Google Analytics ID from theme options
    $ga_id = mint_option( 'google-analytics-id', '' );
    if ( $ga_id ) :
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_attr( $ga_id ); ?>"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '<?php echo esc_js( $ga_id ); ?>');
    </script>
    <?php endif; ?>

    <?php
    // Preserved from Imaginal: per-page custom CSS via ACF
    $custom_css = mint_field( 'custom_css' );
    if ( $custom_css ) {
        echo '<style>' . wp_strip_all_tags( $custom_css ) . '</style>';
    }
    ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link" href="#main-content"><?php esc_html_e( 'Skip to content', 'mint-ota' ); ?></a>

<!-- ─── Site Header ─────────────────────────────────────────── -->
<header class="site-header" role="banner">
    <div class="header-inner">

        <!-- Wordmark / Logo -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="wordmark" rel="home" aria-label="<?php bloginfo( 'name' ); ?> — Home">
            <?php
            $logo = mint_option( 'logo', '' );
            if ( has_custom_logo() ) {
                the_custom_logo();
            } elseif ( $logo ) {
                echo '<img src="' . esc_url( $logo ) . '" alt="' . esc_attr( get_bloginfo( 'name' ) ) . '" class="wordmark-logo" />';
            } else {
                bloginfo( 'name' );
            }
            ?>
        </a>

        <!-- Desktop Nav (uses existing Primary - Right menu if assigned) -->
        <nav class="header-nav" aria-label="<?php esc_attr_e( 'Primary navigation', 'mint-ota' ); ?>">
            <?php
            $menu_args = [
                'menu'        => 'Primary - Right',
                'theme_location' => 'primary-right',
                'container'   => false,
                'depth'       => 1,
                'fallback_cb' => 'mint_fallback_nav',
            ];
            wp_nav_menu( $menu_args );
            ?>
        </nav>

        <!-- Header Actions -->
        <div class="header-actions">
            <a href="<?php echo mint_book_url(); ?>" class="header-book" target="_blank" rel="noopener">
                <?php esc_html_e( 'Book Appointment', 'mint-ota' ); ?>
            </a>

            <button class="menu-toggle" aria-expanded="false" aria-controls="drawer-menu" aria-label="<?php esc_attr_e( 'Open menu', 'mint-ota' ); ?>">
                <span class="hide-mobile"><?php esc_html_e( 'Menu', 'mint-ota' ); ?></span>
                <span class="menu-toggle-bars" aria-hidden="true">
                    <span></span><span></span><span></span>
                </span>
            </button>
        </div>

    </div>
</header>

<!-- ─── Drawer Menu ────────────────────────────────────────── -->
<div class="drawer-overlay" id="drawer-menu" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Site menu', 'mint-ota' ); ?>">
    <nav class="drawer-nav" aria-label="<?php esc_attr_e( 'Drawer navigation', 'mint-ota' ); ?>">
        <?php
        wp_nav_menu( [
            'menu'        => 'Primary - Right',
            'theme_location' => 'primary-right',
            'container'   => false,
            'depth'       => 1,
            'fallback_cb' => 'mint_fallback_nav',
        ] );
        ?>
        <a href="<?php echo mint_book_url(); ?>" target="_blank" rel="noopener" class="drawer-book"><?php esc_html_e( 'Book Appointment', 'mint-ota' ); ?></a>
    </nav>
    <div class="drawer-footer">
        <p>228 N Park Ave · Winter Park, FL · 407.645.2264</p>
        <p>An Aveda Lifestyle Salon</p>
    </div>
</div>

<?php
/**
 * Fallback nav rendered when no menu is assigned to "Primary - Right"
 */
if ( ! function_exists( 'mint_fallback_nav' ) ) :
function mint_fallback_nav() {
    $links = [
        'Services'   => '/services',
        'Artists'    => '/our-artists',
        'Lookbook'   => '/gallery',
        'Reviews'    => '/reviews',
        'Visit'      => '/contact',
    ];
    echo '<ul class="menu">';
    foreach ( $links as $label => $path ) {
        printf( '<li><a href="%s">%s</a></li>', esc_url( home_url( $path ) ), esc_html( $label ) );
    }
    echo '</ul>';
}
endif;
?>

<div id="main-wrapper">
