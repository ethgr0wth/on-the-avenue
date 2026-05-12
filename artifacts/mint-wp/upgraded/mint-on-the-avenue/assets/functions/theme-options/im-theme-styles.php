<?php
// Mint upgrade: only run when global is populated; write into the
// active theme dir (not the legacy hardcoded Imaginal-Master path),
// and tolerate read-only filesystems silently.
global $im_theme;
if ( ! is_array( $im_theme ) || empty( $im_theme ) ) { return; }

$css_dir  = trailingslashit( get_template_directory() ) . 'assets/css/';
$filename = 'im-theme-styles.css';
$target   = $css_dir . $filename;
if ( ! is_dir( $css_dir ) || ! is_writable( $css_dir ) ) { return; }

$content = 'body {';
$content .= 'background-color: ' . $im_theme['background-color'] . ';';
$content .= 'color: ' . $im_theme['primary-text-color'] . ';';
$content .= 'font-family: ' . $im_theme['primary-font-stack'] . ';';
$content .= '}';
$content .= 'h1, h3 {';
$content .= 'color: ' . $im_theme['h1h3-color'] . ';';
$content .= 'font-family: ' . $im_theme['h1h3-font-stack'] . ';';
$content .= '}';
$content .= 'h2, h4 {';
$content .= 'color: ' . $im_theme['h2h4-color'] . ';';
$content .= 'font-family: ' . $im_theme['h2h4-font-stack'] . ';';
$content .= '}';
$content .= '.top-bar, .top-bar ul {';
$content .= 'background-color: ' . $im_theme['nav-bg-color'] . ';';
$content .= 'background-image: ' . $im_theme['nav-bg-image'] . ';';
$content .= '}';
$content .= '.top-bar ul a {';
$content .= 'color: ' . $im_theme['nav-text-color'] . ';';
$content .= '}';
$content .= '.top-bar ul a {';
$content .= 'color: ' . $im_theme['nav-link-color'] . ';';
$content .= '}';
$content .= '.top-bar ul a:hover {';
$content .= 'color: ' . $im_theme['nav-hover-color'] . ';';
$content .= '}';
$content .= '.top-bar ul.is-dropdown-submenu {';
$content .= 'background-color: ' . $im_theme['subnav-bg-color'] . ';';
$content .= '}';
$content .= '.top-bar ul.is-dropdown-submenu a {';
$content .= 'color: ' . $im_theme['subnav-link-color'] . ';';
$content .= '}';
$content .= '.top-bar ul.is-dropdown-submenu a:hover {';
$content .= 'color: ' . $im_theme['subnav-hover-color'] . ';';
$content .= '}';
$content .= '.footer {';
$content .= 'background-color: ' . $im_theme['footer-background-color'] . ';';
$content .= '}';
$content .= '#footer-bottom {';
$content .= 'background-color: ' . $im_theme['copyright-background-color'] . ';';
$content .= '}';

@file_put_contents($target, $content);


