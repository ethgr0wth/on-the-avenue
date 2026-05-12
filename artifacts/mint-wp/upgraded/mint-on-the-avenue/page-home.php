<?php
/**
 * Front Page Template — Mint v2 Cinematic
 * Pulls hero panels from `hp_slides` CPT (preserved from Imaginal),
 * renders new editorial sections (manifesto, artists, reviews, lookbook).
 */
get_header();
?>

<main id="main-content">

    <!-- ─── CINEMATIC HERO (driven by hp_slides CPT) ──────────── -->
    <?php get_template_part( 'parts/content', 'slides' ); ?>

    <!-- ─── MARQUEE TICKER ───────────────────────────────────── -->
    <div class="marquee-strip" aria-hidden="true">
        <div class="marquee-mask">
            <div class="marquee-track">
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
                foreach ( $items as $item ) {
                    echo '<span>' . esc_html( $item ) . '</span>';
                }
                ?>
            </div>
        </div>
    </div>

    <!-- ─── PROMOS (preserved from Imaginal — uses promo_btn CPT + ACF) ─── -->
    <?php
    if ( have_posts() ) : while ( have_posts() ) : the_post();
        if ( mint_field( 'show_promo_boxes' ) ) {
            get_template_part( 'parts/content', 'promos' );
        }
    endwhile; endif;
    ?>

    <!-- ─── MANIFESTO / PHILOSOPHY ───────────────────────────── -->
    <section class="section-manifesto">
        <div class="container">
            <div class="manifesto-grid">
                <div>
                    <img
                        class="manifesto-image fade-up"
                        src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/promo-welcome.jpg' ); ?>"
                        alt="<?php esc_attr_e( 'Editorial hair styling', 'mint-ota' ); ?>"
                        loading="lazy"
                    >
                </div>
                <div class="manifesto-copy">
                    <p class="micro-label fade-up brass"><?php esc_html_e( 'Our Philosophy', 'mint-ota' ); ?></p>
                    <h2 class="display-editorial fade-up">
                        <?php esc_html_e( 'A space defined by ', 'mint-ota' ); ?>
                        <em class="display-italic"><?php esc_html_e( 'restraint,', 'mint-ota' ); ?></em><br>
                        <?php esc_html_e( 'craft, and quiet luxury.', 'mint-ota' ); ?>
                    </h2>
                    <p class="manifesto-body fade-up">
                        <?php esc_html_e( 'Every detail is a deliberate choice. We believe in the power of less, executed perfectly. Our botanical Aveda approach to color and cutting is designed to enhance, not mask, your natural texture.', 'mint-ota' ); ?>
                    </p>
                    <a href="<?php echo esc_url( home_url( '/about' ) ); ?>" class="link-arrow fade-up">
                        <?php esc_html_e( 'Read Our Story', 'mint-ota' ); ?>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- ─── ARTISTS ──────────────────────────────────────────── -->
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

            <div class="artists-grid">
                <?php
                $artists = [
                    [ 'name'=>'Sonia',   'role'=>'Master Stylist',  'note'=>'Fifteen years of quiet mastery. Sonia reads texture, bone structure, and what you have not yet said — then gives you the version of yourself you forgot was possible.', 'image'=>'promo-welcome.jpg' ],
                    [ 'name'=>'Marisa',  'role'=>'Color Director',  'note'=>'Marisa works in dimension — placing light where it lives naturally, pulling warmth from the undertone, building color that photographs like sunlight.',                          'image'=>'promo-center.jpg'  ],
                    [ 'name'=>'Ashley',  'role'=>'Senior Stylist',  'note'=>'Ashley has a rare fluency in texture. She understands that the best cut dissolves into your life — effortless on a Tuesday, editorial on a Saturday.',                            'image'=>'promo-reviews.jpg' ],
                    [ 'name'=>'Maribel', 'role'=>'Senior Colorist', 'note'=>"Maribel's highlights catch light the way a Venetian painting does — warmth, depth, a luminosity that feels earned rather than applied.",                                          'image'=>'interior-header.jpg' ],
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
                    [ 'text'=>"The best place to get anything hair-related done in Orlando. The service is phenomenal from the moment you walk in to the moment you leave. The staff is so kind and easy to talk to.", 'name'=>'Corbin S.', 'date'=>'April 2026' ],
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
                <div class="cta-price fade-up">$50</div>
                <p class="cta-body fade-up">
                    <?php esc_html_e( "Because we'd love to meet you. $50 toward your first service at Mint, valid with select artists. A small welcome to make trying something new feel easy.", 'mint-ota' ); ?>
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
