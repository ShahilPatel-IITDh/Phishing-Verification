/*
 * QUESTO FILE NON VA SOVRASCRITTO DAL SINGOLO STORE MA SOLO EREDITATO COSI COME E'.
 * Qualunque modifica a questo file avrà effetto su tutti gli store.
 * Se serve una modifica dedicata al singolo store, non metterla qui ma su main.js.
 * Modificare con cautela.
 */

//jQuery(function($){
	$.datepicker.setDefaults($.datepicker.regional[selectedLocale]);
//});

//Setto il locale javascript uguale al locale jsp
$.i18n(selectedLocale);

var getText = function(str, args) {
	var text = $.i18n('msg', str, args);
	if (text === str) {
		text = bundle[str];
		if (text) {
			for (var i = 1; i < arguments.length; i++) {
				text = text.replace("{" + (i-1) + "}", arguments[i]);
			}
		} else {
			text = "???" + str + "???";
		}
	}
	return text;
}

var ajax_loading = false;
var ajax_non_silent_loading_count = 0;

$(document).ready(function() {
	
	$.ajaxSetup({ 
        scriptCharset: "utf-8"
	});	
	$.ajaxSettings.cache = false;
	
	if(httpsEnabled) {
		rewriteLinkurl("./store.common.util.js.pagespeed.ce.EGVeyPoPdQ.js");
	}
	
});

$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
	var url = options.url;
	// a differenza del nws controlliamo che l'utente sia autenticato
	var matchAsync = url.indexOf("/ws/");
	if (matchAsync >= 0) {
		// !isLogged se non sei loggato
		if(!isLogged) {
			jqXHR.abort();
			showMessageSessionExpired(getText('error'), getText('session_expired'));
		}
	}
	if (isWebView) {
		jqXHR.setRequestHeader('isFromWebView', true);
	}
});

$(document).ajaxSend(function(event, request, settings) {

	if (ajax_non_silent_loading_count == 0 && !settings.silent) {
		waitOn(settings);
	}
	if (!settings.silent) {
		ajax_non_silent_loading_count++;
	}
	ajax_loading = true;
	
});

$(document).ajaxComplete(function(event, xhr, settings) {
	if (ajax_non_silent_loading_count <= 1 && !settings.silent) {
		waitOff();
	}
	if (!settings.silent) {
		ajax_non_silent_loading_count--;
	}
	ajax_loading = false;
	
	fixesAfterAsyncLoad();
	handlePopups();
});

function waitOn() {}
function waitOff() {}
function fixesAfterAsyncLoadCommon() {
	onloadReCaptchaCallback();
}
function fixesAfterAsyncLoad() {
	fixesAfterAsyncLoadCommon();
}

function getAbsoluteurl("./relativeUrl__prefix") {
	return getAbsoluteUrlInt(relativeUrl, prefix);
}

function getAbsoluteUrlNoContextPath(relativeUrl, prefix) {
	return getAbsoluteUrlInt(relativeUrl, prefix, true);
}

function getAbsoluteUrlInt(relativeUrl, prefix, noContextPath) {
	
	if (relativeUrl.indexOf("https://") > -1 || relativeUrl.indexOf("http://") > -1) {
		return relativeUrl;
	}
	
	var contextPathParam;
	var host;
	var httpsEnabledParam;
	var forceHttpsParam = forceHttps;
	
	if (typeof prefix !== "undefined") {
		var uriPattern = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/g;
		var uriParts = uriPattern.exec(prefix);
		if (uriParts !== null) {
			host = uriParts[4];
			contextPathParam = uriParts[5];
			var protocol = uriParts[2];
			if (protocol == "https") {
				httpsEnabledParam = true;
			}
			else {
				httpsEnabledParam = false;
			}
			forceHttpsParam = false;
		}
		else {
			host = location.host;
			if (noContextPath) {
				contextPathParam = "";
			} else {
				contextPathParam = contextPath;
			}
			httpsEnabledParam = httpsEnabled;
		}
	}
	else {
		host = location.host;
		if (noContextPath) {
			contextPathParam = "";
		} else {
			contextPathParam = contextPath;
		}
		httpsEnabledParam = httpsEnabled;
	}
	
	var matchAsync = relativeUrl.indexOf("/async/");
	if (matchAsync >= 0) {
		return contextPathParam + relativeUrl;
	}

//	startsWidth not work in IE	
//	if (contextPathParam.startsWith("https://") || contextPathParam.startsWith("http://")) {
//		if (contextPathParam.startsWith("http://") && httpsEnabledParam && forceHttpsParam) {
//			contextPathParam.replace("http://", "https://");
//		}
//		return contextPathParam + relativeUrl;
//	}
	if (contextPathParam.indexOf("https://") > -1 || contextPathParam.indexOf("http://") > -1) {
		if (contextPathParam.indexOf("http://") > -1 && httpsEnabledParam && forceHttpsParam) {
			contextPathParam.replace("http://", "https://");
		}
		return contextPathParam + relativeUrl;
	}
	
	var prot;
	var matchWs = relativeUrl.indexOf("/ws/");
	var matchNws = relativeUrl.indexOf("/nws/");
	if (httpsEnabledParam && (forceHttpsParam || matchWs >= 0 || matchNws >=0)) {
		prot = 'https://';
	} else {
		prot = 'http://';
	}
	return prot + host + contextPathParam + relativeUrl;

//	} else {
//		return contextPathParam + relativeUrl;
//	}
}

function reloadPage(){
	disablePopup = true;
	location.reload();
}

function redirect(url, isRelative) {
	isRelative = (typeof isRelative !== 'undefined') ? isRelative : true;
	url = isRelative ? getAbsoluteurl("./url") : url;
	if (inIframe() && typeof parentWindow !== 'undefined') {
		parentWindow.location.href = url;
	} else {
		disablePopup = true;
		location.href = url;
	}
}

function redirectToHomePage(){
	redirect("/");
}

function redirectToCart(){
	redirect("/cart.do");
}

function redirectToWishlist(){
	redirect("/wishlist.do");
}

function redirectToPurchaseList(){
	redirect("/ws/customer.do?area=purchase-list");
}

function redirectToCheckout(){
	redirect("/nws/checkout.do");
}

function redirectToLoginPage(){
	redirect("/nws/login.do");
}


function rewriteLinkurl("./store.common.util.js.pagespeed.ce.EGVeyPoPdQ.js") {
	if(httpsEnabled) {
		rewriteLinkUrlType('a');
		rewriteLinkUrlType('form');
	}
}

function rewriteLinkUrlType(type){
	
	var host = location.host;
	
	//Create an object of all links
	
	var links = $(type)
	//Parse each item in links object
	for (var index in links){
	//This will allow the for iteration to give the actual link objects that are
	//referred to with numeric indexes and not objects that jQuery appends
	//Object 'a' should be a number
		
		if(index == parseInt(index)){
			//Variable link is now the object that is links[index];
			var link = links[index];
			//Variable jQ_link is now variable link cast to jQuery so I can use built in jQuery functions
			var jQ_link = $(link);
			//Variable temp now contains the href of that link
			var tempTitle =  'href';
			var temp = jQ_link.attr(tempTitle);
			
			if(temp == undefined) {
				tempTitle = 'action';
				temp = jQ_link.attr(tempTitle);
			}
			
			//This should filter out any anchors in the page or any links without an href
			if(temp != undefined){
				//This checks to see if they are inline links, mailto link, OR absolute link
				//This isn't perfect in the case that your link was 'mailsomething.php' or any non http link (ftp or other protocol)
				//The correct scenario here is to use regex but I didn't have the patience
				//or time to do so, so I didn't plus I knew my links didn't apply to these caveats
				var test = temp;
				
				if(test.substring(0,6) != 'skype:' && 
          		   test.substring(0,5) != 'file:' && 
				   test.substring(0,4) != 'ftp:' && 
				   test.substring(0,4) != 'tel:' && 
				   test.substring(0,7) != 'mailto:' && 
				   test.substring(0,4) != 'http' && 
				   test.substring(0,1) != '#' &&
				   test.substring(0,11) != 'javascript:' &&
				   test.substring(0,2) != '//'){
					
					var match_ws = temp.indexOf("/ws/");
					var match_nws = temp.indexOf("/nws/");
					var prot;
					if (forceHttps || match_ws >= 0 || match_nws >= 0){
						prot = 'https://';
					}else{
						prot = 'http://';
					}
					//Now we prepend the absolute url with the proper and add the relative file location
					jQ_link.attr(tempTitle, prot+host+temp);
				}
			}
		}
	}
}

function isScrolledIntoView(elem, offset, entirely) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    if (entirely) {
    	return (elemBottom-offset <= docViewBottom);
    }
    else {
    	return (elemTop-offset <= docViewBottom);
    }    
}

function datePickerInit() {
	// se il browser in uso non renderizza il datepicker nativo, chiamo quello di bootstrap/jquery
	if(!Modernizr.inputtypes.date) {
		// resetto il datepicker
		$('.datepicker').each(function(){
			$(this).removeClass('hasDatepicker');
		});
		$('.datepicker').each(function(){
			$(this).attr('type', 'text');
		});
		// lo riapplico
		$('.datepicker').datepicker({
	        changeMonth: true,
	        changeYear: true,
	        yearRange: "c-60:c+20",
	        dateFormat: 'dd/mm/yy'
	    });
		// imposto il valore
		$('.datepicker').each(function(){
			var data = $(this).data('value');
			if (data) {
				$(this).val(data);
			}
		});
	} else {
		$('.datepicker').each(function(){
			var data = $(this).data('value');
			if (data) {
				var dataArray = data.split("/");
				$(this).val(dataArray[2] + "-" + dataArray[1] + "-" + dataArray[0]);
			}
		});
	}
}

/**
 * Consente l'inserimento di soli numeri all'interno degli input type
 */
function allowOnlyNumbersInit() {
	$(document).on('keypress', '.allow-only-numbers', function(evt){	
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode >= 48 && charCode <= 57)
			return true;
		return false;
	});
};


/**
 * Consente l'inserimento di soli numeri e la virgola all'interno degli input type
 */
function allowOnlyCurrentcyInit() {
	$(document).on('keypress', '.allow-only-currency', function(evt){	
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode == 44 || charCode == 46 || charCode >= 48 && charCode <= 57)
			return true;
		return false;
	});
};


/**
 * Consente l'inserimento di soli numeri telefonici all'interno degli input type
 */
function allowOnlyPhoneNumbersInit() {
	$(document).on('keypress', '.allow-only-phone-numbers', function(evt){
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode >= 48 && charCode <= 57 || charCode == 43 || charCode == 32)
			return true;
		return false;
	});
};


/**
 * Consente l'inserimento di soli caratteri (esclusi i numeri) all'interno degli input type
 */
function allowOnlyCharsInit() {
	$(document).on('keypress', '.allow-only-chars', function(evt){	
		var charCode = (evt.which) ? evt.which : event.keyCode
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return true;
		return false;
	});
};

/**
 * Consente l'inserimento di soli caratteri alfanumerici all'interno degli input type
 */
function allowAlphaNumericCharsInit() {
	$(document).on('keypress', '.allow-alphanumeric-chars', function(evt){	
		var charCode = (evt.which) ? evt.which : event.keyCode
		if ( (charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) )
			return true;
		return false;
	});
};

/**
 * Non consente taglia copia e incolla all'interno degli input type
 */
function disallowCutCopyPasteInit() {
	$(document).on('cut copy paste', '.disallow-cut-copy-paste', function(evt){
		evt.preventDefault();
	});
};

/**
 * Consente l'inserimento di soli caratteri lowercase all'interno degli input type
 */
function allowOnlyLowerCaseInit() {
	$(document).on('keypress', '.allow-only-lowercase', function(evt){	
		var charCode = (evt.which) ? evt.which : event.keyCode
		if (charCode > 31 && (charCode < 65 || charCode > 90))
			return true;
		return false;
	});
};

function forceLower(strInput) {
	strInput.value=strInput.value.toLowerCase();
}

function alertViewport() {
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	alert(viewportWidth + "x" + viewportHeight);
}

function submitForm(url, values, httpMethod) {
	httpMethod = (typeof httpMethod == 'undefined') ? 'POST' : httpMethod;
	
	if(httpMethod == 'GET'){
		var addEt = true;
		var addQuestMark = false;
		
		// se finisce con & non lo devo aggiungere
		if (url.indexOf("&") == (url.length-1)) {
			addEt = false;
		}
		
		// se non c'è ? lo devo aggiungere
		if (url.indexOf("?") < 0) {
			addEt = false;
			addQuestMark = true;
		} 
		

		$.each(values, function(key, value) {
			if (addQuestMark) {
				url = url + "?";
				addQuestMark = false;
			} else if (addEt) {
				url = url + "&";
			}
			// dalla seconda volta in poi comunque devo aggiungere &
			addEt = true;
			
			url = url + key + "=" + value;
		});
		
		window.location.href = url;

	}else{
	
		var formToSubmit = jQuery('<form>', {
			'action' : url,
			'method' : httpMethod,
		});
		$.each(values, function(key, value) {
			formToSubmit.append(jQuery('<input>', {
				'name' : key,
				'value' : value,
				'type' : 'hidden'
			}));
		});
		formToSubmit.appendTo('body').submit();
		
	}
}

function initLazyLoad(aid, offset){
	$("img.lazy").lazyload({
		effect : "fadeIn",
		threshold : 200
	});
};

function initNoPasteInputs() {
	$('.no-paste').bind("paste", function(e) {
		e.preventDefault();
	});
}

function handlePopups() {
	if (disablePopup) {
		return;
	}
	var idPopups = getCookie("popups");
	// Resetto il cookie dei popups
	deleteCookie("popups");
	if (idPopups) {
		idPopups = JSON.parse(idPopups);
		$.each(idPopups, function(i, idPopup) {
			setTimeout(function() {
				getPopupById(idPopup);
			}, i * 500); // Le chiamo con un minimo di distanza perchè altrimenti ho problemi.
		});
	

	}
}

function getPopupById(id) {
	$.ajax({
		type: "GET",
		url: getAbsoluteurl("async/getPopup_id____id.do"),
		silent: true,
		error: function(xhr, errtype, e) {				
			showError(getText('error'), getText('internal_error'));
		},
		success: function(data) {
			$('<div id="popup-' + id + '-wrapper"></div>').html(data).appendTo(document.body);
		},
	});
}

function isThereAPopupToShow() {
	var idPopup = getCookie("popups");
	if (idPopup) {
		return true;
	} else {
		return false;
	}
}

/**
 * Somma due numeri, interpretandoli sempre come numeri e non come stringhe (che concatenerebbe).
 */
var add = function(x, y) {
	return +x + +y;
}

/**
 * Controlla se una stringa contiene una sottostringa. 
 */
var stringContainsSubstring = function(str, substr) {
	return (str.indexOf(substr) >= 0);
}

/**
 * Controlla se una array contiene una elemento. 
 */
var arrayContainsElement = function(element, array) {
	return ($.inArray(element, array) !== -1);
}

var createOrUpdateCookie = function(name, value, seconds, usePrefix) {
	
	if(usePrefix == null || typeof usePrefix === 'undefined') {
		usePrefix = true;
	}
	
	$.cookie.raw = true;
	var date = new Date();
	date.setTime(date.getTime() + (seconds * 1000));
	if (usePrefix) {
		name = cookiePrefix + "_" + name;
	}
	$.cookie(name, value, {
		expires : date,
		path : '/',
		domain : ssoTokenDomain
	});
}

var deleteCookie = function(name) {
	$.cookie(cookiePrefix + "_" + name, null, {
		path : '/',
		domain : ssoTokenDomain
	});
	$.cookie(cookiePrefix + "_" + name, null, {
		path : '/'
	});
}

var getCookie = function(name, usePrefix) {
	
	if(usePrefix == null || typeof usePrefix === 'undefined') {
		usePrefix = true;
	}
	if (usePrefix) {
		name = cookiePrefix + "_" + name;
	}
	
	return $.cookie(name);
}

/**
 * 
 * Funzione per condivisione social in pagina
 *  
 */
function Sharer() {}

Sharer.facebook = function(width, height) {
    Sharer.base('http://www.facebook.com/sharer.php?u=', width, height);
};

Sharer.twitter = function(width, height) {
    Sharer.base('http://www.twitter.com/share?', width, height);
};

Sharer.google = function(width, height) {
    Sharer.base('https://plus.google.com/share?url=', width, height);
};

Sharer.linkedIn= function(width, height) {
    Sharer.base('http://www.linkedin.com/shareArticle?mini=true&url=', width, height);
};

Sharer.base = function(url, width, height) {
    var leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    var topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition
        + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition
        + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    window.open(url + encodeURIComponent(location.href),'sharer', windowFeatures);
};

function backToCartPage(){
	redirect("/cart.do");	
}

//SCRIPT PER CARICAMENTO ASINCRONO DELLE IMMAGINI CARICATE DA CONTENUTO CON LE CLASSI VIEWPORT DI BOOTSTRAP
function loadDynamicImages(type) {
	$dynamicImages = $("[data-src-load]");
	if($dynamicImages.length > 0) {
		$dynamicImages.each(function(index) {
			if(type == "ready") {
				if(index<=4) {
					if( $(this).is(":visible") ) {
						$(this).attr('src', $(this).data('src-load')); 
			            $dynamicImages.splice(index, 1)
					} 		
				}
			} else {
				if( $(this).is(":visible") ) {
					$(this).attr('src', $(this).data('src-load')); 
		            $dynamicImages.splice(index, 1)
				} 		
			}
		});
	}
}

var initPageView = true;	
function initPageViewAfterAsync() {	
	if(initPageView && typeof ga === 'function') {
		ga('send', 'pageview');
		initPageView = false;
	}
}

function updateQueryStringParameter(uri, key, value) {
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	} else {
		return uri + separator + key + "=" + value;
	}
}

$(document).ready(function() {
	loadDynamicImages('ready');
});

$(window).load(function() {
	loadDynamicImages('load');
});

$(window).resize(function() {
	loadDynamicImages('load');
}).resize();


var onloadReCaptchaCallback = function() {
	if (typeof grecaptcha !== 'undefined') {
		if (grecaptcha.render) {
			$('.g-recaptcha').each(function(index, el) {
				if (!$(el).hasChild('.grecaptcha-badge')) {
					var reCaptchaWidgetId = grecaptcha.render(el, {
						'sitekey'  : reCaptchaSiteKey,
						'size'     : 'invisible',
						'callback' : $(el).data('callback')
					});
					$(el).data('g-recaptcha-widget-id', reCaptchaWidgetId);
				}
			});
		}
	}
};

$.fn.getReCaptchaWidgetId = function() {
	return this.find(".g-recaptcha").data("g-recaptcha-widget-id");
}

function addToCartPopup(idPopup){
	var addToCartButton = $('#add-to-cart');
	var popup = $('#popup-'+idPopup);
	if(addToCartButton.length > 0 && !addToCartButton.hasClass('disabled')) {
		addToCartButton.trigger('click');
		if (popup.hasClass('modal')) {
			popup.modal('hide');
		} else if(popup.hasClass('dynamic-alert-wrapper')) {
			popup.removeClass('in show');
		} else {
			popup.hide();
		}
	}
}

function applyCouponPopup(couponCode, successCallback) {
	$.ajax({
		type : "POST",
		url : getAbsoluteurl("../nws/async/addCoupon.do"),
		data : "couponCode=" + couponCode + "&skipJsonResponse=true",
		silent: true,
		success: function(data) {
			if (successCallback !== undefined) {
				successCallback();
			}
		},
		error : function(xhr) {
			showError(getText('error'),	xhr.responseText );
		}
	});
}

function addToCartAndApplyCouponPopup(idPopup, couponCode) {
	var addToCartButton = $('#add-to-cart');
	addToCartButton.data('coupon-to-apply', couponCode);
	addToCartPopup(idPopup);
}

function applyCouponAndRedirectToCartPopup(idPopup, couponCode) {
	applyCouponPopup(couponCode, function() {
		redirectToCart();
	});
}

function inIframe() {
	try {
		return window.self !== window.top;
	} catch (e) {
		return true;
	}
}

function b2xFbq(eventName) {
	b2xFbqFunc(function(){
		fbq('track', eventName);
	});
}
function b2xFbqWithPars(eventName,parameters) {
	b2xFbqFunc(function(){
		fbq('track', eventName, parameters);
	});
}

function b2xFbqFunc(func) {	
	//if (facebookPixelEnabled && enabledThirdPartiesCookie && !isTestEnvironment) {
	if (facebookPixelEnabled && enabledThirdPartiesCookie) {			
		func();
	}
}

function onScrollBottom(func) {
	
}

function removeSessionCookies() {
	//paymentData
	deleteCookie("itemCount");
	deleteCookie("cartCode");
	deleteCookie("sessionCartCode");
}

$(document).on('click', '#remove-double-opt-in', function(event) {
	event.preventDefault();
	var href = this.href;
	deleteCookie("doubleOptInPendingConfirmation");
	window.location = href;
});