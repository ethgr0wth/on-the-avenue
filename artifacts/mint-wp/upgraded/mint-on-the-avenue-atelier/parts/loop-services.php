<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article" itemscope itemtype="http://schema.org/WebPage">
						
	
					
    <section class="entry-content" itemprop="articleBody">
        <h1 class="page-title"><?php the_title(); ?></h1>
	    <?php 
		
	the_content();

// check if the repeater field has rows of data
if( have_rows('services') ):

 	// loop through the rows of data
    while ( have_rows('services') ) : the_row();?>  

    
     
       
     
<?php if(get_sub_field('serv_subcategory_title')) : echo '<h3 class="im-services-subhead">'; the_sub_field('serv_subcategory_title'); echo '</h3>'; else: endif; ?>

	<?php if(get_sub_field('serv_subcategory_description')) : echo '<div class="serv_subcat_desc">'; the_sub_field('serv_subcategory_description'); echo '</div>'; else: endif; ?>
		
		
	<?php	$table = get_sub_field( 'subcategory_services' );

if ( $table ) {

    echo '<table class="im-services" border="0">';

        if ( $table['header'] ) {

            echo '<thead>';

                echo '<tr>';

                    foreach ( $table['header'] as $th ) {

                        echo '<th>';
                            echo $th['c'];
                        echo '</th>';
                    }

                echo '</tr>';

            echo '</thead>';
        }

        echo '<tbody>';

            foreach ( $table['body'] as $tr ) {

                echo '<tr>';

                    // determine colspan for descriptions
                    $col = count($tr);

                    foreach ( $tr as $td ) {

                        // detect description per modifier
                        if (substr( $td['c'], 0, 2 ) === "++") {
                            $description = substr($td['c'], 2);
                            echo '<td class="serv-col serv-desc" colspan="'.$col.'">';
                                echo $description;
                            echo '</td>';
                            break;
                        } else {
                            echo '<td class="serv-col">';
                                echo $td['c'];
                            echo '</td>';
                        }

                    }

                echo '</tr>';
            }

        echo '</tbody>';

    echo '</table>';
}

if(get_sub_field('subcategory_disclaimer')) : echo '<div class="serv_subcat_disclaimer">'; the_sub_field('subcategory_disclaimer'); echo '</div>'; else: endif; 
    
    endwhile;

else :

    // no rows found

endif;

?>


	</section> <!-- end article section -->
						
</article> <!-- end article -->
						    
