<?php
/**
 * Template Name: Lookbook Page
 * Template Post Type: page
 */
get_header();

$lookbook = [
  [ 'img' => 'lookbook-1.jpg', 'tag' => 'Color',   'title' => 'Sun-stroked dimensional brunette' ],
  [ 'img' => 'lookbook-2.jpg', 'tag' => 'Texture', 'title' => 'Soft natural waves, defined' ],
  [ 'img' => 'lookbook-3.jpg', 'tag' => 'Cut',     'title' => 'The precision bob' ],
  [ 'img' => 'lookbook-4.jpg', 'tag' => 'Color',   'title' => 'Lived-in blonde, warm roots' ],
  [ 'img' => 'lookbook-5.jpg', 'tag' => 'Event',   'title' => 'Updo for a Winter Park evening' ],
  [ 'img' => 'lookbook-6.jpg', 'tag' => 'Texture', 'title' => 'Curly redefine with Aveda Be Curly' ],
  [ 'img' => 'lookbook-7.jpg', 'tag' => 'Cut',     'title' => 'Lived-in layers, effortless weight' ],
  [ 'img' => 'lookbook-8.jpg', 'tag' => 'Color',   'title' => 'Copper balayage on warm brunette' ],
];
?>

<main id="main-content">

  <section class="page-hero">
    <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( get_template_directory_uri() . '/assets/images/lookbook-1.jpg' ); ?>');" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="micro-label page-hero__eyebrow"><?php esc_html_e( 'The Archive', 'mint-ota' ); ?></p>
      <h1 class="page-hero__title"><?php the_title(); ?></h1>
      <p class="page-hero__copy"><?php esc_html_e( 'Color, cut, texture, and event hair from the chairs of Mint. Quiet inspiration for your next visit.', 'mint-ota' ); ?></p>
    </div>
  </section>

  <section class="container" style="padding-block:clamp(3rem,6vw,5rem);">
    <div style="columns:1;gap:1.5rem;" class="lookbook-masonry">
      <style>@media(min-width:640px){.lookbook-masonry{columns:2!important;}}@media(min-width:1024px){.lookbook-masonry{columns:3!important;}}</style>
      <?php foreach ( $lookbook as $i => $item ) :
        $src   = get_template_directory_uri() . '/assets/images/' . $item['img'];
        $delay = min( $i * 0.08, 0.5 );
      ?>
      <figure class="fade-up" data-delay="<?php echo esc_attr( $delay ); ?>" style="break-inside:avoid;margin-bottom:1.5rem;">
        <div style="overflow:hidden;">
          <img
            src="<?php echo esc_url( $src ); ?>"
            alt="<?php echo esc_attr( $item['title'] ); ?>"
            style="width:100%;display:block;transition:transform .7s var(--ease-out);"
            loading="lazy"
            onmouseover="this.style.transform='scale(1.04)'"
            onmouseout="this.style.transform='scale(1)'"
          >
        </div>
        <figcaption style="padding-top:.6rem;">
          <p class="micro-label" style="color:var(--color-sage);"><?php echo esc_html( $item['tag'] ); ?></p>
          <p style="font-family:var(--font-display);font-size:1rem;"><?php echo esc_html( $item['title'] ); ?></p>
        </figcaption>
      </figure>
      <?php endforeach; ?>
    </div>
  </section>

  <section style="padding-block:3rem;text-align:center;">
    <div class="container">
      <a href="<?php echo mint_book_url(); ?>" class="btn-primary fade-up" target="_blank" rel="noopener">
        <?php esc_html_e( 'Bring Your Inspiration — Book a Visit', 'mint-ota' ); ?>
      </a>
    </div>
  </section>

</main>

<?php get_footer(); ?>
