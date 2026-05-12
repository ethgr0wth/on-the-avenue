<?php
/**
 * The main template file — blog / archive fallback
 */
get_header();
?>

<main id="main-content" class="container" style="padding-block: calc(var(--header-h) + 3rem) 4rem;">

  <?php if ( have_posts() ) : ?>

    <header style="margin-bottom:3rem;">
      <?php the_archive_title( '<h1 class="display-editorial">', '</h1>' ); ?>
      <?php the_archive_description( '<p class="lead" style="margin-top:1rem;">', '</p>' ); ?>
    </header>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:3rem;">
      <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'soft-card' ); ?> style="padding:2rem;">
          <?php if ( has_post_thumbnail() ) : ?>
            <a href="<?php the_permalink(); ?>" style="display:block;overflow:hidden;margin-bottom:1.5rem;">
              <?php the_post_thumbnail( 'lookbook-card', [ 'loading' => 'lazy', 'style' => 'width:100%;aspect-ratio:3/2;object-fit:cover;' ] ); ?>
            </a>
          <?php endif; ?>
          <p class="micro-label" style="color:var(--color-brass);margin-bottom:0.5rem;"><?php the_date(); ?></p>
          <h2 style="font-size:1.6rem;margin-bottom:0.75rem;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          <p style="font-size:0.95rem;color:var(--color-muted);margin-bottom:1.25rem;"><?php the_excerpt(); ?></p>
          <a href="<?php the_permalink(); ?>" class="link-arrow"><?php esc_html_e( 'Read More', 'mint-ota' ); ?></a>
        </article>
      <?php endwhile; ?>
    </div>

    <?php the_posts_pagination( [
      'prev_text' => '&larr; ' . __( 'Older', 'mint-ota' ),
      'next_text' => __( 'Newer', 'mint-ota' ) . ' &rarr;',
    ] ); ?>

  <?php else : ?>
    <p><?php esc_html_e( 'Nothing to show here yet — check back soon.', 'mint-ota' ); ?></p>
  <?php endif; ?>

</main>

<?php get_footer(); ?>
