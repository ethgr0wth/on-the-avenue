<?php get_header(); ?>

<main id="main-content" class="error-page">
  <div class="error-inner">
    <p class="micro-label fade-up brass">404</p>
    <h1 class="display-editorial fade-up"><?php esc_html_e( 'Page not found.', 'mint-ota' ); ?></h1>
    <p class="lead fade-up"><?php esc_html_e( "We couldn't find that page — but we can find the right look for you.", 'mint-ota' ); ?></p>
    <div class="error-cta fade-up">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-primary"><?php esc_html_e( 'Go Home', 'mint-ota' ); ?></a>
      <a href="<?php echo mint_book_url(); ?>" class="btn-outline dark" target="_blank" rel="noopener"><?php esc_html_e( 'Book Appointment', 'mint-ota' ); ?></a>
    </div>
  </div>
</main>

<?php get_footer(); ?>
