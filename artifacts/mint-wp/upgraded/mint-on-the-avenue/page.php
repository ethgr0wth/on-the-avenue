<?php
/**
 * Default Page Template (interior pages)
 */
get_header();

while ( have_posts() ) : the_post();
    $hero_image = mint_field( 'page_title_image' );
    if ( ! $hero_image && has_post_thumbnail() ) {
        $hero_image = get_the_post_thumbnail_url( get_the_ID(), 'mint-hero' );
    }
    if ( ! $hero_image ) {
        $hero_image = get_template_directory_uri() . '/assets/images/interior-header.jpg';
    }
?>

<main id="main-content">

    <section class="page-hero">
        <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( $hero_image ); ?>');" aria-hidden="true"></div>
        <div class="container page-hero__content">
            <h1 class="page-hero__title"><?php the_title(); ?></h1>
        </div>
    </section>

    <article class="entry-content">
        <?php the_content(); ?>
        <?php wp_link_pages( [ 'before' => '<nav class="page-links">', 'after' => '</nav>' ] ); ?>
    </article>

</main>

<?php
endwhile;
get_footer();
?>
