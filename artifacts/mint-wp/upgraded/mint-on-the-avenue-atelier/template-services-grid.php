<?php
/*
Template Name: Services Landing
*/
?>

<?php get_header(); ?>
                        
        <div id="content">
        
                <div id="inner-content" class="row">
        
                    <main id="main" class="full-width large-12 medium-12 columns" role="main">

                        <?php get_template_part( 'parts/nav', 'inner' ); ?>
                                
                                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

                                        <article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article" itemscope itemtype="http://schema.org/WebPage">
                                                
                                                <section class="entry-content" itemprop="articleBody">

                                                        <h1>
                                                                <?php the_title(); ?>
                                                        </h1>


                                                        <section id="testimonials">

                                                                <!-- FIRST ROW -->
                                                                <?php
                                                                        $args = array(
                                                                            'post_type'      => 'page',
                                                                            'posts_per_page' => 4,
                                                                                'offset'                 => 0,
                                                                            'post_parent'    => $post->ID,
                                                                            'order'          => 'ASC',
                                                                            'orderby'        => 'menu_order',
                                                                         );
                                                                        $parent = new WP_Query( $args );
                                                                ?>
                                                                <div class="row">
                                                                        <!-- <div class="medium-3 columns testimonial">
                                                                                <a style="cursor: initial;"><img alt="<?php the_title(); ?>" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/service-thumb.jpg" width="360" height="240"></a>
                                                                        </div> -->
                                                                        <?php if ( $parent->have_posts() ) : while ( $parent->have_posts() ) : $parent->the_post(); ?>
                                                                                <div class="medium-3 columns testimonial">
                                                                                        <a class="services-tile" href="<?php echo esc_url( get_permalink() ); ?>"><div><h3 class="services-title" style="background-image:linear-gradient(rgba(27,58,45,0.55), rgba(27,58,45,0.75)), url(<?php the_field('page_title_image', $page_id); ?>)"><?php the_title(); ?></h3></div></a>
                                                                                </div>                                                                  
                                                                        <?php endwhile; endif; wp_reset_postdata(); ?>
                                                                </div>

                                                                <!-- SECOND ROW -->
                                                                <?php
                                                                        $args = array(
                                                                            'post_type'      => 'page',
                                                                            'posts_per_page' => 4,
                                                                            'offset'             => 4,
                                                                            'post_parent'    => $post->ID,
                                                                            'order'          => 'ASC',
                                                                            'orderby'        => 'menu_order',
                                                                         );
                                                                        $parent = new WP_Query( $args );
                                                                ?>
                                                                <div class="row">
                                                                        <?php if ( $parent->have_posts() ) : while ( $parent->have_posts() ) : $parent->the_post(); ?>
                                                                                <div class="medium-3 columns testimonial">
                                                                                        <a class="services-tile" href="<?php echo esc_url( get_permalink() ); ?>"><div><h3 class="services-title" style="background-image:linear-gradient(rgba(27,58,45,0.55), rgba(27,58,45,0.75)), url(<?php the_field('page_title_image', $page_id); ?>)"><?php the_title(); ?></h3></div></a>
                                                                                </div>
                                                                        <?php endwhile; endif; wp_reset_postdata(); ?>
                                                                </div>

                                                        </section>




                                                </section> <!-- end article section -->
                                                                                        
                                        </article> <!-- end article -->
                                        
                                <?php endwhile; endif; ?>                                                       

                        </main> <!-- end #main -->
                    
                </div> <!-- end #inner-content -->
        
        </div> <!-- end #content -->

<?php get_footer(); ?>
