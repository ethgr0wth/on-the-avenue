<?php

// Building a tab...
// MUY IMPORTANTE: Prepend 'im-' to every new setting!
$tabID = 'general';
$tabsetup[$tabID] = array(
    'text' => 'General ', 
    'dashicon' => 'dashicons-admin-generic',
    'tabFields' => array(
		array(
		'type' => 'file', 
		'label' => 'Logo',
		'name' => 'im-logo',
		'class' => '',
		'description' => ''
		),
		array(
		'type' => 'text', 
		'label' => 'Typekit ID',
		'name' => 'im-typekit-id' ,
		'class' => '',
		'description' => ''
		),
		array(
		'type' => 'text', 
		'label' => 'Google Maps API Key',
		'name' => 'im-google-maps-api-key' ,
		'class' => '',
		'description' => ''
		),
    ),
	'sections' => array(

		'fontscolors' => array(
			'text' => 'Fonts + Colors', 
			'tabFields' => array(
				array(
				'type' => 'color', 
				'label' => 'Background Color',
				'name' => 'im-background-color' ,
				'class' => '',
				'description' => ''
				),
				array(
				'type' => 'color', 
				'label' => 'Primary Text Color',
				'name' => 'im-primary-text-color' ,
				'class' => '',
				'description' => ''
				),
				array(
				'type' => 'text', 
				'label' => 'Primary Font Stack',
				'name' => 'im-primary-font-stack' ,
				'class' => '',
				'description' => ''
				),
				array(
				'type' => 'color', 
				'label' => 'H1 + H3 Color',
				'name' => 'im-h1h3-color' ,
				'class' => '',
				'description' => ''
				),
				array(
				'type' => 'text', 
				'label' => 'H1 + H3 Font Stack',
				'name' => 'im-h1h3-font-stack' ,
				'class' => '',
				'description' => ''
				),				array(
				'type' => 'color', 
				'label' => 'H2 + H4 Color',
				'name' => 'im-h2h4-color' ,
				'class' => '',
				'description' => ''
				),
				array(
				'type' => 'text', 
				'label' => 'H2 + H4 Font Stack',
				'name' => 'im-h2h4-font-stack' ,
				'class' => '',
				'description' => ''
				),				)
		),

		'navigation' => array(
			'text' => 'Navigation', 
			'tabFields' => array(
				array(
				'type' => 'color', 
				'label' => 'Background Color',
				'name' => 'im-nav-bg-color' ,
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'file', 
				'label' => 'Background Image',
				'name' => 'im-nav-bg-image',
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Text Color',
				'name' => 'im-nav-text-color' ,
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Link Color',
				'name' => 'im-nav-link-color',
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Link Color (Hover)',
				'name' => 'im-nav-hover-color',
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Dropdown / Subnav Background Color',
				'name' => 'im-subnav-bg-color',
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Dropdown / Subnav Link Color',
				'name' => 'im-subnav-link-color',
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Dropdown / Subnav Link Color (Hover)',
				'name' => 'im-subnav-hover-color',
				'class' => '',
				'description' => ''
	  			),
			)
		),

		'header' => array(
			'text' => 'Header',
			'tabFields' => array(
				array(
				'type' => 'color', 
				'label' => 'Background Color',
				'name' => 'im-header-bg-color',
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'file', 
				'label' => 'Default Featured Image',
				'name' => 'im-header-featured-image' ,
				'class' => '',
				'description' => 'If one isn\'t chosen per page'
	  			),
				array(
				'type' => 'color', 
				'label' => 'Text Color',
				'name' => 'im-header-text-color' ,
				'class' => '',
				'description' => ''
	  			),
			)
		),

		'footer' => array(
			'text' => 'Footer', 
			'tabFields' => array(
				array(
				'type' => 'color', 
				'label' => 'Background Color',
				'name' => 'im-footer-background-color' ,
				'class' => '',
				'description' => ''
	  			),
	  			array(
				'type' => 'color', 
				'label' => 'Copyright Background Color',
				'name' => 'im-copyright-background-color' ,
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'file', 
				'label' => 'Background Image',
				'name' => 'im-footer-background-image' ,
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Text Color',
				'name' => 'im-footer-text-color' ,
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Headline Color',
				'name' => 'im-footer-headline-color',
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Link Color',
				'name' => 'im-footer-link-color',
				'class' => '',
				'description' => ''
	  			),
				array(
				'type' => 'color', 
				'label' => 'Link Color (Hover)',
				'name' => 'im-footer-hover-color',
				'class' => '',
				'description' => ''
	  			),
			)
		),

	),
);
	
?>
