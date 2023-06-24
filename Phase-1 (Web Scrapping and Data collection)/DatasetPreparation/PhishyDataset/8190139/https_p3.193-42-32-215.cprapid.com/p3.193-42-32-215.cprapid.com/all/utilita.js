   /*****************************************************

    Utilita.js - (c) Poste Italiane 2020 - GD//FS//DU

*****************************************************/
/*  Set Browser-sniffing on/off */
var browserCheck = "on";
/*  Set domain-sniffing on/off */
var domainCheck = "on";
/*  Set Mediaquery-sniffing on/off */
var mqCheck = "on";
/*  Set Debug on/off */
var debugging = "off";
/*  Set Overlay pageLoader on/off */
var overlayPageLoad = "on";


/* avoid undefined variables for sticky scroll */
var stLi = ''; /* what to sticky-to */
var stickFromTop = ''; /*from what to sticky */

/* Doc. Debug var on/off - USAGE:
 *       writeLog("----");
 *       writeWarning("ops");
 *       writeError("ops");
 *       writeInfo("ops");
 */

/* Doc. Mediaquery-sniffing var on/off - USAGE:
 *    class = 'pi-xs'
 *            'pi-sm'
 *            'pi-md'
 *            'pi-lg'
 */

/* Doc. Browser-sniffing class on html var on/off
 *    class = 'pi-mobile'
 *            'pi-mobile pi-android'
 *            'pi-mobile pi-ios'
 *            'pi-firefox'
 *            'pi-ie pi-ie-edge'
 *            'pi-ie pi-ie10'
 *            'pi-ie pi-ie9'
 *            'pi-ie pi-ie8'
 *            'pi-ie pi-ie7'
 *            'pi-ie pi-ie6'
 *            'pi-chrome'
 *            'pi-opera'
 *            'pi-safari'
 */


/*****************/
/*    set log    */
/*****************/
function writeLog(arg) {
    if ((typeof console != "undefined") && (debugging == "on")) {
        console.log(arg);
    }
}

function writeError(arg) {
    if ((typeof console != "undefined") && (debugging == "on")) {
        console.error(arg);
    }
}

function writeInfo(arg) {
    if ((typeof console != "undefined") && (debugging == "on")) {
        console.info(arg);
    }
}

function writeWarning(arg) {
    if ((typeof console != "undefined") && (debugging == "on")) {
        console.warn(arg);
    }
}




/******************/

/* Media Query check */

/******************/

var mq_WindowWidth = $(window).width();
var mq_Detect = 'nomQDetect';


if (mqCheck == "on") {
    mqCheckDetection();
}

$(window).resize(function () {
    if (mqCheck == "on") {
        mqCheckDetection();
    }
});

function mqCheckDetection(mq_WindowWidth) {
    if ((mq_WindowWidth == null) || (mq_WindowWidth == '') || (mq_WindowWidth == 'undefined')) {
        var mq_WindowWidth = $(window).width();
    }
    if (mq_WindowWidth < 768) {
        if (!($('html').hasClass('pi-xs'))) {
            $('html').removeClass('pi-sm pi-md pi-lg');
            $('html').addClass('pi-xs');
            writeInfo('MediaQuery Check : ' + 'xs');
            mq_Detect = 'xs';
            return mq_Detect;
        }
    } else if ((mq_WindowWidth > 767) && (mq_WindowWidth < 992)) {
        if (!($('html').hasClass('pi-sm'))) {
            $('html').removeClass('pi-xs pi-md pi-lg');
            $('html').addClass('pi-sm');
            writeInfo('MediaQuery Check : ' + 'sm');
            mq_Detect = 'sm';
            return mq_Detect;
        }
    } else if ((mq_WindowWidth > 991) && (mq_WindowWidth < 1200)) {
        if (!($('html').hasClass('pi-md'))) {
            $('html').removeClass('pi-xs pi-sm pi-lg');
            $('html').addClass('pi-md');
            writeInfo('MediaQuery Check : ' + 'md');
            mq_Detect = 'md';
            return mq_Detect;
        }
    } else if ((mq_WindowWidth > 1199)) {
        if (!($('html').hasClass('pi-lg'))) {
            $('html').removeClass('pi-xs pi-sm pi-md');
            $('html').addClass('pi-lg');
            writeInfo('MediaQuery Check : ' + 'lg');
            mq_Detect = 'lg';
            return mq_Detect;
        }
    }
}

/******************/

/* Sniffing pixel density */

/******************/
function isHighDensity() {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
}


function isRetina() {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
}

/******************/

/* Modal recalc position (to center) */

/******************/
$(function () {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');

        // Dividing by two centers the modal exactly, but dividing by three
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function () {
        $('.modal:visible').each(reposition);
    });
});



/******************/

/* Sniffing browser */

/******************/


if (browserCheck == "on") {
    BrowserDetection();
}


function BrowserDetection() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        writeInfo('Mobile Browser detected');
        //document.getElementsByTagName('html')[0].className += 'pi-mobile';
        $('html').addClass('pi-mobile');
        if (/Android/i.test(navigator.userAgent)) {
            writeInfo('Android Browser detected');
            //document.getElementsByTagName('html')[0].className += ' ' + 'pi-android';
            $('html').addClass('pi-android');
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            writeInfo('Ios Browser detected');
            //document.getElementsByTagName('html')[0].className += ' ' + 'pi-ios';
            $('html').addClass('pi-ios');
        }
    } else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var ffversion = new Number(RegExp.$1);
        writeInfo('Firefox Browser detected');
        //document.getElementsByTagName('html')[0].className += 'pi-firefox';
        $('html').addClass('pi-firefox');

    } else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var ieversion = new Number(RegExp.$1);
        if (ieversion == 10) {
            // for IE10
            //document.getElementsByTagName('html')[0].className += 'pi-ie pi-ie10';
            $('html').addClass('pi-ie pi-ie10');
            writeInfo('IE10 Browser detected');
        } else if (ieversion == 9) {
            // for IE9
            //document.getElementsByTagName('html')[0].className += 'pi-ie pi-ie9';
            $('html').addClass('pi-ie pi-ie9')
            writeInfo('IE9 Browser detected');
        } else if (ieversion == 8) {
            // for IE8
            //document.getElementsByTagName('html')[0].className += 'pi-ie pi-ie8';
            $('html').addClass('pi-ie pi-ie8')
            writeInfo('IE8 Browser detected');
        } else if (ieversion == 7) {
            // for IE7
            //document.getElementsByTagName('html')[0].className += 'pi-ie pi-ie7';
            $('html').addClass('pi-ie pi-ie7')
            writeInfo('IE7 Browser detected');
        } else if (ieversion == 6) {
            // for IE6
            //document.getElementsByTagName('html')[0].className += 'pi-ie pi-ie6';
            $('html').addClass('pi-ie pi-ie6')
            writeInfo('IE6 Browser detected');
        }
    } else if (/Trident.*rv[ :]?[1-9]{2}\./.test(navigator.userAgent)) {
        var ieVersion = new Number(RegExp.$1);
        //document.getElementsByTagName('html')[0].className += 'pi-ie pi-ie-edge';
        $('html').addClass('pi-ie pi-edge');
        writeInfo('IE > 10 Browser detected');
    } else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var chromeversion = new Number(RegExp.$1);
        //document.getElementsByTagName('html')[0].className += 'pi-chrome';
        $('html').addClass('pi-chrome');
        writeInfo('Chrome Browser detected');
    } else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var oprversion = new Number(RegExp.$1);
        //document.getElementsByTagName('html')[0].className += 'pi-opera';
        $('html').addClass('pi-opera');
        writeInfo('Opera Browser detected');
    } else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
        var safariversion = new Number(RegExp.$1);
        //document.getElementsByTagName('html')[0].className += 'pi-safari';
        $('html').addClass('pi-safari');
        writeInfo('Safari Browser detected');
    }
}



/******************/

/* Sniffing domain */

/******************/


if (domainCheck == "on") {
    DomainDetection();
}


function DomainDetection() {
    var myhostnamePi = window.location.hostname.split('.').reverse();
    var myhostExtension =   myhostnamePi[0];        /* estensione dominio (it/com) */
    var myhostDomain    =   myhostnamePi[1];        /* primo livello */
    var myhostSubDomain =   myhostnamePi[2];        /* secondo livello */
    var mytagHtml = document.getElementsByTagName('html')[0];


    if(myhostDomain == "poste"){

        posteit_suffix = 'pi-domain';
        mytagHtml.classList.add(posteit_suffix);

        /* Business check */
        if(myhostSubDomain == "business"){
            writeLog('DomainDetection: ' + myhostSubDomain);
            mytagHtml.classList.add(posteit_suffix+'-business');
        }
        /* Postepay check */
        else if(myhostSubDomain == "postepay"){
            writeLog('DomainDetection: ' + myhostSubDomain);
            mytagHtml.classList.add(posteit_suffix+'-postepay');
        }
        /* Postevita check */
        else if((myhostSubDomain == "postevita")||(myhostSubDomain == "posteassicura")){
            writeLog('DomainDetection: ' + myhostSubDomain);
            mytagHtml.classList.add(posteit_suffix+'-postevita');
        }
        /* Poste check */
        else {
            writeLog('DomainDetection: ' + myhostSubDomain);
            mytagHtml.classList.add(posteit_suffix+'-posteit');
        }
    }
    if(myhostDomain == "posteitaliane"){
       /* Corporate check */
       posteitaliane_suffix = 'corporate-domain';
       writeLog('DomainDetection: ' + myhostDomain);
       mytagHtml.classList.add(posteitaliane_suffix,posteitaliane_suffix+'-posteitaliane');
    }
}

/******************/

/* equalize element*/
/* setta altezza di una map / array a quella maggiore, in ingresso prende il selettore css */

/******************/


function pari_altezza_func(sel) {
    if ($(sel).length > 0) {
        var heights = $(sel).map(function () {
                return Math.ceil(this.getBoundingClientRect().height);
            }).get(),

        maxHeight = Math.max.apply(null, heights);

          if( $(sel).attr('data-default-height') >= maxHeight){
          maxHeight = $(sel).attr('data-default-height') + "px";
         }

        $(sel).css("min-height", maxHeight);

        if ($(sel).hasClass('equalize-height')) {
            $(sel).css("height", maxHeight);
        }
        if ((mq_Detect == 'xs') && !($(sel).parents().hasClass('content-overflow'))) {
            $(sel).css("min-height", "auto");
        }



        return maxHeight;
    }

}


function pari_altezza(myvar,eq_forced) {

    var myidEq;

    // forza equalize in assenza di eventi load o resize
      if(eq_forced==true){
                 doEqualize();
      }

    $( window ).on( "load", function () {
        //writeLog("equalize function onLoad: called on " + myvar);
        doEqualize();
    });

    $(window).resize(function () {
        clearTimeout(myidEq);
        myidEq = setTimeout(doEqualize, 350);
    });


    function doEqualize() {
        if ($(myvar).hasClass('equalize-height')) {
            //writeLog('reset height: ' + myvar);
            $(myvar).css("height", "auto");
        }
        //writeLog('reset min-height: ' + myvar);
        $(myvar).css("min-height", "auto");
        //writeLog("equalize function onResize: called on " + myvar);
        pari_altezza_func(myvar);

    }
}


/* ciclo equalize su elementi di una stessa riga ----- pari_altezza(".equalize* .panel-cards") */
function equalizeCycle(myclass, mycardclass,eq_forced) {
    //writeLog("----");
    var mynumMaxGruppiElementiEqualize = $(myclass).length;
    //writeLog("equalizeCycle function: trovati " + mynumMaxGruppiElementiEqualize + " gruppi di elementi");

    for (var i = 1; i <= mynumMaxGruppiElementiEqualize; i++) {
        var tgtcycle = myclass + "-" + i + " " + mycardclass;
        if ($(tgtcycle).length > 0) {
            pari_altezza(tgtcycle,eq_forced);
            //writeLog("Applico equalize su gruppi di elementi: " + tgtcycle);
        }
    }
    //writeLog("----");
}


function iconScrollFading(myicon) {
    var scrollTop = $(this).scrollTop();
    $(myicon).css({
        opacity: function () {
            var elementHeight = $(this).parent().height(),
                opacity = (((elementHeight / 1.8) - scrollTop) / elementHeight) * 1.8;
            return opacity;
        }
    });
}

/******************/

/* page loader */

/******************/

//$(function () {
$('head').ready(function () {
    if (overlayPageLoad == "on") {


        var loaded = false;
        var timeoutLoad = 8000;
        var startLoadTime = new Date();
        var delayLoadTime = 400;

        $('<div class="pageLoader"><img class="loader-logo" alt="Poste Italiane" src="data:image/png;base64,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"  srcset="data:image/png;base64,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"><img class="loader-spinner" alt="attendi il caricamento" src="https://i.imgur.com/W47SSFp.gif" /></div>').appendTo('body');


        $(".pageLoader").css({
            "background-color": "#fff",
            "position": "fixed",
            "width": "100%",
            "height": "100%",
            "z-index": "9999",
            "top": "0",
            "opacity": "1",
            "text-align": "center",
            "padding-top": "20%",
            "display": "block"
        });
        $(".pageLoader .loader-spinner").css({
            "padding-top": "40px",
            "width": "40px",
            "display": "block",
            "margin": "0 auto"
        });
        $(".pageLoader .loader-logo").css({
            "height": "22px"
        });


        //writeInfo("DocumentReady in: " + (new Date() - startLoadTime) + "ms");

        $(window).load(function () {
            loaded = true;
            $(".pageLoader").delay(delayLoadTime).fadeOut("slow");
            //$(".pageLoader").delay(delayLoadTime).slideToggle("slow");
            //writeInfo("PageLoad in: " + (new Date() - startLoadTime) + "ms" + " + " + delayLoadTime + "ms delay");
        });
        setTimeout(function () {
            if (!loaded) {
                $(".pageLoader").fadeOut("fast");
                writeInfo("Timeout PageLoader: " + timeoutLoad + "ms");
            }
        }, timeoutLoad);
    }
});



$('ul.dropdown-menu.mega-dropdown-menu').on('click', function (event) {
    // L'evento non verra' propagato al document NODE pertanto
    // gli eventi delegati non verranno startati
    event.stopPropagation();
});
