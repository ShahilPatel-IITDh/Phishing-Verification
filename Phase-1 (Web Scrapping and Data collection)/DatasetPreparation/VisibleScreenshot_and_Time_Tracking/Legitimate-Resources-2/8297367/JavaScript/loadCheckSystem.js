var errorLoad = false;

function ExternValidate(){
	Nav(); if(errorLoad) return errorLoad;
	// Flash(); if(errorLoad) return errorLoad;
	WindowsOpen(); if(errorLoad) return errorLoad;
}

function imgSetImg(ctrl, isTrue){
	if(isTrue) { errorLoad = false; $("#"+ctrl).attr('src', 'img/ok.svg');  }
	else { errorLoad = true; $("#"+ctrl).attr('src', 'img/error.svg'); }
}

function Flash(){
	var urlFlash = 'https://get.adobe.com/es/flashplayer/';

	var hasFlash = false;
	try {
		hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
	} catch(exception) {
		hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
	}
	
	if(hasFlash) {
		$('#jsDetailsFLASH').append($('<label></label>'));
		imgSetImg("imgFLASH", true);
	}
	else {
		$('#jsDetailsFLASH').append($('<a href="'+urlFlash+'">Download Flash Player</a>'));
		imgSetImg("imgFLASH", false);
	}
}

function WindowsOpen(){
	var urlWindow = "https://www.google.com.mx/search?q=habilitar+%2B+ventanas+emergentes&safe=active&gbv=2&sei=aQQKWda9OYSAmQHrpYyQCQ";
	var popUp = window.open('https://armstrongweb.com.mx/checksystem/', '', 'options');
	if (popUp == null || typeof(popUp)=='undefined') {
		$('#jsDetailsBloq').append($('<a href="'+urlWindow+'">Habilitar Ventanas Emergentes</a>'));
		imgSetImg("imgBloq", false);
	}
	else {
		popUp.close();
		imgSetImg("imgBloq", true);
	}
	return false;
}

function Nav(){
	var element = "imgNAV";
	var firefox = $.browser.firefox; // Firefox
	var mozilla = $.browser.mozilla; // Mozilla
	var msie = navigator.appName == 'Microsoft Internet Explorer';
	var edge = navigator.appName == 'Netscape';
	var opera = $.browser.opera; // Opera
	
	var chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var safari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	
	if(firefox || mozilla || msie || edge || opera || chrome){
		if(firefox){
			if($.browser.version >= "40.0") imgSetImg(element, true);
			else imgSetImg(element, false);
		}
		else if(mozilla){
			if($.browser.version >= 9) imgSetImg(element, true);
			else imgSetImg(element, false);
		}
		else if(msie){
			if($.browser.version >= 9) imgSetImg(element, true);
			else imgSetImg(element, false);
		}		
		else if(opera){
			if($.browser.version >= "34.0") imgSetImg(element, true);
			else imgSetImg(element, false);
		}
		else if(chrome){
			var x = navigator.appVersion;
			var y = x.split('Chrome/')[1];

			if( typeof y != 'undefined' ){
			  y = y.split(' ')[0];
			  var z = y.split('.');
			  if(parseInt(z[0]) >= "40.0") imgSetImg(element, true);
			  else imgSetImg(element, false);
			  return;
			}
		}
		else if(edge){
			var x = navigator.appVersion;
			var y = x.split('Edge/')[1];

			if( typeof y != 'undefined' ){
			  y = y.split(' ')[0];
			  if(y >= "10.0") imgSetImg(element, true);
			  else imgSetImg(element, false);
			  return;
			}
		}
		else{
			imgSetImg(element, false);
		}
	}
	else{
		imgSetImg(element, false);
	}

	// if ($.browser.msie && $.browser.version > 9 ) $("#jsColorNAV").css("background-color", "red" );
	// if ($.browser.mozilla && $.browser.version >= "1.8" ) $("#jsColorNAV").css("background-color", "red" );
}
