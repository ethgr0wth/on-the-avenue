<?php
/*
Template Name: Services
*/
?>


<?php get_header(); ?>

	<div id="content">
	
		<div id="inner-content" class="row fluid" data-equalizer>
	
			<?php get_sidebar('page'); ?>


		    <main id="main" class="large-8 medium-12 columns" role="main" data-equalizer-watch>
				
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

			    	<?php get_template_part( 'parts/loop', 'services' ); ?>
			    
			    <?php endwhile; endif; ?>							
			    					
			</main> <!-- end #main -->

		    
		</div> <!-- end #inner-content -->

	</div> <!-- end #content -->

<?php get_footer(); ?>