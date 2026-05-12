<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article">					
	<header class="article-header">
		<h3><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h3>
		<?php get_template_part( 'parts/content', 'byline' ); ?>
	</header> <!-- end article header -->
					
	<section class="entry-content" itemprop="articleBody" style="padding: 0 0 20px;">
		<a href="<?php the_permalink() ?>"><?php the_post_thumbnail('full'); ?></a>
		<?php the_excerpt('<button class="tiny">' . __( 'Read more...', 'imaginalwp' ) . '</button>'); ?>
		<a href="<?php the_permalink(); ?>" class="button">Read More</a>
	</section> <!-- end article section -->
						
	<footer class="article-footer">
    	<p class="tags"><?php the_tags('<span class="tags-title">' . __('Tags:', 'imaginaltheme') . '</span> ', ', ', ''); ?></p>
	</footer> <!-- end article footer -->				    						
</article> <!-- end article -->

<hr/>