<?php
/**
 * Template Name: Reviews Page
 * Template Post Type: page
 */
get_header();

$all_reviews = [
  [ 'name' => 'Eva W.',      'date' => 'May 2026',   'text' => 'Best salon in the United States. No one can do color like Marisa. So much talent in all of the Master Stylists there!' ],
  [ 'name' => 'Barbara W.',  'date' => 'May 2026',   'text' => 'Maribel was so friendly and made me feel at home. She did an EXCELLENT job coloring, cutting and blow-drying my hair.' ],
  [ 'name' => 'Jean L.',     'date' => 'May 2026',   'text' => "I've been loyal to the Mint location on Park Avenue for 15 years. I always walk out feeling like my head looks the best it could be. Sonia is my master stylist, and she does whatever she thinks looks best on me — I'm pleased every time. Clean, beautiful, newly renovated. Can't say enough good things." ],
  [ 'name' => 'Jim H.',      'date' => 'May 2026',   'text' => 'Good haircut. Good conversation.' ],
  [ 'name' => 'Glen S.',     'date' => 'May 2026',   'text' => "Ashley is the best. I met her at a restaurant bar and we started talking — I said I needed a haircut and she said that's what she does and she introduced me to Mint. Best place I've found." ],
  [ 'name' => 'Anna R.',     'date' => 'April 2026', 'text' => 'Love my hair — all very good!! Thank you.' ],
  [ 'name' => 'Frank D.',    'date' => 'April 2026', 'text' => 'Superb haircut in pleasant surroundings. I might have to fly back from Milwaukee just to get your special touch!' ],
  [ 'name' => 'Emily Q.',    'date' => 'April 2026', 'text' => 'Always leave feeling refreshed and ready to show off my hair!' ],
  [ 'name' => 'Rhonda C.',   'date' => 'April 2026', 'text' => 'Sonia is always spot on and wonderful. Thank you!' ],
  [ 'name' => 'Nancy L.',    'date' => 'April 2026', 'text' => 'Wonderful as always, and all the employees at Mint are just the greatest.' ],
  [ 'name' => 'Renee W.',    'date' => 'April 2026', 'text' => 'Sonia is great!' ],
  [ 'name' => 'Lisa H.',     'date' => 'April 2026', 'text' => 'Friendly, professional, welcoming.' ],
  [ 'name' => 'Erika V.',    'date' => 'April 2026', 'text' => "Today was my first time with Maribel — she didn't disappoint. Her skill and years of experience were apparent in the observations and questions she asked. She gave me beautiful blonde highlights, a great cut, and a smooth, sleek blowout. Thank you." ],
  [ 'name' => 'Jennifer M.', 'date' => 'April 2026', 'text' => 'Excellent blowout by Ashley.' ],
  [ 'name' => 'Ramona T.',   'date' => 'April 2026', 'text' => 'I am a total Sonia fan! No one else touches my hair and I drive 45 minutes to get to her!' ],
  [ 'name' => 'Corbin S.',   'date' => 'April 2026', 'text' => "The best place to get anything hair-related done in Orlando. The service is phenomenal from the moment you walk in to the moment you leave. The staff is so kind and easy to talk to. I've been a customer for two years and can't wait for my next visit." ],
];
?>

<main id="main-content">

  <section class="page-hero">
    <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( get_template_directory_uri() . '/assets/images/lookbook-3.jpg' ); ?>');" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="micro-label page-hero__eyebrow"><?php esc_html_e( "What They're Saying", 'mint-ota' ); ?></p>
      <h1 class="page-hero__title"><?php esc_html_e( "It's never \"just\" hair.", 'mint-ota' ); ?></h1>
      <p class="page-hero__copy"><?php esc_html_e( "And you wouldn't trust yours with just anyone. Here's what our guests — many of whom have been coming for fifteen years and counting — have to say.", 'mint-ota' ); ?></p>
    </div>
  </section>

  <!-- Featured -->
  <section style="background:var(--color-mist);padding-block:clamp(4rem,8vw,7rem);position:relative;overflow:hidden;">
    <div class="grain" style="position:absolute;inset:0;pointer-events:none;" aria-hidden="true"></div>
    <div class="container" style="position:relative;">
      <p class="micro-label fade-up" style="color:var(--color-sage);margin-bottom:1.5rem;"><?php esc_html_e( 'Featured', 'mint-ota' ); ?></p>
      <figure>
        <blockquote class="fade-blur" style="font-family:var(--font-display);font-size:clamp(1.8rem,4vw,3rem);line-height:1.3;color:var(--color-forest);max-width:50rem;">
          &ldquo;<?php echo esc_html( $all_reviews[2]['text'] ); ?>&rdquo;
        </blockquote>
        <figcaption class="micro-label fade-up" style="color:var(--color-forest);margin-top:1.5rem;">
          &mdash; <?php echo esc_html( $all_reviews[2]['name'] . ' · ' . $all_reviews[2]['date'] ); ?>
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- All Reviews Grid -->
  <section style="padding-block:clamp(3rem,6vw,5rem);">
    <div class="container">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;align-items:start;">
        <?php foreach ( $all_reviews as $i => $r ) :
          $delay = min( $i * 0.05, 0.4 );
        ?>
        <figure class="review-card fade-up" data-delay="<?php echo esc_attr( $delay ); ?>">
          <div class="stars" aria-label="<?php esc_attr_e( '5 stars', 'mint-ota' ); ?>">★★★★★</div>
          <blockquote>&ldquo;<?php echo esc_html( $r['text'] ); ?>&rdquo;</blockquote>
          <figcaption>
            <span class="micro-label reviewer-name"><?php echo esc_html( $r['name'] ); ?></span>
            <span class="review-date"><?php echo esc_html( $r['date'] ); ?></span>
          </figcaption>
        </figure>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Book CTA -->
  <section style="padding-block:clamp(3rem,6vw,5rem);background:var(--color-forest);text-align:center;">
    <div class="container">
      <h2 style="color:var(--color-warm-white);margin-bottom:1rem;font-size:clamp(1.8rem,4vw,3.5rem);" class="fade-up">
        <?php esc_html_e( "We'd love to be your next favorite review.", 'mint-ota' ); ?>
      </h2>
      <a href="<?php echo mint_book_url(); ?>" class="btn-primary fade-up" target="_blank" rel="noopener" style="margin-top:1.5rem;">
        <?php esc_html_e( 'Book Your Visit', 'mint-ota' ); ?>
      </a>
    </div>
  </section>

</main>

<?php get_footer(); ?>
