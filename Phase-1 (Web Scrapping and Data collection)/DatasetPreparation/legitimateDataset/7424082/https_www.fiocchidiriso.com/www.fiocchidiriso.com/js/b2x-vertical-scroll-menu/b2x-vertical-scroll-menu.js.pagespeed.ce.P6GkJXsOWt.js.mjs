/**
 * B2X Vertical Scroll Menu
 * Simone Conti
 */
(function($){
	
    $.fn.b2xVerticalScrollMenu = function(options) {
    	if (options.wrapperSelector == null) {
    		return;
    	}
    	
		var options = $.extend(true, {}, $.fn.b2xVerticalScrollMenu.defaults, options);
			
		this.each(function() {
			
			var $element = $(this);
			
			init($element, options);
			
			$(window).on('load.b2x', function() {
				update($element, options);
			});
			
			$(window).on('scroll.b2x', function() {
				update($element, options);
			});
			
			$(window).on('resize.b2x', function() {
				update($element, options);
			});
			
			update($element, options);
			
		});
			
        return this;
        
    };
    
    var init = function ($element, options) {
    	
    	$element.addClass('vertical-scroll-menu');
    	
    	var $wrapper = $element.parents(options.wrapperSelector);
    	$wrapper.addClass('vertical-scroll-menu-wrapper');
    	
    }
    
    var update = function ($element, options) {
    	
    	var windowWidth = $(window).width();
    	var windowHeight = $(window).height();
    	var fixedMenuHeight = $element.outerHeight(true);
    	var docViewTop = $(window).scrollTop();
    	var $wrapper = $element.parents(options.wrapperSelector);
    	
    	if((windowWidth >= options.minWindowWidth) && (windowHeight >= options.minWindowHeight) && (fixedMenuHeight + options.offset < windowHeight) ) {
    		
    		$element.parent().css('height', 'auto');
    		var wrapperHeight = $wrapper.height();
    		$element.parent().height(wrapperHeight);
    		
    		if(wrapperHeight > fixedMenuHeight) {
    			var wrapperTop = $wrapper.offset().top;
    			var wrapperBottom = wrapperTop + $wrapper.height();
    			
    			docViewTop = docViewTop + options.offset;
    			
    			var width = $element.css('width');
    			
    			if(docViewTop > (wrapperBottom - fixedMenuHeight)) {
    				$element.removeClass('vertical-scroll-top');
    				$element.css('top', 'auto');
    				$element.addClass('vertical-scroll-bottom');
    				$element.css('width', width);
    			} else if(docViewTop > wrapperTop) {
    				$element.addClass('vertical-scroll-top');
    				$element.css('top', options.offset+'px');
    				$element.removeClass('vertical-scroll-bottom');
    				$element.css('width', width);
    			} else {
					destroy($element);
					
    			}	
    		}
    	} else {
    		
    		var wrapperTop = $wrapper.offset().top;
			var wrapperBottom = wrapperTop + $wrapper.height();
			var width = $element.css('width');
			
			docViewTop = docViewTop + options.offset;
			
			//Parte aggiunta per gestire lo scroll fisso anche quando il box ha un'altezza maggiore della finestra. Basta inserire il data-b2x-scroll-overflow = true
			if(!options.scrollOverflow) {
				destroy($element);
    		} else {
    			if(docViewTop > (wrapperBottom - fixedMenuHeight) || docViewTop < wrapperTop) {
    				if(docViewTop < wrapperTop) {
        				$element.css('top', 'auto');
        				$element.removeClass('vertical-scroll-top');
        				$element.css('width', width);
        				$element.removeClass('vertical-scroll-bottom');
    				} else {
    					$element.removeClass('vertical-scroll-top');
        				$element.css('top', 'auto');
        				$element.addClass('vertical-scroll-bottom');
        				$element.css('width', width);
    				}
    			} else if(docViewTop > wrapperTop) {
    				$element.addClass('vertical-scroll-top');
    				$element.css('top', options.offset+'px');
    				$element.removeClass('vertical-scroll-bottom');
    				$element.css('width', width);
    			}
    		}
    	}
    };

    var destroy = function ($element) {
    	$element.removeClass('vertical-scroll-top');
    	$element.css('top', 'auto');
    	$element.removeClass('vertical-scroll-bottom');
    	$element.css('width', 'auto');
    	$element.parent().css('height', 'auto');
    }
    
    $.fn.b2xVerticalScrollMenu.defaults = {
		wrapperSelector: '',
		offset: 0,
		minWindowWidth: 0,
		minWindowHeight: 0
	};
    
})(jQuery);