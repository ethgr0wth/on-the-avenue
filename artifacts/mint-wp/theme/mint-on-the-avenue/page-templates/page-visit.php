<?php
/**
 * Template Name: Visit Page
 * Template Post Type: page
 */
get_header();
?>

<main id="main-content">

  <section class="page-hero">
    <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero.jpg' ); ?>');" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="micro-label page-hero__eyebrow"><?php esc_html_e( 'Plan Your Visit', 'mint-ota' ); ?></p>
      <h1 class="page-hero__title"><?php the_title(); ?></h1>
      <p class="page-hero__copy"><?php esc_html_e( 'Park Avenue, Winter Park. Easy to find, impossible to forget.', 'mint-ota' ); ?></p>
    </div>
  </section>

  <section class="container" style="padding-block:4rem;display:grid;gap:3rem;align-items:start;" class="visit-info-grid">
    <style>.visit-info-grid{grid-template-columns:1fr;}@media(min-width:768px){.visit-info-grid{grid-template-columns:1fr 1fr;}}</style>

    <div>
      <p class="micro-label fade-up" style="color:var(--color-brass);margin-bottom:1rem;"><?php esc_html_e( 'Find Us', 'mint-ota' ); ?></p>
      <address style="font-style:normal;line-height:1.9;font-size:1.1rem;" class="fade-up">
        <strong style="font-family:var(--font-display);font-size:1.5rem;"><?php esc_html_e( '228 N Park Avenue', 'mint-ota' ); ?></strong><br>
        <?php esc_html_e( 'Winter Park, FL 32789', 'mint-ota' ); ?><br>
        <a href="tel:+14076452264" style="color:var(--color-sage);">407.645.2264</a>
      </address>

      <div style="margin-top:2.5rem;" class="fade-up">
        <p class="micro-label" style="color:var(--color-brass);margin-bottom:1rem;"><?php esc_html_e( 'Hours', 'mint-ota' ); ?></p>
        <table style="border-collapse:collapse;width:100%;max-width:320px;">
          <?php
          $hours = [
            'Tuesday — Friday' => '9:00 am — 8:00 pm',
            'Saturday'         => '9:00 am — 6:00 pm',
            'Sunday — Monday'  => 'Closed',
          ];
          foreach ( $hours as $day => $time ) :
          ?>
          <tr style="border-bottom:1px solid rgba(100,121,98,.12);">
            <td style="padding:.65rem 0;font-size:.85rem;"><?php echo esc_html( $day ); ?></td>
            <td style="padding:.65rem 0;font-size:.85rem;text-align:right;color:var(--color-sage);"><?php echo esc_html( $time ); ?></td>
          </tr>
          <?php endforeach; ?>
        </table>
      </div>

      <div style="margin-top:2.5rem;display:flex;gap:1rem;flex-wrap:wrap;" class="fade-up">
        <a href="<?php echo mint_book_url(); ?>" class="btn-primary" target="_blank" rel="noopener">
          <?php esc_html_e( 'Book Appointment', 'mint-ota' ); ?>
        </a>
        <a href="https://maps.apple.com/?address=228+N+Park+Ave,Winter+Park,FL" target="_blank" rel="noopener" class="btn-outline" style="border-color:var(--color-forest);color:var(--color-forest);">
          <?php esc_html_e( 'Get Directions', 'mint-ota' ); ?>
        </a>
      </div>
    </div>

    <!-- Map -->
    <div class="fade-up">
      <iframe
        class="visit-map"
        title="<?php esc_attr_e( 'Map to Mint on the Avenue', 'mint-ota' ); ?>"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.437!2d-81.3517!3d28.5996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e773d8a26bb44b%3A0x4b05b0b1c71c27e5!2s228%20N%20Park%20Ave%2C%20Winter%20Park%2C%20FL%2032789!5e0!3m2!1sen!2sus!4v1"
        style="border:0;border-radius:0;width:100%;height:420px;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

  </section>

</main>

<?php get_footer(); ?>
