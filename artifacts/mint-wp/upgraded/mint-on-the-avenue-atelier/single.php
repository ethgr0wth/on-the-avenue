<?php
/**
 * Single Post Template
 */
get_header();

while ( have_posts() ) : the_post();
    $hero = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'mint-hero' ) : get_template_directory_uri() . '/assets/images/interior-header.jpg';
?>

<main id="main-content">

    <section class="page-hero">
        <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( $hero ); ?>');" aria-hidden="true"></div>
        <div class="container page-hero__content">
            <p class="micro-label page-hero__eyebrow"><?php the_category( ' · ' ); ?></p>
            <h1 class="page-hero__title"><?php the_title(); ?></h1>
            <p class="page-hero__copy"><?php echo esc_html( get_the_date() ); ?> &middot; <?php the_author(); ?></p>
        </div>
    </section>

    <article id="post-<?php the_ID(); ?>" <?php post_class( 'entry-content' ); ?>>
        <?php the_content(); ?>
        <?php wp_link_pages( [ 'before' => '<nav class="page-links">', 'after' => '</nav>' ] ); ?>
    </article>

    <?php if ( get_the_tags() ) : ?>
    <div class="container post-tags">
        <p class="micro-label sage"><?php the_tags( '', ' · ', '' ); ?></p>
    </div>
    <?php endif; ?>

</main>

<?php
endwhile;
get_footer();
?>
