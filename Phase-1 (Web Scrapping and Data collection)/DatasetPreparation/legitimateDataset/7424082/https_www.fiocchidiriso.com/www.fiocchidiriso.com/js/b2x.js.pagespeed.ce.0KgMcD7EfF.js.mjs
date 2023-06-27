/**
 * B2X
 * Simone Conti
 */
(function($){
	
	$.b2x = function() {};
	
	/**
	 * Dice se un elemento esiste o meno.
	 */
	$.fn.exists = function() {
		return this.length > 0;
	}
	
	$.fn.clearForm = function() {
		$(this).find(":input")
			.not(':button, :submit, :reset, :hidden, [readonly]')			
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');
	}

	/**
	 * Dice se un elemento ha un padre (diretto o indiretto) identificato da un
	 * certo selettore.
	 */
	$.fn.hasAncestor = function(selector) {
		return $(this).closest(selector).length;
	}
	
	/**
	 * Dice se un elemento ha un figlio diretto con un certo selettore
	 */
	$.fn.hasChild = function(selector) {
		return $(this).children(selector).length;
	}
	
	/**
	 * Filtra un insieme di elementi selezionando solo quelli che hanno un padre (diretto o indiretto) identificato da un certo selettore.
	 */
	$.fn.withAncestor = function(selector) {
		return this.filter(function() {
			return $(this).hasAncestor(selector);
		});
	}
	
	/**
	 * Filtra un insieme di elementi selezionando solo quelli che non hanno un padre (diretto o indiretto) identificato da un certo selettore.
	 */
	$.fn.withoutAncestor = function(selector) {
		return this.filter(function() {
			return !$(this).hasAncestor(selector);
		});
	}
	
	$.fn.disable = function(state) {
		return this.each(function() {
			var $this = $(this);
			if ($this.is('input, button, textarea, select'))
				this.disabled = state;
			else
				$this.toggleClass('disabled', state);
		});
	}
	
	var initB2xPlugin = function () {
		
		$('[data-b2x-action]').each(function() {
			
			var action = $(this).data('b2x-action');
			
			/**
			 * SCROLL-TO
			 * Opzioni:
			 * 	- target: il selettore dell'elemento da raggiungere.
			 *  - offset (opzionale, default: 0): lo spazio da lasciare tra la parte alta della window e la parte alta dell'elemento da raggiungere.
			 *  - duration (opzionale, defalut: 2000): la durata dell'animazione dello scroll
			 */
			if (action == 'scroll-to') {
				var target = $(this).data('b2x-target');
				var offset = $(this).data('b2x-offset');
				var duration = $(this).data('b2x-duration');
				$(this).on('click.b2x', function() {
					$.scrollTo(target, offset, duration);
				});
			}
			
			/**
			 * VERTICAL-SCROLL-INTO
			 * Opzioni:
			 *  - wrapperSelector: il selettore dell'elemento wrapper dentro il quale scrorrere.
			 *  - offset: (opzionale, default: 0): lo spazio da lasciare tra la parte alta della window e la parte alta dell'elemento da bloccare.
			 *  - minWindowWidth: (opzionale, default: 0): larghezza minima della finestra per abilitare la funzione.
			 *  - minWindowHeight: (opzionale, default: 0): altezza minima della finestra per abilitare la funzione.
			 */
			if (action == 'vertical-scroll-into') {
				var wrapperSelector = $(this).data('b2x-wrapper-selector');
				var offset = $(this).data('b2x-offset');
				var minWindowWidth = $(this).data('b2x-min-window-width');
				var minWindowHeight = $(this).data('b2x-min-window-height');
				var scrollOverflow = $(this).data('b2x-scroll-overflow');
				$(this).b2xVerticalScrollMenu({
					wrapperSelector: wrapperSelector,
					offset: offset,
					minWindowWidth: minWindowWidth,
					minWindowHeight: minWindowHeight,
					scrollOverflow: scrollOverflow
				});
			}
			
			/**
			 * STICKY (OLD)
			 * Opzioni:
			 *  - offset: (opzionale, default: 0): lo spazio da lasciare tra la parte alta della window e la parte alta dell'elemento da bloccare.
			 *  - minWindowWidth: (opzionale, default: 0): larghezza minima della finestra per abilitare la funzione.
			 *  - minWindowHeight: (opzionale, default: 0): altezza minima della finestra per abilitare la funzione.
			 */
			if (action == 'sticky-old') {
				var offset = $(this).data('b2x-offset');
				var minWindowWidth = $(this).data('b2x-min-window-width');
				var minWindowHeight = $(this).data('b2x-min-window-height');
				var zIndex = $(this).data('b2x-z-index');
				$(this).b2xStickyOld({
					offset: offset,
					minWindowWidth: minWindowWidth,
					minWindowHeight: minWindowHeight,
					zIndex: zIndex
				});
			}
			
			/**
			 * MODAL
			 * Opzioni:
			 *  - title
			 *  - body
			 *  - closable
			 *  - clazz
			 */
			if (action == 'modal') {
				$(this).on('click.b2x', function() {
					var title = $(this).data('b2x-title');
					var body = $(this).data('b2x-body');
					var closable = $(this).data('b2x-closable');
					var clazz = $(this).data('b2x-clazz');
					$.b2xModal({
						title: title,
						body: body,
						closable: closable,
						clazz: clazz
					});
				});
			}
			
		});		
		
		
		
	}
	
	$(document).ready(function() {
		initB2xPlugin();
	});
	
	$(document).ajaxComplete(function() {
		$('[data-b2x-action]').off(".b2x");
		$(window).off(".b2x");
		$(document).off(".b2x");
		initB2xPlugin();
	});
	
	/**
	 * Scrolla la finestra fino all'elemento selezionato.
	 */
	
	$.scrollTo = function(selector, offset, duration) {
		if (selector == null) {
			return;
		}
		if (offset == null) {
			offset = 0;
		}
		if (duration == null) {
			duration = 2000;
		}
		var scrollTop = $(selector).offset().top - offset;
		$('html, body').animate({
			scrollTop: scrollTop
		}, duration);
	}
	
	/**
	 * Gestisce l'offset dinamicamente per centrare le colonne
	 */
	$.fn.colOffsetDynamic = function() {
		this.css('margin-left', (this.outerWidth()/2)+'px');
	}
	
	/**
	 * Genera una stringa random con data lunghezza
	 */
	$.b2x.generateRandomString = function(length) {
		length = $.b2x.defaultParameterValue(length, 5);
		return Math.random().toString(36).substr(2, length);
	};
	
	/**
	 * Scatena l'evento parametrizzato all'uscita del mouse dal browser
	 */
	$.b2x.onExitingBrowser = function(func, once) {
		once = $.b2x.defaultParameterValue(once, true);
		var isOpenedExitPopup = false;
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

			//http://creativelive.github.io/appear/examples/simple/	
			appear = (function(){
				  'use strict';
				  var scrollLastPos = null, scrollTimer = 0, scroll = {};

				  function track(){
				    var newPos = window.scrollY || window.pageYOffset;  // pageYOffset for IE9
				    if ( scrollLastPos != null ){
				      scroll.velocity = newPos - scrollLastPos;
				      
						if(!isOpenedExitPopup ) {
							if(scroll.velocity >= 100) {
								func();
								isOpenedExitPopup = true;
							}
							if(scroll.velocity < -100) {
								func();
								isOpenedExitPopup = true;
							}
					    }					      
						
				    }
				    scrollLastPos = newPos;
				    if(scrollTimer){
				      clearTimeout(scrollTimer);
				    }
				    scrollTimer = setTimeout(function(){
				      scrollLastPos = null;
				    }, 30);
				  }
				  addEventListener('scroll', track, false);


				  return function(obj){

				    return (function(obj){
				      var initd = false, elements = [], elementsLength, reappear = [],
				        appeared = 0, disappeared = 0, timer, deltaSet, opts = {}, done;

				      // handle debouncing a function for better performance on scroll
				      function debounce(fn, delay) {
				        return function () {
				          var self = this, args = arguments;
				          clearTimeout(timer);
				          timer = setTimeout(function () {
				            fn.apply(self, args);
				          }, delay);
				        };
				      }

				      // called on scroll and resize event, so debounce the actual function that does
				      // the heavy work of determining if an item is viewable and then "appearing" it
				      function checkAppear() {
				        if(scroll.delta < opts.delta.speed) {
				          if(!deltaSet) {
				            deltaSet = true;
				            doCheckAppear();
				            setTimeout(function(){
				              deltaSet = false;
				            }, opts.delta.timeout);
				          }
				        }
				        (debounce(function() {
				          doCheckAppear();
				        }, opts.debounce)());
				      }

				      function begin() {
				        // initial appear check before any scroll or resize event
				        doCheckAppear();

				        // add relevant listeners
				        addEventListener('scroll', checkAppear, false);
				        addEventListener('resize', checkAppear, false);
				      }

				      function end() {
				        elements = [];
				        if(timer) {
				          clearTimeout(timer);
				        }
				        removeListeners();
				      }

				      function removeListeners() {
				        removeEventListener('scroll', checkAppear, false);
				        removeEventListener('resize', checkAppear, false);
				      }

				      function doCheckAppear() {
				        if(done) {
				          return;
				        }
				     
				        elements.forEach(function(n, i){
				          if(n && viewable(n, opts.bounds)) {
				            if(reappear[i]) {
				              reappear[i] = false;
				              // increment the count of appeared items
				              appeared++;
				              console.log('appears:', appeared);
				              // call the appear fn
				              if(opts.appear) {
				                opts.appear(n);
				              }
				              // if not tracking reappears or disappears, need to remove node here
				              if(!opts.disappear && !opts.reappear) {
				                // stop tracking this node, which is now viewable
				                elements[i] = null;
				              }
				            }
				          } else {
				            if(reappear[i] === false) {
				              if(opts.disappear) {
				                opts.disappear(n);
				              }
				              // increment the dissappeared count
				              disappeared++;
				              console.log('disappears:', disappeared);
				              // if not tracking reappears, need to remove node here
				              if(!opts.reappear) {
				                // stop tracking this node, which is now viewable
				                elements[i] = null;
				              }
				            }
				            // element is out of view and eligible to be appeared again
				            reappear[i] = true;
				          }
				        });

				        // remove listeners if all items have (re)appeared
				        if(!opts.reappear && (!opts.appear || opts.appear && appeared === elementsLength) && (!opts.disappear || opts.disappear && disappeared === elementsLength)) {
				          // ensure done is only called once (could be called from a trailing debounce/throttle)
				          done = true;
				          removeListeners();
				          // all items have appeared, so call the done fn
				          if(opts.done){
				            opts.done();
				          }
				        }
				      }

				      function init() {
				        // make sure we only init once
				        if(initd) {
				          return;
				        }
				        initd = true;

				        // call the obj init fn
				        if(opts.init) {
				          opts.init();
				        }
				        // get the elements to work with
				        var els;
				        if(typeof opts.elements === 'function') {
				          els = opts.elements();
				        } else {
				          els = opts.elements;
				        }
				        if(els) {
				          //  put elements into an array object to work with
				          elementsLength = els.length;
				          for(var i = 0; i < elementsLength; i += 1) {
				            elements.push(els[i]);
				            reappear.push(true);
				          }
				          begin();
				        }
				      }

				      return function(obj) {
				        obj = obj || {};

				        // assign the fn to execute when a node is visible
				        opts = {
				          // a function to be run when the dom is ready (allows for any setup work)
				          init: obj.init,
				          // either an array of elements or a function that will return an htmlCollection
				          elements: obj.elements,
				          // function to call when an element is "viewable", will be passed the element to work with
				          appear: obj.appear,
				          // function to call when an element is no longer "viewable", will be passed the element to work with
				          disappear: obj.disappear,
				          // function to call when all the elements have "appeared"
				          done: obj.done,
				          // keep tracking the elements
				          reappear: obj.reappear,
				          // the extra border around an element to make it viewable outside of the true viewport
				          bounds: obj.bounds || 0,
				          // the debounce timeout
				          debounce: obj.debounce || 50,
				          // appear.js will also check for items on continuous slow scrolling
				          // you can controll how slow the scrolling should be  (deltaSpeed)
				          // and when it will check again (deltaTimeout) after it has inspected the dom/viewport;
				          delta: {
				            speed: obj.deltaSpeed || 50,
				            timeout: obj.deltaTimeout || 500
				          }
				        };

				        // add an event listener to init when dom is ready
				        addEventListener('DOMContentLoaded', init, false);

				        // http://stackoverflow.com/questions/9900311/how-do-i-target-only-internet-explorer-10-for-certain-situations-like-internet-e/13971998#13971998
				        var isIE10 = false;
				        if (Function('/*@cc_on return document.documentMode===10@*/')()){
				          isIE10 = true;
				        }
				        var completeOrLoaded = document.readyState === 'complete' || document.readyState === 'loaded';

				        // call init if document is ready to be worked with and we missed the event
				        if (isIE10) {
				          if (completeOrLoaded) {
				            init();
				          }
				        } else {
				          if (completeOrLoaded || document.readyState === 'interactive') {
				            init();
				          }
				        }

				        return {
				          // manually fire check for visibility of tracked elements
				          trigger: function trigger(){
				            doCheckAppear();
				          },
				          // pause tracking of elements
				          pause: function pause(){
				            removeListeners();
				          },
				          // resume tracking of elements after a pause
				          resume: function resume(){
				            begin();
				          },
				          // provide a means to stop monitoring all elements
				          destroy: function destroy() {
				            end();
				          }
				        };

				      };
				    }()(obj));
				  };
				}());
			
		} else {
			var namespace = $.b2x.generateRandomString();
			$("body").on("mouseleave." + namespace, function (e) {
			    if (e.offsetY - $(window).scrollTop() < 0) {
			    	func();
			    	if (once) {
			    		$("body").off("mouseleave." + namespace);
			    	}
			    }
			});
		}
	};
	
	/**
	 * Scatena l'evento parametrizzato al raggiungimento del fondo della pagina, con un offset personalizzabile.
	 */
	$.b2x.onScrolledToBottom = function(func, offset, once) {
		offset = $.b2x.defaultParameterValue(offset, 100);
		once = $.b2x.defaultParameterValue(once, true);
		var namespace = $.b2x.generateRandomString();
		$(window).on("scroll." + namespace, function (e) {
			if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
				func();
				if (once) {
		    		$(window).off("scroll." + namespace);
		    	}
			}
		});
	};
	
	$.b2x.defaultParameterValue = function(parameter, defaultValue) {
		if (parameter === undefined) {
			parameter = defaultValue;
		}
		return parameter;
	}
	
	$.fn.makeVisible = function() {
		$(this).css("visibility", "visible");
		return this;
	};

	$.fn.makeInvisible = function() {
		$(this).css("visibility", "hidden");
		return this;
	};
	
	$.b2x.isDesktop = function() {
		var userAgent = navigator.userAgent.toLowerCase();
		var isMobile = navigator.userAgent.toLowerCase().match(/(ipad)|(iphone)|(ipod)|(android)|(webos)/i);
		return !isMobile;
	}
		
	$.b2x.isTablet = function() {
		var userAgent = navigator.userAgent.toLowerCase();
		const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);		
	}
	
	$.b2x.isMobile = function() {
		if (!$.b2x.isDesktop && !$.b2x.isTablet){ return true; }
		return false;
	}	
	
	$.b2x.detectDevice = function() {
		if ($.b2x.isDesktop()){ return "d"; }
		if ($.b2x.isTablet()){ return "t"; }
		return "m";
	}
	
	$.b2x.isEmptyString = function(string) {
		return string === undefined || string === "";
	}
	
	$.b2x.fromStringToBoolean = function(string) {
		return string === 'true';
	};
	
	$.fn.recipientAutocomplete = function(options) {
		
		var options = {}

		var defaults = {
			types : ['address'],
		};

		var options = $.extend(true, {}, defaults, options);
		
		var getInputInsideForm = function(form, inputId) {
			return form.querySelector("[data-autocomplete-id='" + inputId +"']")
		}
		
		var componentForm = {
				street_number : 'short_name',					// civico		civicCode
				route : 'long_name',							// via			address1
				locality : 'long_name',							// città		cityName	(Lido di Ostia)
				administrative_area_level_2 : 'short_name',		// provincia	provState	(RM)
				administrative_area_level_1 : 'short_name',		// regione		zoneName?	(Lazio)
				country : 'short_name',							// nazione		idCountry?
				postal_code : 'short_name'						// cap			zipCode
		};
		
		$(this).each(function() {
			
			var mainInput = this;
			var form = $(mainInput).closest('form').get(0);
			var innerFieldsWrapper = $(form).find('.address-autocomplete-inner-fields-wrapper').get(0);
			var isFormEmpty = true;
			
			var inputCountry = getInputInsideForm(form, 'country');
			var $inputCountry = $(inputCountry);
			
			mainInput.setAttribute('autocomplete', 'new-password');
			mainInput.onfocus = function(){
				mainInput.setAttribute('autocomplete', 'new-password');
			};
			
			for (var component in componentForm) {
				var input = getInputInsideForm(form, component);
				if (input && input !== inputCountry) {
					input.readOnly = true;
					if (input.value !== "") {
						isFormEmpty = false;
					}
				}
			}
			
			if (isFormEmpty) {
				innerFieldsWrapper.style.display = 'none';
			}			
			
			mainInput.onblur = function(){
				innerFieldsWrapper.style.display = 'block';
				for (var component in componentForm) {
					var input = getInputInsideForm(form, component);
					if (input) {
						input.readOnly = false;
					}
				}
			};
			
			var autocomplete = new google.maps.places.Autocomplete(mainInput, options);
			
			autocomplete.setFields(['address_component']);
			autocomplete.addListener('place_changed', function() {
				
				var place = autocomplete.getPlace();
				
				window.console.log(place);
				
				innerFieldsWrapper.style.display = 'block';
				for (var component in componentForm) {
					var input = getInputInsideForm(form, component);
					if (input) {
						input.value = '';
						input.readOnly = false;
					}
				}
				
				for (var i = 0; i < place.address_components.length; i++) {
					var addressType = place.address_components[i].types[0];
					if (componentForm[addressType]) {
						var val = place.address_components[i][componentForm[addressType]];
						if (addressType == 'country') {
							val = countriesIso2IdMap[val];
						}
						var input = getInputInsideForm(form, addressType);
						if (input) {
							input.value = val;
						}
					}
				}
			});
			
			var changeCountry = function(doReset) {
				var selectedCountryIso2 = countriesIdIso2Map[$inputCountry.val()];
				if (selectedCountryIso2) {
					autocomplete.setComponentRestrictions({'country': selectedCountryIso2});
					if (doReset) {
						for (var component in componentForm) {
							var input = getInputInsideForm(form, component);
							if (input && input !== inputCountry) {
								input.value = '';
								input.readOnly = false;
							}
						}		
						mainInput.value='';
					}
				}
			}
			
			$inputCountry.change(function(){
				changeCountry(true);
			});
			changeCountry(false)
			
			/*
			 * Evito che premendo enter su una selezione mi parta il submit del form,
			 * perchè non fa in tempo a valorizzare tutto e partirebba una submit parziale.
			 */
			google.maps.event.addDomListener(mainInput, 'keydown', function(e) {
				if (e.keyCode == 13 && $('.pac-container:visible').length) {
					e.preventDefault();
				}
			});
		});
	};
})(jQuery);