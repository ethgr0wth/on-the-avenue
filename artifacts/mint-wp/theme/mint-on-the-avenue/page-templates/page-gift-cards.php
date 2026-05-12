<?php
/**
 * Template Name: Gift Cards Page
 * Template Post Type: page
 */
get_header();
?>

<main id="main-content">

  <section class="page-hero">
    <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( get_template_directory_uri() . '/assets/images/atmosphere.jpg' ); ?>');" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="micro-label page-hero__eyebrow"><?php esc_html_e( 'Gift Cards', 'mint-ota' ); ?></p>
      <h1 class="page-hero__title"><?php the_title(); ?></h1>
      <p class="page-hero__copy"><?php esc_html_e( "A quiet, generous gesture — for someone you love, or yourself.", 'mint-ota' ); ?></p>
    </div>
  </section>

  <section style="padding-block:clamp(4rem,8vw,7rem);background:var(--color-forest);">
    <div class="container" style="display:grid;gap:4rem;align-items:center;grid-template-columns:1fr;">
      <style>@media(min-width:768px){.gc-grid{grid-template-columns:1fr 1fr !important;}}</style>
      <div class="gc-grid" style="display:grid;gap:4rem;grid-template-columns:1fr;">

        <!-- Card Preview -->
        <div style="display:flex;align-items:center;justify-content:center;" class="fade-up">
          <div style="background:linear-gradient(135deg,var(--color-eucalyptus),var(--color-forest));padding:3rem;aspect-ratio:1.6/1;width:100%;max-width:420px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid rgba(184,154,106,.3);">
            <p class="micro-label" style="color:var(--color-brass);"><?php esc_html_e( 'Mint Gift Card', 'mint-ota' ); ?></p>
            <p style="font-family:var(--font-display);font-size:3rem;letter-spacing:.32em;color:var(--color-warm-white);">MINT</p>
            <p style="font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(241,236,223,.5);"><?php esc_html_e( 'Mint on the Avenue · Winter Park FL', 'mint-ota' ); ?></p>
          </div>
        </div>

        <!-- Copy + CTA -->
        <div class="fade-up" data-delay="0.2">
          <p class="micro-label" style="color:var(--color-brass);margin-bottom:1rem;"><?php esc_html_e( 'Give the gift of great hair', 'mint-ota' ); ?></p>
          <h2 style="color:var(--color-warm-white);margin-bottom:1.5rem;"><?php esc_html_e( 'For every occasion,<br>or no occasion at all.', 'mint-ota' ); ?></h2>
          <p style="color:rgba(241,236,223,.65);font-size:1.05rem;line-height:1.75;max-width:40ch;margin-bottom:2.5rem;">
            <?php esc_html_e( 'A Mint gift card is a quiet, generous gesture — for a friend, a partner, a parent, or yourself, after the week you\'ve had. Available in any amount, redeemable for any service.', 'mint-ota' ); ?>
          </p>
          <a href="<?php echo mint_book_url(); ?>" class="btn-outline" target="_blank" rel="noopener">
            <?php esc_html_e( 'Purchase Gift Card', 'mint-ota' ); ?>
          </a>
        </div>

      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>
