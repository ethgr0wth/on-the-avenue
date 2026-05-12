<?php
/**
 * Atelier Front Page — typographic editorial variant.
 * Pulls hero image from `hp_slides` CPT, preserves promo CPT block,
 * replaces marquee with a pull-quote, adds numbered services strip.
 */
get_header();
?>

<main id="main-content">

    <!-- ─── ATELIER HERO (typographic editorial split) ────────── -->
    <?php get_template_part( 'parts/content', 'slides' ); ?>

    <!-- ─── PHOREST BOOKING STRIP (under hero) ────────────────── -->
    <?php get_template_part( 'parts/booking-strip' ); ?>

    <!-- ─── PROMOS (preserved from Imaginal — uses promo_btn CPT + ACF) ─── -->
    <?php
    if ( have_posts() ) : while ( have_posts() ) : the_post();
        if ( mint_field( 'show_promo_boxes' ) ) {
            get_template_part( 'parts/content', 'promos' );
        }
    endwhile; endif;
    ?>

    <!-- ─── PULL QUOTE (replaces ticker — atelier prefers stillness) ─── -->
    <section class="section-pullquote">
        <div class="container">
            <figure class="pullquote">
                <blockquote class="fade-blur">
                    <?php esc_html_e( 'A great haircut is a quiet conversation between scissors, a stylist who is paying attention, and the person sitting in the chair.', 'mint-ota' ); ?>
                </blockquote>
                <figcaption class="micro-label fade-up brass">
                    <?php esc_html_e( 'House Belief, No. 1', 'mint-ota' ); ?>
                </figcaption>
            </figure>
        </div>
    </section>

    <!-- ─── MANIFESTO (copy left, image right — flipped from v2) ─── -->
    <section class="section-manifesto" id="manifesto">
        <div class="container">
            <div class="manifesto-grid manifesto-grid--flipped">
                <div class="manifesto-copy">
                    <p class="micro-label fade-up brass"><?php esc_html_e( 'Our Philosophy', 'mint-ota' ); ?></p>
                    <h2 class="display-editorial fade-up">
                        <?php esc_html_e( 'A space defined by ', 'mint-ota' ); ?>
                        <em class="display-italic"><?php esc_html_e( 'restraint,', 'mint-ota' ); ?></em><br>
                        <?php esc_html_e( 'craft, and quiet luxury.', 'mint-ota' ); ?>
                    </h2>
                    <p class="manifesto-body fade-up">
                        <?php esc_html_e( "Every detail is a deliberate choice. We believe in the power of less, executed perfectly. Our botanical Aveda approach to color and cutting is designed to enhance, not mask, your natural texture.", 'mint-ota' ); ?>
                    </p>
                    <a href="<?php echo esc_url( home_url( '/about' ) ); ?>" class="link-arrow fade-up">
                        <?php esc_html_e( 'Read Our Story', 'mint-ota' ); ?>
                    </a>
                </div>
                <div>
                    <img
                        class="manifesto-image fade-up"
                        src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/editorial-cut.png' ); ?>"
                        alt="<?php esc_attr_e( 'Editorial cut at Mint on the Avenue', 'mint-ota' ); ?>"
                        loading="lazy"
                    >
                </div>
            </div>
        </div>
    </section>

    <!-- ─── NUMBERED SERVICES STRIP (atelier-only) ───────────── -->
    <section class="section-services">
        <div class="container">
            <header class="services-header">
                <p class="micro-label fade-up brass"><?php esc_html_e( 'The Menu', 'mint-ota' ); ?></p>
                <h2 class="fade-up">
                    <?php esc_html_e( 'What we do, and ', 'mint-ota' ); ?>
                    <em class="display-italic"><?php esc_html_e( 'how we do it.', 'mint-ota' ); ?></em>
                </h2>
            </header>

            <ol class="services-list">
                <?php
                $services = [
                    [ 'n' => '01', 'label' => __( 'Color',          'mint-ota' ), 'note' => __( 'Single-process, dimensional, balayage, gloss. Built on Aveda botanical pigments.', 'mint-ota' ) ],
                    [ 'n' => '02', 'label' => __( 'Hair',           'mint-ota' ), 'note' => __( 'Editorial cutting, blowouts, finishing. The cut that lives quietly in your week.',     'mint-ota' ) ],
                    [ 'n' => '03', 'label' => __( 'Texture',        'mint-ota' ), 'note' => __( 'Smoothing, curl care, restoration. Working with what your hair is, not against it.',   'mint-ota' ) ],
                    [ 'n' => '04', 'label' => __( 'Treatments',     'mint-ota' ), 'note' => __( 'Botanical scalp and bond therapy. Twenty minutes that resets the rest of the month.',   'mint-ota' ) ],
                    [ 'n' => '05', 'label' => __( 'Extensions',     'mint-ota' ), 'note' => __( 'Tape-in and hand-tied, color-matched and discreetly placed.',                          'mint-ota' ) ],
                    [ 'n' => '06', 'label' => __( 'Wedding',        'mint-ota' ), 'note' => __( 'Bridal hair on the day, with trials and a calm room. The morning, handled.',           'mint-ota' ) ],
                ];
                $book = mint_phorest_url();
                foreach ( $services as $s ) :
                ?>
                <li class="service-row fade-up">
                    <span class="service-num"><?php echo esc_html( $s['n'] ); ?></span>
                    <h3 class="service-label"><?php echo esc_html( $s['label'] ); ?></h3>
                    <p class="service-note"><?php echo esc_html( $s['note'] ); ?></p>
                    <a class="service-cta" href="<?php echo esc_url( $book ); ?>" target="_blank" rel="noopener" aria-label="<?php echo esc_attr( sprintf( __( 'Book %s', 'mint-ota' ), $s['label'] ) ); ?>">
                        <?php esc_html_e( 'Book', 'mint-ota' ); ?>
                    </a>
                </li>
                <?php endforeach; ?>
            </ol>
        </div>
    </section>

    <!-- ─── ARTISTS (3 — Sonia, Marisa, Maribel) ──────────────── -->
    <section class="section-artists">
        <div class="container">
            <div class="artists-header">
                <div>
                    <p class="micro-label fade-up brass"><?php esc_html_e( 'The Artists', 'mint-ota' ); ?></p>
                    <h2 class="fade-up">
                        <?php esc_html_e( 'Masters of ', 'mint-ota' ); ?>
                        <em class="display-italic"><?php esc_html_e( 'craft.', 'mint-ota' ); ?></em>
                    </h2>
                </div>
                <a href="<?php echo esc_url( home_url( '/our-artists' ) ); ?>" class="link-arrow hide-mobile fade-up dim">
                    <?php esc_html_e( 'View All Artists', 'mint-ota' ); ?>
                </a>
            </div>

            <div class="artists-grid artists-grid--three">
                <?php
                // 3 artists for now — Ashley's photo pending; she'll be added when received.
                $artists = [
                    [ 'name'=>'Sonia',   'role'=>'Master Stylist',  'note'=>'Fifteen years of quiet mastery. Sonia reads texture, bone structure, and what you have not yet said — then gives you the version of yourself you forgot was possible.', 'image'=>'artist-sonia.png'   ],
                    [ 'name'=>'Marisa',  'role'=>'Color Director',  'note'=>'Marisa works in dimension — placing light where it lives naturally, pulling warmth from the undertone, building color that photographs like sunlight.',                          'image'=>'artist-marisa.jpg'  ],
                    [ 'name'=>'Maribel', 'role'=>'Senior Colorist', 'note'=>"Maribel's highlights catch light the way a Venetian painting does — warmth, depth, a luminosity that feels earned rather than applied.",                                          'image'=>'artist-maribel.png' ],
                ];
                foreach ( $artists as $i => $a ) :
                    $delay = $i * 0.15;
                    $img   = get_template_directory_uri() . '/assets/images/' . $a['image'];
                ?>
                <article class="artist-card fade-up" data-delay="<?php echo esc_attr( $delay ); ?>">
                    <div class="artist-photo-wrap">
                        <img class="artist-photo" src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $a['name'] . ' — ' . $a['role'] ); ?>" loading="lazy">
                    </div>
                    <p class="micro-label artist-role"><?php echo esc_html( $a['role'] ); ?></p>
                    <h3 class="artist-name"><?php echo esc_html( $a['name'] ); ?></h3>
                    <p class="artist-note"><?php echo esc_html( $a['note'] ); ?></p>
                </article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- ─── EDITORIAL GALLERY (atelier) ─────────────────────── -->
    <section class="section-gallery">
        <div class="container">
            <header class="gallery-header">
                <p class="micro-label fade-up brass"><?php esc_html_e( 'In The Room', 'mint-ota' ); ?></p>
                <h2 class="fade-up">
                    <?php esc_html_e( 'Quiet hours, ', 'mint-ota' ); ?>
                    <em class="display-italic"><?php esc_html_e( 'considered work.', 'mint-ota' ); ?></em>
                </h2>
            </header>
            <div class="gallery-grid">
                <figure class="gallery-tile gallery-tile--tall fade-up">
                    <img loading="lazy" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/color-work.png' ); ?>" alt="<?php esc_attr_e( 'Aveda balayage color work', 'mint-ota' ); ?>">
                    <figcaption class="micro-label"><?php esc_html_e( 'Color · Balayage', 'mint-ota' ); ?></figcaption>
                </figure>
                <figure class="gallery-tile fade-up">
                    <img loading="lazy" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/atmosphere.png' ); ?>" alt="<?php esc_attr_e( 'Salon styling station detail', 'mint-ota' ); ?>">
                    <figcaption class="micro-label"><?php esc_html_e( 'The Station', 'mint-ota' ); ?></figcaption>
                </figure>
                <figure class="gallery-tile fade-up">
                    <img loading="lazy" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/treatment.png' ); ?>" alt="<?php esc_attr_e( 'Botanical scalp treatment', 'mint-ota' ); ?>">
                    <figcaption class="micro-label"><?php esc_html_e( 'Botanical Treatments', 'mint-ota' ); ?></figcaption>
                </figure>
            </div>
        </div>
    </section>

    <!-- ─── REVIEWS ──────────────────────────────────────────── -->
    <section class="section-reviews">
        <div class="grain" aria-hidden="true"></div>
        <div class="container reviews-container">

            <div class="reviews-header">
                <div>
                    <p class="micro-label fade-up brass"><?php esc_html_e( 'Said In Our Chairs', 'mint-ota' ); ?></p>
                    <h2 class="fade-up">
                        <?php esc_html_e( 'Fifteen years of ', 'mint-ota' ); ?>
                        <em class="display-italic"><?php esc_html_e( 'trust.', 'mint-ota' ); ?></em>
                    </h2>
                </div>
                <a href="<?php echo esc_url( home_url( '/reviews' ) ); ?>" class="link-arrow hide-mobile fade-up">
                    <?php esc_html_e( 'Read All Reviews', 'mint-ota' ); ?>
                </a>
            </div>

            <figure class="review-featured fade-blur">
                <blockquote>
                    &ldquo;<?php esc_html_e( "I've been loyal to the Mint location on Park Avenue for 15 years. I always walk out feeling like my head looks the best it could be. Sonia is my master stylist, and she does whatever she thinks looks best on me — I'm pleased every time. Clean, beautiful, newly renovated. Can't say enough good things.", 'mint-ota' ); ?>&rdquo;
                </blockquote>
                <figcaption class="micro-label">&mdash; Jean L. · May 2026</figcaption>
            </figure>

            <div class="reviews-grid">
                <?php
                $reviews = [
                    [ 'text'=>"Best salon in the United States. No one can do color like Marisa. So much talent in all of the Master Stylists there!", 'name'=>'Eva W.', 'date'=>'May 2026' ],
                    [ 'text'=>"Maribel was so friendly and made me feel at home. She did an EXCELLENT job coloring, cutting and blow-drying my hair.", 'name'=>'Barbara W.', 'date'=>'May 2026' ],
                    [ 'text'=>"The best place to get anything hair-related done in Orlando. The service is phenomenal from the moment you walk in to the moment you leave.", 'name'=>'Corbin S.', 'date'=>'April 2026' ],
                ];
                foreach ( $reviews as $i => $r ) :
                    $delay = $i * 0.12;
                ?>
                <figure class="review-card fade-up" data-delay="<?php echo esc_attr( $delay ); ?>">
                    <div class="stars" aria-label="5 stars">★★★★★</div>
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

    <!-- ─── NEW GUESTS CTA ──────────────────────────────────── -->
    <section class="section-cta">
        <div class="container">
            <div class="cta-inner">
                <p class="micro-label fade-up sage"><?php esc_html_e( 'New Guests', 'mint-ota' ); ?></p>
                <div class="cta-price fade-up">20<span class="cta-price-pct">%</span> <span class="cta-price-off">off</span></div>
                <p class="cta-body fade-up">
                    <?php esc_html_e( "Because we'd love to meet you. Twenty percent off your first service at Mint, valid with select artists. A small welcome to make trying something new feel easy.", 'mint-ota' ); ?>
                </p>
                <a href="<?php echo mint_book_url(); ?>" class="btn-primary fade-up" target="_blank" rel="noopener">
                    <?php esc_html_e( 'Claim Your Welcome Offer', 'mint-ota' ); ?>
                </a>
            </div>
        </div>
    </section>

    <!-- ─── GIFT CARDS ──────────────────────────────────────── -->
    <section class="section-gift">
        <div class="container">
            <p class="micro-label fade-up"><?php esc_html_e( 'Gift Cards', 'mint-ota' ); ?></p>
            <h2 class="fade-up"><?php esc_html_e( 'Give the gift of a great hair day.', 'mint-ota' ); ?></h2>
            <p class="lead fade-up">
                <?php esc_html_e( "A Mint gift card is a quiet, generous gesture — for a friend, a partner, a parent, or yourself, after the week you've had.", 'mint-ota' ); ?>
            </p>
            <a href="<?php echo mint_book_url(); ?>" class="btn-outline fade-up" target="_blank" rel="noopener">
                <?php esc_html_e( 'Shop Gift Cards', 'mint-ota' ); ?>
            </a>
        </div>
    </section>

    <!-- ─── BLOG TEASER (preserved from Imaginal) ───────────── -->
    <section class="section-blog-teaser">
        <div class="container">
            <p class="micro-label fade-up brass"><?php esc_html_e( 'Notes from the Salon', 'mint-ota' ); ?></p>
            <div class="blog-teaser-grid">
                <?php
                $blog_q = new WP_Query( [ 'posts_per_page' => 2, 'ignore_sticky_posts' => true ] );
                if ( $blog_q->have_posts() ) : while ( $blog_q->have_posts() ) : $blog_q->the_post();
                ?>
                <article class="blog-teaser-card fade-up">
                    <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                    <div class="blog-teaser-excerpt"><?php the_excerpt(); ?></div>
                    <a class="link-arrow" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Read More', 'mint-ota' ); ?></a>
                </article>
                <?php endwhile; wp_reset_postdata(); endif; ?>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>
