<?php
/**
 * Template Name: Philosophy Page
 * Template Post Type: page
 */
get_header();
?>

<main id="main-content">

  <section class="page-hero">
    <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( get_template_directory_uri() . '/assets/images/atmosphere.jpg' ); ?>');" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="micro-label page-hero__eyebrow"><?php esc_html_e( 'Our Philosophy', 'mint-ota' ); ?></p>
      <h1 class="page-hero__title"><?php the_title(); ?></h1>
      <p class="page-hero__copy"><?php esc_html_e( "Sometimes, things just feel right. It's the way we felt the first time we stepped into Mint.", 'mint-ota' ); ?></p>
    </div>
  </section>

  <!-- Main Body -->
  <section style="padding-block:clamp(4rem,8vw,7rem);">
    <div class="container" style="display:grid;gap:5rem;align-items:start;">
      <style>@media(min-width:1024px){.phil-grid{grid-template-columns:1fr 1fr !important;}}</style>

      <div class="phil-grid" style="display:grid;gap:5rem;grid-template-columns:1fr;">
        <div class="fade-blur" style="max-width:52ch;">
          <h2 style="font-size:clamp(2rem,4vw,3.5rem);margin-bottom:1.5rem;"><?php esc_html_e( 'Rooted in restraint.', 'mint-ota' ); ?></h2>
          <p style="font-size:1.1rem;line-height:1.8;color:var(--color-muted);margin-bottom:1.25rem;">
            <?php esc_html_e( "At Mint, we're full of gratitude for every person who walks through our door. We see it as the privilege it is — trust placed in our hands, our eyes, our training.", 'mint-ota' ); ?>
          </p>
          <p style="font-size:1.1rem;line-height:1.8;color:var(--color-muted);margin-bottom:1.25rem;">
            <?php esc_html_e( 'We practice an Aveda philosophy: products derived 96% or more from natural sources, built on botanical intelligence developed over fifty years.', 'mint-ota' ); ?>
          </p>
          <p style="font-size:1.1rem;line-height:1.8;color:var(--color-muted);">
            <?php esc_html_e( 'We believe a salon belongs to the neighborhood it sits in — through fundraisers, education days, and quiet acts that do not need a press release.', 'mint-ota' ); ?>
          </p>
        </div>

        <div>
          <?php
          $values = [
            [ 'title' => 'Plant-Based First',  'body' => 'Aveda color and care, derived overwhelmingly from natural sources. Better for your hair, better for the planet.' ],
            [ 'title' => 'Craft Over Speed',   'body' => 'We book time to think, consult, and execute without rushing. Your result should last.' ],
            [ 'title' => 'Community',           'body' => 'Fifteen years on Park Avenue. We give back to Winter Park because Winter Park gave us our start.' ],
            [ 'title' => 'Honest Consultation','body' => 'We tell you what will and will not work for your hair, lifestyle, and maintenance reality.' ],
          ];
          foreach ( $values as $i => $val ) :
            $delay = $i * 0.12;
          ?>
          <div class="fade-up" data-delay="<?php echo esc_attr( $delay ); ?>" style="padding-block:1.5rem;border-bottom:1px solid rgba(100,121,98,.15);">
            <p style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:.5rem;"><?php echo esc_html( $val['title'] ); ?></p>
            <p style="font-size:.95rem;color:var(--color-muted);line-height:1.7;"><?php echo esc_html( $val['body'] ); ?></p>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>
