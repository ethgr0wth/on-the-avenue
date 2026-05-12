<?php

// Building a tab...
// NOTE: Prepend 'im-' to every new setting!
$tabID = 'social';
$tabsetup[$tabID] = array(
        'text' => 'Social', 
        'dashicon' => 'dashicons-share',
        'tabFields' => array(
		
			array(
			'type' => 'text', 
			'label' => 'Facebook',
			'name' => 'im-social-facebook',
			'class' => '',
			'description' => 'Full URL'
  			),
			
			
			array(
			'type' => 'text', 
			'label' => 'Twitter',
			'name' => 'im-social-twitter',
			'class' => '',
			'description' => 'Username only'
  			),
			
			
			array(
			'type' => 'text', 
			'label' => 'Instagram',
			'name' => 'im-social-instagram',
			'class' => '',
			'description' => 'Full URL'
  			),
			
			
			array(
			'type' => 'text', 
			'label' => 'Pinterest',
			'name' => 'im-social-pinterest' ,
			'class' => '',
			'description' => 'Full URL'
  			),
			
			
			array(
			'type' => 'text', 
			'label' => 'Google+',
			'name' => 'im-social-google-plus' ,
			'class' => '',
			'description' => 'Full URL'
  			),
			
			
  )
    );

?>