// Based on: http://www.jacklmoore.com/notes/jquery-modal-tutorial/
function ModalWindow(opts) {
    var 
    method = {},
    $overlay,
    $modal,
    $content,
    $close,
    $onClose,
    $onOpen,
    $leaveContent=false,
    $isOpen=false,
    $clickClose=false,
    $overlayClickClose=false,
    $allowScroll=true;
    var modalPrefix = opts.modalID || "modal";

    // Center the modal in the viewport
  method.center = function () {
	var top, left; //, scrollTop;
	top  = Math.max($(window).height() - $modal.outerHeight(), 0)/2;//+scrollTop;
	left = Math.max($(window).width() - $modal.outerWidth(), 0)/2;
	if ( (parseFloat($modal.css("top")) != top) || (parseFloat($modal.css("left")) != left)) {
	    $modal.css({
		top:top,
		left:left
	    });
        }
    };

    // Open the modal
  method.open = function (settings) {
	$content.empty().append(settings.content);
	$isOpen=true;
	$clickClose = !!settings.clickClose;
	$overlayClickClose = !!settings.overlayClickClose;
	settings.hideClose ? $close.hide() : $close.show();
	$allowScroll = !!settings.allowScroll;
	$leaveContent = !!settings.leaveContent;
        $onClose = settings.onClose;
        $onOpen =  settings.onOpen;
	$modal.css({
	    width: settings.width || 'auto', 
	    height: settings.height || 'auto',
	    maxHeight: (window.innerHeight-20)+'px',
	});
	$modal.css("overflow-y","auto");
	$(window).bind('resize.modal', method.center);
	if (!$allowScroll) $("body").css("overflow","hidden");
	method.center();
	$overlay.fadeIn(200, function(e) {
	  $modal.fadeIn(400, function(e) {
		if ($onOpen) $onOpen(e);
		$("#modal_button_close").click(function(e) { // Handle custom button
		    e.preventDefault();
		    method.close();
		});
		setTimeout(method.center, 50); // ensure centered
		$content.find("img").on('load',function() { setTimeout(method.center, 50)}); // Re center on image load.
	    });
	});
    };

    // Close the modal
    method.close = function () {
	$modal.fadeOut(500);
	$overlay.fadeOut(500);
	if (!$leaveContent) $content.empty();
	$(window).unbind('resize.modal');
	if (!$allowScroll) $("body").css("overflow","auto");
        if ($onClose) $onClose();
	$isOpen=false;
    };

    method.modal = function() {
	return $modal;
    };

    method.isOpen = function() {
	return $isOpen
    };

    // Generate the HTML and add it to the document
    $overlay = $('<div class="modal-overlay" id="'+ modalPrefix +'_overlay"></div>');
    $modal   = $('<div class="modal-modal" id="'+ modalPrefix +'_modal"></div>');
    $content = $('<div class="modal-content" id="'+ modalPrefix +'_content"></div>');
    $close   = $('<a class="modal-close" id="'  + modalPrefix +'_close" href="#">close</a>');

    $modal.hide();
    $overlay.hide();
    $modal.append($content, $close);

    $(document).ready(function(){
	$('body').append($overlay, $modal);
    });

    $close.click(function(e){
	e.preventDefault();
	method.close();
    });

    $modal.click(function(e){
      if (false) { //$clickClose) {
	    e.preventDefault();
	    method.close();
	}
    });
    $overlay.click(function(e){
	if ($clickClose || $overlayClickClose) {
	    e.preventDefault();
	    method.close();
	}
    });

    return method;
};

var modal = ModalWindow({modalID: "modal"}); // Default modal globally available.
