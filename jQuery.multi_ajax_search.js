jQuery(function($) {
/* SEARCH OBJECT */
var Search = Search || {};
Search.formObj = {
    addListeners: function(){
        var search_field = $('.search-box #search-field');
        if(search_field.val() == '')
            search_field.addClass('placeholder');
        else
            search_field.removeClass('placeholder');
        //when focus in the keyword 
        search_field.focus(function(){
            search_field.removeClass('placeholder');
        });
        //when focus out the keyword field
        search_field.blur(function(){
            if(search_field.val() == '')
                search_field.addClass('placeholder');
        });
        //when click on search icon on nav
        $('.search-icon a').click(function(e){
            e.preventDefault();
            $('.search-box-wrapper').fadeIn(function(){
                $('.search-box-wrapper .close-box-focus').focus();
            });
        });
        //when click on X of the search layer
        $('a.close-box ').click(function(e){
            e.preventDefault();
            $('.search-box-wrapper').fadeOut();
        });

        //When submit the form
        $('#searchform').submit(function(e){
            if($('body.search').length){
                //if alredy in search page - init ajax
                e.preventDefault();
                Search.resultsObj.get_searche_results();
                $('.search-box-wrapper').fadeOut();
            }
        });
    },
}
Search.resultsObj = {
    type: false,
    keyword: '',
    addListeners: function(){
       if($('.search-results-filter a.active').length){
            var type = $('.search-results-filter a.active').attr('href');
            this.get_searche_results(type);    
        }
       //Filter click behavior
       $('.search-results-filter a').click(function(e){
            e.preventDefault();
            if(!$(this).hasClass('disable')){
                $('.search-results-filter a').removeClass('active');
                $(this).addClass('active');
                    //ger results
                Search.resultsObj.type = $(this).attr('href');
                Search.resultsObj.show_search_results_type();  
                             
            }
       });
       var currentHash = location.hash;
       if(currentHash !== undefined && currentHash != ''){
            $('.search-results-filter a').removeClass('active');
            $('.search-results-filter a[href="'+currentHash+'"]').addClass('active');
            Search.resultsObj.get_searche_results(currentHash);
       }
       else{
            $('.search-results-filter a').removeClass('active');
            $('.search-results-filter li:first-child a').addClass('active');
            Search.resultsObj.get_searche_results();
       }
    },
    //GET search results by AJAX
    get_searche_results: function(type){
        //get type
        this.get_search_type(type);
        console.log(this.type);
        if(!this.type)
            return;
        this.keyword = $('#search-field').val();
        this.update_url();
        this.before_search_results_ajax()
        

        $('#search-results').html('');


        //call default/selected search
        var _this_type = this.type;
        this.get_search_results_ajax(this.type,function(){
            Search.resultsObj.show_search_results_type();
            list_wrap_list_item_click();
            Lazyload.init();
            list_path = '#posts-list-' + _this_type.substr(1,_this_type.length);     
            AdjustList.list_height.init(list_path);
        });
        //load all other types on background
        setTimeout( function(){
           Search.resultsObj.com_get_searche_results_extended();
        },1000);
    },
    get_search_type: function(type){
        if(!this.check_search_type(type)){
            this.type = type;
        }
        if(!this.check_search_type() ){
           this.type = location.hash;        
        }
        if(!this.check_search_type() ){
           this.type = $('.search-results-filter a.active').attr('href');        
        }
        if(!this.check_search_type()){
           this.type = $('.search-results-filter li:first-child a').attr('href');        
        }
    },
    convert_type_id: function(val){
        return val.substr(1,val.length);
    },
    check_search_type: function(type){
        if(type === undefined || type == '')
            type = this.type;
        return (type === undefined || type == '' ) ? false : true; 
    },
    //Load all other search results types
    com_get_searche_results_extended: function(){
        $('.search-results-filter a').not('.active').each(function(){
            type = $(this).attr('href');
            Search.resultsObj.get_search_results_ajax(type);
        });
    },
    get_search_results_ajax: function(type,callback){
        jQuery.ajax({
            url: com_data.ajaxUrl,
            data: {
                'action': 'com_get_searche_results',
                'type'  : type,
                'keyword': Search.resultsObj.keyword,
            },
            success: function(data) {
                $('#search-results').append(data);
                $('.search-results-filter a[href="'+type+'"]').removeClass('disable');
                Search.resultsObj.get_search_results_counter(type,data);

                if (callback && typeof(callback) === "function") {
                    callback.call();
                }
            }
        });
    },
    //get the search result by AJAX
    //get count of search result posts
    get_search_results_counter: function(type,data){
        var id = this.convert_type_id(type);
        var counter = $('#posts-list-'+ id).attr('data-postcount');
        $('.search-results-filter  a[href="'+type+'"] span').text(counter);
    },
    before_search_results_ajax: function(){
        $('.search-results-filter a').addClass('disable');
        $('.search-results-filter  a span').text('');
    },
    //Show selected search result type, hide all others
    show_search_results_type: function(){
        var id = this.convert_type_id(this.type);
        this.update_url();
        if($('#search-results > .posts-list.active').length){

            $('#search-results > .posts-list.active').fadeOut('fast',function(){
                $('#posts-list-' + id).fadeIn('fast').addClass('active');
            }).removeClass('active');
        }
        else{
            $('#posts-list-' + id).fadeIn('fast').addClass('active');
        }
        if(id == 'programs'){
            WishList.main.addListeners();
            if (list_wrap_list_item_click && typeof(list_wrap_list_item_click) === "function") {
                list_wrap_list_item_click();
            }
            AdjustList.list_height.init('#posts-list-' + id);
        }
    },
    update_url: function(){
        var target_url = com_data.baseUrl + "?s=" + this.keyword + this.type
        window.history.pushState(this.type, 'Search results for ' + this.keyword, target_url);
        $('.search main section header h1 em').text(this.keyword);
    },
}
/*SEARCH */
if($('.search-box').length){
    Search.formObj.addListeners();
}

/* SEARCH RESULTS */
if($('.search-results-filter').length){
    Search.resultsObj.addListeners();
}

});
