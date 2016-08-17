<div class="search-box-wrapper">
  <a href="#" class="close-box close-box-focus" title="<?php _e('Close search')?>"></a>
  <div role="search" class="search-box">
    <div class="preview">
      <p><?php _e("Type your keyword, program or artist in the search field below")?></p>
    </div>
	<form method="get" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    
      <label class="screen-reader-text" for="search-field"><?php _e( 'Search Melbourne Spring Fashion Week:' ); ?></label>  
      <input type="text" class="form-control"  name="s" id="search-field" value="<?php the_search_query(); ?>"  autocomplete="off">
    <button role="button" class="com-button hvr-shutter-out-horizontal">Search</button>
  </form>
  </div>
  <a href="#" class="close-box close-box-end" title="<?php _e('Close search')?>"></a>
</div>
