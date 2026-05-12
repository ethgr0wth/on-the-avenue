<?php
/**
 * Front Page Template — Cinematic v2 hero + editorial sections
 * Mirrors the React v2 design, built in pure PHP/HTML
 */

get_header();

$hero_left  = get_theme_mod( 'mint_hero_left_image',  get_template_directory_uri() . '/assets/images/hero.jpg' );
$hero_right = get_theme_mod( 'mint_hero_right_image', get_template_directory_uri() . '/assets/images/atmosphere.jpg' );
$eyebrow    = get_theme_mod( 'mint_hero_eyebrow', 'Winter Park, Florida' );
?>

<main id="main-content">

  <!-- ─── CINEMATIC SPLIT HERO ──────────────────────────────── -->
  <section class="site-hero" aria-label="<?php esc_attr_e( 'Hero', 'mint-ota' ); ?>">

    <div class="hero-split" aria-hidden="true">
      <div class="hero-split__panel" style="background-image: url('<?php echo esc_url( $hero_left ); ?>');" role="img" aria-label="<?php esc_attr_e( 'Hair styling', 'mint-ota' ); ?>"></div>
      <div class="hero-split__panel" style="background-image: url('<?php echo esc_url( $hero_right ); ?>');" role="img" aria-label="<?php esc_attr_e( 'Botanical ingredients', 'mint-ota' ); ?>"></div>
    </div>

    <div class="hero-overlay" aria-hidden="true"></div>

    <div class="hero-content">
      <div class="hero-inner">
        <p class="hero-eyebrow micro-label fade-up" data-delay="0.2">
          <?php echo esc_html( $eyebrow ); ?>
        </p>
        <h1 class="hero-title fade-up" data-delay="0.4">
          <?php esc_html_e( 'MINT', 'mint-ota' ); ?>
        </h1>
        <p class="hero-subtitle fade-up" data-delay="0.6">
          <?php esc_html_e( 'on the Avenue', 'mint-ota' ); ?>
        </p>
      </div>
    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
      <div class="scroll-line"></div>
      <span><?php esc_html_e( 'Scroll', 'mint-ota' ); ?></span>
    </div>

  </section><!-- .site-hero -->

  <!-- ─── MARQUEE TICKER ────────────────────────────────────── -->
  <div class="marquee-strip" aria-hidden="true">
    <div style="overflow:hidden">
      <div class="js-marquee-track marquee-track">
        <?php
        $items = [
          'Aveda · Plant-Powered Color',
          'Master Stylists',
          'Park Avenue · Winter Park',
          'Color · Cut · Texture · Event',
          'Est. on the Avenue',
          'Aveda · Plant-Powered Color',
          'Master Stylists',
          'Park Avenue · Winter Park',
          'Color · Cut · Texture · Event',
          'Est. on the Avenue',
        ];
        foreach ( $items as $item ) :
          echo '<span>' . esc_html( $item ) . '</span>';
        endforeach;
        ?>
      </div>
    </div>
  </div>

  <!-- ─── MANIFESTO / PHILOSOPHY ───────────────────────────── -->
  <section class="section-manifesto">
    <div class="container">
      <div class="manifesto-grid">

        <div>
          <?php
          $manifesto_img = get_theme_mod( 'mint_manifesto_image', get_template_directory_uri() . '/assets/images/lookbook-3.jpg' );
          ?>
          <img
            class="manifesto-image fade-up"
            src="<?php echo esc_url( $manifesto_img ); ?>"
            alt="<?php esc_attr_e( 'Editorial hair styling', 'mint-ota' ); ?>"
            loading="lazy"
            width="800" height="1067"
          >
        </div>

        <div class="manifesto-copy">
          <p class="micro-label fade-up" style="color:var(--color-brass);margin-bottom:2rem;">
            <?php esc_html_e( 'Our Philosophy', 'mint-ota' ); ?>
          </p>
          <h2 class="display-editorial fade-up" style="margin-bottom:2rem;">
            <?php esc_html_e( 'A space defined by ', 'mint-ota' ); ?>
            <em class="display-italic"><?php esc_html_e( 'restraint,', 'mint-ota' ); ?></em><br>
            <?php esc_html_e( 'craft, and quiet luxury.', 'mint-ota' ); ?>
          </h2>
          <p class="manifesto-body fade-up">
            <?php esc_html_e( 'Every detail is a deliberate choice. We believe in the power of less, executed perfectly. Our botanical approach to color and cutting is designed to enhance, not mask, your natural texture.', 'mint-ota' ); ?>
          </p>
          <a href="<?php echo esc_url( home_url( '/philosophy' ) ); ?>" class="link-arrow fade-up">
            <?php esc_html_e( 'Read Our Story', 'mint-ota' ); ?>
          </a>
        </div>

      </div>
    </div>
  </section>

  <!-- ─── ARTISTS PREVIEW ────────────────────────────────────── -->
  <section class="section-artists">
    <div class="container">

      <div class="artists-header">
        <div>
          <p class="micro-label fade-up" style="color:var(--color-brass);margin-bottom:1rem;">
            <?php esc_html_e( 'The Artists', 'mint-ota' ); ?>
          </p>
          <h2 class="fade-up">
            <?php esc_html_e( 'Masters of ', 'mint-ota' ); ?>
            <em class="display-italic"><?php esc_html_e( 'craft.', 'mint-ota' ); ?></em>
          </h2>
        </div>
        <a href="<?php echo esc_url( home_url( '/artists' ) ); ?>" class="link-arrow hide-mobile fade-up" style="color:rgba(241,236,223,0.7);border-color:rgba(241,236,223,0.3);">
          <?php esc_html_e( 'View All Artists', 'mint-ota' ); ?>
        </a>
      </div>

      <div class="artists-grid">
        <?php
        $artists = [
          [
            'name'  => 'Sonia',
            'role'  => 'Master Stylist',
            'note'  => 'Fifteen years of quiet mastery. Sonia reads texture, bone structure, and what you have not yet said — then gives you the version of yourself you forgot was possible.',
            'image' => get_template_directory_uri() . '/assets/images/artist-1.jpg',
          ],
          [
            'name'  => 'Marisa',
            'role'  => 'Color Director',
            'note'  => 'Marisa works in dimension — placing light where it lives naturally, pulling warmth from the undertone, building color that photographs like sunlight.',
            'image' => get_template_directory_uri() . '/assets/images/artist-2.jpg',
          ],
          [
            'name'  => 'Ashley',
            'role'  => 'Senior Stylist',
            'note'  => 'Ashley has a rare fluency in texture. She understands that the best cut dissolves into your life — effortless on a Tuesday, editorial on a Saturday.',
            'image' => get_template_directory_uri() . '/assets/images/artist-3.jpg',
          ],
          [
            'name'  => 'Maribel',
            'role'  => 'Senior Colorist',
            'note'  => 'Maribel's highlights catch light the way a Venetian painting does — warmth, depth, a luminosity that feels earned rather than applied.',
            'image' => get_template_directory_uri() . '/assets/images/artist-4.jpg',
          ],
        ];

        foreach ( $artists as $i => $artist ) :
          $delay = $i * 0.15;
        ?>
        <article class="artist-card fade-up" data-delay="<?php echo esc_attr( $delay ); ?>">
          <div class="artist-photo-wrap">
            <img
              class="artist-photo"
              src="<?php echo esc_url( $artist['image'] ); ?>"
              alt="<?php echo esc_attr( $artist['name'] ); ?> — <?php echo esc_attr( $artist['role'] ); ?>"
              loading="lazy"
              width="600" height="800"
            >
          </div>
          <p class="micro-label artist-role"><?php echo esc_html( $artist['role'] ); ?></p>
          <h3 class="artist-name"><?php echo esc_html( $artist['name'] ); ?></h3>
          <p class="artist-note"><?php echo esc_html( $artist['note'] ); ?></p>
        </article>
        <?php endforeach; ?>
      </div>

    </div>
  </section>

  <!-- ─── TESTIMONIALS ──────────────────────────────────────── -->
  <section class="section-reviews">
    <div class="grain" style="position:absolute;inset:0;pointer-events:none;opacity:0.4;" aria-hidden="true"></div>
    <div class="container" style="position:relative;">

      <div class="reviews-header">
        <div>
          <p class="micro-label fade-up" style="color:var(--color-brass);margin-bottom:1rem;">
            <?php esc_html_e( 'Said In Our Chairs', 'mint-ota' ); ?>
          </p>
          <h2 class="fade-up">
            <?php esc_html_e( 'Fifteen years of ', 'mint-ota' ); ?>
            <em class="display-italic"><?php esc_html_e( 'trust.', 'mint-ota' ); ?></em>
          </h2>
        </div>
        <a href="<?php echo esc_url( home_url( '/reviews' ) ); ?>" class="link-arrow hide-mobile fade-up">
          <?php esc_html_e( 'Read All Reviews', 'mint-ota' ); ?>
        </a>
      </div>

      <!-- Featured Quote -->
      <figure class="review-featured fade-blur">
        <blockquote>
          &ldquo;<?php esc_html_e( "I've been loyal to the Mint location on Park Avenue for 15 years. I always walk out feeling like my head looks the best it could be. Sonia is my master stylist, and she does whatever she thinks looks best on me — I'm pleased every time. Clean, beautiful, newly renovated. Can't say enough good things.", 'mint-ota' ); ?>&rdquo;
        </blockquote>
        <figcaption class="micro-label">&mdash; <?php esc_html_e( 'Jean L. · May 2026', 'mint-ota' ); ?></figcaption>
      </figure>

      <!-- Review Grid -->
      <div class="reviews-grid">
        <?php
        $reviews = [
          [
            'text' => "Best salon in the United States. No one can do color like Marisa. So much talent in all of the Master Stylists there!",
            'name' => 'Eva W.',
            'date' => 'May 2026',
          ],
          [
            'text' => "Maribel was so friendly and made me feel at home. She did an EXCELLENT job coloring, cutting and blow-drying my hair.",
            'name' => 'Barbara W.',
            'date' => 'May 2026',
          ],
          [
            'text' => "The best place to get anything hair-related done in Orlando. The service is phenomenal from the moment you walk in to the moment you leave. The staff is so kind and easy to talk to. I've been a customer for two years and can't wait for my next visit.",
            'name' => 'Corbin S.',
            'date' => 'April 2026',
          ],
        ];
        foreach ( $reviews as $i => $review ) :
          $delay = $i * 0.12;
        ?>
        <figure class="review-card fade-up" data-delay="<?php echo esc_attr( $delay ); ?>">
          <div class="stars" aria-label="<?php esc_attr_e( '5 stars', 'mint-ota' ); ?>">★★★★★</div>
          <blockquote>&ldquo;<?php echo esc_html( $review['text'] ); ?>&rdquo;</blockquote>
          <figcaption>
            <span class="micro-label reviewer-name"><?php echo esc_html( $review['name'] ); ?></span>
            <span class="review-date"><?php echo esc_html( $review['date'] ); ?></span>
          </figcaption>
        </figure>
        <?php endforeach; ?>
      </div>

    </div>
  </section>

  <!-- ─── LOOKBOOK SCROLL ────────────────────────────────────── -->
  <section class="section-lookbook">
    <div class="container">
      <div class="lookbook-header">
        <h2 class="fade-up"><?php esc_html_e( 'Archive', 'mint-ota' ); ?></h2>
        <a href="<?php echo esc_url( home_url( '/lookbook' ) ); ?>" class="link-arrow fade-up">
          <?php esc_html_e( 'Explore Gallery', 'mint-ota' ); ?>
        </a>
      </div>
    </div>

    <div class="lookbook-scroll" role="region" aria-label="<?php esc_attr_e( 'Lookbook gallery', 'mint-ota' ); ?>">
      <?php
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
      foreach ( $lookbook as $item ) :
        $src = get_template_directory_uri() . '/assets/images/' . $item['img'];
      ?>
      <div class="lookbook-item">
        <div class="lookbook-img-wrap">
          <img
            class="lookbook-img"
            src="<?php echo esc_url( $src ); ?>"
            alt="<?php echo esc_attr( $item['title'] ); ?>"
            loading="lazy"
            width="600" height="800"
          >
        </div>
        <p class="micro-label lookbook-tag"><?php echo esc_html( $item['tag'] ); ?></p>
        <p style="font-family:var(--font-display);font-size:1rem;margin-top:0.25rem;"><?php echo esc_html( $item['title'] ); ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- ─── NEW GUESTS CTA ────────────────────────────────────── -->
  <section class="section-cta">
    <div class="container">
      <div class="cta-inner">
        <p class="micro-label fade-up" style="color:var(--color-sage);margin-bottom:1rem;">
          <?php esc_html_e( 'New Guests', 'mint-ota' ); ?>
        </p>
        <div class="cta-price fade-up">$50</div>
        <p class="cta-body fade-up">
          <?php esc_html_e( 'Because we\'d love to meet you. $50 toward your first service at Mint, valid with select artists. A small welcome to make trying something new feel easy.', 'mint-ota' ); ?>
        </p>
        <a href="<?php echo esc_url( home_url( '/new-guests' ) ); ?>" class="btn-primary fade-up">
          <?php esc_html_e( 'Claim Your Welcome Offer', 'mint-ota' ); ?>
        </a>
      </div>
    </div>
  </section>

  <!-- ─── GIFT CARDS ────────────────────────────────────────── -->
  <section class="section-gift">
    <div class="container">
      <p class="micro-label fade-up" style="margin-bottom:1rem;"><?php esc_html_e( 'Gift Cards', 'mint-ota' ); ?></p>
      <h2 class="fade-up"><?php esc_html_e( 'Give the gift of a great hair day.', 'mint-ota' ); ?></h2>
      <p class="lead fade-up">
        <?php esc_html_e( 'A Mint gift card is a quiet, generous gesture — for a friend, a partner, a parent, or yourself, after the week you\'ve had.', 'mint-ota' ); ?>
      </p>
      <a href="<?php echo esc_url( home_url( '/gift-cards' ) ); ?>" class="btn-outline fade-up">
        <?php esc_html_e( 'Shop Gift Cards', 'mint-ota' ); ?>
      </a>
    </div>
  </section>

</main><!-- #main-content -->

<?php get_footer(); ?>
