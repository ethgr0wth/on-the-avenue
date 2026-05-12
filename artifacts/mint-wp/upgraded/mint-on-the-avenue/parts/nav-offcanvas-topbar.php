<!-- By default, this menu will use off-canvas for small
	 and a topbar for medium-up -->

<div id="top-bar-menu" class="top-bar row fluid text-center">
	<div class="navigation text-center show-for-large medium-4 columns">
		<?php imaginal_top_nav(); ?>
	</div>
	<div id="logo" class="medium-12 large-3 columns">
		<a href="<?php echo home_url(); ?>">
			<?php $logo = $im_theme['logo'];
				if ($logo) { ?>
					<img class="logo" src="<?php echo $logo ?>" alt="<?php bloginfo('name'); ?> | <?php bloginfo('description'); ?>"  /> 
			<?php } else { ?> <?php bloginfo('name'); } ?>
		</a>
	</div>
	<div class="navigation text-center show-for-large medium-4 columns">
		<?php wp_nav_menu( array(
		    'menu' => 'Primary - Right',
			'container' => false
		) ); ?>
	</div>
	<div id="menuicon" class="text-right hide-for-large">
		<ul class="menu">
			<li><button class="menu-icon" type="button" data-toggle="off-canvas"></button></li>
			<!--<li><a data-toggle="off-canvas">Menu</a></li>-->
		</ul>
	</div>
</div>