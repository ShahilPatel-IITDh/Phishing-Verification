/*!
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */

; (function () {
    /*jshint eqeqeq:false curly:false latedef:false */
    "use strict";

    function setup($) {
        $.fn._fadeIn = $.fn.fadeIn;

        var noOp = $.noop || function () { };

        // this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
        // confusing userAgent strings on Vista)
        var msie = /MSIE/.test(navigator.userAgent);
        var ie6 = /MSIE 6.0/.test(navigator.userAgent) && ! /MSIE 8.0/.test(navigator.userAgent);
        var mode = document.documentMode || 0;
        var setExpr = $.isFunction(document.createElement('div').style.setExpression);

        // global $ methods for blocking/unblocking the entire page
        $.blockUI = function (opts) { install(window, opts); };
        $.unblockUI = function (opts) { remove(window, opts); };

        // convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
        $.growlUI = function (title, message, timeout, onClose) {
            var $m = $('<div class="growlUI"></div>');
            if (title) $m.append('<h1>' + title + '</h1>');
            if (message) $m.append('<h2>' + message + '</h2>');
            if (timeout === undefined) timeout = 3000;

            // Added by konapun: Set timeout to 30 seconds if this growl is moused over, like normal toast notifications
            var callBlock = function (opts) {
                opts = opts || {};

                $.blockUI({
                    message: $m,
                    fadeIn: typeof opts.fadeIn !== 'undefined' ? opts.fadeIn : 700,
                    fadeOut: typeof opts.fadeOut !== 'undefined' ? opts.fadeOut : 1000,
                    timeout: typeof opts.timeout !== 'undefined' ? opts.timeout : timeout,
                    centerY: false,
                    showOverlay: false,
                    onUnblock: onClose,
                    css: $.blockUI.defaults.growlCSS
                });
            };

            callBlock();
            var nonmousedOpacity = $m.css('opacity');
            $m.mouseover(function () {
                callBlock({
                    fadeIn: 0,
                    timeout: 30000
                });

                var displayBlock = $('.blockMsg');
                displayBlock.stop(); // cancel fadeout if it has started
                displayBlock.fadeTo(300, 1); // make it easier to read the message by removing transparency
            }).mouseout(function () {
                $('.blockMsg').fadeOut(1000);
            });
            // End konapun additions
        };

        // plugin method for blocking element content
        $.fn.block = function (opts) {
            if (this[0] === window) {
                $.blockUI(opts);
                return this;
            }
            var fullOpts = $.extend({}, $.blockUI.defaults, opts || {});
            this.each(function () {
                var $el = $(this);
                if (fullOpts.ignoreIfBlocked && $el.data('blockUI.isBlocked'))
                    return;
                $el.unblock({ fadeOut: 0 });
            });

            return this.each(function () {
                if ($.css(this, 'position') == 'static') {
                    this.style.position = 'relative';
                    $(this).data('blockUI.static', true);
                }
                this.style.zoom = 1; // force 'hasLayout' in ie
                install(this, opts);
            });
        };

        // plugin method for unblocking element content
        $.fn.unblock = function (opts) {
            if (this[0] === window) {
                $.unblockUI(opts);
                return this;
            }
            return this.each(function () {
                remove(this, opts);
            });
        };

        $.blockUI.version = 2.70; // 2nd generation blocking at no extra cost!

        // override these in your code to change the default behavior and style
        $.blockUI.defaults = {
            // message displayed when blocking (use null for no message)
            message: '<i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>',

            title: null,		// title string; only used when theme == true
            draggable: true,	// only used when theme == true (requires jquery-ui.js to be loaded)

            theme: false, // set to true to use with jQuery UI themes

            // styles for the message when blocking; if you wish to disable
            // these and use an external stylesheet then do this in your code:
            // $.blockUI.defaults.css = {};
            css: {
                padding: 0,
                margin: 0,
                width: '30%',
                top: '40%',
                left: '35%',
                textAlign: 'center',
                color: '#000',
                border: '3px solid #aaa',
                backgroundColor: '#fff',
                cursor: 'wait'
            },

            // minimal style set used when themes are used
            themedCSS: {
                width: '30%',
                top: '40%',
                left: '35%'
            },

            // styles for the overlay
            overlayCSS: {
                backgroundColor: '#000',
                opacity: 0.6,
                cursor: 'wait'
            },

            // style to replace wait cursor before unblocking to correct issue
            // of lingering wait cursor
            cursorReset: 'default',

            // styles applied when using $.growlUI
            growlCSS: {
                width: '350px',
                top: '10px',
                left: '',
                right: '10px',
                border: 'none',
                padding: '5px',
                opacity: 0.6,
                cursor: 'default',
                color: '#fff',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                'border-radius': '10px'
            },

            // IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
            // (hat tip to Jorge H. N. de Vasconcelos)
            /*jshint scripturl:true */
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

            // force usage of iframe in non-IE browsers (handy for blocking applets)
            forceIframe: false,

            // z-index for the blocking overlay
            baseZ: 99999000,

            // set these to true to have the message automatically centered
            centerX: true, // <-- only effects element blocking (page block controlled via css above)
            centerY: true,

            // allow body element to be stetched in ie6; this makes blocking look better
            // on "short" pages.  disable if you wish to prevent changes to the body height
            allowBodyStretch: true,

            // enable if you want key and mouse events to be disabled for content that is blocked
            bindEvents: true,

            // be default blockUI will supress tab navigation from leaving blocking content
            // (if bindEvents is true)
            constrainTabKey: true,

            // fadeIn time in millis; set to 0 to disable fadeIn on block
            fadeIn: 200,

            // fadeOut time in millis; set to 0 to disable fadeOut on unblock
            fadeOut: 400,

            // time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
            timeout: 0,

            // disable if you don't want to show the overlay
            showOverlay: true,

            // if true, focus will be placed in the first available input field when
            // page blocking
            focusInput: true,

            // elements that can receive focus
            focusableElements: ':input:enabled:visible',

            // suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
            // no longer needed in 2012
            // applyPlatformOpacityRules: true,

            // callback method invoked when fadeIn has completed and blocking message is visible
            onBlock: null,

            // callback method invoked when unblocking has completed; the callback is
            // passed the element that has been unblocked (which is the window object for page
            // blocks) and the options that were passed to the unblock call:
            //	onUnblock(element, options)
            onUnblock: null,

            // callback method invoked when the overlay area is clicked.
            // setting this will turn the cursor to a pointer, otherwise cursor defined in overlayCss will be used.
            onOverlayClick: null,

            // don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
            quirksmodeOffsetHack: 4,

            // class name of the message block
            blockMsgClass: 'blockMsg',

            // if it is already blocked, then ignore it (don't unblock and reblock)
            ignoreIfBlocked: false
        };

        // private data and functions follow...

        var pageBlock = null;
        var pageBlockEls = [];

        function install(el, opts) {
            var css, themedCSS;
            var full = (el == window);
            var msg = (opts && opts.message !== undefined ? opts.message : undefined);
            opts = $.extend({}, $.blockUI.defaults, opts || {});

            if (opts.ignoreIfBlocked && $(el).data('blockUI.isBlocked'))
                return;

            opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
            css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
            if (opts.onOverlayClick)
                opts.overlayCSS.cursor = 'pointer';

            themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
            msg = msg === undefined ? opts.message : msg;

            // remove the current block (if there is one)
            if (full && pageBlock)
                remove(window, { fadeOut: 0 });

            // if an existing element is being used as the blocking content then we capture
            // its current place in the DOM (and current display style) so we can restore
            // it when we unblock
            if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
                var node = msg.jquery ? msg[0] : msg;
                var data = {};
                $(el).data('blockUI.history', data);
                data.el = node;
                data.parent = node.parentNode;
                data.display = node.style.display;
                data.position = node.style.position;
                if (data.parent)
                    data.parent.removeChild(node);
            }

            $(el).data('blockUI.onUnblock', opts.onUnblock);
            var z = opts.baseZ;

            // blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
            // layer1 is the iframe layer which is used to supress bleed through of underlying content
            // layer2 is the overlay layer which has opacity and a wait cursor (by default)
            // layer3 is the message content that is displayed while blocking
            var lyr1, lyr2, lyr3, s;
            if (msie || opts.forceIframe)
                lyr1 = $('<iframe class="blockUI" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + opts.iframeSrc + '"></iframe>');
            else
                lyr1 = $('<div class="blockUI" style="display:none"></div>');

            if (opts.theme)
                lyr2 = $('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + (z++) + ';display:none"></div>');
            else
                lyr2 = $('<div class="blockUI blockOverlay" style="z-index:' + (z++) + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');

            if (opts.theme && full) {
                s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:fixed">';
                if (opts.title) {
                    s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>';
                }
                s += '<div class="ui-widget-content ui-dialog-content"></div>';
                s += '</div>';
            }
            else if (opts.theme) {
                s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (z + 10) + ';display:none;position:absolute">';
                if (opts.title) {
                    s += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (opts.title || '&nbsp;') + '</div>';
                }
                s += '<div class="ui-widget-content ui-dialog-content"></div>';
                s += '</div>';
            }
            else if (full) {
                s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:' + (z + 10) + ';display:none;position:fixed"></div>';
            }
            else {
                s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:' + (z + 10) + ';display:none;position:absolute"></div>';
            }
            lyr3 = $(s);

            // if we have a message, style it
            if (msg) {
                if (opts.theme) {
                    lyr3.css(themedCSS);
                    lyr3.addClass('ui-widget-content');
                }
                else
                    lyr3.css(css);
            }

            // style the overlay
            if (!opts.theme /*&& (!opts.applyPlatformOpacityRules)*/)
                lyr2.css(opts.overlayCSS);
            lyr2.css('position', full ? 'fixed' : 'absolute');

            // make iframe layer transparent in IE
            if (msie || opts.forceIframe)
                lyr1.css('opacity', 0.0);

            //$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
            var layers = [lyr1, lyr2, lyr3], $par = full ? $('body') : $(el);
            $.each(layers, function () {
                this.appendTo($par);
            });

            if (opts.theme && opts.draggable && $.fn.draggable) {
                lyr3.draggable({
                    handle: '.ui-dialog-titlebar',
                    cancel: 'li'
                });
            }

            // ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
            var expr = setExpr && (!$.support.boxModel || $('object,embed', full ? null : el).length > 0);
            if (ie6 || expr) {
                // give body 100% height
                if (full && opts.allowBodyStretch && $.support.boxModel)
                    $('html,body').css('height', '100%');

                // fix ie6 issue when blocked element has a border width
                if ((ie6 || !$.support.boxModel) && !full) {
                    var t = sz(el, 'borderTopWidth'), l = sz(el, 'borderLeftWidth');
                    var fixT = t ? '(0 - ' + t + ')' : 0;
                    var fixL = l ? '(0 - ' + l + ')' : 0;
                }

                // simulate fixed position
                $.each(layers, function (i, o) {
                    var s = o[0].style;
                    s.position = 'absolute';
                    if (i < 2) {
                        if (full)
                            s.setExpression('height', 'Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:' + opts.quirksmodeOffsetHack + ') + "px"');
                        else
                            s.setExpression('height', 'this.parentNode.offsetHeight + "px"');
                        if (full)
                            s.setExpression('width', 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');
                        else
                            s.setExpression('width', 'this.parentNode.offsetWidth + "px"');
                        if (fixL) s.setExpression('left', fixL);
                        if (fixT) s.setExpression('top', fixT);
                    }
                    else if (opts.centerY) {
                        if (full) s.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
                        s.marginTop = 0;
                    }
                    else if (!opts.centerY && full) {
                        var top = (opts.css && opts.css.top) ? parseInt(opts.css.top, 10) : 0;
                        var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ' + top + ') + "px"';
                        s.setExpression('top', expression);
                    }
                });
            }

            // show the message
            if (msg) {
                if (opts.theme)
                    lyr3.find('.ui-widget-content').append(msg);
                else
                    lyr3.append(msg);
                if (msg.jquery || msg.nodeType)
                    $(msg).show();
            }

            if ((msie || opts.forceIframe) && opts.showOverlay)
                lyr1.show(); // opacity is zero
            if (opts.fadeIn) {
                var cb = opts.onBlock ? opts.onBlock : noOp;
                var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
                var cb2 = msg ? cb : noOp;
                if (opts.showOverlay)
                    lyr2._fadeIn(opts.fadeIn, cb1);
                if (msg)
                    lyr3._fadeIn(opts.fadeIn, cb2);
            }
            else {
                if (opts.showOverlay)
                    lyr2.show();
                if (msg)
                    lyr3.show();
                if (opts.onBlock)
                    opts.onBlock.bind(lyr3)();
            }

            // bind key and mouse events
            bind(1, el, opts);

            if (full) {
                pageBlock = lyr3[0];
                pageBlockEls = $(opts.focusableElements, pageBlock);
                if (opts.focusInput)
                    setTimeout(focus, 20);
            }
            else
                center(lyr3[0], opts.centerX, opts.centerY);

            if (opts.timeout) {
                // auto-unblock
                var to = setTimeout(function () {
                    if (full)
                        $.unblockUI(opts);
                    else
                        $(el).unblock(opts);
                }, opts.timeout);
                $(el).data('blockUI.timeout', to);
            }
        }

        // remove the block
        function remove(el, opts) {
            var count;
            var full = (el == window);
            var $el = $(el);
            var data = $el.data('blockUI.history');
            var to = $el.data('blockUI.timeout');
            if (to) {
                clearTimeout(to);
                $el.removeData('blockUI.timeout');
            }
            opts = $.extend({}, $.blockUI.defaults, opts || {});
            bind(0, el, opts); // unbind events

            if (opts.onUnblock === null) {
                opts.onUnblock = $el.data('blockUI.onUnblock');
                $el.removeData('blockUI.onUnblock');
            }

            var els;
            if (full) // crazy selector to handle odd field errors in ie6/7
                els = $('body').children().filter('.blockUI').add('body > .blockUI');
            else
                els = $el.find('>.blockUI');

            // fix cursor issue
            if (opts.cursorReset) {
                if (els.length > 1)
                    els[1].style.cursor = opts.cursorReset;
                if (els.length > 2)
                    els[2].style.cursor = opts.cursorReset;
            }

            if (full)
                pageBlock = pageBlockEls = null;

            if (opts.fadeOut) {
                count = els.length;
                els.stop().fadeOut(opts.fadeOut, function () {
                    if (--count === 0)
                        reset(els, data, opts, el);
                });
            }
            else
                reset(els, data, opts, el);
        }

        // move blocking element back into the DOM where it started
        function reset(els, data, opts, el) {
            var $el = $(el);
            if ($el.data('blockUI.isBlocked'))
                return;

            els.each(function (i, o) {
                // remove via DOM calls so we don't lose event handlers
                if (this.parentNode)
                    this.parentNode.removeChild(this);
            });

            if (data && data.el) {
                data.el.style.display = data.display;
                data.el.style.position = data.position;
                data.el.style.cursor = 'default'; // #59
                if (data.parent)
                    data.parent.appendChild(data.el);
                $el.removeData('blockUI.history');
            }

            if ($el.data('blockUI.static')) {
                $el.css('position', 'static'); // #22
            }

            if (typeof opts.onUnblock == 'function')
                opts.onUnblock(el, opts);

            // fix issue in Safari 6 where block artifacts remain until reflow
            var body = $(document.body), w = body.width(), cssW = body[0].style.width;
            body.width(w - 1).width(w);
            body[0].style.width = cssW;
        }

        // bind/unbind the handler
        function bind(b, el, opts) {
            var full = el == window, $el = $(el);

            // don't bother unbinding if there is nothing to unbind
            if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
                return;

            $el.data('blockUI.isBlocked', b);

            // don't bind events when overlay is not in use or if bindEvents is false
            if (!full || !opts.bindEvents || (b && !opts.showOverlay))
                return;

            // bind anchors and inputs for mouse and key events
            var events = 'mousedown mouseup keydown keypress keyup touchstart touchend touchmove';
            if (b)
                $(document).bind(events, opts, handler);
            else
                $(document).unbind(events, handler);

            // former impl...
            //		var $e = $('a,:input');
            //		b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
        }

        // event handler to suppress keyboard/mouse events when blocking
        function handler(e) {
            // allow tab navigation (conditionally)
            if (e.type === 'keydown' && e.keyCode && e.keyCode == 9) {
                if (pageBlock && e.data.constrainTabKey) {
                    var els = pageBlockEls;
                    var fwd = !e.shiftKey && e.target === els[els.length - 1];
                    var back = e.shiftKey && e.target === els[0];
                    if (fwd || back) {
                        setTimeout(function () { focus(back); }, 10);
                        return false;
                    }
                }
            }
            var opts = e.data;
            var target = $(e.target);
            if (target.hasClass('blockOverlay') && opts.onOverlayClick)
                opts.onOverlayClick(e);

            // allow events within the message content
            if (target.parents('div.' + opts.blockMsgClass).length > 0)
                return true;

            // allow events for content that is not being blocked
            return target.parents().children().filter('div.blockUI').length === 0;
        }

        function focus(back) {
            if (!pageBlockEls)
                return;
            var e = pageBlockEls[back === true ? pageBlockEls.length - 1 : 0];
            if (e)
                e.focus();
        }

        function center(el, x, y) {
            var p = el.parentNode, s = el.style;
            var l = ((p.offsetWidth - el.offsetWidth) / 2) - sz(p, 'borderLeftWidth');
            var t = ((p.offsetHeight - el.offsetHeight) / 2) - sz(p, 'borderTopWidth');
            if (x) s.left = l > 0 ? (l + 'px') : '0';
            if (y) s.top = t > 0 ? (t + 'px') : '0';
        }

        function sz(el, p) {
            return parseInt($.css(el, p), 10) || 0;
        }

    }


    /*global define:true */
    if (typeof define === 'function' && define.amd && define.amd.jQuery) {
        define(['jquery'], setup);
    } else {
        setup(jQuery);
    }

})();

function SetUIBlock(g, block) {

    if (block) {
        if (g == undefined) { $.blockUI(); return; }
        else {
            if (typeof (g) === "boolean") {
                if (g) { $.blockUI(); }
            }
            else {
                if (g.Mensaje == undefined) g.Mensaje = '<i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>';
                if (g.Id == undefined) { alert('Es necesario definir un ID { Id: "#Ejemplo", Mensaje:"Hola"}'); return; }
                $(g.Id).block({ message: g.Mensaje });
            }
        }
    }
    else {
        if (g == undefined) { $.unblockUI(); return; }
        else {
            if (typeof (g) === "boolean") {
                if (g) { $.unblockUI(); }
            }
            else {
                if (g.Id == undefined) { alert('Es necesario definir un ID { Id: "#Ejemplo", Mensaje:"Hola"}'); return; }
                $(g.Id).unblock();
            }
        }
    }

}
//	C U S T O M 
/* webMethod	*/ (function ($) {
    $.extend({
        MethodPOST: function (d, e, f, g) {
            $.ajax({
                type: "POST", url: d, data: JSON.stringify(e), contentType: "application/json; charset=utf-8", dataType: "json",
                success: f,
                error: function (a, b, c) {
                    if (a.status == 700) {
                        location.reload(true);
                        return;
                    }
                    console.error("Status: " + a.status + "\nError: " + c + "\nMessage: " + a.responseText); return false;
                }
                , beforeSend: function () { $.blockUI(); },
                complete: function () { $.unblockUI() }
            })
        }
    })
})(jQuery);
var fb = null;
var pre = 'ctl00_ContentPlaceHolder1_';
var MSGError = 'No existe este control:';

function TBXAsignar(nombre, valor) {
    obj = document.getElementById(pre + nombre);
    if (obj == null) {
        obj = document.getElementById(nombre);
        if (obj == null) { return; } //alert(MSGError + nombre); return;}
    }
    obj.value = valor;
    return true;
}

function Activa_Desactiva(nombre, valor) {
    obj = document.getElementById(pre + nombre);
    if (obj == null) {
        //Dinamicos
        obj = document.getElementById(nombre);
        if (obj == null) { return; } //alert(MSGError + nombre); return;}
    }
    obj.disabled = valor;
    return true;
}

function putImage(nombre, valor) {
    obj = document.getElementById(pre + nombre);
    if (obj == null) { return; } //alert(MSGError + nombre); return;}
    obj.src = valor;
    return true;
}

function Visible(nombre, valor) {
    obj = document.getElementById(pre + nombre);
    if (obj == null) { return; } //alert(MSGError + nombre); return;}
    obj.Visible = valor;
    return true;
}

function DRLLlena(nombre, valor) {
    var select = document.getElementById(pre + nombre); //Obtenemos el objeto
    if (select == null) { return; } //alert(MSGError + nombre); return;}

    var elementos = valor.split("~");
    for (var i = 0; i < elementos.length; i++) {
        parValores = elementos[i].split("♦");
        select.options[i] = new Option(parValores[0], parValores[1]);
    }
    return true;
}

function DRLLimpia(nombre) {
    obj = document.getElementById(pre + nombre);
    if (obj == null) {
        //Dinamicos
        obj = document.getElementById(nombre);
        if (obj == null) { return; } //alert(MSGError + nombre); return;}
    }
    obj.options.length = 0;
    return true;
}

function Trim(cadena) {
    for (i = 0; i < cadena.length;) {
        if (cadena.charAt(i) == " ")
            cadena = cadena.substring(i + 1, cadena.length);
        else
            break;
    }
    for (i = cadena.length - 1; i >= 0; i = cadena.length - 1) {
        if (cadena.charAt(i) == " ")
            cadena = cadena.substring(0, i);
        else
            break;
    }
    return cadena;
}

function TBXObtener(nombre) {
    obj = document.getElementById(pre + nombre);
    if (obj == null) {
        obj = document.getElementById(nombre);
        if (obj == null) { return; } //alert(MSGError + nombre); return;}
    }
    return Trim(obj.value);
}

function LBXObtener(nombre, isValor) {
    obj = document.getElementById(pre + nombre);
    if (obj == null) {
        //Dinamicos
        obj = document.getElementById(nombre);
        if (obj == null) { return; } //alert(MSGError + nombre); return;}
    }
    if (isValor)
        return Trim(obj.options[obj.selectedIndex].text);
    else
        return obj.value;
}

function AsignarHTML(nombre, html) {
    obj = document.getElementById(pre + nombre);
    if (obj == null) {
        obj = document.getElementById(nombre);
        if (obj == null) { return; } //alert(MSGError + nombre); return;}
    }
    obj.innerHTML = html;
}

function AsignarCSS(nombre, css) {
    obj = document.getElementById(pre + nombre);
    if (obj == null) { return; } //alert(MSGError + nombre); return;}
    obj.className = css;
}

function VisibleInvisible(controlId, valbool) {
    var control = document.getElementById(pre + controlId); //Obtenemos el objeto

    if (control == null) {
        //Dinamicos
        control = document.getElementById(controlId);
        if (control == null) { return; } //alert(MSGError + nombre); return;}
    }
    if (valbool) {
        if (control.style.display == "") {
            control.style.visibility = "";
        }
    }
    else {
        if (control.style.visibility == "none") {
            control.style.visibility = "";
        }
    }

}

function doHide(nombre) {
    document.getElementById(nombre).style.display = "none";
}

function doShow(nombre) {
    document.getElementById(nombre).style.display = "";
    document.getElementById(nombre).style.height = "400px";
}

function LLlenaCatalogoVO(nombre, valores) {

    if (typeof (valores) == "object" && valores.length > 0) {
        var select = document.getElementById(pre + nombre); //Obtenemos el objeto

        if (select == null) {
            //Dinamicos
            select = document.getElementById(nombre);
            if (select == null) { return; } //alert(MSGError + nombre); return;}
        }

        select.options[0] = new Option('- Selecciona una opción -', -1);
        for (var i = 0; i < valores.length; i++)
            select.options[i + 1] = new Option(valores[i].strDescripcion, valores[i].intPK);
        return true;
    }
}

function AplicaEtiqueta(ddlNombre, celdaNombre) {
    var ddl = document.getElementById(pre + ddlNombre);
    if (ddl == null) {
        //Dinamicos
        ddl = document.getElementById(ddlNombre);
        if (ddl == null) { return; }
    }
    var celda = document.getElementById(pre + celdaNombre);
    if (celda == null) {
        //Dinamicos
        celda = document.getElementById(celdaNombre);
        if (celda == null) { return; }
    }

    var id = LBXObtener(ddl.name, false)
    switch (id) {
        case '1': celda.innerHTML = '[Factores]'; break;
        case '2': celda.innerHTML = '[Competencias]'; break;
        case '3': celda.innerHTML = '[Competencias]'; break;
        case '12': celda.innerHTML = '[T&eacute;cnica]'; break;
        case '22': celda.innerHTML = '[Entrevista]'; break;
        default:
            celda.innerHTML = '[Criterio]';
            document.getElementById('competenciasPanel').style.display = 'none';
            break;
            //VisibleInvisible('competenciasPanel', true); 
    }
    // Se coloca como cabecera la categoria elegida.
    document.getElementById('competenciasPanel').style.display = 'none';
    if (id == '-1') {
        celda.innerHTML = '[Criterio]';
    }
    else {
        document.getElementById('competenciasPanel').style.display = 'block';
        celda.innerHTML = 'Categoría: ' + document.getElementById('ddlcatcompetencia').options[document.getElementById('ddlcatcompetencia').selectedIndex].text + '';
    }
}

/* MPGM 17/08/10 ADD Direccion (Perfil Experiencia)*/
function LLlenaCatalogoDeptosVO(nombre, valores) {

    if (typeof (valores) == "object" && valores.length > 0) {
        var select = document.getElementById(pre + nombre); //Obtenemos el objeto

        if (select == null) {
            //Dinamicos
            select = document.getElementById(nombre);
            if (select == null) { return; } //alert(MSGError + nombre); return;}
        }

        select.options[0] = new Option('- Selecciona una opción -', -1);
        for (var i = 0; i < valores.length; i++)
            select.options[i + 1] = new Option(valores[i].strNomDepto, valores[i].idDepartamento);

        return true;
    }
}

function LLlenaSOCatalogoVO(nombre, valores) {

    if (typeof (valores) == "object" && valores.length > 0) {
        var select = document.getElementById(pre + nombre); //Obtenemos el objeto

        if (select == null) {
            //Dinamicos
            select = document.getElementById(nombre);
            if (select == null) { return; } //alert(MSGError + nombre); return;}
        }

        for (var i = 0; i < valores.length; i++)
            select.options[i] = new Option(valores[i].strDescripcion, valores[i].intPK);

        return true;
    }
}

function QuitarSeleccionado(nombre) {
    select = document.getElementById(pre + nombre);
    if (select == null) {
        //Dinamicos
        select = document.getElementById(nombre);
        if (select == null) { return; } //alert(MSGError + nombre); return;}
    }
    select.remove(obj.selectedIndex);
    return true;
}

function AsignarCheck(nombre, valor) {
    cb = document.getElementById(pre + nombre);
    if (cb == null) {
        //Dinamicos
        cb = document.getElementById(nombre);
        if (cb == null) { return; } //alert(MSGError + nombre); return;}
    }
    cb.checked = valor;
    return true;
}

function ObtieneCheck(nombre) {
    cb = document.getElementById(pre + nombre);
    if (cb == null) {
        //Dinamicos
        cb = document.getElementById(nombre);
        if (cb == null) { return; } //alert(MSGError + nombre); return;}
    }
    return cb.checked;
}

function validarEntero(valor, msg) {
    if (valor == '') return valor;

    valor = parseInt(valor);
    if (isNaN(valor) || valor < 0) {
        alert(msg);
        return '';
    }
    else
        return valor;

}

function validarEnteroTBX(valor) {
    if (valor == '') return valor;
    valor = parseInt(valor);
    if (isNaN(valor))
        return '';
    else
        return valor;
}

function validaCamposBusqueda() {

    var obj = document.getElementById('ddlCategoria');

    if (obj.selectedIndex == 0 && obj.options.length > 1) {
        alert('Debe de seleccionar una categoría');
        return false;
    }

    var obj2 = document.getElementById('txtValor');

    obj2.value = Trim(obj2.value);

    if (obj2.value == '') {
        alert('Debe específicar el valor a buscar');
        return false;
    }

    document.frmBusqueda.action = '?categoria=' + obj.selectedIndex + '&valor=' + obj2.value;
    document.frmBusqueda.submit();

    return true;
}

function buscaValorControl(control, valor) {

    var obj = window.opener.document.getElementById(control);

    for (var i = 0; i < obj.length; i++) {
        if (obj.options[i].value == valor) {
            return i;
        }
    }

    return 0;
}

function ObtieneIdsCheckBoxesSeleccionados(nombre) {

    var valores = new Array();
    var valor;
    var cadena;
    var cadenaFin;
    var nombre;
    var panel = document.getElementById(nombre);
    var chkboxs = panel.getElementsByTagName("input");

    for (var i = 0; i < chkboxs.length; i++) {
        if (chkboxs[i].type == 'checkbox' && chkboxs[i].checked) {
            //valor = new Array();
            nombre = '';
            cadena = chkboxs[i].id.split('_');
            //valor[0] = cadena[cadena.length - 1];
            for (var j = 0; j < cadena.length - 2 ; j++)
                nombre += (nombre == '' ? '' : '_') + cadena[j];

            if (cadena[2] == "192") {
                nombre = '';
                cadenaFin = cadena[cadena.length - 2] + '_' + cadena[cadena.length - 1];
            }
            else
                cadenaFin = cadena[cadena.length - 1];

            //valor[1] = document.getElementById(nombre + (nombre == '' ? '':'_') + 'regFactComp_' + valor[0]).innerHTML;
            //valor[2] = JSON.parse(document.getElementById(nombre + (nombre == '' ? '':'_') + 'hddcomp_' + valor[0]).value);
            if (document.getElementById(nombre + (nombre == '' ? '' : '_') + 'hddcomp_' + cadenaFin) != null) {
                valor = JSON.parse(document.getElementById(nombre + (nombre == '' ? '' : '_') + 'hddcomp_' + cadenaFin).value);
                valores[valores.length] = valor;
                chkboxs[i].checked = false;
            }
        }
    }
    return valores;
}

function CuentaFilasEnTabla(nombre) {
    var tabla = document.getElementById(nombre);
    return tabla.rows.length;
}

function validaSelBusqueda() {

    var obj = document.getElementById('frmBusqueda');

    document.getElementById('txtValor').value = Trim(document.getElementById('txtValor').value);

    if (document.getElementById('ddlCategoria').selectedIndex < 0 || document.getElementById('txtValor').value == '') {

        alert('No ha realizado ninguna selección');
        return false;
    }

    for (var i = 0; i < obj.length; i++) {

        if (obj.elements[i].type == 'radio' && obj.elements[i].checked) {

            if ((window.opener != null) && (!window.opener.closed)) {
                if (document.getElementById('ddlCategoria').options[0].value == 0) {
                    var texto = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_hddOculto1').value = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_ddlareaGeneral').selectedIndex = buscaValorControl('ctl00_ContentPlaceHolder1_ddlareaGeneral', texto[0]);
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_btnOculto1').click();

                } else if (document.getElementById('ddlCategoria').options[0].value == -1) {
                    var texto = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_hddOculto2').value = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_ddlGpoExp').selectedIndex = buscaValorControl('ctl00_ContentPlaceHolder1_ddlGpoExp', texto[0]);
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_btnOculto2').click();

                } else if (document.getElementById('ddlCategoria').options[0].value == -2) {
                    var texto = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_hddOculto1').value = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_ddlAreaGral').selectedIndex = buscaValorControl('ctl00_ContentPlaceHolder1_ddlAreaGral', texto[0]);
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_btnOculto1').click();

                } else if (document.getElementById('ddlCategoria').options[0].value == -3) {
                    var texto = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_hddOculto2').value = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_ddlGExperiencia').selectedIndex = buscaValorControl('ctl00_ContentPlaceHolder1_ddlGExperiencia', texto[0]);
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_btnOculto2').click();

                } else if (document.getElementById('ddlCategoria').options[0].value == -4) {
                    var texto = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_hddOculto1').value = texto;
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_btnOculto1').click();
                }
                else if (document.getElementById('ddlCategoria').options[0].value == -5) {
                    var texto = obj.elements[i].id.split('|');
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_hddOculto1').value = texto;
                    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_btnOculto1').click();
                }

            }
            window.close();
        }

    }

    return false;
}

function SoloLectura(nombre, valor) {
    tbx = document.getElementById(pre + nombre);
    if (tbx == null) {
        //Dinamicos
        tbx = document.getElementById(nombre);
        if (tbx == null) { return; } //alert(MSGError + nombre); return;}
    }
    tbx.readOnly = valor;
    return true;
}

function openCalendar(obj) {
    var url = '../personal/calendario.aspx?textbox=' + obj;
    referencia_calendario = window.document.open(url, 'cal', 'width=220,height=260,left=3 70,top=280,resizable=1,scrollbars=0');
}
function accionCheck() {
    if (!confirm('Al asignar el estatus "Cubierta", la vacante no volverá a ser editable y quedará únicamente en el histórico de vacantes')) {
        document.getElementById('ctl00_ContentPlaceHolder1_rbtnNoVacante').checked = false;
    }
}

//IJAE 27-08-2012 Funcoin para el Radio Button del modulo generacion de vacante Status CANCELADA-------------------------
function accionCancela() {
    if (!confirm('Una vez de cancelar la vacante no podrá reactivarla. ¿Desea continuar?')) {
        document.getElementById('ctl00_ContentPlaceHolder1_rbtnCancelada').checked = false;
    }
}
//-----------------------------------------------------------------------------------------------------------------------
//Proceso de selccion


function Actualizar_Procesos() {
    window.opener.document.getElementById('ctl00_ContentPlaceHolder1_btnRCambios').click();
}

function Abrir_VEvaluaciones(proceso) {
    window.open('VEvaluaciones.aspx?proceso=' + proceso, 'Evaluaciones', 'menubar=no, top.window.outerHeight = screen.availHeight, top.window.outerWidth = screen.availWidth, scrollbars=1')
}

function Abrir_VMensajes(proceso) {
    window.open('VMensaje.aspx?proceso=' + proceso, 'Evaluaciones', 'menubar=no, top.window.outerHeight = screen.availHeight, top.window.outerWidth = screen.availWidth, scrollbars=1')
}

function Abrir_VPerfil(idpuesto, idempresa) {
    window.open('ConsultaPerfilPuesto.aspx?idPuesto=' + idpuesto + '&idEmpresa=' + idempresa + "&proceso=1", 'Evaluaciones', 'menubar=no, top.window.outerHeight = screen.availHeight, top.window.outerWidth = screen.availWidth, scrollbars=1');

}

function CerrarPantalla() {
    window.close('Evaluaciones');
}

function Rango(sender, args) {
    var respuesta = false

    if (args.Value >= 1 && args.Value <= 100)
        respuesta = true;

    args.IsValid = respuesta;
}

function RangoOrden(sender, args) {
    var respuesta = false

    if (args.Value >= 1 && args.Value <= 4)
        respuesta = true;

    args.IsValid = respuesta;
}

/* Proceso de seleccion*/

var ventana

function Preguntar(mensaje) {

    if (confirm(mensaje)) {
        if (ventana != null) ventana.close();

        ventana = window.open('../../../web/asp/administracion/PSeleccion/VReporteAR.aspx', 'ReporteAR', 'menubar=no, top.window.outerHeight = screen.availHeight, top.window.outerWidth = screen.availWidth, scrollbars=1');

        if (ventana == null) { alert('Desactive el bloqueador de ventanas emergentes para poder continuar.'); }
    }
    else {
        if (confirm('¿Desea realmente aplicar los cambios?')) {
            window.document.getElementById('ctl00_ContentPlaceHolder1_btnActualizacion').click();
        }
        else {
            window.document.getElementById('ctl00_ContentPlaceHolder1_btnLimpiar').click();
        }

        return false;
    }

}

function Confirmacion(mensaje) {
    if (confirm(mensaje)) {
        window.close('ReporteAR');
        window.opener.document.getElementById('ctl00_ContentPlaceHolder1_btnActualizacion').click();
    }
    else {
        window.close('ReporteAR');
        window.opener.document.getElementById('ctl00_ContentPlaceHolder1_btnLimpiar').click();
    }

    return false;
}

function GetElement(value) {
    if (document.getElementById('ctl00_ContentPlaceHolder1_' + value) != null)
        return document.getElementById('ctl00_ContentPlaceHolder1_' + value);
        // Obtención de control desde la master de web service
    else if (document.getElementById('ctl00_CPH_Externo_' + value) != null)
        return document.getElementById('ctl00_CPH_Externo_' + value);
    else if (document.getElementById(value) != null)
        return document.getElementById(value);
    else
        return null;
}

// Recorrido para la generacion de calendarios por control (Imagen)
function CreaCalendarios(arrCalendarios) {
    if (arrCalendarios == null || arrCalendarios.length <= 0) return false;

    for (var i = 0; i < arrCalendarios.length; i++) {
        var controles = arrCalendarios[i].split('|');
        if (GetElement(controles[0]) == null && GetElement(controles[1]) == null) continue;

        calendarios = new Calendar({
            inputField: GetElement(controles[0]).id,
            dateFormat: "%d/%m/%Y",
            trigger: GetElement(controles[1]).id,
            min: 19200101,
            max: parseInt((new Date().getFullYear() + 5) + '1231'),
            bottomBar: false,
            onSelect: function () {
                var date = Calendar.intToDate(this.selection.get());
                this.hide();
            }
        });
    }
}


// Funcion para enviar pantalla de carga
function SendPopCenter(namePopUp, urlPage, parameters, width, height) {
    if (namePopUp == null || namePopUp == '') namePopUp = 'CustomPopUp';
    if (urlPage == null || urlPage == '') urlPage = '../util/loading.aspx';
    if (width == null || width == '') width = screen.width;
    if (height == null || height == '') height = screen.height;
    if (parameters == null || parameters == '') parameters = 'menubar=no, location=0, width=' + width + ', height=' + height + ', scrollbars=1';
    else parameters = parameters + ', width=' + width + ', height=' + height;

    var ventana = window.open(urlPage, namePopUp, parameters);
    ventana.moveTo((screen.width - 430) / 2, (screen.height - 180) / 2);
}

function OpenFloatBox(namePopUp, urlPage, parameters, width, height) {

    if (namePopUp == null || namePopUp == '') namePopUp = 'CustomPopUp';
    if (urlPage == null || urlPage == '') urlPage = '../util/loading.aspx';
    if (width == null || width == '') width = screen.width;
    if (height == null || height == '') height = screen.height;
    if (parameters == null || parameters == '') parameters = 'menubar=no, location=0, width=' + width + ', height=' + height + ', scrollbars=1';
    else parameters = parameters + ', width=' + width + ', height=' + height;
    window.scrollTo(0, 0);
    if (fb != null && fb.anchor != null && fb.anchors.length > 0) fb = new Floatbox();
    setTimeout("fb = new Floatbox({ isevalucion: true}); fb.loadAnchor('" + urlPage + "', '" + parameters + "', '" + namePopUp + "');", 1000);
}


function SendSecondPopCenter(namePopUp, urlPage, parameters, width, height) {
    if (namePopUp == null || namePopUp == '') namePopUp = 'CustomPopUp';
    if (urlPage == null || urlPage == '') urlPage = '../util/loading.aspx';
    if (width == null || width == '') width = screen.width;
    if (height == null || height == '') height = screen.height;
    if (parameters == null || parameters == '') parameters = 'menubar=no, location=0, width=' + width + ', height=' + height + ', scrollbars=1';
    else parameters = parameters + ', width=' + width + ', height=' + height;

    var ventana = window.open(urlPage, namePopUp, parameters);

    if (ventana == null) {
        alert("Al parecer tiene bloquedo las ventanas emergentes, mantenga presionado la tecla Ctrl y seleccione la evaluación por favor.");
        return;
    }

    ventana.moveTo(0, 0);


    ventana.resizeTo(width, height);
}
//JGH Función para mover redireccionar a la parte superior de la pantalla de registro
function isIE6() {
    version = 0
    if (navigator.appVersion.indexOf("MSIE") != -1) {
        temp = navigator.appVersion.split("MSIE")
        version = parseFloat(temp[1])
    }
    return (version && (version < 7));
}
// <![CDATA[
var goto_top_type = -1;
var goto_top_itv = 0;

function goto_top_timer() {
    var y = goto_top_type == 1 ? document.documentElement.scrollTop : document.body.scrollTop;
    var moveby = 35;

    y -= Math.ceil(y * moveby / 100);
    if (y < 0) {
        y = 0;
    }

    if (goto_top_type == 1) {
        document.documentElement.scrollTop = y;
    }
    else {
        document.body.scrollTop = y;
    }

    if (y == 0) {
        clearInterval(goto_top_itv);
        goto_top_itv = 0;
    }
}

function goto_top() {
    if (goto_top_itv == 0) {
        if (document.documentElement && document.documentElement.scrollTop) {
            goto_top_type = 1;
        }
        else if (document.body && document.body.scrollTop) {
            goto_top_type = 2;
        }
        else {
            goto_top_type = 0;
        }

        if (goto_top_type > 0) {
            goto_top_itv = setInterval('goto_top_timer()', 50);
        }
    }
}

// ]]>


//inputParam in format mm/dd/yyyy
function isDateValid(inputParam) {
    if (inputParam != '') {
        //inputParam = inputParam.replace("-","/"); 
        //inputParam = inputParam.replace(/-/gi,"/");
        inputParam = replaceAll(inputParam, "-", "/");

        // regular expression to match required date format 
        re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

        if (regs = inputParam.match(re)) {
            var dteDate;
            //javascript months start at 0 (0-11 instead of 1-12)

            dteDate = new Date(regs[3], regs[2] - 1, regs[1]);

            return ((regs[1] == dteDate.getDate()) && ((regs[2] - 1) == dteDate.getMonth()) && (regs[3] == dteDate.getFullYear()));
        }
        else
            return false;
    }
    else
        return false;
}

function replaceAll(oldStr, findStr, repStr) {
    var srchNdx = 0;

    var newStr = "";

    while (oldStr.indexOf(findStr, srchNdx) != -1) {
        newStr += oldStr.substring(srchNdx, oldStr.indexOf(findStr, srchNdx));
        newStr += repStr;
        srchNdx = (oldStr.indexOf(findStr, srchNdx) + findStr.length);
    }
    newStr += oldStr.substring(srchNdx, oldStr.length);

    return newStr;
}

/* MPGM - 20110825 */
function ActualizaEtiquetaTexto(label, campo, value) {
    GetElement(label).innerHTML = (GetElement(campo).value == '') ? value : '';
}

function validaEdadMinimaPermitida(valor, edadMinima, msg) {
    if (!isDateValid(valor)) return '';

    var a = valor.split("/");
    var ano = parseInt(a[2]);
    var mes = parseInt(a[1]);
    var dia = parseInt(a[0]);

    fecha_hoy = new Date();
    ahora_ano = fecha_hoy.getYear();
    ahora_mes = fecha_hoy.getMonth();
    ahora_dia = fecha_hoy.getDate();
    edad = (ahora_ano + 1900) - ano;

    if (ahora_mes < (mes - 1)) {
        edad--;
    }
    if (((mes - 1) == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }

    if (edad < edadMinima) {
        alert(msg.replace("1?", edad).replace("2?", edadMinima));
        return '';
    }

    return valor;
}

// IJAE
function capLock(e, nameElement) {
    kc = e.keyCode ? e.keyCode : e.which;
    sk = e.shiftKey ? e.shiftKey : ((kc == 16) ? true : false);

    var element = document.getElementById(nameElement);
    if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk)) {
        element.style.visibility = 'visible';

    }
    else {
        element.style.visibility = 'hidden';

    }
}

//Remove substring
function RemoveSubString(thisString, thisSubString) {
    eval('var re = /' + FormatRegExpString(thisSubString) + '/g');
    return thisString.replace(re, "");
}

//format a String to be used as Regular Expression
function FormatRegExpString(convertString) {
    convertString = convertString.replace(/\\/g, '\\\\');
    convertString = convertString.replace(/\//g, '\\/');
    convertString = convertString.replace(/\*/g, '\\*');
    convertString = convertString.replace(/\$/g, '\\$');
    convertString = convertString.replace(/\+/g, '\\+');
    convertString = convertString.replace(/\?/g, '\\?');
    convertString = convertString.replace(/\./g, '\\.');
    convertString = convertString.replace(/\^/g, '\\^');
    convertString = convertString.replace(/\[/g, '\\[');
    convertString = convertString.replace(/\]/g, '\\]');
    convertString = convertString.replace(/\(/g, '\\(');
    convertString = convertString.replace(/\)/g, '\\)');
    convertString = convertString.replace(/\{/g, '\\{');
    convertString = convertString.replace(/\}/g, '\\}');
    convertString = convertString.replace(/\|/g, '\\|');

    return convertString;

}

// MPGM 20140717 - Inicializa Dialog de JQuery 
function InitDialog_JQuery(width, height) {
    $(function () {
        $('#dialog').dialog({
            autoOpen: false,
            width: width,
            height: height
        });
    });
}

// MPGM 20140717 - Presenta Dialog de JQuery
function ViewDialog_JQuery(request_url, title, width, height) {
    var url = request_url;
    var iframe = $('<iframe   src="' + url + '"  />');
    var child = location.href;

    iframe.dialog({
        close: false,
        autoOpen: true,
        title: title,
        width: width,
        height: height,
        modal: true,
        resizable: false,
        buttons: {
            "Cerrar": function () {
                $(this).dialog('close');
                // Para este proceso no se requiere la recarga de pantalla siguiente anterior
                //window.parent.location.reload();
            }
        }
    }).width(width).height(height);
    return false;
}
// MPGM 20180806 - Presenta Dialog de JQuery desde DIV
function ViewDialog_JQueryDiv(divFrame, title, width, height, autoOpen, iResizable ) {
    var iframe = divFrame.dialog({
        close: false,
        autoOpen: autoOpen,
        title: title,
        width: width,
        height: height,
        modal: true,
        resizable: iResizable,
        buttons: {
            "Cerrar": function () {
                $(this).dialog('close');
                // Para este proceso no se requiere la recarga de pantalla siguiente anterior
                //window.parent.location.reload();
            }
        }
    }).width(width).height(height);
    return false;
}

function closeModal() {
    $(this).dialog('close');
}


/*
    20131003 MPGMWW
    SE GENERA CÓDIGO PARA MODIFICAR EL TAMAÑO DE TEXTO
*/
var fontMin = 8;
var fontMax = 18;

function ZoomFontSize(Action, Element) {
    var obj = document.getElementById(Element);
    if (obj == null) obj = document.getElementById('ctl00_CPH_Externo_UpdatePanel1');
    if (obj == null) return;

    var fontMax = 300
    var fontMin = 70

    if (obj.style.fontSize == "") { obj.style.fontSize = "100%"; }

    actual = parseInt(obj.style.fontSize);

    var url = location.href.split('/');
    var section = '/' + url[3] + '/' + url[4] + '/' + url[5] + '/';

    var manager = new CookieManager();
    if (manager.item("apl_fontsize") == null)
        manager.add("apl_fontsize", actual, Infinity, section);
    else actual = parseInt(manager.item("apl_fontsize"));

    /* SI QUEREMOS DESPLEGAR EL MANEJADOR, BASTARÁ CON PONER:
    manager.showCookies(); // para ponerlo al final del documento
    manager.showCookies("#cookies"); // para ponerlo dentro del panel con id "cookies"
    */

    increment = 10;

    if (Action == "restore") { obj.style.fontSize = "100%"; manager.add("apl_fontsize", 100, Infinity, section); }

    if (Action == "increase" && ((actual + increment) <= fontMax)) {
        value = actual + increment;
        obj.style.fontSize = value + "%"
        manager.add("apl_fontsize", value, Infinity, section);
    }

    if (Action == "decrease" && ((actual + increment) >= fontMin)) {
        value = actual - increment;
        obj.style.fontSize = value + "%"
        manager.add("apl_fontsize", value, Infinity, section);
    }
    return false;
}

function verificaTamanioFuente(Element) {
    var manager = new CookieManager();
    if (manager.item("apl_fontsize") != null) {
        actual = parseInt(manager.item("apl_fontsize"));
        var obj = document.getElementById(Element);
        if (obj == null) obj = document.getElementById('ctl00_CPH_Externo_UpdatePanel1');
        obj.style.fontSize = actual + "%"
    }
}

/*
    SESIÓN, ENVÍO DE MENSAJE PARA LOGOFF
*/
var sess_pollInterval = 60000;
var sess_expirationMinutes = '<%=Session.Timeout %>';
var sess_warningMinutes = '<%=new com.armstrong.util.ClientSidePage().GetAplicationParameter(com.armstrong.util.Constantes.SESS_WARNINGMINUTES) %>';
var sess_intervalID;
var sess_lastActivity;
var name_btn_sess_logoff = "";
var logOutTime = false;

function initSession(timeSession, warningMinutes, btnLogOFF) {
    sess_expirationMinutes = timeSession;
    sess_warningMinutes = warningMinutes;
    name_btn_sess_logoff = btnLogOFF;

    // RevokeSession();
    // "<%= Session.Timeout = 2 %>" ;

    sess_lastActivity = new Date();
    sessSetInterval();

    $(document).on('mousemove', function (ed, e) {
        sessKeyPressed(ed, e);
    });
}

function RevokeSession()
{
    $.ajax({
        url: "@Url.Content('~/Home/RovokeSession')",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ Variable: '' }),
        success: function (result) {
            MetodoResultado(result);
        }
    });
}

function MetodoResultado(result)
{
}

function sessSetInterval() {
    //sess_pollInterval = 60000;

    sess_pollInterval = sess_warningMinutes * (sess_pollInterval * parseInt(sess_expirationMinutes));
    sess_warningMinutes = sess_pollInterval / 1000 / 60;

    sess_intervalID = setInterval('sessInterval()', sess_pollInterval);
}
function sessClearInterval() {
    clearInterval(sess_intervalID);

}
function sessKeyPressed(ed, e) {
    sess_lastActivity = new Date();
}

function sessLogOut() {
    if (logOutTime) {
        try{
            GetElement(name_btn_sess_logoff).onsubmit();
        }catch(err)
        {}
        window.location = $('#ctl00_HyperLink1').attr('href');
    }
}
function sessInterval() {
    pathArray = window.location.pathname.split('/');

    var CONTROLADOR = pathArray[pathArray.length - 2] + '/' + pathArray[pathArray.length - 1];

    var head = document.getElementsByTagName('head').item(0);
    script = document.createElement('script');
    script.src = CONTROLADOR;
    script.setAttribute('type', 'text/javascript');
    script.defer = true;
    head.appendChild(script);

    var options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };

    var now = new Date();
    //get milliseconds of differneces
    var diff = now - sess_lastActivity;
    //get minutes between differences
    var diffMins = (diff / 1000 / 60);
    if (diffMins >= sess_warningMinutes) {
        //warn before expiring
        //stop the timer
        //// sessClearInterval();
        //prompt for attention
        /*
        var active = confirm('Tu sesión expirará en ' + (sess_expirationMinutes - sess_warningMinutes) + ' minutos , presiona ACEPTAR para continuar ' + 'o presiona CANCELAR para terminar sesión. \nSi ha cerrado la sesión se perderán los cambios.' + '\n' + now.toLocaleTimeString("es-mx", options));
        logOutTime = true;
        setTimeout(sessLogOut(), 2000);
        if (active == true) {
            logOutTime = false;
            now = new Date();
            diff = now - sess_lastActivity;
            diffMins = (diff / 1000 / 60);
            if (diffMins > sess_expirationMinutes) {
                sessLogOut();
            }
            else {
                initSession(sess_expirationMinutes, sess_warningMinutes);
                sessSetInterval();
                sess_lastActivity = new Date();
            }
        }
        else {
            sessLogOut();
        }
		*/
        //warn before expiring
        //stop the timer
        sessClearInterval();

        if (confirm('Tu sesión expirará en ' + (sess_expirationMinutes - sess_warningMinutes) + ' minutos , presiona ACEPTAR para continuar ' + 'o presiona CANCELAR para terminar sesión. \nSi ha cerrado la sesión se perderán los cambios.' + '\n' + now.toLocaleTimeString("es-mx", options))) {
            now = new Date();
            diff = now - sess_lastActivity;
            diffMins = (diff / 1000 / 60);
            if (diffMins > sess_expirationMinutes) {
                logOutTime = true;
                sessLogOut();
            }
            else {
                logOutTime = false;
                initSession(sess_expirationMinutes, sess_warningMinutes);
                sessSetInterval();
                sess_lastActivity = new Date();
            }
        }
        else {
            logOutTime = true;
            sessLogOut();
        }
    }
}

function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, resizable=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus != null && window.focus != undefined && window.focus) newWindow.focus();
    else if (window.focus() != null && window.focus() != undefined && window.focus()) newWindow.focus();
}