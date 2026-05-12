<?php

// Building a tab...
// NOTE: Prepend 'im-' to every new setting!
$tabID = 'services';
$tabsetup[$tabID] = array(
    'text' => 'Services', 
    'dashicon' => 'dashicons-hammer',
    'tabFields' => array(
		array(
		'type' => 'color', 
		'label' => 'Header Background Color',
		'name' => 'im-services-head-bg' ,
		'class' => '',
		'description' => ''
			),
	)
);
	
?>
