<?php

// Building a tab...
// NOTE: Prepend 'im-' to every new setting!
$tabID = 'seo';
$tabsetup[$tabID] = array(
    'text' => 'SEO', 
    'dashicon' => 'dashicons-chart-area',
    'tabFields' => array(
		array(
		'type' => 'text', 
		'label' => 'Google Analytics ID',
		'name' => 'im-google-analytics-id' ,
		'class' => '',
		'description' => ''
		),
		array(
		'type' => 'text', 
		'label' => 'Site Subtitle',
		'name' => 'im-seo-subtitle',
		'class' => '',
		'description' => 'Perhaps your location? Appends to page title with a separator.'
		),
		array(
		'type' => 'text', 
		'label' => 'Meta / OG Description',
		'name' => 'im-seo-description' ,
		'class' => '',
		'description' => 'Reverts a page/post to this if one isn\'t already set'
		),
		array(
		'type' => 'file', 
		'label' => 'Open Graph / Facebook - Share Image',
		'name' => 'im-seo-image' ,
		'class' => '',
		'description' => ''
		),
		array(
		'type' => 'text', 
		'label' => 'Open Graph - Address',
		'name' => 'im-seo-address' ,
		'class' => '',
		'description' => ''
		),
		array(
		'type' => 'text', 
		'label' => 'Open Graph - City',
		'name' => 'im-seo-city' ,
		'class' => '',
		'description' => ''
		),
		array(
		'type' => 'text', 
		'label' => 'Open Graph - State',
		'name' => 'im-seo-state' ,
		'class' => '',
		'description' => ''
		),
		array(
		'type' => 'text', 
		'label' => 'Open Graph - Zip Code',
		'name' => 'im-seo-zip' ,
		'class' => '',
		'description' => ''
		),
		array(
		'type' => 'text', 
		'label' => 'Open Graph - Email',
		'name' => 'im-seo-email' ,
		'class' => '',
		'description' => ''
		),
		array(
		'type' => 'text', 
		'label' => 'Open Graph - Phone Number',
		'name' => 'im-seo-phone' ,
		'class' => '',
		'description' => ''
		),
	)
);
	
?>
