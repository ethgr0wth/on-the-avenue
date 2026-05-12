<?php
/**
 * Single Post Template
 */
get_header();

while ( have_posts() ) : the_post();
  $hero = get_the_post_thumbnail_url( get_the_ID(), 'hero-full' );
?>

<main id="main-content">

  <!-- Post Hero -->
  <section class="page-hero">
    <?php if ( $hero ) : ?>
      <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( $hero ); ?>');" aria-hidden="true"></div>
    <?php endif; ?>
    <div class="container page-hero__content">
      <p class="micro-label page-hero__eyebrow"><?php the_category( ' · ' ); ?></p>
      <h1 class="page-hero__title"><?php the_title(); ?></h1>
      <p class="page-hero__copy">
        <?php echo esc_html( get_the_date() ); ?>
        &nbsp;&middot;&nbsp;
        <?php the_author(); ?>
      </p>
    </div>
  </section>

  <!-- Post Content -->
  <article id="post-<?php the_ID(); ?>" <?php post_class( 'entry-content' ); ?>>
    <?php the_content(); ?>
    <?php
    wp_link_pages( [
      'before' => '<nav class="page-links">',
      'after'  => '</nav>',
    ] );
    ?>
  </article>

  <!-- Tags -->
  <?php if ( get_the_tags() ) : ?>
  <div class="container" style="padding-bottom:2rem;">
    <p class="micro-label" style="color:var(--color-sage);"><?php the_tags( '', ' · ', '' ); ?></p>
  </div>
  <?php endif; ?>

  <!-- Adjacent Posts -->
  <nav class="container" style="display:flex;justify-content:space-between;gap:2rem;padding-bottom:4rem;border-top:1px solid rgba(100,121,98,.15);padding-top:2rem;" aria-label="<?php esc_attr_e( 'Post navigation', 'mint-ota' ); ?>">
    <div><?php previous_post_link( '<span class="micro-label" style="color:var(--color-sage);display:block;margin-bottom:.25rem;">&larr; Previous</span><span class="font-display" style="font-size:1.15rem;">%link</span>' ); ?></div>
    <div style="text-align:right;"><?php next_post_link( '<span class="micro-label" style="color:var(--color-sage);display:block;margin-bottom:.25rem;">Next &rarr;</span><span class="font-display" style="font-size:1.15rem;">%link</span>' ); ?></div>
  </nav>

</main>

<?php
endwhile;
get_footer();
?>
