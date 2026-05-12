<?php
	// Register Promo Buttons
function add_promos() { 
	// creating (registering) the custom type 
	register_post_type( 'promo_btn', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
	 	// let's now add all the options for this post type
		array('labels' => array(
			'name' => __('Promo Buttons', 'studio'), /* This is the Title of the Group */
			'singular_name' => __('Promo Button', 'studio'), /* This is the individual type */
			'all_items' => __('All Promo Buttons', 'studio'), /* the all items menu item */
			'add_new' => __('Add New', 'studio'), /* The add new menu item */
			'add_new_item' => __('Add New Promo Button', 'studio'), /* Add New Display Title */
			'edit' => __( 'Edit', 'studio' ), /* Edit Dialog */
			'edit_item' => __('Edit Promo Buttons', 'studio'), /* Edit Display Title */
			'new_item' => __('New Promo Button', 'studio'), /* New Display Title */
			'view_item' => __('View Promo Button', 'studio'), /* View Display Title */
			'search_items' => __('Search Promo Buttons', 'studio'), /* Search Custom Type Title */ 
			'not_found' =>  __('Nothing found in the Database.', 'studio'), /* This displays if there are no entries yet */ 
			'not_found_in_trash' => __('Nothing found in Trash', 'studio'), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Promo Buttons for the bottom of all pages', 'studio' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 8, /* this is what order you want it to appear in on the left hand side menu */ 
			'menu_icon' => 'dashicons-grid-view', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'promo_btn', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'promo_btn', /* you can rename the slug here */
			'capability_type' => 'page',
			'hierarchical' => false,
			'supports' => array( 'title', 'page-attributes'),
			/* the next one is important, it tells what's enabled in the post editor */
	 	) /* end of options */
	); /* end of register post type */
	
	
	
} 

	// adding the function to the Wordpress init
	add_action( 'init', 'add_promos');




// Register Homepage Slides
function add_slides() { 
	// creating (registering) the custom type 
	register_post_type( 'hp_slides', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
	 	// let's now add all the options for this post type
		array('labels' => array(
			'name' => __('Homepage Slides', 'studio'), /* This is the Title of the Group */
			'singular_name' => __('Slide', 'studio'), /* This is the individual type */
			'all_items' => __('All Slides', 'studio'), /* the all items menu item */
			'add_new' => __('Add New', 'studio'), /* The add new menu item */
			'add_new_item' => __('Add New Slide', 'studio'), /* Add New Display Title */
			'edit' => __( 'Edit', 'studio' ), /* Edit Dialog */
			'edit_item' => __('Edit Slides', 'studio'), /* Edit Display Title */
			'new_item' => __('New Slide', 'studio'), /* New Display Title */
			'view_item' => __('View Slide', 'studio'), /* View Display Title */
			'search_items' => __('Search Slides', 'studio'), /* Search Custom Type Title */ 
			'not_found' =>  __('Nothing found in the Database.', 'studio'), /* This displays if there are no entries yet */ 
			'not_found_in_trash' => __('Nothing found in Trash', 'studio'), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Slides for the homepage banner', 'studio' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => true,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 8, /* this is what order you want it to appear in on the left hand side menu */ 
			'menu_icon' => 'dashicons-align-center', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'promotion', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'promotion', /* you can rename the slug here */
			'capability_type' => 'page',
			'hierarchical' => false,
			'supports' => array( 'title', 'page-attributes'),
			/* the next one is important, it tells what's enabled in the post editor */
	 	) /* end of options */
	); /* end of register post type */
	
	
	
} 

	// adding the function to the Wordpress init
	add_action( 'init', 'add_slides');
