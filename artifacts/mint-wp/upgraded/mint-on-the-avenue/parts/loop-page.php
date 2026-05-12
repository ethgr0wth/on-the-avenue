<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article" itemscope itemtype="http://schema.org/WebPage">
						
	<section class="entry-content" itemprop="articleBody">
    	<h1 class="page-title"><?php the_title(); ?></h1>
	    <?php the_content(); ?>
	    <?php wp_link_pages(); ?>
	</section> <!-- end article section -->
						
</article> <!-- end article -->