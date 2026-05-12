<?php
/**
 * Template Name: New Guests Page
 * Template Post Type: page
 */
get_header();
?>

<main id="main-content">

  <section class="page-hero">
    <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero.jpg' ); ?>');" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="micro-label page-hero__eyebrow"><?php esc_html_e( 'New Guests', 'mint-ota' ); ?></p>
      <h1 class="page-hero__title"><?php the_title(); ?></h1>
      <p class="page-hero__copy"><?php esc_html_e( 'Because we\'d love to meet you.', 'mint-ota' ); ?></p>
    </div>
  </section>

  <section style="padding-block:clamp(4rem,8vw,7rem);background:var(--color-mist);">
    <div class="container" style="display:grid;gap:4rem;align-items:center;grid-template-columns:1fr;">
      <style>@media(min-width:768px){.ng-grid{grid-template-columns:1fr 1fr !important;}}</style>

      <div class="ng-grid" style="display:grid;gap:4rem;grid-template-columns:1fr;">
        <div>
          <p class="micro-label fade-up" style="color:var(--color-brass);margin-bottom:1rem;"><?php esc_html_e( 'Welcome Offer', 'mint-ota' ); ?></p>
          <div class="cta-price fade-up">$50</div>
          <p style="font-size:1.15rem;font-weight:300;color:var(--color-muted);max-width:40ch;line-height:1.7;margin-top:1rem;margin-bottom:2rem;" class="fade-up">
            <?php esc_html_e( '$50 toward your first service at Mint, valid with select artists. A small welcome to make trying something new feel easy.', 'mint-ota' ); ?>
          </p>
          <a href="<?php echo mint_book_url(); ?>" class="btn-primary fade-up" target="_blank" rel="noopener">
            <?php esc_html_e( 'Claim Your Welcome Offer', 'mint-ota' ); ?>
          </a>
        </div>

        <div>
          <p class="micro-label fade-up" style="color:var(--color-brass);margin-bottom:1.5rem;"><?php esc_html_e( 'What to Expect', 'mint-ota' ); ?></p>
          <?php
          $steps = [
            [ 'n' => '01', 'title' => 'Book Online',          'body' => 'Choose your artist, service, and time. Takes two minutes on Fresha.' ],
            [ 'n' => '02', 'title' => 'A Warm Welcome',       'body' => 'Enjoy a complimentary Aveda aroma ritual and a Moment of Wellness scalp treatment.' ],
            [ 'n' => '03', 'title' => 'Unhurried Consultation','body' => 'Twenty minutes to understand your history, goals, and lifestyle before a single scissor opens.' ],
            [ 'n' => '04', 'title' => 'Your Service',         'body' => 'Expert color, cut, or treatment — with Aveda plant-powered products.' ],
            [ 'n' => '05', 'title' => 'Leave Feeling It',     'body' => 'Home-care guidance and a reason to come back.' ],
          ];
          foreach ( $steps as $i => $step ) :
            $delay = $i * 0.1;
          ?>
          <div class="fade-up" data-delay="<?php echo esc_attr( $delay ); ?>" style="display:flex;gap:1.5rem;padding-block:1.25rem;border-bottom:1px solid rgba(100,121,98,.15);">
            <span style="font-family:var(--font-display);font-size:2.5rem;color:var(--color-brass);line-height:1;flex-shrink:0;width:2.5rem;"><?php echo esc_html( $step['n'] ); ?></span>
            <div>
              <p style="font-family:var(--font-display);font-size:1.2rem;margin-bottom:0.25rem;"><?php echo esc_html( $step['title'] ); ?></p>
              <p style="font-size:.9rem;color:var(--color-muted);line-height:1.6;"><?php echo esc_html( $step['body'] ); ?></p>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

</main>

<?php get_footer(); ?>
