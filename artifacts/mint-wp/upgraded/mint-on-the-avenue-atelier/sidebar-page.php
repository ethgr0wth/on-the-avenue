<div id="sidebar" class="sidebar large-4 medium-12 columns" role="complementary">


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
	 <?php

     if( get_field('that_sidebar') ) :
     $sidebar = get_field('that_sidebar');
    elseif( get_field('that_sidebar', $post->post_parent) ) : 
        $sidebar = get_field('that_sidebar', $post->post_parent);
    else : 
        $sidebar = 'default';
    endif;
    $submenu_args = array(
    'container' => 'nav',
    'container_class' => 'interiorsub',
    'container_id' => 'subnav',
    'menu_class' => 'interiorsub-nav',
    'menu_id' => '',
    'echo' => true,
    'fallback_cb' => 'wp_page_menu',
    'before' => '',
    'after' => '',
    'link_before' => '',
    'link_after' => '',
    'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
    'depth' => 0,
    'walker' => '',
    'menu' => $sidebar

	   ); ?>
	  <?php wp_nav_menu( $submenu_args ); ?>

</div>