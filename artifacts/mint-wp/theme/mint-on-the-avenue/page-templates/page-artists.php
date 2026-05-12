<?php
/**
 * Template Name: Artists Page
 * Template Post Type: page
 */
get_header();
?>

<main id="main-content">

  <section class="page-hero">
    <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( get_template_directory_uri() . '/assets/images/artist-1.jpg' ); ?>');" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="micro-label page-hero__eyebrow"><?php esc_html_e( 'The Artists', 'mint-ota' ); ?></p>
      <h1 class="page-hero__title"><?php the_title(); ?></h1>
      <p class="page-hero__copy"><?php esc_html_e( 'Four master stylists. One shared standard: your best possible hair.', 'mint-ota' ); ?></p>
    </div>
  </section>

  <section class="section-artists" style="padding-block:clamp(4rem,10vw,8rem);">
    <div class="container">
      <?php
      $artists = [
        [
          'name'      => 'Sonia',
          'role'      => 'Master Stylist',
          'specialty' => 'Cut · Color · Texture',
          'bio'       => 'Fifteen years of quiet mastery. Sonia reads texture, bone structure, and what you have not yet said — then gives you the version of yourself you forgot was possible. Guests drive 45 minutes and wouldn\'t go anywhere else.',
          'image'     => get_template_directory_uri() . '/assets/images/artist-1.jpg',
        ],
        [
          'name'      => 'Marisa',
          'role'      => 'Color Director',
          'specialty' => 'Balayage · Highlights · Color Correction',
          'bio'       => 'Marisa works in dimension — placing light where it lives naturally, pulling warmth from the undertone, building color that photographs like sunlight. Her clients have called her the best colorist in the United States.',
          'image'     => get_template_directory_uri() . '/assets/images/artist-2.jpg',
        ],
        [
          'name'      => 'Ashley',
          'role'      => 'Senior Stylist',
          'specialty' => 'Cut · Texture · Blowout',
          'bio'       => 'Ashley has a rare fluency in texture. She understands that the best cut dissolves into your life — effortless on a Tuesday, editorial on a Saturday. Clients discover her by happy accident and never leave.',
          'image'     => get_template_directory_uri() . '/assets/images/artist-3.jpg',
        ],
        [
          'name'      => 'Maribel',
          'role'      => 'Senior Colorist',
          'specialty' => 'Highlights · Blonding · Color',
          'bio'       => 'Maribel\'s highlights catch light the way a Venetian painting does — warmth, depth, a luminosity that feels earned rather than applied. Her first-time clients leave looking like they\'ve been going for years.',
          'image'     => get_template_directory_uri() . '/assets/images/artist-4.jpg',
        ],
      ];
      foreach ( $artists as $i => $artist ) :
        $delay = $i * 0.15;
        $reverse = $i % 2 !== 0;
      ?>
      <article style="display:grid;gap:3rem 5rem;align-items:center;padding-block:4rem;border-bottom:1px solid rgba(241,236,223,.12);<?php echo $i === count($artists)-1 ? 'border-bottom:none;' : ''; ?>;grid-template-columns:1fr;" class="artist-full fade-up" data-delay="<?php echo esc_attr( $delay ); ?>">
        <style>@media(min-width:768px){.artist-full{grid-template-columns:1fr 1fr !important;}}</style>
        <div style="<?php echo $reverse ? 'order:2;' : ''; ?>">
          <div style="overflow:hidden;">
            <img
              src="<?php echo esc_url( $artist['image'] ); ?>"
              alt="<?php echo esc_attr( $artist['name'] ); ?>"
              style="width:100%;aspect-ratio:3/4;object-fit:cover;transition:transform 1s var(--ease-out);"
              loading="<?php echo $i === 0 ? 'eager' : 'lazy'; ?>"
              width="600" height="800"
              onmouseover="this.style.transform='scale(1.04)'"
              onmouseout="this.style.transform='scale(1)'"
            >
          </div>
        </div>
        <div style="<?php echo $reverse ? 'order:1;' : ''; ?>padding-block:1rem;">
          <p class="micro-label" style="color:var(--color-brass);margin-bottom:0.5rem;"><?php echo esc_html( $artist['role'] ); ?></p>
          <h2 style="font-family:var(--font-display);font-size:clamp(3rem,6vw,5rem);color:var(--color-warm-white);margin-bottom:0.5rem;"><?php echo esc_html( $artist['name'] ); ?></h2>
          <p class="micro-label" style="color:rgba(241,236,223,0.4);margin-bottom:1.5rem;"><?php echo esc_html( $artist['specialty'] ); ?></p>
          <p style="color:rgba(241,236,223,0.7);font-size:1.05rem;line-height:1.75;max-width:44ch;margin-bottom:2rem;"><?php echo esc_html( $artist['bio'] ); ?></p>
          <a href="<?php echo mint_book_url(); ?>" target="_blank" rel="noopener" class="btn-outline">
            <?php printf( esc_html__( 'Book with %s', 'mint-ota' ), esc_html( $artist['name'] ) ); ?>
          </a>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </section>

</main>

<?php get_footer(); ?>
