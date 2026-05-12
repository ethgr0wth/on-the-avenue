<?php wp_reset_query();
if(is_home() || is_singular('post') || is_search() || is_archive()) {
	$slug = 'blog';
} else {
	$slug = $post->post_name;
} ?>

<div id="sidebar" class="sidebar large-4 medium-12 columns <?php echo $slug.'-sidebar'; ?>" role="complementary">

    <div class="opensub hide-for-large">Menu</div>
    <div id="sidenav" class="hide-for-large">
        <?php
            if( get_field('that_sidebar') ) {
                wp_nav_menu( array( 'menu_class' => 'interiorsub-nav', 'menu' => get_field('that_sidebar') ) );
            } elseif( get_field('that_sidebar', $post->post_parent) ) {
                wp_nav_menu( array( 'menu_class' => 'interiorsub-nav', 'menu' => get_field('that_sidebar', $post->post_parent) ) );
            } elseif(is_home() || is_singular('post') || is_search() || is_archive()) {
                dynamic_sidebar('blog');
            } else {
                dynamic_sidebar('default');
            }
        ?>
    </div>
	<div id="subnav" class="show-for-large">
		<?php
			if( get_field('that_sidebar') ) {
				wp_nav_menu( array( 'menu_class' => 'interiorsub-nav', 'menu' => get_field('that_sidebar') ) );
			} elseif( get_field('that_sidebar', $post->post_parent) ) {
				wp_nav_menu( array( 'menu_class' => 'interiorsub-nav', 'menu' => get_field('that_sidebar', $post->post_parent) ) );
			} elseif(is_home() || is_singular('post') || is_search() || is_archive()) {
				dynamic_sidebar('blog');
			} else {
				dynamic_sidebar('default');
			}
		?>
	</div>

</div>