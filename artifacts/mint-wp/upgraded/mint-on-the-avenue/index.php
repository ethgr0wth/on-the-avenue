<?php get_header(); ?>
			
	<div id="content">
	
		<div id="inner-content" class="row">
		    
		    <?php get_sidebar(); ?>
	
		    <main id="main" class="large-8 medium-12 columns" role="main">

		    	<h1 class="page-title">Blog</h1>
		    
			    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			 
					<!-- To see additional archive styles, visit the /parts directory -->
					<?php get_template_part( 'parts/loop', 'archive' ); ?>
				    
				<?php endwhile; ?>	

					<?php imaginal_page_navi(); ?>
					
				<?php else : ?>
											
					<?php get_template_part( 'parts/content', 'missing' ); ?>
						
				<?php endif; ?>
																								
		    </main> <!-- end #main -->

		</div> <!-- end #inner-content -->

	</div> <!-- end #content -->

<?php get_footer(); ?>