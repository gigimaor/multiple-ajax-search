<?php get_header(); ?>
	<section class="search-results-section">
		<header>
			<div class="container">
				<h1><?php printf( __( "Search results for '<em>%s</em>'", 'lrdpz' ), get_search_query() ); ?></h1>
				<div class="search-results-filter">
					<ul role="navigator">
						<li role="presentation">
							<a href="#programs" title="<?php _e('Search results for programs')?>" class="com-button hvr-shutter-out-horizontal">
								<?php printf(__('%sevents'), __('<span></span>')) ?>
							</a>
						</li>
						<li role="presentation">
							<a href="#artists" title="<?php _e('Search results for artists')?>" class="com-button hvr-shutter-out-horizontal">
								<?php printf(__('%sartists'), __('<span></span>')) ?>
							</a>
						</li>
						<li role="presentation">
							<a href="#other-pages" title="<?php _e('Search results for other pages')?>" class="com-button  hvr-shutter-out-horizontal">
								<?php printf(__('%sother pages'), __('<span></span>')) ?>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</header>
		<div class="search-results-container clearfix">
			<div class="container">
				<div id="search-results"></div>
			</div>
		</div>
	</section>
<?php get_footer(); ?>
