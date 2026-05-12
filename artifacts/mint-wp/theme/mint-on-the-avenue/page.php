<?php
/**
 * Generic Page Template
 */
get_header();

while ( have_posts() ) : the_post();
  $hero_image = get_the_post_thumbnail_url( get_the_ID(), 'hero-full' );
?>

<main id="main-content">

  <!-- Page Hero -->
  <section class="page-hero">
    <?php if ( $hero_image ) : ?>
      <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( $hero_image ); ?>');" aria-hidden="true"></div>
    <?php endif; ?>
    <div class="container page-hero__content">
      <h1 class="page-hero__title"><?php the_title(); ?></h1>
    </div>
  </section>

  <!-- Page Content -->
  <article class="entry-content">
    <?php the_content(); ?>
    <?php
    wp_link_pages( [
      'before' => '<nav class="page-links"><span class="page-links-title">' . __( 'Pages:', 'mint-ota' ) . '</span>',
      'after'  => '</nav>',
    ] );
    ?>
  </article>

</main>

<?php
endwhile;
get_footer();
?>
