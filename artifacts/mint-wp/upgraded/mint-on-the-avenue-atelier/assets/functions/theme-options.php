<?php

// Initialize stuff
include 'wp_theme_settings.php';

function wpts_enqueue_scripts() {
  wp_enqueue_style('wp_theme_settings', get_template_directory_uri().'/assets/functions/theme-options/wp_theme_settings.css');
  wp_register_script('wp_theme_settings',get_template_directory_uri() . '/assets/functions/theme-options/wp_theme_settings.min.js', array('jquery'));
  wp_enqueue_script('wp_theme_settings');
}
add_action('admin_enqueue_scripts', 'wpts_enqueue_scripts');


// Search for settings files + include their tab data
$tabsetup = array();
$files = glob(dirname(__FILE__) . '/theme-options/lib/*.php');
foreach ($files as $tab) {
	include $tab;
}


// Build tabs from files
$theme_settings = new wp_theme_settings(
  array(
	'general' => array('description' => 'Version 0.1'),
	'settingsID' => 'wp_theme_settings',
	'settingFields' => array('wp_theme_settings_title'), 
	'tabs' => $tabsetup,
	'badge' => array(
		'bg-image' => get_template_directory_uri().'/assets/functions/theme-options/im-options.png',
		'bg-color' => '#231f20'
	  )
  )
);


// Building template-ready variables when new fields are created...
// Since ALL WP theme options are stored in wp_load_alloptions(), we'll only grab Imaginal's (prepended with 'im-')
$im_theme = array();
foreach (wp_load_alloptions() as $key => $value) {
    if (strpos($key, 'im-') === 0) {
		$newkey = str_replace('im-', '', $key);
        $im_theme[$newkey] = $value;
    }
}
// creating a constant to be used theme-wide
define( 'im_theme', $im_theme );
// Then output like so: echo im_theme['typekit-id'];


include ('theme-options/im-theme-styles.php');

?>