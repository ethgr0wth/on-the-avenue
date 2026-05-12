<?php
// SIDEBARS AND WIDGETIZED AREAS
function imaginal_register_sidebars() {
	register_sidebar(array(
		'id' => 'default',
		'name' => __('Default', 'imaginalwp'),
		'description' => __('The first (primary) sidebar.', 'imaginalwp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));

	register_sidebar(array(
		'id' => 'blog',
		'name' => __('Blog', 'imaginalwp'),
		'description' => __('For the blagh.', 'imaginalwp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));

	register_sidebar(array(
		'id' => 'offcanvas',
		'name' => __('Offcanvas', 'imaginalwp'),
		'description' => __('The offcanvas sidebar.', 'imaginalwp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));

	register_sidebar(array(
		'id' => 'avedavideofeed',
		'name' => __('Aveda Video Feed', 'jointswp'),
		'description' => __('Does what it says on the tin', 'jointswp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));

	register_sidebar(array(
		'id' => 'services',
		'name' => __('Services Sidebar', 'jointswp'),
		'description' => __('Sidebar for all service pages', 'jointswp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));	

	register_sidebar(array(
		'id' => 'about',
		'name' => __('About Sidebar', 'jointswp'),
		'description' => __('Sidebar for all about pages', 'jointswp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));	

	register_sidebar(array(
		'id' => 'location',
		'name' => __('Locations Sidebar', 'jointswp'),
		'description' => __('Sidebar for all location pages', 'jointswp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));	

	register_sidebar(array(
		'id' => 'specials',
		'name' => __('Specials Sidebar', 'jointswp'),
		'description' => __('Sidebar for all specials pages', 'jointswp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));	

	register_sidebar(array(
		'id' => 'footer1',
		'name' => __('Footer Column 1', 'jointswp'),
		'description' => __('For the footer area, of course', 'jointswp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));	

	register_sidebar(array(
		'id' => 'footer2',
		'name' => __('Footer Column 2', 'jointswp'),
		'description' => __('For the footer area, of course', 'jointswp'),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));	

} // don't remove this bracket!