<?php
/**
 * 404 Page Template
 */
get_header();
?>

<main id="main-content" style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding-block:calc(var(--header-h) + 4rem) 4rem;">
  <div style="text-align:center;max-width:40rem;padding-inline:var(--px);">
    <p class="micro-label fade-up" style="color:var(--color-brass);margin-bottom:1rem;">404</p>
    <h1 class="display-editorial fade-up" style="margin-bottom:1.5rem;"><?php esc_html_e( 'Page not found.', 'mint-ota' ); ?></h1>
    <p class="lead fade-up" style="margin-bottom:2.5rem;">
      <?php esc_html_e( 'We couldn\'t find that page — but we can find the right look for you.', 'mint-ota' ); ?>
    </p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;" class="fade-up">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-primary"><?php esc_html_e( 'Go Home', 'mint-ota' ); ?></a>
      <a href="<?php echo mint_book_url(); ?>" class="btn-outline" style="border-color:var(--color-forest);color:var(--color-forest);" target="_blank" rel="noopener"><?php esc_html_e( 'Book Appointment', 'mint-ota' ); ?></a>
    </div>
  </div>
</main>

<?php get_footer(); ?>
