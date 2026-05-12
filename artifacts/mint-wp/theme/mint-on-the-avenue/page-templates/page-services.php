<?php
/**
 * Template Name: Services Page
 * Template Post Type: page
 */
get_header();
?>

<main id="main-content">

  <!-- Hero -->
  <section class="page-hero">
    <div class="page-hero__bg" style="background-image:url('<?php echo esc_url( get_template_directory_uri() . '/assets/images/lookbook-1.jpg' ); ?>');" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="micro-label page-hero__eyebrow"><?php esc_html_e( 'Aveda Lifestyle Salon', 'mint-ota' ); ?></p>
      <h1 class="page-hero__title"><?php the_title(); ?></h1>
      <p class="page-hero__copy"><?php esc_html_e( 'Every service is an experience. Every experience is a ritual.', 'mint-ota' ); ?></p>
    </div>
  </section>

  <!-- Tabs -->
  <section class="services-tabs container">

    <nav class="tab-nav" role="tablist" aria-label="<?php esc_attr_e( 'Service categories', 'mint-ota' ); ?>">
      <?php
      $tabs = [ 'color', 'cut', 'texture', 'treatment', 'men', 'event' ];
      $labels = [
        'color'     => 'Color',
        'cut'       => 'Cut',
        'texture'   => 'Texture',
        'treatment' => 'Treatment',
        'men'       => 'Mint Men',
        'event'     => 'Event Hair',
      ];
      foreach ( $tabs as $i => $tab ) :
      ?>
      <button class="tab-btn <?php echo $i === 0 ? 'active' : ''; ?>" data-tab="<?php echo esc_attr( $tab ); ?>" role="tab" aria-selected="<?php echo $i === 0 ? 'true' : 'false'; ?>" aria-controls="panel-<?php echo esc_attr( $tab ); ?>">
        <?php echo esc_html( $labels[ $tab ] ); ?>
      </button>
      <?php endforeach; ?>
    </nav>

    <?php
    $services = [
      'color' => [
        [ 'name' => 'Full Color',           'note' => 'Single-process root-to-tip',    'price' => 'from $120' ],
        [ 'name' => 'Root Touch-Up',        'note' => 'Regrowth blend, 4-week refresh','price' => 'from $80'  ],
        [ 'name' => 'Partial Highlights',   'note' => 'Face frame + crown',            'price' => 'from $145' ],
        [ 'name' => 'Full Highlights',      'note' => 'All-over luminosity',           'price' => 'from $185' ],
        [ 'name' => 'Balayage',             'note' => 'Freehand sun-stroked color',    'price' => 'from $210' ],
        [ 'name' => 'Color Correction',     'note' => 'Consultation required',         'price' => 'Quoted'    ],
        [ 'name' => 'Gloss / Toner',        'note' => 'Add-on shine service',          'price' => 'from $55'  ],
        [ 'name' => 'Aveda Full Spectrum',  'note' => '96% naturally derived pigment', 'price' => 'Included'  ],
      ],
      'cut' => [
        [ 'name' => 'Haircut + Blow Dry',   'note' => 'Wash, cut, style',              'price' => 'from $75'  ],
        [ 'name' => 'Haircut Only',         'note' => 'Towel dry finish',              'price' => 'from $60'  ],
        [ 'name' => 'Bang Trim',            'note' => 'Between-visit maintenance',     'price' => '$20'       ],
        [ 'name' => 'Dry Cut / Restyle',    'note' => 'On dry hair, precision cut',    'price' => 'from $85'  ],
      ],
      'texture' => [
        [ 'name' => 'Keratin Smoothing',    'note' => '12-week frizz control',         'price' => 'from $250' ],
        [ 'name' => 'Aveda Texture',        'note' => 'Curl definition treatment',     'price' => 'from $140' ],
        [ 'name' => 'Perms',                'note' => 'Root to end or spot wave',      'price' => 'Quoted'    ],
      ],
      'treatment' => [
        [ 'name' => 'Aveda Scalp Treatment','note' => '30-minute Moment of Wellness',  'price' => '$45'       ],
        [ 'name' => 'Damage Remedy',        'note' => 'Intensive bond repair masque',  'price' => '$35'       ],
        [ 'name' => 'Botanical Repair',     'note' => 'In-salon strengthening ritual', 'price' => 'from $55'  ],
        [ 'name' => 'Glossing Treatment',   'note' => 'Mirror-shine add-on',           'price' => '$30'       ],
      ],
      'men' => [
        [ 'name' => 'Men\'s Cut',           'note' => 'Wash, cut, style',              'price' => 'from $55'  ],
        [ 'name' => 'Men\'s Color',         'note' => 'Gray blend or fashion tone',    'price' => 'from $85'  ],
        [ 'name' => 'Men\'s Scalp Care',    'note' => 'Scalp treatment + massage',     'price' => '$40'       ],
      ],
      'event' => [
        [ 'name' => 'Bridal Updo',          'note' => 'Trial + day-of styling',        'price' => 'from $120' ],
        [ 'name' => 'Special Occasion Updo','note' => 'Gala, formal, event',           'price' => 'from $95'  ],
        [ 'name' => 'Blow Out',             'note' => 'Wash and style, no cut',        'price' => 'from $65'  ],
        [ 'name' => 'Event Color',          'note' => 'Same-day vibrancy boost',       'price' => 'Quoted'    ],
      ],
    ];

    foreach ( $services as $cat => $items ) :
      $is_first = $cat === 'color';
    ?>
    <div id="panel-<?php echo esc_attr( $cat ); ?>" class="tab-panel <?php echo $is_first ? 'active' : ''; ?>" role="tabpanel" aria-labelledby="tab-<?php echo esc_attr( $cat ); ?>">
      <?php foreach ( $items as $svc ) : ?>
      <div class="service-row">
        <div>
          <p class="service-name"><?php echo esc_html( $svc['name'] ); ?></p>
          <?php if ( ! empty( $svc['note'] ) ) : ?>
            <p class="service-note"><?php echo esc_html( $svc['note'] ); ?></p>
          <?php endif; ?>
        </div>
        <span class="service-price micro-label"><?php echo esc_html( $svc['price'] ); ?></span>
      </div>
      <?php endforeach; ?>
    </div>
    <?php endforeach; ?>

  </section><!-- .services-tabs -->

  <!-- Book CTA -->
  <section style="padding-block:4rem;text-align:center;background:var(--color-mist);">
    <div class="container">
      <p class="micro-label fade-up" style="color:var(--color-sage);margin-bottom:1rem;"><?php esc_html_e( 'Ready?', 'mint-ota' ); ?></p>
      <h2 class="fade-up" style="margin-bottom:2rem;"><?php esc_html_e( 'Reserve your chair.', 'mint-ota' ); ?></h2>
      <a href="<?php echo mint_book_url(); ?>" class="btn-primary fade-up" target="_blank" rel="noopener">
        <?php esc_html_e( 'Book Appointment', 'mint-ota' ); ?>
      </a>
    </div>
  </section>

</main>

<?php get_footer(); ?>
