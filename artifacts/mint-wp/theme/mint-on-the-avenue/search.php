<?php
/**
 * Search Results Template
 */
get_header();
?>

<main id="main-content" class="container" style="padding-block:calc(var(--header-h) + 3rem) 4rem;">
  <header style="margin-bottom:3rem;">
    <p class="micro-label fade-up" style="color:var(--color-brass);margin-bottom:0.75rem;"><?php esc_html_e( 'Search results for', 'mint-ota' ); ?></p>
    <h1 class="display-editorial fade-up">&ldquo;<?php echo esc_html( get_search_query() ); ?>&rdquo;</h1>
  </header>

  <?php if ( have_posts() ) : ?>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2rem;">
      <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="padding:1.5rem;border:1px solid rgba(100,121,98,.12);">
          <p class="micro-label" style="color:var(--color-sage);margin-bottom:0.5rem;"><?php the_date(); ?></p>
          <h2 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:0.5rem;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          <p style="font-size:.9rem;color:var(--color-muted);"><?php the_excerpt(); ?></p>
        </article>
      <?php endwhile; ?>
    </div>
    <?php the_posts_pagination(); ?>
  <?php else : ?>
    <p style="color:var(--color-muted);"><?php esc_html_e( 'No results found. Try a different search, or browse our services.', 'mint-ota' ); ?></p>
    <a href="<?php echo esc_url( home_url( '/services' ) ); ?>" class="link-arrow" style="margin-top:1.5rem;display:inline-flex;"><?php esc_html_e( 'Explore Services', 'mint-ota' ); ?></a>
  <?php endif; ?>
</main>

<?php get_footer(); ?>
